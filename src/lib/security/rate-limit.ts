import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const AUTH_LIMIT = 5;
const AUTH_WINDOW = "1 m";

/** Token bucket: max 5 requests per minute per identifier (IP). */
let upstashLimiter: Ratelimit | null = null;

function getUpstashLimiter(): Ratelimit | null {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  if (!upstashLimiter) {
    const redis = new Redis({ url, token });
    upstashLimiter = new Ratelimit({
      redis,
      limiter: Ratelimit.tokenBucket(AUTH_LIMIT, AUTH_WINDOW, AUTH_LIMIT),
      analytics: true,
      prefix: "binjas:auth",
    });
  }
  return upstashLimiter;
}

/** In-memory fallback for local dev only (not valid across Vercel instances). */
const memoryBuckets = new Map<string, { tokens: number; lastRefill: number }>();
const REFILL_MS = 60_000;

function memoryTokenBucket(identifier: string): {
  success: boolean;
  remaining: number;
} {
  const now = Date.now();
  let bucket = memoryBuckets.get(identifier);
  if (!bucket || now - bucket.lastRefill >= REFILL_MS) {
    bucket = { tokens: AUTH_LIMIT, lastRefill: now };
    memoryBuckets.set(identifier, bucket);
  }
  if (bucket.tokens <= 0) {
    return { success: false, remaining: 0 };
  }
  bucket.tokens -= 1;
  return { success: true, remaining: bucket.tokens };
}

export async function checkAuthRateLimit(identifier: string): Promise<{
  success: boolean;
  remaining: number;
}> {
  const limiter = getUpstashLimiter();
  if (limiter) {
    const result = await limiter.limit(identifier);
    return { success: result.success, remaining: result.remaining };
  }
  if (process.env.NODE_ENV === "production") {
    console.warn(
      "[rate-limit] UPSTASH_* not set in production; using in-memory fallback",
    );
  }
  return memoryTokenBucket(identifier);
}
