import type { Metadata } from "next";
import { AppointmentStrip } from "@/components/home/appointment-strip";
import { DoctorProfile } from "@/components/home/doctor-profile";
import { FeaturedTreatments } from "@/components/home/featured-treatments";
import { Hero } from "@/components/home/hero";
import { ReviewsPreview } from "@/components/home/reviews-preview";
import { ServicesPreview } from "@/components/home/services-preview";
import { WhyUs } from "@/components/home/why-us";
import { FinalCta } from "@/components/ui/final-cta";

export const metadata: Metadata = {
  title: "Family Dental Clinic by Dr Bushra",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <AppointmentStrip />
      <FeaturedTreatments />
      <ServicesPreview />
      <WhyUs />
      <DoctorProfile />
      <ReviewsPreview />
      <FinalCta />
    </>
  );
}
