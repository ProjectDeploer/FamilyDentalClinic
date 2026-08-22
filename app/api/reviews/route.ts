import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { reviewSchema } from "@/lib/validation";
import { isSameOrigin, rateLimit, requestIp } from "@/lib/rate-limit";

export async function GET() {
  try {
    const reviews = await prisma.review.findMany({
      where: { approved: true },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        service: true,
        rating: true,
        review: true,
        createdAt: true,
      },
    });
    return NextResponse.json({ reviews });
  } catch {
    return NextResponse.json({ reviews: [] });
  }
}

export async function POST(request: Request) {
  if (!isSameOrigin(request))
    return NextResponse.json(
      { message: "Request origin is not allowed." },
      { status: 403 },
    );
  if (!rateLimit(`review:${requestIp(request)}`, 3, 60 * 60_000).allowed)
    return NextResponse.json(
      { message: "Please wait before submitting another review." },
      { status: 429 },
    );
  try {
    const parsed = reviewSchema.safeParse(await request.json());
    if (!parsed.success)
      return NextResponse.json(
        {
          message: "Please review the form.",
          errors: parsed.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    await prisma.review.create({ data: parsed.data });
    return NextResponse.json(
      { message: "Thank you. Your review will appear after approval." },
      { status: 201 },
    );
  } catch (error) {
    console.error("Review submission failed", error);
    return NextResponse.json(
      { message: "We could not submit your review right now." },
      { status: 500 },
    );
  }
}
