import type { Metadata } from "next";
import Link from "next/link";
import {
  CalendarDays,
  Clock3,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { ContactForm } from "@/components/appointment/contact-form";
import { clinic, phoneUrl, whatsappUrl } from "@/config/clinic";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Family Dental Clinic by Dr Bushra by phone, WhatsApp, email, or appointment request.",
  alternates: { canonical: "/contact" },
};

const details = [
  { icon: Phone, title: "Call", value: clinic.phone, href: phoneUrl },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    value: "Chat with the clinic",
    href: whatsappUrl(),
  },
  {
    icon: Mail,
    title: "Email",
    value: clinic.email,
    href: `mailto:${clinic.email}`,
  },
  { icon: Clock3, title: "Opening hours", value: clinic.openingHours },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact the clinic"
        title="Get in Touch"
        description="Questions about a treatment, your visit, or an appointment request? We are here to make the next step clear."
        compact
      />
      <section className="section-pad">
        <div className="container-site grid items-start gap-12 lg:grid-cols-[.85fr_1.15fr] lg:gap-20">
          <div>
            <span className="eyebrow">Clinic information</span>
            <h2 className="section-title mt-6">
              We would love to hear from you
            </h2>
            <div className="mt-9 grid gap-4">
              {details.map(({ icon: Icon, title, value, href }) => {
                const content = (
                  <>
                    <span className="grid size-11 shrink-0 place-items-center rounded-full bg-[#e6efea] text-[#123f36]">
                      <Icon size={19} />
                    </span>
                    <span>
                      <span className="block text-[.67rem] font-extrabold uppercase tracking-[.14em] text-[#8b7448]">
                        {title}
                      </span>
                      <span className="mt-1 block text-sm font-bold leading-6 text-[#123f36]">
                        {value}
                      </span>
                    </span>
                  </>
                );
                return href ? (
                  <a
                    key={title}
                    href={href}
                    target={title === "WhatsApp" ? "_blank" : undefined}
                    rel={title === "WhatsApp" ? "noreferrer" : undefined}
                    className="flex items-center gap-4 rounded-[18px] border border-[#123f36]/10 bg-white/60 p-4"
                  >
                    {content}
                  </a>
                ) : (
                  <div
                    key={title}
                    className="flex items-center gap-4 rounded-[18px] border border-[#123f36]/10 bg-white/60 p-4"
                  >
                    {content}
                  </div>
                );
              })}
            </div>
            <div className="mt-5 flex gap-4 rounded-[18px] border border-[#123f36]/10 bg-white/60 p-4">
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-[#e6efea] text-[#123f36]">
                <MapPin size={19} />
              </span>
              <div>
                <span className="block text-[.67rem] font-extrabold uppercase tracking-[.14em] text-[#8b7448]">
                  Address
                </span>
                <span className="mt-1 block text-sm font-bold leading-6 text-[#123f36]">
                  {clinic.address}
                </span>
              </div>
            </div>
            <Link href="/book-appointment" className="button-primary mt-7">
              <CalendarDays size={17} /> Book an Appointment
            </Link>
          </div>
          <ContactForm />
        </div>
      </section>
      <section className="pb-20 md:pb-28">
        <div className="container-site overflow-hidden rounded-[30px] border border-[#123f36]/10 bg-white p-2 shadow-[0_18px_60px_rgba(18,63,54,.07)]">
          <iframe
            title="Family Dental Clinic location map"
            src={clinic.googleMapsUrl}
            width="100%"
            height="480"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="block rounded-[24px]"
          />
        </div>
      </section>
    </>
  );
}
