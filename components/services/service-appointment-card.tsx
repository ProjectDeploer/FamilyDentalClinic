import Link from "next/link";
import { CalendarDays, MessageCircle, Phone } from "lucide-react";
import { clinic, phoneUrl, whatsappUrl } from "@/config/clinic";

export function ServiceAppointmentCard({ service }: { service: string }) {
  return (
    <aside className="card top-28 bg-[#123f36] p-7 text-white lg:sticky">
      <span className="text-[.7rem] font-bold uppercase tracking-[.17em] text-[#c7a76b]">
        Your consultation
      </span>
      <h2 className="mt-4 font-serif text-3xl leading-tight">
        Interested in this treatment?
      </h2>
      <p className="mt-4 text-sm leading-6 text-white/65">
        Start with an assessment and a clear conversation about your options.
      </p>
      <div className="mt-7 grid gap-3">
        <Link
          href={`/book-appointment?service=${encodeURIComponent(service)}`}
          className="button-light"
        >
          <CalendarDays size={17} /> Book Appointment
        </Link>
        <a
          href={whatsappUrl(`Hello, I would like to ask about ${service}.`)}
          target="_blank"
          rel="noreferrer"
          className="button-secondary !border-white/25 !text-white"
        >
          <MessageCircle size={17} /> WhatsApp
        </a>
        <a
          href={phoneUrl}
          className="flex min-h-12 items-center justify-center gap-2 text-sm font-bold text-white/75"
        >
          <Phone size={16} /> {clinic.phone}
        </a>
      </div>
      <p className="mt-6 border-t border-white/12 pt-5 text-xs leading-5 text-white/45">
        Requested appointment times remain pending until confirmed by the
        clinic.
      </p>
    </aside>
  );
}
