import Link from "next/link";
import { Clock3, Mail, MapPin, Phone } from "lucide-react";
import { clinic, phoneUrl } from "@/config/clinic";

export function Footer() {
  return (
    <footer className="bg-[#0b2e28] text-white">
      <div className="container-site grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.25fr_.8fr_1fr_1.05fr] lg:py-20">
        <div>
          <div className="font-serif text-3xl">{clinic.name}</div>
          <div className="mt-2 text-xs font-bold uppercase tracking-[.22em] text-[#c7a76b]">
            {clinic.brandLine}
          </div>
          <p className="mt-6 max-w-sm text-[.94rem] leading-7 text-white/65">
            {clinic.description} Thoughtful care, clearly explained.
          </p>
          <Link
            className="mt-7 inline-flex border-b border-[#c7a76b] pb-1 text-sm font-bold"
            href="/book-appointment"
          >
            Plan your visit →
          </Link>
        </div>
        <div>
          <h2 className="text-xs font-extrabold uppercase tracking-[.16em] text-[#c7a76b]">
            Quick links
          </h2>
          <div className="mt-6 grid gap-3 text-sm text-white/70">
            <Link href="/about-us">About Us</Link>
            <Link href="/services">Services</Link>
            <Link href="/reviews">Reviews</Link>
            <Link href="/book-appointment">Book Appointment</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>
        <div>
          <h2 className="text-xs font-extrabold uppercase tracking-[.16em] text-[#c7a76b]">
            Clinic details
          </h2>
          <div className="mt-6 grid gap-5 text-sm leading-6 text-white/70">
            <div className="flex gap-3">
              <MapPin className="mt-1 shrink-0 text-[#c7a76b]" size={16} />
              <span>{clinic.address}</span>
            </div>
            <a className="flex gap-3" href={phoneUrl}>
              <Phone className="shrink-0 text-[#c7a76b]" size={16} />
              {clinic.phone}
            </a>
            <a className="flex gap-3 break-all" href={`mailto:${clinic.email}`}>
              <Mail className="shrink-0 text-[#c7a76b]" size={16} />
              {clinic.email}
            </a>
            <div className="flex gap-3">
              <Clock3 className="shrink-0 text-[#c7a76b]" size={16} />
              {clinic.openingHours}
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-xs font-extrabold uppercase tracking-[.16em] text-[#c7a76b]">
            Our location
          </h2>
          <div className="mt-6 overflow-hidden rounded-[20px] border border-white/10 bg-white/5">
            <iframe
              title="Family Dental Clinic location"
              src={clinic.googleMapsUrl}
              width="100%"
              height="176"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block grayscale-[.6]"
            />
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-site flex flex-col gap-3 py-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {clinic.name}. All rights reserved.
          </p>
          <div className="flex gap-5">
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/terms">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
