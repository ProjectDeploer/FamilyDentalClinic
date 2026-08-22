import { NextResponse } from "next/server";
import { z } from "zod";
import { isAdminAuthenticated } from "@/lib/auth/session";
import { prisma } from "@/lib/db/prisma";
import { isSameOrigin } from "@/lib/rate-limit";

const schema = z.object({ action: z.enum(["APPROVE", "REJECT"]) });

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!isSameOrigin(request) || !(await isAdminAuthenticated()))
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  const parsed = schema.safeParse(await request.json());
  if (!parsed.success)
    return NextResponse.json({ message: "Invalid action" }, { status: 400 });
  const { id } = await params;
  if (parsed.data.action === "REJECT") {
    await prisma.review.delete({ where: { id } });
    return NextResponse.json({ removed: true });
  }
  const review = await prisma.review.update({
    where: { id },
    data: { approved: true },
  });
  return NextResponse.json({ review });
}
