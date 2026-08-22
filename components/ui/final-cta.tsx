import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { whatsappUrl } from "@/config/clinic";

export function FinalCta() {
  return (
    <section className="bg-[#f8f5ef] py-12 md:py-16">
      <div className="container-site relative overflow-hidden rounded-[32px] bg-[#123f36] px-6 py-16 text-center text-white sm:px-12 md:rounded-[42px] md:py-24">
        <div className="absolute -left-24 -top-32 size-80 rounded-full border border-white/10" />
        <div className="absolute -bottom-40 -right-20 size-96 rounded-full border border-[#c7a76b]/30" />
        <div className="relative mx-auto max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-[.2em] text-[#c7a76b]">
            Your next step
          </span>
          <h2 className="mt-5 font-serif text-[clamp(2.6rem,5vw,4.7rem)] leading-[1.03] tracking-[-.04em]">
            Your Healthier Smile Starts Here
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-white/70">
            Schedule your visit with Family Dental Clinic by Dr Bushra.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/book-appointment" className="button-light">
              Book an Appointment <ArrowRight size={17} />
            </Link>
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noreferrer"
              className="button-secondary !border-white/30 !text-white"
            >
              <MessageCircle size={18} /> Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
