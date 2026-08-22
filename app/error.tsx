"use client";

import { useEffect } from "react";
import { RefreshCw } from "lucide-react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Page error", error);
  }, [error]);
  return (
    <section className="grid min-h-[80vh] place-items-center bg-[#e6efea] px-5 pb-20 pt-32 text-center">
      <div className="max-w-lg">
        <span className="eyebrow">Something went wrong</span>
        <h1 className="mt-6 font-serif text-5xl text-[#0b2e28]">
          Let’s try that again.
        </h1>
        <p className="mt-5 leading-7 text-[#66706b]">
          The page could not be loaded. Your information has not been submitted
          unless you saw a confirmation.
        </p>
        <button onClick={reset} className="button-primary mt-8">
          <RefreshCw size={17} /> Try Again
        </button>
      </div>
    </section>
  );
}
