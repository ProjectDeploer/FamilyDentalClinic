import type { Metadata } from "next";
import Image from "next/image";
import {
  HeartHandshake,
  MessageCircleMore,
  Microscope,
  Sofa,
} from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { DoctorProfile } from "@/components/home/doctor-profile";
import { FinalCta } from "@/components/ui/final-cta";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about the patient-first approach at Family Dental Clinic by Dr Bushra.",
  alternates: { canonical: "/about-us" },
};

const principles = [
  {
    icon: HeartHandshake,
    title: "Patient First",
    text: "Care begins by understanding what matters to you.",
  },
  {
    icon: MessageCircleMore,
    title: "Clear Communication",
    text: "Options, benefits, risks, and next steps are explained simply.",
  },
  {
    icon: Microscope,
    title: "Modern Dental Care",
    text: "Contemporary methods support careful diagnosis and treatment.",
  },
  {
    icon: Sofa,
    title: "Comfortable Environment",
    text: "A warm, unhurried space designed to help you feel at ease.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Family Dental Clinic"
        title="Caring for Smiles, Caring for Families"
        description="A welcoming clinic where modern dentistry, clear guidance, and thoughtful personal care come together."
        image="/images/hero/consultation.png"
        imageAlt="A patient discussing dental care"
      />
      <section className="section-pad">
        <div className="container-site grid gap-10 lg:grid-cols-2 lg:gap-20">
          <div>
            <span className="eyebrow">Our clinic</span>
            <h2 className="section-title mt-6">
              Dentistry with more room for conversation.
            </h2>
          </div>
          <div className="prose-premium pt-1 lg:pt-12">
            <p>
              Family Dental Clinic was created around a simple belief: people
              make better health decisions when they feel heard, informed, and
              comfortable.
            </p>
            <p>
              From routine care to restorative and cosmetic treatment, every
              visit starts with a considered assessment. We take time to explain
              what we see, what can wait, and what options may help—without
              pressure.
            </p>
            <p>
              Our goal is to build long-term relationships with patients and
              families through honest guidance and dependable care.
            </p>
          </div>
        </div>
      </section>
      <DoctorProfile detailed />
      <section className="section-pad">
        <div className="container-site">
          <div className="mx-auto max-w-3xl text-center">
            <span className="eyebrow">Our approach</span>
            <h2 className="section-title mt-6">
              Care that feels clear from the start
            </h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {principles.map(({ icon: Icon, title, text }, index) => (
              <article key={title} className="card bg-white p-7">
                <div className="flex items-center justify-between">
                  <span className="grid size-11 place-items-center rounded-full bg-[#e6efea] text-[#123f36]">
                    <Icon size={20} strokeWidth={1.6} />
                  </span>
                  <span className="font-serif text-[#c7a76b]">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="mt-7 font-serif text-2xl text-[#0b2e28]">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[#66706b]">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section-pad bg-[#e6efea]">
        <div className="container-site">
          <span className="eyebrow">Clinic gallery</span>
          <h2 className="section-title mt-6">A considered space for care</h2>
          <p className="body-lg mt-5 max-w-2xl">
            The gallery is ready for genuine clinic photography. Current
            editorial images preserve the intended layout until those files are
            supplied.
          </p>
          <div className="mt-12 grid auto-rows-[250px] gap-5 md:grid-cols-2 md:auto-rows-[320px] lg:grid-cols-3">
            <div className="image-wrap relative md:row-span-2">
              <Image
                src="/images/clinic/treatment-room.png"
                alt="Modern dental treatment room"
                fill
                sizes="(max-width:768px) 100vw, 40vw"
                className="image-cover object-cover"
              />
            </div>
            <div className="image-wrap relative lg:col-span-2">
              <Image
                src="/images/hero/consultation.png"
                alt="Friendly dental consultation"
                fill
                sizes="(max-width:768px) 100vw, 60vw"
                className="image-cover object-cover object-[center_44%]"
              />
            </div>
            <div className="image-wrap relative">
              <Image
                src="/images/services/dental-implants.png"
                alt="Dental implant model"
                fill
                sizes="(max-width:768px) 100vw, 30vw"
                className="image-cover object-cover"
              />
            </div>
            <div className="image-wrap relative">
              <Image
                src="/images/services/cosmetic-veneers.png"
                alt="Natural healthy smile"
                fill
                sizes="(max-width:768px) 100vw, 30vw"
                className="image-cover object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      <FinalCta />
    </>
  );
}
