import { z } from "zod";
import { services } from "@/config/services";

export const serviceOptions = [
  "General Consultation",
  ...services.map((item) =>
    item.title === "Dental Extractions" ? "Dental Extraction" : item.title,
  ),
  "Other",
] as const;

const phone = z
  .string()
  .trim()
  .min(8, "Enter a valid mobile number")
  .max(20)
  .regex(
    /^\+?[0-9][0-9\s()-]{6,18}[0-9]$/,
    "Enter a valid international mobile number",
  );
const safeText = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .transform((value) => value.replace(/[<>]/g, ""));

export const appointmentSchema = z
  .object({
    name: safeText(100).pipe(z.string().min(2, "Full name is required")),
    phone,
    email: z
      .union([z.literal(""), z.email("Enter a valid email address")])
      .optional(),
    service: z.enum(serviceOptions, { message: "Select a service" }),
    preferredDate: z.iso.date("Select a valid date"),
    preferredTime: z
      .string()
      .regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Select a valid time"),
    message: safeText(1000).optional(),
    consent: z.boolean().refine((value) => value, "Consent is required"),
  })
  .superRefine((value, ctx) => {
    const selected = new Date(`${value.preferredDate}T23:59:59`);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selected < today)
      ctx.addIssue({
        code: "custom",
        path: ["preferredDate"],
        message: "Please select today or a future date",
      });
  });

export const reviewSchema = z.object({
  name: safeText(80).pipe(z.string().min(2, "Name is required")),
  service: safeText(80).pipe(z.string().min(2, "Service is required")),
  rating: z.coerce.number().int().min(1).max(5),
  review: safeText(1200).pipe(
    z.string().min(20, "Please share at least 20 characters"),
  ),
});

export const contactSchema = z.object({
  name: safeText(100).pipe(z.string().min(2, "Name is required")),
  phone,
  email: z
    .union([z.literal(""), z.email("Enter a valid email address")])
    .optional(),
  subject: safeText(120).pipe(z.string().min(3, "Subject is required")),
  message: safeText(1500).pipe(
    z.string().min(10, "Please add a little more detail"),
  ),
});

export const loginSchema = z.object({ password: z.string().min(8).max(200) });
