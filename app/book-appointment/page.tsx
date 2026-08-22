import type { Metadata } from "next";
import {
  CalendarClock,
  CheckCircle2,
  MessageCircle,
  Phone,
} from "lucide-react";
import { AppointmentForm } from "@/components/appointment/appointment-form";
import { clinic, phoneUrl, whatsappUrl } from "@/config/clinic";

export const metadata: Metadata = {
  title: "Book an Appointment",
  description:
    "Request your preferred dental appointment with Family Dental Clinic by Dr Bushra.",
  alternates: { canonical: "/book-appointment" },
};

export default async function BookAppointmentPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>;
}) {
  const service = (await searchParams).service;
  return (
    <section className="min-h-screen bg-[#e6efea] pb-20 pt-[120px] lg:pb-28 lg:pt-[150px]">
      <div className="container-site grid items-start gap-12 lg:grid-cols-[.82fr_1.18fr] lg:gap-20">
        <div className="lg:sticky lg:top-32">
          <span className="eyebrow">Plan your visit</span>
          <h1 className="page-title mt-6">Book an Appointment</h1>
          <p className="body-lg mt-7">
            Share your preferred date and time. The clinic will review
            availability and confirm your appointment through WhatsApp.
          </p>
          <div className="mt-9 grid gap-5 border-y border-[#123f36]/12 py-7 text-sm">
            <a
              href={phoneUrl}
              className="flex items-center gap-3 font-bold text-[#123f36]"
            >
              <span className="grid size-10 place-items-center rounded-full bg-white">
                <Phone size={18} />
              </span>
              {clinic.phone}
            </a>
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 font-bold text-[#123f36]"
            >
              <span className="grid size-10 place-items-center rounded-full bg-white">
                <MessageCircle size={18} />
              </span>
              Chat on WhatsApp
            </a>
          </div>
          <div className="mt-8">
            <h2 className="font-serif text-2xl text-[#0b2e28]">
              What happens next?
            </h2>
            <ol className="mt-5 grid gap-4">
              {[
                "Your request is saved securely.",
                "The clinic checks the preferred schedule.",
                "You receive a WhatsApp confirmation or an alternative time.",
              ].map((item, index) => (
                <li
                  key={item}
                  className="flex gap-3 text-sm leading-6 text-[#52615b]"
                >
                  <span className="grid size-7 shrink-0 place-items-center rounded-full border border-[#123f36]/20 text-xs font-bold text-[#123f36]">
                    {index + 1}
                  </span>
                  {item}
                </li>
              ))}
            </ol>
            <div className="mt-8 flex gap-3 rounded-[18px] bg-white/60 p-4 text-xs leading-5 text-[#66706b]">
              <CalendarClock size={19} className="shrink-0 text-[#c7a76b]" />
              <span>
                A requested time is not confirmed until the clinic responds.
              </span>
            </div>
            <div className="mt-4 flex gap-3 text-xs leading-5 text-[#66706b]">
              <CheckCircle2 size={18} className="shrink-0 text-[#123f36]" />
              <span>Your details are used only to manage your request.</span>
            </div>
          </div>
        </div>
        <AppointmentForm defaultService={service} />
      </div>
    </section>
  );
}
