import type { Metadata } from "next";
import { PageHero } from "@/components/ui/page-hero";
import { clinic } from "@/config/clinic";

export const metadata: Metadata = {
  title: "Privacy Policy",
  alternates: { canonical: "/privacy-policy" },
  robots: { index: true, follow: true },
};
export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        description="How Family Dental Clinic handles information shared through this website."
        compact
      />
      <article className="container-site section-pad prose-premium max-w-3xl">
        <h2 className="font-serif text-3xl text-[#0b2e28]">
          Information we collect
        </h2>
        <p>
          When you submit an appointment, review, or contact form, we collect
          the details you provide so the clinic can respond and manage your
          request.
        </p>
        <h2 className="mt-10 font-serif text-3xl text-[#0b2e28]">
          How information is used
        </h2>
        <p>
          Information is used for appointment administration, patient
          communication, service improvement, and legal or security obligations.
          Appointment updates may be sent through WhatsApp when you provide a
          compatible number.
        </p>
        <h2 className="mt-10 font-serif text-3xl text-[#0b2e28]">
          Storage and sharing
        </h2>
        <p>
          We use reasonable technical safeguards. Information is shared only
          with providers needed to operate the service, such as hosting,
          database, and messaging providers, or when required by law.
        </p>
        <h2 className="mt-10 font-serif text-3xl text-[#0b2e28]">
          Your choices
        </h2>
        <p>
          To request access, correction, or deletion of your submitted
          information, contact{" "}
          <a
            className="font-bold text-[#123f36] underline"
            href={`mailto:${clinic.email}`}
          >
            {clinic.email}
          </a>
          . Clinical retention requirements may apply.
        </p>
        <p className="mt-10 text-sm">
          Last updated: August 22, 2026. This policy should be reviewed by local
          counsel before launch.
        </p>
      </article>
    </>
  );
}
