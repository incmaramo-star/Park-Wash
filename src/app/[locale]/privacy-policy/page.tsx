import { getTranslations, setRequestLocale } from "next-intl/server";

import { PageIntro } from "@/components/layout/PageIntro";

type Props = {
  params: Promise<{ locale: string }>;
};

const sectionKeys = [
  "controller",
  "data",
  "purposes",
  "legalBasis",
  "sharing",
  "retention",
  "rights",
  "security",
  "contact"
] as const;

export default async function PrivacyPolicyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "PrivacyPolicyPage" });

  return (
    <div className="bg-pw-paper">
      <PageIntro eyebrow={t("eyebrow")} title={t("title")} body={t("body")} />
      <section className="pb-16">
        <div className="shell grid gap-5">
          <p className="text-sm font-semibold text-pw-blue-700">
            {t("lastUpdated")}
          </p>
          {sectionKeys.map((sectionKey) => (
            <article
              className="rounded-md border border-pw-fog bg-pw-white p-6 shadow-1"
              key={sectionKey}
            >
              <h2 className="font-display text-2xl font-bold text-pw-ink">
                {t(`sections.${sectionKey}.title`)}
              </h2>
              <p className="mt-3 text-sm leading-7 text-pw-graphite">
                {t(`sections.${sectionKey}.body`)}
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
