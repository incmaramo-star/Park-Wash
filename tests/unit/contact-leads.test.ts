import { describe, expect, it } from "vitest";

import {
  mapContactLeadFieldErrors,
  parseContactLeadForm,
} from "@/lib/leads/contact";

function buildFormData(overrides: Record<string, string | undefined> = {}) {
  const formData = new FormData();
  const values = {
    locale: "nl",
    name: "  Test Visitor  ",
    email: "VISITOR@example.com",
    phone: "+32470000000",
    customerType: "particular",
    companyName: "",
    message: "I would like a quote for a mobile detailing appointment.",
    privacyConsent: "on",
    ...overrides,
  };

  for (const [key, value] of Object.entries(values)) {
    if (value !== undefined) {
      formData.set(key, value);
    }
  }

  return formData;
}

describe("contact lead form parsing", () => {
  it("trims and accepts a valid consented contact lead", () => {
    const parsed = parseContactLeadForm(buildFormData());

    expect(parsed.success).toBe(true);
    if (parsed.success) {
      expect(parsed.data).toMatchObject({
        locale: "nl",
        name: "Test Visitor",
        email: "VISITOR@example.com",
        phone: "+32470000000",
        customerType: "particular",
        companyName: "",
        privacyConsent: true,
      });
    }
  });

  it("rejects missing consent and invalid contact details", () => {
    const parsed = parseContactLeadForm(
      buildFormData({
        email: "not-an-email",
        message: "short",
        privacyConsent: undefined,
      }),
    );

    expect(parsed.success).toBe(false);
    if (!parsed.success) {
      expect(mapContactLeadFieldErrors(parsed.error.issues)).toMatchObject({
        email: "email",
        message: "tooShort",
        privacyConsent: "consent",
      });
    }
  });
});
