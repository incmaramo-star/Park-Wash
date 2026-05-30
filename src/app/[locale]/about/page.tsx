import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  BadgeCheck,
  CarFront,
  ClipboardCheck,
  KeyRound,
  Sparkles,
} from "lucide-react";

import { PageIntro } from "@/components/layout/PageIntro";

type Props = {
  params: Promise<{ locale: string }>;
};

const valueKeys = [
  { key: "trust", Icon: KeyRound },
  { key: "precision", Icon: Sparkles },
  { key: "mobile", Icon: CarFront },
] as const;

const processKeys = [
  { key: "listen", Icon: ClipboardCheck },
  { key: "prepare", Icon: BadgeCheck },
  { key: "finish", Icon: Sparkles },
] as const;

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "AboutPage" });

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
          {valueKeys.map(({ key, Icon }) => (
            <article
              className="rounded-md border border-pw-fog bg-pw-white p-6 shadow-1"
              key={key}
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-md bg-pw-blue-50 text-pw-blue-700">
                <Icon aria-hidden size={22} />
              </span>
              <h2 className="mt-5 font-display text-2xl font-bold text-pw-ink">
                {t(`values.${key}.title`)}
              </h2>
              <p className="mt-3 text-sm leading-7 text-pw-graphite">
                {t(`values.${key}.body`)}
              </p>
            </article>
          ))}
        </div>
      </section>
      <section className="bg-pw-white py-14 md:py-18">
        <div className="shell grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <p className="font-mono text-xs font-semibold uppercase text-pw-blue-600">
              {t("process.eyebrow")}
            </p>
            <h2 className="mt-3 font-display text-3xl font-extrabold leading-tight text-pw-ink md:text-4xl">
              {t("process.title")}
            </h2>
            <p className="mt-4 text-sm leading-7 text-pw-graphite">
              {t("process.body")}
            </p>
          </div>
          <div className="grid gap-4">
            {processKeys.map(({ key, Icon }, index) => (
              <article
                className="rounded-md border border-pw-fog bg-pw-paper p-5"
                key={key}
              >
                <div className="flex gap-4">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-pw-white text-pw-blue-700 shadow-1">
                    <Icon aria-hidden size={20} />
                  </span>
                  <div>
                    <p className="font-mono text-xs font-semibold text-pw-blue-700">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-1 font-display text-xl font-bold text-pw-ink">
                      {t(`process.steps.${key}.title`)}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-pw-graphite">
                      {t(`process.steps.${key}.body`)}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
