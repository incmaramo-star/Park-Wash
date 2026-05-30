"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";

import { Link } from "@/i18n/navigation";

import { LocaleSwitcher } from "./LocaleSwitcher";

type MobileNavProps = {
  links: Array<{ href: string; label: string }>;
  closeLabel: string;
  ctaLabel: string;
  localeLabel: string;
  menuLabel: string;
};

export function MobileNav({
  links,
  closeLabel,
  ctaLabel,
  localeLabel,
  menuLabel
}: MobileNavProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        aria-expanded={open}
        aria-label={open ? closeLabel : menuLabel}
        className="focus-ring inline-flex min-h-11 min-w-11 items-center justify-center rounded-md border border-pw-fog bg-pw-white text-pw-ink"
        onClick={() => setOpen((value) => !value)}
        type="button"
      >
        {open ? <X aria-hidden size={22} /> : <Menu aria-hidden size={22} />}
      </button>
      {open ? (
        <div className="fixed inset-x-0 top-20 z-50 min-h-[calc(100dvh-80px)] border-t border-pw-fog bg-pw-white px-6 py-6 shadow-3">
          <nav aria-label={menuLabel} className="grid gap-2">
            {links.map((link) => (
              <Link
                className="focus-ring rounded-md px-2 py-4 font-display text-2xl font-bold text-pw-ink"
                href={link.href}
                key={link.href}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-8 grid gap-5 border-t border-pw-fog pt-6">
            <LocaleSwitcher label={localeLabel} />
            <Link
              className="focus-ring inline-flex min-h-11 items-center justify-center rounded-pill bg-pw-blue-600 px-5 text-sm font-bold text-pw-white"
              href="/contact"
              onClick={() => setOpen(false)}
            >
              {ctaLabel}
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}
