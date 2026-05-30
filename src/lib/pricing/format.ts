export type PriceType = "fixed" | "from" | "range" | "on_request";

export type ServicePricing = {
  priceType: PriceType;
  priceMin: number | null;
  priceMax: number | null;
};

const localeMap: Record<string, string> = {
  nl: "nl-BE",
  fr: "fr-BE",
  en: "en-BE"
};

export function formatMoney(value: number, locale: string) {
  return new Intl.NumberFormat(localeMap[locale] ?? "nl-BE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0
  }).format(value);
}

export function formatServicePrice(service: ServicePricing, locale: string) {
  if (service.priceType === "on_request") {
    return locale === "fr"
      ? "Sur demande"
      : locale === "en"
        ? "On request"
        : "Op aanvraag";
  }

  if (service.priceType === "range" && service.priceMin && service.priceMax) {
    return `${formatMoney(service.priceMin, locale)} - ${formatMoney(
      service.priceMax,
      locale
    )}`;
  }

  if (service.priceType === "from" && service.priceMin) {
    const prefix =
      locale === "fr" ? "A partir de" : locale === "en" ? "From" : "Vanaf";
    return `${prefix} ${formatMoney(service.priceMin, locale)}`;
  }

  if (service.priceType === "fixed" && service.priceMin) {
    return formatMoney(service.priceMin, locale);
  }

  return locale === "fr"
    ? "Prix a confirmer"
    : locale === "en"
      ? "Price to confirm"
      : "Prijs te bevestigen";
}
