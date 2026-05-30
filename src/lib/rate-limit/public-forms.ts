import "server-only";

import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { headers } from "next/headers";

import {
  buildPublicFormRateLimitIdentifiers,
  checkPublicFormRateLimitCore,
  publicFormRateLimitSettings,
  type PublicFormRateLimitResult,
  type PublicFormRateLimitScope,
} from "./public-forms-core";

type PublicFormRateLimitInput = {
  scope: PublicFormRateLimitScope;
  email?: string | null;
  phone?: string | null;
};

let cachedLimiter:
  | {
      cacheKey: string;
      limiter: Ratelimit;
    }
  | undefined;

export async function checkPublicFormRateLimit({
  scope,
  email,
  phone,
}: PublicFormRateLimitInput): Promise<PublicFormRateLimitResult> {
  const requestHeaders = await headers();
  const env = readPublicFormRateLimitEnv();
  const identifiers = buildPublicFormRateLimitIdentifiers({
    scope,
    ipAddress: readClientIpAddress(requestHeaders),
    email,
    phone,
  });
  const limiter = createPublicFormRateLimiter(env);
  const result = await checkPublicFormRateLimitCore({
    env,
    identifiers,
    limiter,
  });

  if (!result.allowed) {
    console.error("Public form rate-limit check denied submission", {
      scope,
      reason: result.reason,
    });
  }

  return result;
}

function createPublicFormRateLimiter(
  env: ReturnType<typeof readPublicFormRateLimitEnv>,
) {
  if (!env.upstashRedisRestUrl || !env.upstashRedisRestToken) {
    return undefined;
  }

  const cacheKey = `${env.upstashRedisRestUrl}:${env.upstashRedisRestToken}`;

  if (cachedLimiter?.cacheKey === cacheKey) {
    return cachedLimiter.limiter;
  }

  const redis = new Redis({
    url: env.upstashRedisRestUrl,
    token: env.upstashRedisRestToken,
  });
  const limiter = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(
      publicFormRateLimitSettings.requests,
      publicFormRateLimitSettings.window,
    ),
    prefix: publicFormRateLimitSettings.prefix,
    analytics: false,
  });

  cachedLimiter = { cacheKey, limiter };

  return limiter;
}

function readPublicFormRateLimitEnv() {
  return {
    nodeEnv: process.env.NODE_ENV,
    upstashRedisRestUrl: process.env.UPSTASH_REDIS_REST_URL,
    upstashRedisRestToken: process.env.UPSTASH_REDIS_REST_TOKEN,
  };
}

function readClientIpAddress(requestHeaders: Headers) {
  const forwardedFor = requestHeaders.get("x-forwarded-for");
  const firstForwardedFor = forwardedFor?.split(",")[0]?.trim();

  return (
    firstForwardedFor ||
    requestHeaders.get("x-real-ip") ||
    requestHeaders.get("cf-connecting-ip") ||
    undefined
  );
}
