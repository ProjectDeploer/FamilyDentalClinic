import type { Metadata } from "next";
import { isAdminAuthenticated } from "@/lib/auth/session";
import { prisma } from "@/lib/db/prisma";
import { AdminLogin } from "@/components/admin/admin-login";
import {
  Dashboard,
  type AdminAppointment,
  type AdminReview,
} from "@/components/admin/dashboard";

export const metadata: Metadata = {
  title: "Clinic Admin",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!(await isAdminAuthenticated())) return <AdminLogin />;
  let appointments: AdminAppointment[] = [];
  let reviews: AdminReview[] = [];
  try {
    const [data, reviewData] = await Promise.all([
      prisma.appointment.findMany({
        orderBy: [{ preferredDate: "asc" }, { preferredTime: "asc" }],
        take: 500,
      }),
      prisma.review.findMany({
        where: { approved: false },
        orderBy: { createdAt: "asc" },
        take: 100,
      }),
    ]);
    appointments = data.map(
      (item) =>
        ({
          ...item,
          preferredDate: item.preferredDate.toISOString(),
          confirmedDate: item.confirmedDate?.toISOString() ?? null,
          createdAt: item.createdAt.toISOString(),
          updatedAt: undefined,
        }) as unknown as AdminAppointment,
    );
    reviews = reviewData.map(
      (review) =>
        ({
          ...review,
          createdAt: review.createdAt.toISOString(),
          updatedAt: undefined,
        }) as unknown as AdminReview,
    );
  } catch (error) {
    console.error("Admin appointment load failed", error);
  }
  return <Dashboard initial={appointments} initialReviews={reviews} />;
}
