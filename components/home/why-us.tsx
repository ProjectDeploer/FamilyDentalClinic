import Image from "next/image";
import {
  HeartHandshake,
  MessageSquareText,
  Microscope,
  UsersRound,
} from "lucide-react";

const benefits = [
  {
    icon: HeartHandshake,
    title: "Personalized Care",
    text: "Treatment planning centered around your dental needs, priorities, and pace.",
  },
  {
    icon: MessageSquareText,
    title: "Clear Communication",
    text: "Understand your options and next steps before making decisions.",
  },
  {
    icon: Microscope,
    title: "Modern Dentistry",
    text: "Contemporary techniques and equipment used with careful clinical judgment.",
  },
  {
    icon: UsersRound,
    title: "Family-Focused Care",
    text: "A welcoming approach for different needs and stages of life.",
  },
];

export function WhyUs() {
  return (
    <section className="section-pad">
      <div className="container-site grid items-center gap-12 lg:grid-cols-[.9fr_1.1fr] lg:gap-20">
        <div className="image-wrap relative aspect-[4/5] min-h-[520px]">
          <Image
            src="/images/clinic/treatment-room.png"
            alt="Calm modern treatment room"
            fill
            sizes="(max-width:1024px) 100vw, 45vw"
            className="image-cover object-cover"
          />
          <div className="absolute inset-x-5 bottom-5 rounded-[22px] bg-[#123f36] p-6 text-white sm:inset-x-8">
            <p className="font-serif text-2xl">
              A calmer kind of dental visit.
            </p>
            <p className="mt-2 text-sm leading-6 text-white/65">
              Thoughtful details, unrushed care, and space to ask questions.
            </p>
          </div>
        </div>
        <div>
          <span className="eyebrow">Why choose us</span>
          <h2 className="section-title mt-6">
            Dental Care Designed Around You
          </h2>
          <p className="body-lg mt-7 max-w-2xl">
            Clinical care should feel personal. We combine careful planning with
            a warm environment that helps families feel informed and at ease.
          </p>
          <div className="mt-10 grid gap-x-8 gap-y-9 sm:grid-cols-2">
            {benefits.map(({ icon: Icon, title, text }) => (
              <div key={title} className="border-t border-[#123f36]/15 pt-6">
                <Icon size={24} strokeWidth={1.5} className="text-[#123f36]" />
                <h3 className="mt-4 font-serif text-2xl text-[#0b2e28]">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-[#66706b]">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
