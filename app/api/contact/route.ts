import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { contactSchema } from "@/lib/validation";
import { isSameOrigin, rateLimit, requestIp } from "@/lib/rate-limit";

export async function POST(request: Request) {
  if (!isSameOrigin(request))
    return NextResponse.json(
      { message: "Request origin is not allowed." },
      { status: 403 },
    );
  if (!rateLimit(`contact:${requestIp(request)}`, 5, 15 * 60_000).allowed)
    return NextResponse.json(
      { message: "Too many requests. Please try again shortly." },
      { status: 429 },
    );
  try {
    const parsed = contactSchema.safeParse(await request.json());
    if (!parsed.success)
      return NextResponse.json(
        {
          message: "Please review the form.",
          errors: parsed.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    await prisma.contactInquiry.create({
      data: { ...parsed.data, email: parsed.data.email || null },
    });
    return NextResponse.json(
      { message: "Thank you. The clinic will respond as soon as possible." },
      { status: 201 },
    );
  } catch (error) {
    console.error("Contact submission failed", error);
    return NextResponse.json(
      {
        message:
          "We could not send your message. Please contact the clinic by phone.",
      },
      { status: 500 },
    );
  }
}
