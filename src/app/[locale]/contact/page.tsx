import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  Building2,
  CalendarClock,
  Mail,
  MessageSquareText,
  PhoneCall,
  ShieldCheck,
} from "lucide-react";

import { ConsentNotice } from "@/components/forms/ConsentNotice";
import { PageIntro } from "@/components/layout/PageIntro";

type Props = {
  params: Promise<{ locale: string }>;
};

const entryKeys = [
  { key: "quote", Icon: MessageSquareText },
  { key: "fleet", Icon: Building2 },
  { key: "planning", Icon: CalendarClock },
] as const;

const methodKeys = [
  { key: "form", Icon: MessageSquareText },
  { key: "phone", Icon: PhoneCall },
  { key: "email", Icon: Mail },
] as const;

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "ContactPage" });
  const consent = await getTranslations({
    locale,
    namespace: "PrivacyConsent",
  });

  return (
    <div className="bg-pw-paper">
      <PageIntro eyebrow={t("eyebrow")} title={t("title")} body={t("body")} />
      <section className="pb-14 md:pb-18">
        <div className="shell grid gap-5 md:grid-cols-3">
          {entryKeys.map(({ key, Icon }) => (
            <article
              className="rounded-md border border-pw-fog bg-pw-white p-6 shadow-1"
              key={key}
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-md bg-pw-blue-50 text-pw-blue-700">
                <Icon aria-hidden size={22} />
              </span>
              <h2 className="mt-5 font-display text-2xl font-bold text-pw-ink">
                {t(`entries.${key}.title`)}
              </h2>
              <p className="mt-3 text-sm leading-7 text-pw-graphite">
                {t(`entries.${key}.body`)}
              </p>
            </article>
          ))}
        </div>
      </section>
      <section className="bg-pw-white py-14 md:py-18">
        <div className="shell grid gap-8 lg:grid-cols-[0.86fr_1.14fr] lg:items-start">
          <div>
            <p className="font-mono text-xs font-semibold uppercase text-pw-blue-600">
              {t("intake.eyebrow")}
            </p>
            <h2 className="mt-3 font-display text-3xl font-extrabold leading-tight text-pw-ink md:text-4xl">
              {t("intake.title")}
            </h2>
            <p className="mt-4 text-sm leading-7 text-pw-graphite">
              {t("intake.body")}
            </p>
          </div>
          <div className="grid gap-4">
            {methodKeys.map(({ key, Icon }) => (
              <div
                className="flex gap-4 rounded-md border border-pw-fog bg-pw-paper p-5"
                key={key}
              >
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-pw-white text-pw-blue-700 shadow-1">
                  <Icon aria-hidden size={20} />
                </span>
                <div>
                  <h3 className="font-display text-xl font-bold text-pw-ink">
                    {t(`methods.${key}.title`)}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-pw-graphite">
                    {t(`methods.${key}.body`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-pw-paper py-14 md:py-18">
        <div className="shell">
          <div className="rounded-md border border-pw-fog bg-pw-white p-6 shadow-1">
            <div className="flex gap-4">
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-pw-blue-50 text-pw-blue-700">
                <ShieldCheck aria-hidden size={22} />
              </span>
              <div>
                <h2 className="font-display text-2xl font-bold text-pw-ink">
                  {t("privacy.title")}
                </h2>
                <p className="mt-3 text-sm leading-7 text-pw-graphite">
                  {t("privacy.body")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ConsentNotice
        label={consent("contact.label")}
        linkLabel={consent("privacyLink")}
        notice={consent("contact.notice")}
        title={consent("contact.title")}
      />
    </div>
  );
}
