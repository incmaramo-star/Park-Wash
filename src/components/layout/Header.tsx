import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";

import { LocaleSwitcher } from "./LocaleSwitcher";
import { Logo } from "./Logo";
import { MobileNav } from "./MobileNav";

type HeaderProps = {
  locale: string;
};

export async function Header({ locale }: HeaderProps) {
  const t = await getTranslations({ locale, namespace: "Navigation" });
  const links = [
    { href: "/", label: t("home") },
    { href: "/services", label: t("services") },
    { href: "/about", label: t("about") },
    { href: "/portfolio", label: t("portfolio") },
    { href: "/contact", label: t("contact") }
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-pw-fog bg-pw-white/95 backdrop-blur">
      <div className="shell flex min-h-20 items-center justify-between gap-5">
        <Link aria-label="Park&Wash home" className="focus-ring" href="/">
          <Logo priority />
        </Link>
        <nav
          aria-label={t("primaryLabel")}
          className="hidden items-center gap-6 md:flex"
        >
          {links.map((link) => (
            <Link
              className="focus-ring text-sm font-semibold text-pw-graphite transition hover:text-pw-blue-700"
              href={link.href}
              key={link.href}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <LocaleSwitcher label={t("localeLabel")} />
          <Link
            className="focus-ring inline-flex min-h-11 items-center rounded-pill bg-pw-blue-600 px-5 text-sm font-bold text-pw-white"
            href="/contact"
          >
            {t("quote")}
          </Link>
        </div>
        <MobileNav
          closeLabel={t("closeMenu")}
          ctaLabel={t("quote")}
          links={links}
          localeLabel={t("localeLabel")}
          menuLabel={t("openMenu")}
        />
      </div>
    </header>
  );
}
