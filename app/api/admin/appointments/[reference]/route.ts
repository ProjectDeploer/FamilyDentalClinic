import { NextResponse } from "next/server";
import { AppointmentStatus } from "@prisma/client";
import { z } from "zod";
import { isAdminAuthenticated } from "@/lib/auth/session";
import { prisma } from "@/lib/db/prisma";
import { isSameOrigin } from "@/lib/rate-limit";
import { sendPatientTemplate } from "@/lib/whatsapp/client";

const actionSchema = z
  .object({
    action: z.enum(["CONFIRM", "RESCHEDULE", "CANCEL", "COMPLETE"]),
    date: z.iso.date().optional(),
    time: z
      .string()
      .regex(/^([01]\d|2[0-3]):[0-5]\d$/)
      .optional(),
  })
  .superRefine((value, context) => {
    if (value.action === "RESCHEDULE" && (!value.date || !value.time))
      context.addIssue({
        code: "custom",
        message: "Date and time are required for rescheduling",
      });
  });

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ reference: string }> },
) {
  if (!isSameOrigin(request) || !(await isAdminAuthenticated()))
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  const parsed = actionSchema.safeParse(await request.json());
  if (!parsed.success)
    return NextResponse.json(
      { message: parsed.error.issues[0]?.message ?? "Invalid action" },
      { status: 400 },
    );
  const reference = (await params).reference.toUpperCase();
  const existing = await prisma.appointment.findUnique({
    where: { reference },
  });
  if (!existing)
    return NextResponse.json(
      { message: "Appointment not found" },
      { status: 404 },
    );
  let data: {
    status: AppointmentStatus;
    confirmedDate?: Date;
    confirmedTime?: string;
  };
  let template: "confirmed" | "rescheduled" | "cancelled" | null = null;
  if (parsed.data.action === "CONFIRM") {
    data = {
      status: AppointmentStatus.CONFIRMED,
      confirmedDate: existing.preferredDate,
      confirmedTime: existing.preferredTime,
    };
    template = "confirmed";
  } else if (parsed.data.action === "RESCHEDULE") {
    data = {
      status: AppointmentStatus.RESCHEDULED,
      confirmedDate: new Date(`${parsed.data.date}T00:00:00.000Z`),
      confirmedTime: parsed.data.time,
    };
    template = "rescheduled";
  } else if (parsed.data.action === "CANCEL") {
    data = { status: AppointmentStatus.CANCELLED };
    template = "cancelled";
  } else data = { status: AppointmentStatus.COMPLETED };
  const appointment = await prisma.appointment.update({
    where: { reference },
    data,
  });
  if (template)
    try {
      await sendPatientTemplate(appointment, template);
    } catch (error) {
      console.error("Admin action saved but patient notification failed", {
        reference,
        error,
      });
    }
  return NextResponse.json({ appointment });
}
