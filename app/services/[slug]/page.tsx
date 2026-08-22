import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { getService, services } from "@/config/services";
import { ServiceTabs } from "@/components/services/service-tabs";
import { ServiceAppointmentCard } from "@/components/services/service-appointment-card";
import { ServiceCard } from "@/components/services/service-card";
import { FinalCta } from "@/components/ui/final-cta";

export function generateStaticParams() {
  return services.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const service = getService((await params).slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.intro,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: `${service.title} | Family Dental Clinic`,
      description: service.intro,
      images: [service.image],
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const service = getService((await params).slug);
  if (!service) notFound();
  const related = services
    .filter((item) => item.slug !== service.slug)
    .slice(0, 3);
  return (
    <>
      <section className="bg-[#e6efea] pb-16 pt-[118px] lg:pb-24 lg:pt-[150px]">
        <div className="container-site">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-xs font-bold text-[#66706b]"
          >
            <Link href="/">Home</Link>
            <ChevronRight size={13} />
            <Link href="/services">Services</Link>
            <ChevronRight size={13} />
            <span aria-current="page" className="text-[#123f36]">
              {service.title}
            </span>
          </nav>
          <div className="mt-10 grid items-center gap-11 lg:grid-cols-[.9fr_1.1fr] lg:gap-16">
            <div>
              <span className="eyebrow">{service.category}</span>
              <h1 className="page-title mt-6">{service.title}</h1>
              <p className="body-lg mt-7">{service.intro}</p>
              <Link
                href={`/book-appointment?service=${encodeURIComponent(service.title)}`}
                className="button-primary mt-8"
              >
                Book an Appointment
              </Link>
            </div>
            <div className="image-wrap relative aspect-[4/3] min-h-[330px]">
              <Image
                src={service.image}
                alt={service.title}
                fill
                priority
                sizes="(max-width:1024px) 100vw, 55vw"
                className="image-cover object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="section-pad">
        <div className="container-site grid items-start gap-8 lg:grid-cols-[1fr_330px] lg:gap-10">
          <ServiceTabs service={service} />
          <ServiceAppointmentCard service={service.title} />
        </div>
      </section>
      <section className="section-pad bg-[#e6efea]">
        <div className="container-site">
          <span className="eyebrow">Continue exploring</span>
          <h2 className="section-title mt-6">Related Services</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <ServiceCard key={item.slug} service={item} />
            ))}
          </div>
        </div>
      </section>
      <FinalCta />
    </>
  );
}
