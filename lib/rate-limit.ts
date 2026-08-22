type Entry = { count: number; resetAt: number };
const store = new Map<string, Entry>();

export function rateLimit(key: string, max = 8, windowMs = 60_000) {
  const now = Date.now();
  const current = store.get(key);
  if (!current || current.resetAt <= now) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: max - 1 };
  }
  if (current.count >= max) return { allowed: false, remaining: 0 };
  current.count += 1;
  return { allowed: true, remaining: max - current.count };
}

export function requestIp(request: Request) {
  return (
    request.headers.get("cf-connecting-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown"
  );
}

export function isSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  const expected = process.env.NEXT_PUBLIC_SITE_URL;
  if (expected) return origin === new URL(expected).origin;
  return origin === new URL(request.url).origin;
}
