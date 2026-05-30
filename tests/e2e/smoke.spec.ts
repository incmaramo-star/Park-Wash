import { expect, test } from "@playwright/test";

const previewLocales = {
  nl: {
    bookingTitle: "Online boeken is nog niet actief.",
    quoteLabel: "Offerte aanvragen",
  },
  fr: {
    bookingTitle: "La reservation en ligne n'est pas encore active.",
    quoteLabel: "Demander un devis",
  },
  en: {
    bookingTitle: "Online booking is not active yet.",
    quoteLabel: "Request a quote",
  },
};

const privacyLabels = {
  nl: {
    consent: "Lees ons privacybeleid",
    footer: "Privacybeleid",
    heading: "Privacybeleid",
  },
  fr: {
    consent: "Lire notre politique de confidentialite",
    footer: "Politique de confidentialite",
    heading: "Politique de confidentialite",
  },
  en: {
    consent: "Read our privacy policy",
    footer: "Privacy policy",
    heading: "Privacy policy",
  },
};

const publicPreviewCopy = {
  nl: {
    aboutHeading:
      "Mobiele reiniging uit Melle, gebouwd op vertrouwen en precisie.",
    businessService: "Bedrijven en vloten",
    contactHeading: "Contact is nu het startpunt voor elke aanvraag.",
    contactPanel: "Een helder contactpunt zonder fake submit.",
    footerContact: "Contact",
    portfolioHeading: "Before en after beelden krijgen hier een sterke plek.",
    serviceHeading: "Kies je dienst en vraag een offerte of contactmoment aan.",
    servicePanel: "Voor je eigen wagen",
    value: "Sleutelvertrouwen",
  },
  fr: {
    aboutHeading:
      "Detailing mobile depuis Melle, base sur confiance et precision.",
    businessService: "Entreprises et flottes",
    contactHeading:
      "Le contact est maintenant le point de depart de chaque demande.",
    contactPanel: "Un contact clair sans faux envoi.",
    footerContact: "Contact",
    portfolioHeading: "Les avant/apres auront ici une place forte.",
    serviceHeading: "Choisissez un service et demandez un devis ou un contact.",
    servicePanel: "Pour votre voiture",
    value: "Confiance avec la cle",
  },
  en: {
    aboutHeading: "Mobile detailing from Melle, built on trust and precision.",
    businessService: "Businesses and fleets",
    contactHeading:
      "Contact is the starting point for every request right now.",
    contactPanel: "A clear contact point without fake submit.",
    footerContact: "Contact",
    portfolioHeading: "Before and after work will get a strong place here.",
    serviceHeading: "Choose a service and request a quote or callback.",
    servicePanel: "For your own car",
    value: "Key-level trust",
  },
};

for (const locale of ["nl", "fr", "en"] as const) {
  test(`home page loads for ${locale}`, async ({ page }) => {
    await page.goto(`/${locale}`);
    await expect(
      page.getByRole("link", { name: /Park&Wash home/i }),
    ).toBeVisible();
    await expect(page.getByRole("main")).toContainText(/Park&Wash|showroom/i);
  });

  test(`preview CTAs avoid fake booking for ${locale}`, async ({ page }) => {
    const { bookingTitle, quoteLabel } = previewLocales[locale];

    await page.goto(`/${locale}`);

    const quoteCta = page.getByRole("banner").getByRole("link", {
      name: quoteLabel,
    });

    await expect(quoteCta).toHaveAttribute(
      "href",
      new RegExp(`/${locale}/contact$`),
    );
    await expect(
      page.getByRole("banner").locator(`a[href$="/${locale}/booking"]`),
    ).toHaveCount(0);

    await page.goto(`/${locale}/booking`);

    await expect(
      page.getByRole("heading", { name: bookingTitle }),
    ).toBeVisible();
    await expect(
      page.getByRole("main").getByRole("link", { name: quoteLabel }),
    ).toHaveAttribute("href", new RegExp(`/${locale}/contact$`));
  });

  test(`privacy policy links are wired for ${locale}`, async ({ page }) => {
    await page.goto(`/${locale}/contact`);
    await expect(
      page.getByRole("main").getByRole("link", {
        name: privacyLabels[locale].consent,
      }),
    ).toHaveAttribute("href", new RegExp(`/${locale}/privacy-policy$`));

    await page.goto(`/${locale}/booking`);
    await expect(
      page.getByRole("main").getByRole("link", {
        name: privacyLabels[locale].consent,
      }),
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
        name: privacyLabels[locale].heading,
      }),
    ).toBeVisible();
  });

  test(`public preview routes are coherent for ${locale}`, async ({ page }) => {
    const copy = publicPreviewCopy[locale];

    await page.goto(`/${locale}/services`);
    await expect(
      page.getByRole("heading", { level: 1, name: copy.serviceHeading }),
    ).toBeVisible();
    await expect(page.getByText(copy.servicePanel)).toBeVisible();
    await expect(page.getByText("Basic detail").first()).toBeVisible();
    await expect(
      page.getByRole("heading", {
        exact: true,
        name: copy.businessService,
      }),
    ).toBeVisible();
    await expect(page.getByText(/135/).first()).toBeVisible();

    await page.goto(`/${locale}/about`);
    await expect(
      page.getByRole("heading", { level: 1, name: copy.aboutHeading }),
    ).toBeVisible();
    await expect(page.getByText(copy.value)).toBeVisible();

    await page.goto(`/${locale}/portfolio`);
    await expect(
      page.getByRole("heading", { level: 1, name: copy.portfolioHeading }),
    ).toBeVisible();
    await expect(
      page.getByText(/Images coming|Images a venir|Beelden volgen/),
    ).toHaveCount(3);

    await page.goto(`/${locale}/contact`);
    await expect(
      page.getByRole("heading", { level: 1, name: copy.contactHeading }),
    ).toBeVisible();
    await expect(page.getByText(copy.contactPanel)).toBeVisible();

    await expect(
      page.locator("footer").getByRole("link", { name: copy.footerContact }),
    ).toHaveAttribute("href", new RegExp(`/${locale}/contact$`));
  });
}

test("mobile navigation opens and routes to contact", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/nl");

  await page.getByRole("button", { name: "Menu openen" }).click();
  const menu = page.getByRole("navigation", { name: "Menu openen" });

  await expect(
    menu.getByRole("link", { exact: true, name: "Diensten" }),
  ).toBeVisible();

  await menu.getByRole("link", { exact: true, name: "Contact" }).click();

  await expect(page).toHaveURL(/\/nl\/contact$/);
  await expect(
    page.getByRole("heading", {
      name: "Contact is nu het startpunt voor elke aanvraag.",
    }),
  ).toBeVisible();
});

test("anonymous admin access redirects to login", async ({ page }) => {
  await page.goto("/admin");

  await expect(page).toHaveURL(/\/admin\/login$/);
  await expect(page.getByRole("heading", { name: "Inloggen" })).toBeVisible();
});
