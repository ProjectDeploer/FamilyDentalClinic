"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Check, LoaderCircle, Send } from "lucide-react";
import { contactSchema } from "@/lib/validation";

type Input = z.input<typeof contactSchema>;

export function ContactForm() {
  const [notice, setNotice] = useState("");
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Input>({
    resolver: zodResolver(contactSchema),
    defaultValues: { email: "" },
  });
  const submit = async (values: Input) => {
    setNotice("");
    setSent(false);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await response.json()) as { message?: string };
      setNotice(data.message ?? "Unable to send your message.");
      setSent(response.ok);
      if (response.ok) reset();
    } catch {
      setNotice(
        "Unable to send your message. Please contact us by phone or WhatsApp.",
      );
    }
  };
  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="card bg-white p-6 sm:p-9"
      noValidate
    >
      <div className="mb-8">
        <span className="eyebrow">Send a message</span>
        <h2 className="mt-4 font-serif text-3xl text-[#0b2e28]">
          How can we help?
        </h2>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="field">
          <label htmlFor="contact-name">Name *</label>
          <input
            id="contact-name"
            autoComplete="name"
            className="input"
            {...register("name")}
          />
          {errors.name && <p className="field-error">{errors.name.message}</p>}
        </div>
        <div className="field">
          <label htmlFor="contact-phone">Phone *</label>
          <input
            id="contact-phone"
            type="tel"
            autoComplete="tel"
            placeholder="+92 300 0000000"
            className="input"
            {...register("phone")}
          />
          {errors.phone && (
            <p className="field-error">{errors.phone.message}</p>
          )}
        </div>
        <div className="field sm:col-span-2">
          <label htmlFor="contact-email">
            Email <span className="font-normal text-[#66706b]">(optional)</span>
          </label>
          <input
            id="contact-email"
            type="email"
            autoComplete="email"
            className="input"
            {...register("email")}
          />
          {errors.email && (
            <p className="field-error">{errors.email.message}</p>
          )}
        </div>
        <div className="field sm:col-span-2">
          <label htmlFor="subject">Subject *</label>
          <input id="subject" className="input" {...register("subject")} />
          {errors.subject && (
            <p className="field-error">{errors.subject.message}</p>
          )}
        </div>
        <div className="field sm:col-span-2">
          <label htmlFor="contact-message">Message *</label>
          <textarea
            id="contact-message"
            rows={6}
            className="input"
            {...register("message")}
          />
          {errors.message && (
            <p className="field-error">{errors.message.message}</p>
          )}
        </div>
      </div>
      <button disabled={isSubmitting} className="button-primary mt-7 w-full">
        {isSubmitting ? (
          <>
            <LoaderCircle className="animate-spin" size={17} /> Sending…
          </>
        ) : (
          <>
            <Send size={17} /> Send Message
          </>
        )}
      </button>
      {notice && (
        <p
          role="status"
          className={
            "mt-5 flex items-center justify-center gap-2 rounded-[14px] p-3 text-sm " +
            (sent ? "bg-[#e6efea] text-[#123f36]" : "bg-red-50 text-red-800")
          }
        >
          {sent && <Check size={16} />}
          {notice}
        </p>
      )}
    </form>
  );
}
