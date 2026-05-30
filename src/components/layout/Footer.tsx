import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";

import { Logo } from "./Logo";

type FooterProps = {
  locale: string;
};

export async function Footer({ locale }: FooterProps) {
  const t = await getTranslations({ locale, namespace: "Footer" });

  return (
    <footer className="bg-pw-ink py-12 text-pw-white">
      <div className="shell grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <Logo variant="mono-white" />
          <p className="mt-5 max-w-xl text-sm leading-7 text-pw-blue-100">
            {t("body")}
          </p>
        </div>
        <div className="grid gap-2 text-sm text-pw-blue-100">
          <Link className="focus-ring hover:text-pw-white" href="/contact">
            {t("contact")}
          </Link>
          <span>{t("area")}</span>
          <span>{t("copyright")}</span>
        </div>
      </div>
    </footer>
  );
}
