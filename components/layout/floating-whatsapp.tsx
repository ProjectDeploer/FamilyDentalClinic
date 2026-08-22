import { MessageCircle } from "lucide-react";
import { whatsappUrl } from "@/config/clinic";

export function FloatingWhatsApp() {
  return (
    <a
      href={whatsappUrl()}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="group fixed bottom-[max(1.2rem,env(safe-area-inset-bottom))] right-4 z-40 grid size-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_14px_35px_rgba(0,0,0,.22)] transition hover:-translate-y-1 sm:bottom-6 sm:right-6"
    >
      <MessageCircle aria-hidden size={25} />
      <span
        role="tooltip"
        className="pointer-events-none absolute right-16 hidden whitespace-nowrap rounded-lg bg-[#0b2e28] px-3 py-2 text-xs font-bold shadow-lg group-hover:block sm:block sm:opacity-0 sm:transition sm:group-hover:opacity-100"
      >
        Chat on WhatsApp
      </span>
    </a>
  );
}
