import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  GraduationCap,
  HeartHandshake,
} from "lucide-react";
import { clinic } from "@/config/clinic";
import { DoctorImage } from "@/components/home/doctor-image";

export function DoctorProfile({ detailed = false }: { detailed?: boolean }) {
  return (
    <section className="section-pad bg-[#e6efea]">
      <div className="container-site grid items-stretch gap-10 lg:grid-cols-[1.02fr_.98fr] lg:gap-16">
        <div className="relative min-h-[480px] overflow-hidden rounded-[32px] bg-[#123f36] sm:min-h-[600px]">
          <DoctorImage />
          <div className="absolute inset-x-5 bottom-5 rounded-[22px] bg-[#f8f5ef]/95 p-5 backdrop-blur sm:inset-x-8 sm:bottom-8 sm:p-6">
            <p className="font-serif text-2xl text-[#0b2e28]">
              {clinic.doctor.name}
            </p>
            <p className="mt-1 text-xs font-bold uppercase tracking-[.15em] text-[#8b7448]">
              {clinic.doctor.title}
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-center py-3 lg:py-10">
          <span className="eyebrow">Meet your dentist</span>
          <h2 className="section-title mt-6">Meet Dr Bushra</h2>
          <p className="body-lg mt-7">{clinic.doctor.bio}</p>
          {detailed && (
            <p className="mt-5 leading-7 text-[#66706b]">
              Every recommendation is made with clear communication, thoughtful
              planning, and respect for your pace. The aim is care that feels
              reassuring from the first conversation onward.
            </p>
          )}
          <div className="my-8 grid gap-4 border-y border-[#123f36]/12 py-7 sm:grid-cols-2">
            <div className="flex gap-3">
              <GraduationCap className="shrink-0 text-[#123f36]" size={21} />
              <div>
                <p className="text-xs font-bold uppercase tracking-[.12em] text-[#123f36]">
                  Qualifications
                </p>
                <p className="mt-2 text-sm leading-6 text-[#66706b]">
                  {clinic.doctor.qualifications}
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <HeartHandshake className="shrink-0 text-[#123f36]" size={21} />
              <div>
                <p className="text-xs font-bold uppercase tracking-[.12em] text-[#123f36]">
                  Areas of care
                </p>
                <p className="mt-2 text-sm leading-6 text-[#66706b]">
                  {clinic.doctor.experience}
                </p>
              </div>
            </div>
          </div>
          <ul className="grid gap-3 text-sm text-[#33433d] sm:grid-cols-2">
            {[
              "Preventive family dentistry",
              "Restorative care",
              "Smile-focused treatments",
              "Patient education",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <BadgeCheck size={17} className="text-[#c7a76b]" />
                {item}
              </li>
            ))}
          </ul>
          <Link href="/book-appointment" className="button-primary mt-9 w-fit">
            Book with Dr Bushra <ArrowRight size={17} />
          </Link>
        </div>
      </div>
    </section>
  );
}
