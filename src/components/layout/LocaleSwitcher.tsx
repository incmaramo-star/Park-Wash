"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

type LocaleSwitcherProps = {
  label: string;
};

export function LocaleSwitcher({ label }: LocaleSwitcherProps) {
  const pathname = usePathname();

  return (
    <div aria-label={label} className="flex items-center gap-1">
      {routing.locales.map((locale) => (
        <Link
          className="focus-ring inline-flex min-h-11 min-w-11 items-center justify-center rounded-pill px-3 font-mono text-xs font-bold uppercase text-pw-slate transition hover:bg-pw-blue-100 hover:text-pw-blue-700"
          href={pathname}
          key={locale}
          locale={locale}
        >
          {locale}
        </Link>
      ))}
    </div>
  );
}
