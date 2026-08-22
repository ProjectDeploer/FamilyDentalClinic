import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

const treatments = [
  {
    label: "Restorative Dentistry",
    title: "Dental Implants",
    text: "A carefully planned option for replacing missing teeth—designed around stable function, natural appearance, and long-term oral health.",
    benefits: [
      "Stable, natural-feeling support",
      "Individually planned care",
      "Clear staged treatment journey",
    ],
    image: "/images/services/dental-implants.png",
    href: "/services/dental-implants",
  },
  {
    label: "Cosmetic Dentistry",
    title: "Cosmetic Veneers",
    text: "Refine shape, shade, and proportion with a smile plan that respects your features and prioritizes a natural, considered result.",
    benefits: [
      "Custom shape and shade",
      "Conservative planning",
      "A harmonious, natural finish",
    ],
    image: "/images/services/cosmetic-veneers.png",
    href: "/services/cosmetic-veneers",
  },
] as const;

export function FeaturedTreatments() {
  return (
    <section className="section-pad">
      <div className="container-site">
        <div className="max-w-3xl">
          <span className="eyebrow">Signature treatments</span>
          <h2 className="section-title mt-6">
            Modern care, shaped around{" "}
            <span className="italic text-[#41665c]">your life.</span>
          </h2>
        </div>
        <div className="mt-14 grid gap-20 lg:mt-20 lg:gap-28">
          {treatments.map((item, index) => (
            <Reveal key={item.title}>
              <article className="group grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
                <div
                  className={
                    "image-wrap relative aspect-[4/3] min-h-[340px] " +
                    (index % 2 ? "lg:order-2" : "")
                  }
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width:1024px) 100vw, 50vw"
                    className="image-cover object-cover"
                  />
                  <span className="absolute bottom-5 right-5 grid size-14 place-items-center rounded-full bg-[#f8f5ef] font-serif text-[#8b7448]">
                    0{index + 1}
                  </span>
                </div>
                <div className={index % 2 ? "lg:order-1" : ""}>
                  <span className="text-xs font-extrabold uppercase tracking-[.18em] text-[#8b7448]">
                    {item.label}
                  </span>
                  <h3 className="mt-4 font-serif text-[clamp(2.5rem,4vw,4rem)] leading-none tracking-[-.035em] text-[#0b2e28]">
                    {item.title}
                  </h3>
                  <p className="body-lg mt-6">{item.text}</p>
                  <ul className="mt-7 grid gap-3">
                    {item.benefits.map((benefit) => (
                      <li
                        key={benefit}
                        className="flex items-center gap-3 text-sm font-semibold text-[#34443e]"
                      >
                        <span className="grid size-6 place-items-center rounded-full bg-[#e6efea] text-[#123f36]">
                          <Check size={14} />
                        </span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-9 flex flex-wrap gap-3">
                    <Link href={item.href} className="button-secondary">
                      Learn More <ArrowRight size={17} />
                    </Link>
                    <Link
                      href={`/book-appointment?service=${item.title}`}
                      className="button-primary"
                    >
                      Book Appointment
                    </Link>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
