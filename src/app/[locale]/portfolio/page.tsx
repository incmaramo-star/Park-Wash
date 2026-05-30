import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  ArrowRight,
  Building2,
  CarFront,
  Images,
  Sparkles,
} from "lucide-react";

import { PageIntro } from "@/components/layout/PageIntro";
import { Link } from "@/i18n/navigation";

type Props = {
  params: Promise<{ locale: string }>;
};

const galleryKeys = [
  { key: "interior", Icon: Sparkles },
  { key: "exterior", Icon: CarFront },
  { key: "fleet", Icon: Building2 },
] as const;

export default async function PortfolioPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "PortfolioPage" });

  return (
    <div className="bg-pw-paper">
      <PageIntro
        action={{ href: "/contact", label: t("action") }}
        eyebrow={t("eyebrow")}
        title={t("title")}
        body={t("body")}
      />
      <section className="pb-14 md:pb-18">
        <div className="shell grid gap-5 md:grid-cols-3">
          {galleryKeys.map(({ key, Icon }) => (
            <article
              className="overflow-hidden rounded-md border border-pw-fog bg-pw-white shadow-1"
              key={key}
            >
              <div className="flex aspect-[4/3] items-center justify-center bg-pw-blue-50 p-8">
                <div className="grid place-items-center gap-4 text-center">
                  <span className="inline-flex h-16 w-16 items-center justify-center rounded-md bg-pw-white text-pw-blue-700 shadow-1">
                    <Icon aria-hidden size={30} />
                  </span>
                  <p className="font-mono text-xs font-semibold uppercase text-pw-blue-700">
                    {t(`galleries.${key}.status`)}
                  </p>
                </div>
              </div>
              <div className="p-6">
                <h2 className="font-display text-2xl font-bold text-pw-ink">
                  {t(`galleries.${key}.title`)}
                </h2>
                <p className="mt-3 text-sm leading-7 text-pw-graphite">
                  {t(`galleries.${key}.body`)}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="bg-pw-white py-14 md:py-18">
        <div className="shell grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="font-mono text-xs font-semibold uppercase text-pw-blue-600">
              {t("proof.eyebrow")}
            </p>
            <h2 className="mt-3 font-display text-3xl font-extrabold leading-tight text-pw-ink md:text-4xl">
              {t("proof.title")}
            </h2>
            <p className="mt-4 text-sm leading-7 text-pw-graphite">
              {t("proof.body")}
            </p>
          </div>
          <div className="rounded-md border border-pw-fog bg-pw-paper p-6">
            <Images aria-hidden className="text-pw-blue-700" size={30} />
            <h3 className="mt-4 font-display text-2xl font-bold text-pw-ink">
              {t("proof.cardTitle")}
            </h3>
            <p className="mt-3 text-sm leading-7 text-pw-graphite">
              {t("proof.cardBody")}
            </p>
            <Link
              className="focus-ring mt-6 inline-flex min-h-11 items-center gap-2 rounded-pill bg-pw-blue-600 px-5 py-3 text-sm font-bold text-pw-white"
              href="/contact"
            >
              {t("proof.action")}
              <ArrowRight aria-hidden size={17} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
