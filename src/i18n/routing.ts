import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["nl", "fr", "en"],
  defaultLocale: "nl"
});

export type AppLocale = (typeof routing.locales)[number];
