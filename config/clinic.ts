export const clinic = {
  name: "Family Dental Clinic",
  brandLine: "By Dr Bushra",
  description:
    "Gentle, modern dental care designed around people, families, and long-term oral health.",
  phone: process.env.NEXT_PUBLIC_CLINIC_PHONE ?? "+92 300 0000000",
  whatsapp: process.env.NEXT_PUBLIC_CLINIC_WHATSAPP ?? "923000000000",
  email: process.env.NEXT_PUBLIC_CLINIC_EMAIL ?? "hello@familydentalclinic.pk",
  address:
    process.env.NEXT_PUBLIC_CLINIC_ADDRESS ??
    "Clinic address to be updated, Pakistan",
  googleMapsUrl:
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_URL ??
    "https://www.google.com/maps?q=Pakistan&output=embed",
  openingHours:
    process.env.NEXT_PUBLIC_OPENING_HOURS ?? "Mon–Sat: 10:00 AM–8:00 PM",
  doctor: {
    name: "Dr Bushra",
    title: process.env.NEXT_PUBLIC_DOCTOR_TITLE ?? "Dental Surgeon",
    qualifications:
      process.env.NEXT_PUBLIC_DOCTOR_QUALIFICATIONS ??
      "Professional qualifications available on request",
    experience:
      process.env.NEXT_PUBLIC_DOCTOR_EXPERIENCE ??
      "Patient-focused general and aesthetic dental care",
    bio: "Dr Bushra believes thoughtful dentistry begins with listening. Her approach combines careful assessment, clear explanations, and treatment plans shaped around each patient’s comfort and long-term wellbeing.",
    image: "/images/team/dr-bushra.webp",
  },
} as const;

export const whatsappUrl = (
  message = "Hello, I would like to book an appointment.",
) =>
  `https://wa.me/${clinic.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;

export const phoneUrl = `tel:${clinic.phone.replace(/[^+\d]/g, "")}`;
