import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Service } from "@/config/services";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="group card overflow-hidden bg-white transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(18,63,54,.11)]">
      <Link
        href={`/services/${service.slug}`}
        className="block"
        aria-label={`View ${service.title}`}
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-[#dfe9e4]">
          <Image
            src={service.image}
            alt={service.title}
            fill
            sizes="(max-width:768px) 100vw, (max-width:1024px) 50vw, 33vw"
            className="image-cover object-cover"
          />
        </div>
        <div className="p-6 sm:p-7">
          <div className="flex items-center justify-between">
            <span className="text-[.68rem] font-extrabold uppercase tracking-[.16em] text-[#8b7448]">
              {service.category}
            </span>
            <span className="font-serif text-sm text-[#c7a76b]">
              {service.accent}
            </span>
          </div>
          <h3 className="mt-4 font-serif text-[1.7rem] leading-tight text-[#0b2e28]">
            {service.title}
          </h3>
          <p className="mt-3 min-h-[3.4rem] text-sm leading-6 text-[#66706b]">
            {service.description}
          </p>
          <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#123f36]">
            View Details{" "}
            <ArrowUpRight
              size={16}
              className="transition group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </span>
        </div>
      </Link>
    </article>
  );
}
