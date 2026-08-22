import { createHmac, timingSafeEqual } from "node:crypto";
import type { Appointment } from "@prisma/client";
import { displayDate, displayTime, normalisePhone } from "@/lib/appointments";

const graphVersion = process.env.WHATSAPP_GRAPH_VERSION ?? "v23.0";
const endpoint = () =>
  `https://graph.facebook.com/${graphVersion}/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`;

async function postMessage(payload: object) {
  const token = process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  if (!token || !phoneId)
    return { skipped: true as const, reason: "WhatsApp is not configured" };
  let lastError: unknown;
  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      const response = await fetch(endpoint(), {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(12_000),
      });
      const json = (await response.json()) as {
        messages?: { id: string }[];
        error?: { message?: string };
      };
      if (response.ok)
        return { skipped: false as const, messageId: json.messages?.[0]?.id };
      if (response.status < 500 && response.status !== 429)
        throw new Error(
          json.error?.message ?? `WhatsApp error ${response.status}`,
        );
      lastError = new Error(
        json.error?.message ?? `WhatsApp error ${response.status}`,
      );
    } catch (error) {
      lastError = error;
    }
    await new Promise((resolve) => setTimeout(resolve, 250 * 2 ** attempt));
  }
  throw lastError;
}

export async function sendAdminNotification(appointment: Appointment) {
  const to = normalisePhone(
    process.env.CLINIC_ADMIN_WHATSAPP_NUMBER ?? "",
  ).replace(/^\+/, "");
  if (!to)
    return { skipped: true as const, reason: "Admin number is not configured" };
  const body = `🦷 New Appointment Request\n\nReference: ${appointment.reference}\nPatient: ${appointment.name}\nPhone: ${appointment.phone}\nService: ${appointment.service}\nPreferred Date: ${displayDate(appointment.preferredDate)}\nPreferred Time: ${displayTime(appointment.preferredTime)}\n\nStatus: Pending\n\nReply:\nCONFIRM ${appointment.reference}\nCANCEL ${appointment.reference}`;
  return postMessage({
    messaging_product: "whatsapp",
    to,
    type: "text",
    text: { body },
  });
}

export function sendPatientTemplate(
  appointment: Appointment,
  kind: "received" | "confirmed" | "rescheduled" | "cancelled",
) {
  const templates = {
    received:
      process.env.WHATSAPP_APPOINTMENT_RECEIVED_TEMPLATE ??
      "appointment_request_received",
    confirmed:
      process.env.WHATSAPP_APPOINTMENT_CONFIRMED_TEMPLATE ??
      "appointment_confirmed",
    rescheduled:
      process.env.WHATSAPP_APPOINTMENT_RESCHEDULED_TEMPLATE ??
      "appointment_rescheduled",
    cancelled:
      process.env.WHATSAPP_APPOINTMENT_CANCELLED_TEMPLATE ??
      "appointment_cancelled",
  };
  const date = appointment.confirmedDate ?? appointment.preferredDate;
  const time = appointment.confirmedTime ?? appointment.preferredTime;
  return postMessage({
    messaging_product: "whatsapp",
    to: normalisePhone(appointment.phone).replace(/^\+/, ""),
    type: "template",
    template: {
      name: templates[kind],
      language: { code: process.env.WHATSAPP_TEMPLATE_LANGUAGE ?? "en" },
      components: [
        {
          type: "body",
          parameters: [
            appointment.name,
            appointment.reference,
            appointment.service,
            displayDate(date),
            displayTime(time),
          ].map((text) => ({ type: "text", text })),
        },
      ],
    },
  });
}

export function verifyMetaSignature(rawBody: string, signature: string | null) {
  const secret = process.env.META_APP_SECRET;
  if (!secret || !signature?.startsWith("sha256=")) return false;
  const expected = Buffer.from(
    createHmac("sha256", secret).update(rawBody).digest("hex"),
    "hex",
  );
  const supplied = Buffer.from(signature.slice(7), "hex");
  return (
    expected.length === supplied.length && timingSafeEqual(expected, supplied)
  );
}
