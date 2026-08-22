"use client";

import { useMemo, useState } from "react";
import { AppointmentStatus } from "@prisma/client";
import {
  CalendarCheck2,
  Check,
  CircleX,
  Clock3,
  ExternalLink,
  LogOut,
  Search,
  Stethoscope,
} from "lucide-react";
import { displayTime } from "@/lib/appointments";

export type AdminAppointment = {
  reference: string;
  name: string;
  phone: string;
  email: string | null;
  service: string;
  preferredDate: string;
  preferredTime: string;
  message: string | null;
  status: AppointmentStatus;
  confirmedDate: string | null;
  confirmedTime: string | null;
  createdAt: string;
};

export type AdminReview = {
  id: string;
  name: string;
  service: string;
  rating: number;
  review: string;
  createdAt: string;
};

const statusClass: Record<AppointmentStatus, string> = {
  PENDING: "bg-amber-50 text-amber-800",
  CONFIRMED: "bg-emerald-50 text-emerald-800",
  RESCHEDULED: "bg-blue-50 text-blue-800",
  CANCELLED: "bg-red-50 text-red-700",
  COMPLETED: "bg-slate-100 text-slate-700",
};

export function Dashboard({
  initial,
  initialReviews,
}: {
  initial: AdminAppointment[];
  initialReviews: AdminReview[];
}) {
  const [items, setItems] = useState(initial);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");
  const [service, setService] = useState("ALL");
  const [filterDate, setFilterDate] = useState("");
  const [selected, setSelected] = useState<AdminAppointment | null>(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notice, setNotice] = useState("");
  const [pendingReviews, setPendingReviews] = useState(initialReviews);
  const filtered = useMemo(
    () =>
      items.filter(
        (item) =>
          (status === "ALL" || item.status === status) &&
          (service === "ALL" || item.service === service) &&
          (!filterDate ||
            (item.confirmedDate ?? item.preferredDate).slice(0, 10) ===
              filterDate) &&
          `${item.reference} ${item.name} ${item.phone} ${item.service}`
            .toLowerCase()
            .includes(search.toLowerCase()),
      ),
    [filterDate, items, search, service, status],
  );
  const today = new Date().toISOString().slice(0, 10);
  const counts = [
    [
      "Today",
      items.filter((item) => item.preferredDate.slice(0, 10) === today).length,
      CalendarCheck2,
    ],
    [
      "Pending",
      items.filter((item) => item.status === "PENDING").length,
      Clock3,
    ],
    [
      "Confirmed",
      items.filter((item) => item.status === "CONFIRMED").length,
      Check,
    ],
    [
      "Upcoming",
      items.filter(
        (item) =>
          item.preferredDate.slice(0, 10) >= today &&
          !["CANCELLED", "COMPLETED"].includes(item.status),
      ).length,
      Stethoscope,
    ],
    [
      "Cancelled",
      items.filter((item) => item.status === "CANCELLED").length,
      CircleX,
    ],
  ] as const;
  const action = async (
    kind: "CONFIRM" | "RESCHEDULE" | "CANCEL" | "COMPLETE",
  ) => {
    if (!selected) return;
    setNotice("");
    const response = await fetch(
      `/api/admin/appointments/${selected.reference}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: kind,
          date: date || undefined,
          time: time || undefined,
        }),
      },
    );
    const data = (await response.json()) as {
      appointment?: AdminAppointment;
      message?: string;
    };
    if (!response.ok || !data.appointment) {
      setNotice(data.message ?? "Action failed");
      return;
    }
    setItems((all) =>
      all.map((item) =>
        item.reference === data.appointment?.reference
          ? {
              ...data.appointment,
              preferredDate: String(data.appointment.preferredDate),
              confirmedDate: data.appointment.confirmedDate
                ? String(data.appointment.confirmedDate)
                : null,
              createdAt: String(data.appointment.createdAt),
            }
          : item,
      ),
    );
    setSelected(null);
  };
  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.reload();
  };
  const moderateReview = async (id: string, action: "APPROVE" | "REJECT") => {
    const response = await fetch(`/api/admin/reviews/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action }),
    });
    if (response.ok)
      setPendingReviews((reviews) =>
        reviews.filter((review) => review.id !== id),
      );
  };
  return (
    <section className="min-h-screen bg-[#f3f6f3] pb-20 pt-[118px]">
      <div className="container-site">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="eyebrow">Clinic operations</span>
            <h1 className="mt-4 font-serif text-4xl text-[#0b2e28] sm:text-5xl">
              Appointments
            </h1>
          </div>
          <button onClick={logout} className="button-secondary w-fit">
            <LogOut size={16} /> Sign Out
          </button>
        </div>
        <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {counts.map(([label, count, Icon]) => (
            <div key={label} className="card bg-white p-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-[.12em] text-[#66706b]">
                  {label}
                </span>
                <Icon size={18} className="text-[#c7a76b]" />
              </div>
              <strong className="mt-3 block font-serif text-4xl text-[#123f36]">
                {count}
              </strong>
            </div>
          ))}
        </div>
        <div className="card mt-7 overflow-hidden bg-white">
          <div className="grid gap-3 border-b border-[#123f36]/10 p-5 md:grid-cols-[1fr_180px_190px_190px]">
            <label className="relative">
              <span className="sr-only">Search appointments</span>
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#66706b]"
                size={17}
              />
              <input
                className="input pl-11"
                placeholder="Search reference, patient, phone, or service"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </label>
            <select
              aria-label="Filter by status"
              className="input md:w-52"
              value={status}
              onChange={(event) => setStatus(event.target.value)}
            >
              <option value="ALL">All statuses</option>
              {Object.values(AppointmentStatus).map((value) => (
                <option key={value}>{value}</option>
              ))}
            </select>
            <select
              aria-label="Filter by service"
              className="input"
              value={service}
              onChange={(event) => setService(event.target.value)}
            >
              <option value="ALL">All services</option>
              {Array.from(new Set(items.map((item) => item.service))).map(
                (value) => (
                  <option key={value}>{value}</option>
                ),
              )}
            </select>
            <input
              type="date"
              aria-label="Filter by appointment date"
              className="input"
              value={filterDate}
              onChange={(event) => setFilterDate(event.target.value)}
            />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[980px] border-collapse text-left text-sm">
              <thead className="bg-[#f8f5ef]">
                <tr>
                  {[
                    "Reference",
                    "Patient",
                    "Phone",
                    "Service",
                    "Date",
                    "Time",
                    "Status",
                    "Created",
                    "Actions",
                  ].map((heading) => (
                    <th
                      key={heading}
                      className="px-5 py-4 text-[.67rem] font-extrabold uppercase tracking-[.12em] text-[#66706b]"
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((item) => (
                  <tr
                    key={item.reference}
                    className="border-t border-[#123f36]/8"
                  >
                    <td className="px-5 py-4 font-bold text-[#123f36]">
                      {item.reference}
                    </td>
                    <td className="px-5 py-4">{item.name}</td>
                    <td className="px-5 py-4">{item.phone}</td>
                    <td className="px-5 py-4">{item.service}</td>
                    <td className="px-5 py-4">
                      {new Intl.DateTimeFormat("en-PK", {
                        dateStyle: "medium",
                        timeZone: "UTC",
                      }).format(
                        new Date(item.confirmedDate ?? item.preferredDate),
                      )}
                    </td>
                    <td className="px-5 py-4">
                      {displayTime(item.confirmedTime ?? item.preferredTime)}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-[.67rem] font-extrabold ${statusClass[item.status]}`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      {new Intl.DateTimeFormat("en-PK", {
                        dateStyle: "short",
                      }).format(new Date(item.createdAt))}
                    </td>
                    <td className="px-5 py-4">
                      <button
                        onClick={() => {
                          setSelected(item);
                          setDate(
                            (item.confirmedDate ?? item.preferredDate).slice(
                              0,
                              10,
                            ),
                          );
                          setTime(item.confirmedTime ?? item.preferredTime);
                        }}
                        className="font-bold text-[#123f36]"
                      >
                        View / Manage
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {!filtered.length && (
              <div className="p-12 text-center text-[#66706b]">
                No appointments match these filters.
              </div>
            )}
          </div>
        </div>
        <div className="mt-12 flex items-end justify-between gap-4">
          <div>
            <span className="eyebrow">Moderation</span>
            <h2 className="mt-4 font-serif text-3xl text-[#0b2e28]">
              Pending Reviews
            </h2>
          </div>
          <span className="rounded-full bg-white px-4 py-2 text-sm font-bold text-[#123f36]">
            {pendingReviews.length} waiting
          </span>
        </div>
        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          {pendingReviews.map((review) => (
            <article key={review.id} className="card bg-white p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-serif text-2xl text-[#0b2e28]">
                    {review.name}
                  </h3>
                  <p className="mt-1 text-xs text-[#66706b]">
                    {review.service} · {review.rating}/5
                  </p>
                </div>
                <time className="text-xs text-[#66706b]">
                  {new Intl.DateTimeFormat("en-PK", {
                    dateStyle: "medium",
                  }).format(new Date(review.createdAt))}
                </time>
              </div>
              <p className="mt-5 text-sm leading-7 text-[#465650]">
                {review.review}
              </p>
              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => moderateReview(review.id, "APPROVE")}
                  className="button-primary !min-h-11 flex-1"
                >
                  Approve
                </button>
                <button
                  onClick={() => moderateReview(review.id, "REJECT")}
                  className="button-secondary !min-h-11 flex-1 !border-red-200 !text-red-700"
                >
                  Reject
                </button>
              </div>
            </article>
          ))}
          {!pendingReviews.length && (
            <div className="card bg-white p-8 text-center text-sm text-[#66706b] lg:col-span-2">
              No reviews are waiting for approval.
            </div>
          )}
        </div>
      </div>
      {selected && (
        <div
          className="fixed inset-0 z-[70] grid place-items-end bg-black/30 p-0 backdrop-blur-sm sm:place-items-center sm:p-5"
          role="dialog"
          aria-modal="true"
          aria-labelledby="appointment-detail"
        >
          <div className="max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-t-[28px] bg-white p-6 shadow-2xl sm:rounded-[28px] sm:p-8">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold text-[#c7a76b]">
                  {selected.reference}
                </span>
                <h2
                  id="appointment-detail"
                  className="mt-2 font-serif text-3xl text-[#0b2e28]"
                >
                  {selected.name}
                </h2>
              </div>
              <button
                className="grid size-10 place-items-center rounded-full bg-[#f2f4f2]"
                onClick={() => setSelected(null)}
                aria-label="Close details"
              >
                ×
              </button>
            </div>
            <dl className="mt-7 grid gap-4 text-sm sm:grid-cols-2">
              {[
                ["Phone", selected.phone],
                ["Email", selected.email ?? "—"],
                ["Service", selected.service],
                ["Status", selected.status],
                ["Message", selected.message ?? "—"],
              ].map(([term, value]) => (
                <div
                  key={term}
                  className={term === "Message" ? "sm:col-span-2" : ""}
                >
                  <dt className="text-[.65rem] font-bold uppercase tracking-[.12em] text-[#8b7448]">
                    {term}
                  </dt>
                  <dd className="mt-1 leading-6 text-[#33433d]">{value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-7 grid gap-4 rounded-[18px] bg-[#e6efea]/60 p-5 sm:grid-cols-2">
              <div className="field">
                <label htmlFor="reschedule-date">Date</label>
                <input
                  id="reschedule-date"
                  type="date"
                  min={today}
                  className="input"
                  value={date}
                  onChange={(event) => setDate(event.target.value)}
                />
              </div>
              <div className="field">
                <label htmlFor="reschedule-time">Time</label>
                <input
                  id="reschedule-time"
                  type="time"
                  className="input"
                  value={time}
                  onChange={(event) => setTime(event.target.value)}
                />
              </div>
            </div>
            {notice && (
              <p role="alert" className="mt-4 text-sm text-red-700">
                {notice}
              </p>
            )}
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              <button
                onClick={() => action("CONFIRM")}
                className="button-primary"
              >
                Confirm
              </button>
              <button
                onClick={() => action("RESCHEDULE")}
                className="button-secondary"
              >
                Reschedule
              </button>
              <button
                onClick={() => action("COMPLETE")}
                className="button-secondary"
              >
                Mark Complete
              </button>
              <button
                onClick={() => action("CANCEL")}
                className="button-secondary !border-red-200 !text-red-700"
              >
                Cancel
              </button>
            </div>
            <a
              href={`https://wa.me/${selected.phone.replace(/\D/g, "")}`}
              target="_blank"
              rel="noreferrer"
              className="mt-5 flex items-center justify-center gap-2 text-sm font-bold text-[#123f36]"
            >
              Open WhatsApp <ExternalLink size={15} />
            </a>
          </div>
        </div>
      )}
    </section>
  );
}
