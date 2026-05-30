import { describe, expect, it, vi } from "vitest";

import {
  buildPublicFormRateLimitIdentifiers,
  checkPublicFormRateLimitCore,
  type PublicFormRateLimitEnv,
} from "@/lib/rate-limit/public-forms-core";

const configuredProductionEnv: PublicFormRateLimitEnv = {
  nodeEnv: "production",
  upstashRedisRestUrl: "https://example-upstash.upstash.io",
  upstashRedisRestToken: "test-token",
};

describe("public form rate limiting", () => {
  it("allows configured submissions and hashes IP, email and phone identifiers", async () => {
    const identifiers = buildPublicFormRateLimitIdentifiers({
      scope: "contact-lead",
      ipAddress: "203.0.113.9",
      email: "Visitor@Example.com",
      phone: "+32 470 00 00 00",
    });
    const repeatedIdentifiers = buildPublicFormRateLimitIdentifiers({
      scope: "contact-lead",
      ipAddress: "203.0.113.9",
      email: " visitor@example.com ",
      phone: "+32470000000",
    });
    const limiter = {
      limit: vi.fn(async () => ({
        success: true,
        limit: 5,
        remaining: 4,
        reset: 123,
      })),
    };

    const result = await checkPublicFormRateLimitCore({
      env: configuredProductionEnv,
      identifiers,
      limiter,
    });
    const keyText = identifiers.join("|");

    expect(result).toMatchObject({
      allowed: true,
      reason: "allowed",
      limit: 5,
      remaining: 4,
    });
    expect(limiter.limit).toHaveBeenCalledTimes(3);
    expect(identifiers).toEqual(repeatedIdentifiers);
    expect(keyText).not.toContain("203.0.113.9");
    expect(keyText).not.toContain("Visitor@Example.com");
    expect(keyText).not.toContain("visitor@example.com");
    expect(keyText).not.toContain("+32470000000");
  });

  it("blocks submissions when any configured identifier is limited", async () => {
    const identifiers = ["contact-lead:ip:one", "contact-lead:email:two"];
    const limiter = {
      limit: vi
        .fn()
        .mockResolvedValueOnce({ success: true, limit: 5, remaining: 3 })
        .mockResolvedValueOnce({
          success: false,
          limit: 5,
          remaining: 0,
          reset: 456,
        }),
    };

    const result = await checkPublicFormRateLimitCore({
      env: configuredProductionEnv,
      identifiers,
      limiter,
    });

    expect(result).toMatchObject({
      allowed: false,
      reason: "limited",
      limit: 5,
      remaining: 0,
      reset: 456,
    });
    expect(limiter.limit).toHaveBeenCalledTimes(2);
  });

  it("fails closed when production rate-limit configuration is missing", async () => {
    const limiter = {
      limit: vi.fn(async () => ({ success: true })),
    };

    const result = await checkPublicFormRateLimitCore({
      env: { nodeEnv: "production" },
      identifiers: ["contact-lead:anonymous"],
      limiter,
    });

    expect(result).toEqual({ allowed: false, reason: "missing_config" });
    expect(limiter.limit).not.toHaveBeenCalled();
  });

  it("allows local development when Upstash is not configured", async () => {
    const limiter = {
      limit: vi.fn(async () => ({ success: false })),
    };

    const result = await checkPublicFormRateLimitCore({
      env: { nodeEnv: "development" },
      identifiers: ["contact-lead:anonymous"],
      limiter,
    });

    expect(result).toEqual({ allowed: true, reason: "local_fallback" });
    expect(limiter.limit).not.toHaveBeenCalled();
  });
});
