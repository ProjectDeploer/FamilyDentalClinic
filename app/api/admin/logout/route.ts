import { NextResponse } from "next/server";
import { ADMIN_COOKIE } from "@/lib/auth/session";
import { isSameOrigin } from "@/lib/rate-limit";

export async function POST(request: Request) {
  if (!isSameOrigin(request))
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE, "", {
    httpOnly: true,
    expires: new Date(0),
    path: "/",
  });
  return response;
}
