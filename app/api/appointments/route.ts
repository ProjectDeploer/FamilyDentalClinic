import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db/prisma";
import { appointmentSchema } from "@/lib/validation";
import { createReference } from "@/lib/appointments";
import { isSameOrigin, rateLimit, requestIp } from "@/lib/rate-limit";
import {
  sendAdminNotification,
  sendPatientTemplate,
} from "@/lib/whatsapp/client";

export async function POST(request: Request) {
  if (!isSameOrigin(request))
    return NextResponse.json(
      { message: "Request origin is not allowed." },
      { status: 403 },
    );
  if (!rateLimit(`appointment:${requestIp(request)}`, 5, 15 * 60_000).allowed)
    return NextResponse.json(
      { message: "Too many requests. Please try again shortly." },
      { status: 429 },
    );
  try {
    const parsed = appointmentSchema.safeParse(await request.json());
    if (!parsed.success)
      return NextResponse.json(
        {
          message: "Please review the highlighted fields.",
          errors: parsed.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    const { consent: _consent, ...data } = parsed.data;
    void _consent;
    let appointment;
    try {
      appointment = await prisma.appointment.create({
        data: {
          ...data,
          email: data.email || null,
          message: data.message || null,
          preferredDate: new Date(`${data.preferredDate}T00:00:00.000Z`),
          reference: createReference(),
        },
      });
    } catch (error) {
      if (
        !(error instanceof Prisma.PrismaClientKnownRequestError) ||
        error.code !== "P2002"
      )
        throw error;
      appointment = await prisma.appointment.create({
        data: {
          ...data,
          email: data.email || null,
          message: data.message || null,
          preferredDate: new Date(`${data.preferredDate}T00:00:00.000Z`),
          reference: createReference(),
        },
      });
    }
    const [adminResult, patientResult] = await Promise.allSettled([
      sendAdminNotification(appointment),
      sendPatientTemplate(appointment, "received"),
    ]);
    if (
      adminResult.status === "fulfilled" &&
      !adminResult.value.skipped &&
      adminResult.value.messageId
    )
      await prisma.appointment.update({
        where: { id: appointment.id },
        data: { whatsappMessageId: adminResult.value.messageId },
      });
    if (
      adminResult.status === "rejected" ||
      patientResult.status === "rejected"
    )
      console.error("WhatsApp notification failed after appointment save", {
        reference: appointment.reference,
        admin: adminResult.status,
        patient: patientResult.status,
      });
    return NextResponse.json(
      {
        appointment: {
          reference: appointment.reference,
          name: appointment.name,
          service: appointment.service,
          preferredDate: parsed.data.preferredDate,
          preferredTime: appointment.preferredTime,
          status: appointment.status,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Appointment request failed", error);
    return NextResponse.json(
      {
        message:
          "We could not save your request. Please call or WhatsApp the clinic.",
      },
      { status: 500 },
    );
  }
}
