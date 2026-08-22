import Link from "next/link";
import { MessageSquareQuote, Star } from "lucide-react";

export function ReviewsPreview() {
  return (
    <section className="section-pad">
      <div className="container-site">
        <div className="flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="eyebrow">Patient experiences</span>
            <h2 className="section-title mt-6">Patient Voices</h2>
          </div>
          <Link href="/reviews#add-review" className="button-secondary">
            Add a Review
          </Link>
        </div>
        <div className="card mt-12 grid min-h-[300px] place-items-center bg-white p-8 text-center sm:p-12">
          <div className="max-w-xl">
            <div className="mx-auto grid size-14 place-items-center rounded-full bg-[#e6efea] text-[#123f36]">
              <MessageSquareQuote />
            </div>
            <div
              className="mt-5 flex justify-center gap-1 text-[#c7a76b]"
              aria-label="Five stars"
            >
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={17} fill="currentColor" />
              ))}
            </div>
            <h3 className="mt-5 font-serif text-3xl text-[#0b2e28]">
              Real stories belong here.
            </h3>
            <p className="mt-4 leading-7 text-[#66706b]">
              Approved patient experiences will appear once they are received.
              We never publish invented testimonials.
            </p>
            <Link
              href="/reviews"
              className="mt-6 inline-flex text-sm font-bold text-[#123f36]"
            >
              Visit the reviews page →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
