import { createHash } from "node:crypto";

export type PublicFormRateLimitScope = "contact-lead";

export type PublicFormRateLimitEnv = {
  nodeEnv?: string;
  upstashRedisRestUrl?: string;
  upstashRedisRestToken?: string;
};

export type PublicFormRateLimitIdentifiersInput = {
  scope: PublicFormRateLimitScope;
  ipAddress?: string | null;
  email?: string | null;
  phone?: string | null;
};

export type PublicFormRateLimitResponse = {
  success: boolean;
  limit?: number;
  remaining?: number;
  reset?: number;
};

export type PublicFormRateLimiter = {
  limit: (identifier: string) => Promise<PublicFormRateLimitResponse>;
};

export type PublicFormRateLimitResult =
  | {
      allowed: true;
      reason: "allowed" | "local_fallback";
      limit?: number;
      remaining?: number;
      reset?: number;
    }
  | {
      allowed: false;
      reason: "limited" | "missing_config" | "error";
      limit?: number;
      remaining?: number;
      reset?: number;
    };

export const publicFormRateLimitSettings = {
  prefix: "park-wash:public-form",
  requests: 5,
  window: "10 m",
} as const;

export function hasPublicFormRateLimitConfig(
  env: PublicFormRateLimitEnv,
): boolean {
  return Boolean(env.upstashRedisRestUrl && env.upstashRedisRestToken);
}

export function canUseLocalRateLimitFallback(
  env: PublicFormRateLimitEnv,
): boolean {
  return env.nodeEnv !== "production";
}

export function buildPublicFormRateLimitIdentifiers({
  scope,
  ipAddress,
  email,
  phone,
}: PublicFormRateLimitIdentifiersInput): string[] {
  const identifiers: string[] = [];
  const normalizedIpAddress = normalizeOptionalText(ipAddress)?.toLowerCase();
  const normalizedEmail = normalizeOptionalText(email)?.toLowerCase();
  const normalizedPhone = normalizePhone(phone);

  if (normalizedIpAddress) {
    identifiers.push(formatIdentifier(scope, "ip", normalizedIpAddress));
  }

  if (normalizedEmail) {
    identifiers.push(formatIdentifier(scope, "email", normalizedEmail));
  }

  if (normalizedPhone) {
    identifiers.push(formatIdentifier(scope, "phone", normalizedPhone));
  }

  if (identifiers.length === 0) {
    identifiers.push(`${scope}:anonymous`);
  }

  return identifiers;
}

export async function checkPublicFormRateLimitCore({
  env,
  identifiers,
  limiter,
}: {
  env: PublicFormRateLimitEnv;
  identifiers: string[];
  limiter?: PublicFormRateLimiter;
}): Promise<PublicFormRateLimitResult> {
  if (!hasPublicFormRateLimitConfig(env)) {
    if (canUseLocalRateLimitFallback(env)) {
      return { allowed: true, reason: "local_fallback" };
    }

    return { allowed: false, reason: "missing_config" };
  }

  if (!limiter) {
    return { allowed: false, reason: "error" };
  }

  try {
    const results = await Promise.all(
      identifiers.map((identifier) => limiter.limit(identifier)),
    );
    const limited = results.find((result) => !result.success);

    if (limited) {
      return {
        allowed: false,
        reason: "limited",
        limit: limited.limit,
        remaining: limited.remaining,
        reset: limited.reset,
      };
    }

    return summarizeAllowedResult(results);
  } catch {
    return { allowed: false, reason: "error" };
  }
}

function summarizeAllowedResult(
  results: PublicFormRateLimitResponse[],
): PublicFormRateLimitResult {
  const [first] = results;

  if (!first) {
    return { allowed: true, reason: "allowed" };
  }

  return {
    allowed: true,
    reason: "allowed",
    limit: first.limit,
    remaining: first.remaining,
    reset: first.reset,
  };
}

function formatIdentifier(
  scope: PublicFormRateLimitScope,
  kind: "ip" | "email" | "phone",
  value: string,
): string {
  return `${scope}:${kind}:${hashIdentifierValue(value)}`;
}

function hashIdentifierValue(value: string): string {
  return createHash("sha256").update(value).digest("hex").slice(0, 32);
}

function normalizeOptionalText(value: string | null | undefined) {
  const normalized = value?.trim();
  return normalized ? normalized : undefined;
}

function normalizePhone(value: string | null | undefined) {
  const normalized = normalizeOptionalText(value);

  if (!normalized) {
    return undefined;
  }

  const prefix = normalized.startsWith("+") ? "+" : "";
  const digits = normalized.replace(/\D/g, "");

  return digits ? `${prefix}${digits}` : undefined;
}
