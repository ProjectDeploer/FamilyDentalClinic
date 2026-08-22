import { NextResponse } from "next/server";
import { AppointmentStatus, Prisma } from "@prisma/client";
import { prisma } from "@/lib/db/prisma";
import { normalisePhone } from "@/lib/appointments";
import {
  sendPatientTemplate,
  verifyMetaSignature,
} from "@/lib/whatsapp/client";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const mode = url.searchParams.get("hub.mode");
  const token = url.searchParams.get("hub.verify_token");
  const challenge = url.searchParams.get("hub.challenge");
  if (
    mode === "subscribe" &&
    token &&
    token === process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN
  )
    return new Response(challenge ?? "", { status: 200 });
  return new Response("Forbidden", { status: 403 });
}

type WebhookPayload = {
  entry?: Array<{
    changes?: Array<{
      value?: {
        messages?: Array<{
          id: string;
          from: string;
          type: string;
          text?: { body?: string };
        }>;
        statuses?: Array<{ id: string; status: string }>;
      };
    }>;
  }>;
};

function parseSchedule(body: string) {
  const match = body
    .trim()
    .match(
      /^RESCHEDULE\s+(FDC-[A-Z0-9]{6})\s+(\d{2})-(\d{2})-(\d{4})\s+(0?[1-9]|1[0-2]):([0-5]\d)\s*(AM|PM)$/i,
    );
  if (!match) return null;
  const [, reference, day, month, year, hourString, minute, period] = match;
  let hour = Number(hourString) % 12;
  if (period.toUpperCase() === "PM") hour += 12;
  const date = new Date(`${year}-${month}-${day}T00:00:00.000Z`);
  if (
    Number.isNaN(date.valueOf()) ||
    date.getUTCDate() !== Number(day) ||
    date < new Date(new Date().setHours(0, 0, 0, 0))
  )
    return null;
  return {
    reference: reference.toUpperCase(),
    date,
    time: `${String(hour).padStart(2, "0")}:${minute}`,
  };
}

export async function POST(request: Request) {
  const raw = await request.text();
  if (!verifyMetaSignature(raw, request.headers.get("x-hub-signature-256")))
    return new Response("Invalid signature", { status: 401 });
  try {
    const payload = JSON.parse(raw) as WebhookPayload;
    for (const entry of payload.entry ?? [])
      for (const change of entry.changes ?? []) {
        for (const status of change.value?.statuses ?? []) {
          await prisma.whatsAppEvent.upsert({
            where: { id: `status:${status.id}:${status.status}` },
            update: {},
            create: {
              id: `status:${status.id}:${status.status}`,
              eventType: `delivery:${status.status}`,
              payload: status as Prisma.InputJsonValue,
            },
          });
        }
        for (const message of change.value?.messages ?? []) {
          try {
            await prisma.whatsAppEvent.create({
              data: {
                id: message.id,
                eventType: "incoming-message",
                payload: message as Prisma.InputJsonValue,
              },
            });
          } catch (error) {
            if (
              error instanceof Prisma.PrismaClientKnownRequestError &&
              error.code === "P2002"
            )
              continue;
            throw error;
          }
          const admin = normalisePhone(
            process.env.CLINIC_ADMIN_WHATSAPP_NUMBER ?? "",
          ).replace(/^\+/, "");
          if (
            !admin ||
            normalisePhone(message.from).replace(/^\+/, "") !== admin ||
            message.type !== "text"
          )
            continue;
          const body = message.text?.body?.trim() ?? "";
          const simple = body.match(/^(CONFIRM|CANCEL)\s+(FDC-[A-Z0-9]{6})$/i);
          const schedule = parseSchedule(body);
          if (!simple && !schedule) continue;
          const reference = (
            schedule?.reference ??
            simple?.[2] ??
            ""
          ).toUpperCase();
          const appointment = await prisma.appointment.findUnique({
            where: { reference },
          });
          if (!appointment) continue;
          if (schedule) {
            const updated = await prisma.appointment.update({
              where: { id: appointment.id },
              data: {
                status: AppointmentStatus.RESCHEDULED,
                confirmedDate: schedule.date,
                confirmedTime: schedule.time,
              },
            });
            await sendPatientTemplate(updated, "rescheduled");
          } else if (
            simple?.[1].toUpperCase() === "CONFIRM" &&
            appointment.status !== AppointmentStatus.CONFIRMED &&
            appointment.status !== AppointmentStatus.COMPLETED
          ) {
            const updated = await prisma.appointment.update({
              where: { id: appointment.id },
              data: {
                status: AppointmentStatus.CONFIRMED,
                confirmedDate: appointment.preferredDate,
                confirmedTime: appointment.preferredTime,
              },
            });
            await sendPatientTemplate(updated, "confirmed");
          } else if (
            simple?.[1].toUpperCase() === "CANCEL" &&
            appointment.status !== AppointmentStatus.CANCELLED
          ) {
            const updated = await prisma.appointment.update({
              where: { id: appointment.id },
              data: { status: AppointmentStatus.CANCELLED },
            });
            await sendPatientTemplate(updated, "cancelled");
          }
        }
      }
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("WhatsApp webhook processing failed", error);
    return NextResponse.json({ received: true });
  }
}
