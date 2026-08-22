"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  ArrowRight,
  CalendarCheck2,
  Check,
  LoaderCircle,
  MessageCircle,
} from "lucide-react";
import { appointmentSchema, serviceOptions } from "@/lib/validation";
import { whatsappUrl } from "@/config/clinic";
import { displayTime } from "@/lib/appointments";

type Input = z.input<typeof appointmentSchema>;
type Success = {
  reference: string;
  name: string;
  service: string;
  preferredDate: string;
  preferredTime: string;
  status: string;
};

export function AppointmentForm({
  defaultService = "General Consultation",
}: {
  defaultService?: string;
}) {
  const [success, setSuccess] = React.useState<Success | null>(null);
  const [serverError, setServerError] = React.useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Input>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      service: serviceOptions.includes(
        defaultService as (typeof serviceOptions)[number],
      )
        ? (defaultService as (typeof serviceOptions)[number])
        : "General Consultation",
      phone: "+92 ",
      consent: false,
      email: "",
      message: "",
    },
  });
  const minDate = new Date().toISOString().slice(0, 10);
  const submit = async (values: Input) => {
    setServerError("");
    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await response.json()) as {
        appointment?: Success;
        message?: string;
        errors?: Record<string, string[]>;
      };
      if (!response.ok || !data.appointment)
        throw new Error(data.message ?? "Unable to submit your request.");
      setSuccess(data.appointment);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      setServerError(
        error instanceof Error
          ? error.message
          : "Unable to submit your request.",
      );
    }
  };

  if (success)
    return (
      <div className="card bg-white p-7 text-center sm:p-10" role="status">
        <div className="mx-auto grid size-16 place-items-center rounded-full bg-[#e6efea] text-[#123f36]">
          <Check size={30} />
        </div>
        <span className="mt-7 block text-[.7rem] font-extrabold uppercase tracking-[.18em] text-[#8b7448]">
          Reference {success.reference}
        </span>
        <h2 className="mt-3 font-serif text-4xl text-[#0b2e28]">
          Appointment Request Received
        </h2>
        <p className="mx-auto mt-5 max-w-lg leading-7 text-[#66706b]">
          We have received your request. You will receive confirmation through
          WhatsApp after the clinic reviews your appointment.
        </p>
        <dl className="mx-auto mt-8 grid max-w-xl gap-0 overflow-hidden rounded-[20px] border border-[#123f36]/12 text-left sm:grid-cols-2">
          {[
            ["Patient", success.name],
            ["Service", success.service],
            [
              "Preferred date",
              new Intl.DateTimeFormat("en-PK", {
                dateStyle: "medium",
                timeZone: "UTC",
              }).format(new Date(`${success.preferredDate}T00:00:00Z`)),
            ],
            ["Preferred time", displayTime(success.preferredTime)],
            ["Status", "Pending Confirmation"],
          ].map(([term, value]) => (
            <div
              key={term}
              className="border-b border-[#123f36]/10 p-4 last:border-0"
            >
              <dt className="text-[.65rem] font-bold uppercase tracking-[.13em] text-[#8b7448]">
                {term}
              </dt>
              <dd className="mt-1 text-sm font-bold text-[#123f36]">{value}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/" className="button-primary">
            Back to Home <ArrowRight size={16} />
          </Link>
          <a
            href={whatsappUrl(
              `Hello, I have submitted appointment ${success.reference}.`,
            )}
            target="_blank"
            rel="noreferrer"
            className="button-secondary"
          >
            <MessageCircle size={17} /> Chat on WhatsApp
          </a>
        </div>
      </div>
    );

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="card bg-white p-6 sm:p-9"
      noValidate
    >
      <div className="mb-8">
        <span className="eyebrow">Appointment request</span>
        <h2 className="mt-4 font-serif text-3xl text-[#0b2e28]">
          Tell us what works for you
        </h2>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="field sm:col-span-2">
          <label htmlFor="name">Full Name *</label>
          <input
            id="name"
            autoComplete="name"
            className="input"
            aria-invalid={!!errors.name}
            {...register("name")}
          />
          {errors.name && (
            <p className="field-error" role="alert">
              {errors.name.message}
            </p>
          )}
        </div>
        <div className="field">
          <label htmlFor="phone">WhatsApp / Mobile Number *</label>
          <input
            id="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="+92 300 0000000"
            className="input"
            aria-invalid={!!errors.phone}
            {...register("phone")}
          />
          <p className="text-[.68rem] text-[#7a8580]">
            Include your international country code.
          </p>
          {errors.phone && (
            <p className="field-error" role="alert">
              {errors.phone.message}
            </p>
          )}
        </div>
        <div className="field">
          <label htmlFor="email">
            Email Address{" "}
            <span className="font-normal text-[#66706b]">(optional)</span>
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            className="input"
            aria-invalid={!!errors.email}
            {...register("email")}
          />
          {errors.email && (
            <p className="field-error" role="alert">
              {errors.email.message}
            </p>
          )}
        </div>
        <div className="field sm:col-span-2">
          <label htmlFor="service">Select Service *</label>
          <select
            id="service"
            className="input"
            aria-invalid={!!errors.service}
            {...register("service")}
          >
            {serviceOptions.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
          {errors.service && (
            <p className="field-error" role="alert">
              {errors.service.message}
            </p>
          )}
        </div>
        <div className="field">
          <label htmlFor="preferredDate">Preferred Date *</label>
          <input
            id="preferredDate"
            type="date"
            min={minDate}
            className="input"
            aria-invalid={!!errors.preferredDate}
            {...register("preferredDate")}
          />
          {errors.preferredDate && (
            <p className="field-error" role="alert">
              {errors.preferredDate.message}
            </p>
          )}
        </div>
        <div className="field">
          <label htmlFor="preferredTime">Preferred Time *</label>
          <input
            id="preferredTime"
            type="time"
            className="input"
            aria-invalid={!!errors.preferredTime}
            {...register("preferredTime")}
          />
          {errors.preferredTime && (
            <p className="field-error" role="alert">
              {errors.preferredTime.message}
            </p>
          )}
        </div>
        <div className="field sm:col-span-2">
          <label htmlFor="message">
            Message{" "}
            <span className="font-normal text-[#66706b]">(optional)</span>
          </label>
          <textarea
            id="message"
            rows={4}
            className="input resize-y"
            {...register("message")}
          />
        </div>
        <label className="sm:col-span-2 flex cursor-pointer items-start gap-3 rounded-[16px] bg-[#e6efea]/60 p-4 text-sm leading-6 text-[#465650]">
          <input
            type="checkbox"
            className="mt-1 size-4 accent-[#123f36]"
            {...register("consent")}
          />
          <span>
            I consent to the clinic using these details to contact me about this
            appointment request. *
          </span>
        </label>
        {errors.consent && (
          <p className="field-error sm:col-span-2" role="alert">
            {errors.consent.message}
          </p>
        )}
      </div>
      {serverError && (
        <p
          className="mt-5 rounded-[14px] bg-red-50 p-4 text-sm text-red-800"
          role="alert"
        >
          {serverError}
        </p>
      )}
      <button
        type="submit"
        disabled={isSubmitting}
        className="button-primary mt-7 w-full disabled:cursor-wait disabled:opacity-70"
      >
        {isSubmitting ? (
          <>
            <LoaderCircle className="animate-spin" size={18} /> Sending request…
          </>
        ) : (
          <>
            <CalendarCheck2 size={18} /> Request Appointment
          </>
        )}
      </button>
      <p className="mt-4 text-center text-xs leading-5 text-[#66706b]">
        Your appointment will be confirmed by the clinic through WhatsApp.
      </p>
    </form>
  );
}

import React from "react";
