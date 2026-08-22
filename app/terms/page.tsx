import type { Metadata } from "next";
import { PageHero } from "@/components/ui/page-hero";

export const metadata: Metadata = {
  title: "Terms",
  alternates: { canonical: "/terms" },
};
export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Website Terms"
        description="Important information about using this website and its appointment request service."
        compact
      />
      <article className="container-site section-pad prose-premium max-w-3xl">
        <h2 className="font-serif text-3xl text-[#0b2e28]">
          General information
        </h2>
        <p>
          Website content is educational and does not replace an examination,
          diagnosis, or personal medical advice.
        </p>
        <h2 className="mt-10 font-serif text-3xl text-[#0b2e28]">
          Appointment requests
        </h2>
        <p>
          Submitting a preferred date and time does not create a confirmed
          booking. An appointment is confirmed only when the clinic sends a
          confirmation.
        </p>
        <h2 className="mt-10 font-serif text-3xl text-[#0b2e28]">
          Emergencies
        </h2>
        <p>
          Do not use this website for medical emergencies. Contact the
          appropriate emergency service or urgent care provider.
        </p>
        <h2 className="mt-10 font-serif text-3xl text-[#0b2e28]">
          Treatment decisions
        </h2>
        <p>
          Benefits, limitations, alternatives, costs, and risks vary by patient
          and are discussed after a clinical assessment.
        </p>
      </article>
    </>
  );
}
