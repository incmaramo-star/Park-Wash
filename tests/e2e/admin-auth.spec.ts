import { expect, test } from "@playwright/test";

const adminEmail = process.env.E2E_ADMIN_EMAIL;
const adminPassword = process.env.E2E_ADMIN_PASSWORD;

test.describe("admin auth", () => {
  test.skip(
    !adminEmail || !adminPassword,
    "Set E2E_ADMIN_EMAIL and E2E_ADMIN_PASSWORD to run the admin login happy path."
  );

  test("allowlisted admin can sign in and access the dashboard", async ({
    page
  }) => {
    await page.goto("/admin/login");

    await page.getByLabel("E-mail").fill(adminEmail!);
    await page.getByLabel("Wachtwoord").fill(adminPassword!);
    await page.getByRole("button", { name: "Inloggen" }).click();

    await expect(page).toHaveURL(/\/admin$/);
    await expect(
      page.getByRole("heading", { name: "Contactleads" })
    ).toBeVisible();
    await expect(page.getByText("allowlisted admins")).toBeVisible();
    await expect(page.getByText(adminEmail!)).toBeVisible();
  });
});
