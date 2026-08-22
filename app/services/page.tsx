import type { Metadata } from "next";
import { PageHero } from "@/components/ui/page-hero";
import { FinalCta } from "@/components/ui/final-cta";
import { ServiceCard } from "@/components/services/service-card";
import { services } from "@/config/services";

export const metadata: Metadata = {
  title: "Dental Services",
  description:
    "Explore modern restorative, cosmetic, orthodontic, and surgical dental care at Family Dental Clinic.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Dental services"
        title="Our Clinical Expertise"
        description="Considered dental care for everyday health, confident smiles, and long-term wellbeing—always guided by a personal assessment."
        image="/images/clinic/treatment-room.png"
        imageAlt="Modern treatment room"
      />
      <section className="section-pad">
        <div className="container-site">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
          <p className="mx-auto mt-10 max-w-2xl text-center text-xs leading-5 text-[#66706b]">
            Treatment suitability, risks, alternatives, and timelines are
            discussed during your clinical consultation. Website information is
            general and not a diagnosis.
          </p>
        </div>
      </section>
      <FinalCta />
    </>
  );
}
