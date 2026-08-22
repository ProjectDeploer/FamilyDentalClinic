"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarDays, Menu, MessageCircle, X } from "lucide-react";
import { useEffect, useState } from "react";
import { clinic, whatsappUrl } from "@/config/clinic";
import { cn } from "@/lib/utils";

const navigation = [
  ["Home", "/"],
  ["About Us", "/about-us"],
  ["Services", "/services"],
  ["Reviews", "/reviews"],
  ["Contact", "/contact"],
] as const;

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    return () => document.body.classList.remove("menu-open");
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled || open
          ? "border-b border-emerald-950/10 bg-[#f8f5ef]/95 shadow-[0_10px_40px_rgba(18,63,54,.06)] backdrop-blur-xl"
          : "bg-transparent",
      )}
    >
      <div className="container-site flex h-[84px] items-center justify-between gap-5 lg:h-[98px]">
        <Link
          href="/"
          className="relative z-50 flex shrink-0 items-center gap-3"
          aria-label={`${clinic.name} home`}
        >
          <span className="grid size-11 place-items-center rounded-full bg-[#123f36] text-lg font-bold text-white">
            FD
          </span>
          <span className="leading-none">
            <span className="block font-serif text-[1.15rem] font-semibold tracking-[-.03em] text-[#0b2e28] sm:text-[1.28rem]">
              {clinic.name}
            </span>
            <span className="mt-1.5 block text-[.61rem] font-extrabold uppercase tracking-[.24em] text-[#7a6b4d]">
              {clinic.brandLine}
            </span>
          </span>
        </Link>

        <nav
          className="hidden items-center gap-7 xl:flex"
          aria-label="Primary navigation"
        >
          {navigation.map(([label, href]) => {
            const active =
              href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative py-3 text-[.82rem] font-bold transition-colors hover:text-[#123f36]",
                  active
                    ? "text-[#123f36] after:absolute after:inset-x-0 after:bottom-1 after:h-px after:bg-[#c7a76b]"
                    : "text-[#66706b]",
                )}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="relative z-50 flex items-center gap-2">
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noreferrer"
            aria-label="Chat on WhatsApp"
            className="hidden size-12 items-center justify-center rounded-full border border-[#123f36]/15 text-[#123f36] transition hover:bg-[#e6efea] sm:flex"
          >
            <MessageCircle size={18} />
          </a>
          <Link
            href="/book-appointment"
            className="button-primary hidden lg:inline-flex"
          >
            <CalendarDays size={17} /> Book an Appointment
          </Link>
          <Link
            href="/book-appointment"
            className="grid size-11 place-items-center rounded-full bg-[#123f36] text-white lg:hidden"
            aria-label="Book an appointment"
          >
            <CalendarDays size={18} />
          </Link>
          <button
            type="button"
            className="grid size-11 place-items-center rounded-full border border-[#123f36]/15 text-[#123f36] xl:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={cn(
          "fixed inset-0 z-40 bg-[#f8f5ef] px-[18px] pb-8 pt-28 transition duration-300 xl:hidden",
          open
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-3 opacity-0",
        )}
      >
        <nav
          className="container-site flex h-full flex-col"
          aria-label="Mobile navigation"
        >
          <div className="border-t border-[#123f36]/12">
            {navigation.map(([label, href], index) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between border-b border-[#123f36]/12 py-5 font-serif text-3xl text-[#0b2e28]"
              >
                <span>{label}</span>
                <span className="font-sans text-xs text-[#c7a76b]">
                  0{index + 1}
                </span>
              </Link>
            ))}
          </div>
          <div className="mt-auto grid gap-3 pt-8 sm:grid-cols-2">
            <Link
              href="/book-appointment"
              onClick={() => setOpen(false)}
              className="button-primary"
            >
              Book an Appointment
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
        </nav>
      </div>
    </header>
  );
}
