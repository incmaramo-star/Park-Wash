import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight, Building2, CarFront, CheckCircle2 } from "lucide-react";

import { PageIntro } from "@/components/layout/PageIntro";
import { Link } from "@/i18n/navigation";
import { formatServicePrice } from "@/lib/pricing/format";
import { getPublishedServices } from "@/lib/services/public";

type Props = {
  params: Promise<{ locale: string }>;
};

export const dynamic = "force-dynamic";

const serviceGroups = [
  { key: "particular", type: "particular", Icon: CarFront },
  { key: "business", type: "business", Icon: Building2 },
] as const;

const noteKeys = ["published", "quote", "booking"] as const;

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "ServicesPage" });
  const services = await getPublishedServices(locale);

  return (
    <div className="bg-pw-paper">
      <PageIntro
        action={{ href: "/contact", label: t("action") }}
        eyebrow={t("eyebrow")}
        title={t("title")}
        body={t("body")}
      />
      <section className="pb-14 md:pb-18">
        <div className="shell grid gap-5 lg:grid-cols-2">
          {serviceGroups.map(({ key, type, Icon }) => {
            const groupServices = services.filter(
              (service) => service.type === type,
            );

            return (
              <article
                className="rounded-md border border-pw-fog bg-pw-white p-6 shadow-1"
                key={key}
              >
                <div className="flex gap-4">
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-pw-blue-50 text-pw-blue-700">
                    <Icon aria-hidden size={22} />
                  </span>
                  <div>
                    <p className="font-mono text-xs font-semibold uppercase text-pw-blue-600">
                      {t(`groups.${key}.eyebrow`)}
                    </p>
                    <h2 className="mt-2 font-display text-3xl font-extrabold leading-tight text-pw-ink">
                      {t(`groups.${key}.title`)}
                    </h2>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-7 text-pw-graphite">
                  {t(`groups.${key}.body`)}
                </p>
                <div className="mt-6 grid gap-3">
                  {groupServices.map((service) => (
                    <div
                      className="rounded-md border border-pw-fog bg-pw-paper p-4"
                      key={service.id}
                    >
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                        <h3 className="font-display text-xl font-bold text-pw-ink">
                          {service.title}
                        </h3>
                        <p className="whitespace-nowrap font-mono text-xs font-semibold text-pw-blue-700">
                          {formatServicePrice(service, locale)}
                        </p>
                      </div>
                      <p className="mt-2 text-sm leading-7 text-pw-graphite">
                        {service.body}
                      </p>
                    </div>
                  ))}
                </div>
                <Link
                  className="focus-ring mt-6 inline-flex min-h-11 items-center gap-2 rounded-pill bg-pw-blue-600 px-5 py-3 text-sm font-bold text-pw-white"
                  href="/contact"
                >
                  {t(`groups.${key}.action`)}
                  <ArrowRight aria-hidden size={17} />
                </Link>
              </article>
            );
          })}
        </div>
      </section>
      <section className="bg-pw-white py-14 md:py-18">
        <div className="shell grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <p className="font-mono text-xs font-semibold uppercase text-pw-blue-600">
              {t("notes.eyebrow")}
            </p>
            <h2 className="mt-3 font-display text-3xl font-extrabold leading-tight text-pw-ink md:text-4xl">
              {t("notes.title")}
            </h2>
            <p className="mt-4 text-sm leading-7 text-pw-graphite">
              {t("notes.body")}
            </p>
          </div>
          <div className="grid gap-4">
            {noteKeys.map((key) => (
              <div
                className="flex gap-3 rounded-md border border-pw-fog bg-pw-paper p-5"
                key={key}
              >
                <CheckCircle2
                  aria-hidden
                  className="mt-1 shrink-0 text-pw-signal"
                  size={20}
                />
                <p className="text-sm leading-7 text-pw-graphite">
                  {t(`notes.points.${key}`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
