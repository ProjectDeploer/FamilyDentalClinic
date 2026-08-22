import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  MessageCircle,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { whatsappUrl } from "@/config/clinic";

export function Hero() {
  return (
    <section className="relative overflow-hidden pb-14 pt-[114px] sm:pt-[130px] lg:min-h-[790px] lg:pb-20 lg:pt-[145px]">
      <div className="absolute inset-x-0 top-0 -z-10 h-[76%] bg-[radial-gradient(circle_at_78%_24%,#e6efea_0,rgba(230,239,234,.75)_20%,transparent_54%)]" />
      <div className="container-site grid items-center gap-12 lg:grid-cols-[.95fr_1.05fr] lg:gap-16">
        <div className="relative z-10">
          <span className="eyebrow">Welcome to Family Dental Clinic</span>
          <h1 className="display-title mt-7">
            Healthy Smiles.
            <br />
            <span className="italic text-[#41665c]">Confident Families.</span>
          </h1>
          <p className="body-lg mt-7 max-w-[580px]">
            Modern dental care with a gentle, patient-focused approach at Family
            Dental Clinic by Dr Bushra.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href="/book-appointment" className="button-primary">
              <CalendarDays size={18} /> Book an Appointment
            </Link>
            <Link href="/services" className="button-secondary">
              Explore Our Services <ArrowRight size={17} />
            </Link>
          </div>
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#123f36]"
          >
            <span className="grid size-8 place-items-center rounded-full bg-[#d8e9df]">
              <MessageCircle size={15} />
            </span>{" "}
            Prefer to chat? Message us on WhatsApp
          </a>
          <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 border-t border-[#123f36]/12 pt-6 text-xs font-bold uppercase tracking-[.09em] text-[#66706b]">
            <span className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-[#c7a76b]" /> Patient-first
              planning
            </span>
            <span className="flex items-center gap-2">
              <Sparkles size={16} className="text-[#c7a76b]" /> Calm modern care
            </span>
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-[650px] lg:mx-0">
          <div className="absolute -left-7 top-12 hidden h-[72%] w-[80%] rounded-[44px] bg-[#e6efea] lg:block" />
          <div className="image-wrap relative ml-auto aspect-[4/5] w-[92%] rounded-[36px] sm:w-[88%] lg:w-[91%]">
            <Image
              src="/images/hero/consultation.png"
              alt="A gentle dental consultation in a warm modern clinic"
              fill
              priority
              sizes="(max-width:1024px) 92vw, 48vw"
              className="image-cover object-cover"
            />
          </div>
          <div className="absolute bottom-5 left-0 max-w-[220px] rounded-[22px] border border-white/70 bg-[#f8f5ef]/95 p-5 shadow-[0_18px_55px_rgba(18,63,54,.15)] backdrop-blur sm:bottom-9 sm:p-6">
            <p className="font-serif text-3xl text-[#123f36]">
              Care that listens.
            </p>
            <p className="mt-2 text-xs leading-5 text-[#66706b]">
              Thoughtful conversations. Clear treatment choices.
            </p>
          </div>
          <div className="absolute -right-2 top-16 size-20 rounded-full border border-[#c7a76b]/55 sm:-right-5" />
        </div>
      </div>
    </section>
  );
}
