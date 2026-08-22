import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { whatsappUrl } from "@/config/clinic";

export function AppointmentStrip() {
  return (
    <section className="pb-8">
      <div className="container-site grid items-center gap-7 rounded-[28px] bg-white px-6 py-8 shadow-[0_16px_55px_rgba(18,63,54,.07)] sm:px-9 lg:grid-cols-[1fr_auto] lg:px-12">
        <div>
          <span className="eyebrow">A simple first step</span>
          <h2 className="mt-3 font-serif text-3xl leading-tight text-[#0b2e28] md:text-4xl">
            Ready to take care of your smile?
          </h2>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link href="/book-appointment" className="button-primary">
            Book an Appointment <ArrowRight size={17} />
          </Link>
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noreferrer"
            className="button-secondary"
          >
            <MessageCircle size={18} /> Chat on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
