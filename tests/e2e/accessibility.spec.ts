import { AxeBuilder } from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const publicPreviewRoutes = [
  "/nl",
  "/nl/services",
  "/nl/about",
  "/nl/portfolio",
  "/nl/contact",
];

for (const route of publicPreviewRoutes) {
  test(`${route} has no critical accessibility violations`, async ({
    page,
  }) => {
    await page.goto(route);

    const results = await new AxeBuilder({ page })
      .disableRules(["color-contrast"])
      .analyze();

    const critical = results.violations.filter(
      (violation) => violation.impact === "critical",
    );

    expect(critical).toEqual([]);
  });
}
