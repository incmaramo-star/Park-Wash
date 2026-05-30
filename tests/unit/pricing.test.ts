import { describe, expect, it } from "vitest";

import { formatServicePrice } from "@/lib/pricing/format";

describe("formatServicePrice", () => {
  it("formats from prices for Dutch visitors", () => {
    const formatted = formatServicePrice(
      { priceType: "from", priceMin: 135, priceMax: null },
      "nl"
    );

    expect(formatted).toContain("Vanaf");
    expect(formatted).toContain("135");
  });

  it("formats ranges for English visitors", () => {
    const formatted = formatServicePrice(
      { priceType: "range", priceMin: 250, priceMax: 650 },
      "en"
    );

    expect(formatted).toContain("250");
    expect(formatted).toContain("650");
  });

  it("formats on-request prices per locale", () => {
    expect(
      formatServicePrice(
        { priceType: "on_request", priceMin: null, priceMax: null },
        "fr"
      )
    ).toBe("Sur demande");
  });
});
