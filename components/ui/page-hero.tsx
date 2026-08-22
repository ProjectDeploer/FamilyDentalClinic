import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type Props = {
  eyebrow: string;
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  compact?: boolean;
};

export function PageHero({
  eyebrow,
  title,
  description,
  image,
  imageAlt = "Family Dental Clinic",
  compact = false,
}: Props) {
  return (
    <section className="relative overflow-hidden bg-[#e6efea] pt-[84px] lg:pt-[98px]">
      <div className="absolute -right-20 top-10 size-80 rounded-full border border-[#123f36]/10" />
      <div
        className={
          "container-site grid items-center gap-12 py-16 md:py-20 " +
          (image ? "lg:grid-cols-[.9fr_1.1fr] lg:py-24" : "min-h-[470px]")
        }
      >
        <div className={compact ? "max-w-3xl" : "max-w-2xl"}>
          <span className="eyebrow">{eyebrow}</span>
          <h1 className="page-title mt-6">{title}</h1>
          <p className="body-lg mt-7 max-w-xl">{description}</p>
          <Link href="/book-appointment" className="button-primary mt-8">
            Book an Appointment <ArrowRight size={17} />
          </Link>
        </div>
        {image && (
          <div className="image-wrap relative aspect-[4/3] min-h-[330px]">
            <Image
              src={image}
              alt={imageAlt}
              fill
              priority
              sizes="(max-width:1024px) 100vw, 55vw"
              className="image-cover"
            />
          </div>
        )}
      </div>
    </section>
  );
}
