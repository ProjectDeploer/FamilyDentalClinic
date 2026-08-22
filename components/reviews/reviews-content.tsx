"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { LoaderCircle, MessageSquareQuote, Star } from "lucide-react";
import { reviewSchema } from "@/lib/validation";

type Review = {
  id: string;
  name: string;
  service: string;
  rating: number;
  review: string;
  createdAt: string;
};
type Input = z.input<typeof reviewSchema>;

export function ReviewsContent() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Input>({
    resolver: zodResolver(reviewSchema),
    defaultValues: { rating: 5 },
  });
  useEffect(() => {
    fetch("/api/reviews")
      .then((response) => response.json())
      .then((data: { reviews?: Review[] }) => setReviews(data.reviews ?? []))
      .catch(() => setReviews([]))
      .finally(() => setLoading(false));
  }, []);
  const submit = async (values: Input) => {
    setNotice("");
    const response = await fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const data = (await response.json()) as { message?: string };
    setNotice(
      data.message ??
        (response.ok ? "Thank you." : "Unable to submit your review."),
    );
    if (response.ok) reset({ rating: 5, name: "", service: "", review: "" });
  };
  return (
    <>
      <section className="section-pad">
        <div className="container-site">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="eyebrow">Approved experiences</span>
              <h2 className="section-title mt-6">What patients share</h2>
            </div>
            {reviews.length > 0 && (
              <div className="rounded-full bg-white px-5 py-3 text-sm font-bold text-[#123f36]">
                {reviews.length} patient{" "}
                {reviews.length === 1 ? "review" : "reviews"}
              </div>
            )}
          </div>
          {loading ? (
            <div className="mt-12 grid min-h-56 place-items-center">
              <LoaderCircle className="animate-spin text-[#123f36]" />
            </div>
          ) : reviews.length ? (
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {reviews.map((review) => (
                <article
                  key={review.id}
                  className="card flex min-h-[310px] flex-col bg-white p-7"
                >
                  <div
                    className="flex gap-1 text-[#c7a76b]"
                    aria-label={`${review.rating} out of 5 stars`}
                  >
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star
                        key={index}
                        size={16}
                        fill={index < review.rating ? "currentColor" : "none"}
                      />
                    ))}
                  </div>
                  <blockquote className="mt-7 flex-1 font-serif text-[1.35rem] leading-[1.55] text-[#2d3b36]">
                    “{review.review}”
                  </blockquote>
                  <div className="mt-7 border-t border-[#123f36]/10 pt-5">
                    <p className="font-bold text-[#123f36]">{review.name}</p>
                    <p className="mt-1 text-xs text-[#66706b]">
                      {review.service} ·{" "}
                      {new Intl.DateTimeFormat("en-PK", {
                        dateStyle: "medium",
                      }).format(new Date(review.createdAt))}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="card mt-12 grid min-h-[280px] place-items-center bg-white p-8 text-center">
              <div className="max-w-lg">
                <MessageSquareQuote
                  className="mx-auto text-[#c7a76b]"
                  size={36}
                />
                <h3 className="mt-5 font-serif text-3xl text-[#0b2e28]">
                  Be the first to share your experience
                </h3>
                <p className="mt-3 leading-7 text-[#66706b]">
                  Approved, genuine patient reviews will appear here.
                  Submissions are checked before publication.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
      <section
        id="add-review"
        className="section-pad scroll-mt-24 bg-[#e6efea]"
      >
        <div className="container-site grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
          <div>
            <span className="eyebrow">Add a review</span>
            <h2 className="section-title mt-6">Share your experience</h2>
            <p className="body-lg mt-6">
              Your feedback can help other families feel more confident about
              seeking dental care.
            </p>
            <p className="mt-6 text-xs leading-5 text-[#66706b]">
              Reviews are moderated for authenticity and privacy. Please do not
              include sensitive medical details.
            </p>
          </div>
          <form
            onSubmit={handleSubmit(submit)}
            className="card bg-white p-6 sm:p-9"
            noValidate
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="field">
                <label htmlFor="review-name">Patient name *</label>
                <input
                  id="review-name"
                  className="input"
                  {...register("name")}
                />
                {errors.name && (
                  <p className="field-error">{errors.name.message}</p>
                )}
              </div>
              <div className="field">
                <label htmlFor="review-service">Service *</label>
                <input
                  id="review-service"
                  className="input"
                  {...register("service")}
                />
                {errors.service && (
                  <p className="field-error">{errors.service.message}</p>
                )}
              </div>
              <div className="field sm:col-span-2">
                <label htmlFor="rating">Rating *</label>
                <select id="rating" className="input" {...register("rating")}>
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <option key={rating} value={rating}>
                      {rating} {rating === 1 ? "star" : "stars"}
                    </option>
                  ))}
                </select>
              </div>
              <div className="field sm:col-span-2">
                <label htmlFor="review">Review *</label>
                <textarea
                  id="review"
                  rows={6}
                  className="input"
                  {...register("review")}
                />
                {errors.review && (
                  <p className="field-error">{errors.review.message}</p>
                )}
              </div>
            </div>
            <button
              disabled={isSubmitting}
              className="button-primary mt-7 w-full"
            >
              {isSubmitting ? (
                <>
                  <LoaderCircle className="animate-spin" size={17} />{" "}
                  Submitting…
                </>
              ) : (
                "Submit Review"
              )}
            </button>
            {notice && (
              <p
                role="status"
                className="mt-4 text-center text-sm text-[#123f36]"
              >
                {notice}
              </p>
            )}
          </form>
        </div>
      </section>
    </>
  );
}
