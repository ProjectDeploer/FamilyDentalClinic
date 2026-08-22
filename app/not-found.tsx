import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";

export default function NotFound() {
  return (
    <section className="grid min-h-[80vh] place-items-center bg-[#e6efea] px-5 pb-20 pt-32 text-center">
      <div>
        <span className="font-serif text-8xl leading-none text-[#c7a76b]">
          404
        </span>
        <h1 className="mt-5 font-serif text-4xl text-[#0b2e28] sm:text-5xl">
          This page has moved.
        </h1>
        <p className="mx-auto mt-5 max-w-lg leading-7 text-[#66706b]">
          We could not find the page you requested. Explore our services or
          return to the homepage.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/" className="button-primary">
            <ArrowLeft size={17} /> Back to Home
          </Link>
          <Link href="/services" className="button-secondary">
            <Search size={17} /> Explore Services
          </Link>
        </div>
      </div>
    </section>
  );
}
