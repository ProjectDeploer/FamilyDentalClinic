import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";

export const ADMIN_COOKIE = "fdc_admin_session";
const secret = () =>
  new TextEncoder().encode(process.env.ADMIN_SESSION_SECRET ?? "");

export async function createAdminToken() {
  if (
    !process.env.ADMIN_SESSION_SECRET ||
    process.env.ADMIN_SESSION_SECRET.length < 32
  )
    throw new Error("ADMIN_SESSION_SECRET must be at least 32 characters");
  return new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject("clinic-admin")
    .setIssuedAt()
    .setExpirationTime("8h")
    .sign(secret());
}

export async function isAdminAuthenticated() {
  const token = (await cookies()).get(ADMIN_COOKIE)?.value;
  if (!token || !process.env.ADMIN_SESSION_SECRET) return false;
  try {
    const { payload } = await jwtVerify(token, secret());
    return payload.sub === "clinic-admin" && payload.role === "admin";
  } catch {
    return false;
  }
}
