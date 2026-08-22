"use client";

import { useEffect, useId, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import type { Service } from "@/config/services";
import { cn } from "@/lib/utils";

type TabKey =
  "overview" | "treatment-process" | "benefits" | "aftercare" | "faqs";
const tabs: { key: TabKey; label: string }[] = [
  { key: "overview", label: "Overview" },
  { key: "treatment-process", label: "Treatment Process" },
  { key: "benefits", label: "Benefits" },
  { key: "aftercare", label: "Aftercare" },
  { key: "faqs", label: "FAQs" },
];

export function ServiceTabs({ service }: { service: Service }) {
  const [active, setActive] = useState<TabKey>("overview");
  const id = useId();
  useEffect(() => {
    queueMicrotask(() => {
      const hash = window.location.hash.slice(1) as TabKey;
      if (tabs.some((tab) => tab.key === hash)) setActive(hash);
    });
  }, []);
  const select = (key: TabKey) => {
    setActive(key);
    history.replaceState(null, "", `#${key}`);
  };
  const onKeyDown = (event: React.KeyboardEvent, index: number) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const next =
      event.key === "Home"
        ? 0
        : event.key === "End"
          ? tabs.length - 1
          : (index + (event.key === "ArrowRight" ? 1 : -1) + tabs.length) %
            tabs.length;
    select(tabs[next].key);
    document.getElementById(`${id}-tab-${tabs[next].key}`)?.focus();
  };
  const simpleContent =
    active === "overview"
      ? service.overview
      : active === "treatment-process"
        ? service.process
        : active === "benefits"
          ? service.benefits
          : service.aftercare;
  return (
    <div className="card overflow-hidden bg-white">
      <div
        role="tablist"
        aria-label={`${service.title} information`}
        className="flex overflow-x-auto border-b border-[#123f36]/12 bg-[#f3f6f3] p-2"
      >
        {tabs.map((tab, index) => (
          <button
            key={tab.key}
            id={`${id}-tab-${tab.key}`}
            role="tab"
            aria-selected={active === tab.key}
            aria-controls={`${id}-panel`}
            tabIndex={active === tab.key ? 0 : -1}
            onClick={() => select(tab.key)}
            onKeyDown={(event) => onKeyDown(event, index)}
            className={cn(
              "min-h-11 shrink-0 rounded-full px-4 text-sm font-bold transition",
              active === tab.key
                ? "bg-[#123f36] text-white shadow"
                : "text-[#66706b] hover:text-[#123f36]",
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div
        id={`${id}-panel`}
        role="tabpanel"
        aria-labelledby={`${id}-tab-${active}`}
        tabIndex={0}
        className="min-h-[320px] p-6 sm:p-9"
      >
        <h2 className="font-serif text-3xl text-[#0b2e28]">
          {tabs.find((tab) => tab.key === active)?.label}
        </h2>
        {active === "faqs" ? (
          <div className="mt-7 divide-y divide-[#123f36]/12">
            {service.faqs.map((faq) => (
              <details key={faq.question} className="group py-5">
                <summary className="cursor-pointer list-none pr-8 font-bold text-[#123f36]">
                  {faq.question}
                  <span className="float-right text-[#c7a76b] group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 max-w-2xl leading-7 text-[#66706b]">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        ) : (
          <div className="mt-7 grid gap-4">
            {simpleContent.map((item, index) => (
              <div
                key={item}
                className="flex gap-4 rounded-[18px] bg-[#f8f5ef] p-5"
              >
                <CheckCircle2
                  className="mt-0.5 shrink-0 text-[#c7a76b]"
                  size={20}
                />
                <div>
                  {active === "treatment-process" && (
                    <span className="mb-1 block text-[.67rem] font-extrabold uppercase tracking-[.14em] text-[#8b7448]">
                      Step {index + 1}
                    </span>
                  )}
                  <p className="leading-7 text-[#495851]">{item}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
