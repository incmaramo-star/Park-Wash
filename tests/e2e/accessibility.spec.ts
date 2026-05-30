import { AxeBuilder } from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("home page has no critical accessibility violations", async ({ page }) => {
  await page.goto("/nl");

  const results = await new AxeBuilder({ page })
    .disableRules(["color-contrast"])
    .analyze();

  const critical = results.violations.filter(
    (violation) => violation.impact === "critical"
  );

  expect(critical).toEqual([]);
});
