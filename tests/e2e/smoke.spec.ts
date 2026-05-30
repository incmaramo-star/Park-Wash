import { expect, test } from "@playwright/test";

const previewLocales = {
  nl: {
    bookingTitle: "Online boeken is nog niet actief.",
    quoteLabel: "Offerte aanvragen"
  },
  fr: {
    bookingTitle: "La reservation en ligne n'est pas encore active.",
    quoteLabel: "Demander un devis"
  },
  en: {
    bookingTitle: "Online booking is not active yet.",
    quoteLabel: "Request a quote"
  }
};

const privacyLabels = {
  nl: {
    consent: "Lees ons privacybeleid",
    footer: "Privacybeleid",
    heading: "Privacybeleid"
  },
  fr: {
    consent: "Lire notre politique de confidentialite",
    footer: "Politique de confidentialite",
    heading: "Politique de confidentialite"
  },
  en: {
    consent: "Read our privacy policy",
    footer: "Privacy policy",
    heading: "Privacy policy"
  }
};

for (const locale of ["nl", "fr", "en"] as const) {
  test(`home page loads for ${locale}`, async ({ page }) => {
    await page.goto(`/${locale}`);
    await expect(
      page.getByRole("link", { name: /Park&Wash home/i })
    ).toBeVisible();
    await expect(page.getByRole("main")).toContainText(/Park&Wash|showroom/i);
  });

  test(`preview CTAs avoid fake booking for ${locale}`, async ({ page }) => {
    const { bookingTitle, quoteLabel } = previewLocales[locale];

    await page.goto(`/${locale}`);

    const quoteCta = page.getByRole("banner").getByRole("link", {
      name: quoteLabel
    });

    await expect(quoteCta).toHaveAttribute(
      "href",
      new RegExp(`/${locale}/contact$`)
    );
    await expect(
      page.getByRole("banner").locator(`a[href$="/${locale}/booking"]`)
    ).toHaveCount(0);

    await page.goto(`/${locale}/booking`);

    await expect(
      page.getByRole("heading", { name: bookingTitle })
    ).toBeVisible();
    await expect(
      page.getByRole("main").getByRole("link", { name: quoteLabel })
    ).toHaveAttribute("href", new RegExp(`/${locale}/contact$`));
  });

  test(`privacy policy links are wired for ${locale}`, async ({ page }) => {
    await page.goto(`/${locale}/contact`);
    await expect(
      page.getByRole("main").getByRole("link", {
        name: privacyLabels[locale].consent
      })
    ).toHaveAttribute("href", new RegExp(`/${locale}/privacy-policy$`));

    await page.goto(`/${locale}/booking`);
    await expect(
      page.getByRole("main").getByRole("link", {
        name: privacyLabels[locale].consent
      })
    ).toHaveAttribute("href", new RegExp(`/${locale}/privacy-policy$`));

    await page.goto(`/${locale}`);
    await page
      .locator("footer")
      .getByRole("link", { name: privacyLabels[locale].footer })
      .click();

    await expect(page).toHaveURL(new RegExp(`/${locale}/privacy-policy$`));
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: privacyLabels[locale].heading
      })
    ).toBeVisible();
  });
}

test("anonymous admin access redirects to login", async ({ page }) => {
  await page.goto("/admin");

  await expect(page).toHaveURL(/\/admin\/login$/);
  await expect(page.getByRole("heading", { name: "Inloggen" })).toBeVisible();
});
