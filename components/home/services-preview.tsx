import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services } from "@/config/services";
import { ServiceCard } from "@/components/services/service-card";
import { Reveal } from "@/components/ui/reveal";

export function ServicesPreview() {
  return (
    <section className="section-pad bg-[#e6efea]">
      <div className="container-site">
        <div className="flex flex-col items-start justify-between gap-7 md:flex-row md:items-end">
          <div className="max-w-3xl">
            <span className="eyebrow">Our services</span>
            <h2 className="section-title mt-6">
              Complete Dental Care for Every Smile
            </h2>
          </div>
          <Link href="/services" className="button-secondary shrink-0">
            View All Services <ArrowRight size={17} />
          </Link>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {services.map((service, index) => (
            <Reveal key={service.slug} delay={(index % 3) * 0.07}>
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
