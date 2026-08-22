import type { Metadata } from "next";
import { PageHero } from "@/components/ui/page-hero";
import { ReviewsContent } from "@/components/reviews/reviews-content";
import { FinalCta } from "@/components/ui/final-cta";

export const metadata: Metadata = {
  title: "Reviews",
  description:
    "Read approved patient experiences and share feedback with Family Dental Clinic.",
  alternates: { canonical: "/reviews" },
};
export default function ReviewsPage() {
  return (
    <>
      <PageHero
        eyebrow="Patient experiences"
        title="Kind Words, Shared Honestly"
        description="Genuine feedback helps us improve and gives other patients a clearer picture of what to expect."
        compact
      />
      <ReviewsContent />
      <FinalCta />
    </>
  );
}
