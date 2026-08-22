import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { loginSchema } from "@/lib/validation";
import { isSameOrigin, rateLimit, requestIp } from "@/lib/rate-limit";
import { ADMIN_COOKIE, createAdminToken } from "@/lib/auth/session";

export async function POST(request: Request) {
  if (!isSameOrigin(request))
    return NextResponse.json(
      { message: "Request origin is not allowed." },
      { status: 403 },
    );
  if (!rateLimit(`admin-login:${requestIp(request)}`, 5, 15 * 60_000).allowed)
    return NextResponse.json(
      { message: "Too many login attempts. Try again later." },
      { status: 429 },
    );
  try {
    const parsed = loginSchema.safeParse(await request.json());
    const hash = process.env.ADMIN_PASSWORD_HASH;
    if (
      !parsed.success ||
      !hash ||
      !(await bcrypt.compare(parsed.data.password, hash))
    )
      return NextResponse.json(
        { message: "Invalid credentials." },
        { status: 401 },
      );
    const response = NextResponse.json({ ok: true });
    response.cookies.set(ADMIN_COOKIE, await createAdminToken(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 8,
    });
    return response;
  } catch (error) {
    console.error("Admin login failed", error);
    return NextResponse.json(
      { message: "Admin access is not configured." },
      { status: 503 },
    );
  }
}
