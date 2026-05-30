import { getTranslations, setRequestLocale } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { formatServicePrice } from "@/lib/pricing/format";
import { getPublishedServices } from "@/lib/services/public";

type Props = {
  params: Promise<{ locale: string }>;
};

export const dynamic = "force-dynamic";

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "HomePage" });

  const services = await getPublishedServices(locale);

  return (
    <div>
      <section className="bg-pw-blue-950 text-pw-white">
        <div className="shell grid min-h-[calc(100dvh-80px)] items-center gap-10 py-16 md:grid-cols-[1.05fr_0.95fr] md:py-20">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.24em] text-pw-blue-300">
              {t("eyebrow")}
            </p>
            <h1 className="mt-4 max-w-3xl font-display text-5xl font-extrabold leading-[1.02] md:text-7xl">
              {t("title")}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-pw-blue-100">
              {t("subtitle")}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                className="focus-ring inline-flex min-h-11 items-center justify-center rounded-pill bg-pw-blue-600 px-6 py-3 font-body text-sm font-bold text-pw-white shadow-blue"
                href="/services"
              >
                {t("primaryAction")}
              </Link>
              <Link
                className="focus-ring inline-flex min-h-11 items-center justify-center rounded-pill border border-pw-blue-300/40 px-6 py-3 font-body text-sm font-bold text-pw-white"
                href="/contact"
              >
                {t("secondaryAction")}
              </Link>
            </div>
          </div>
          <div className="rounded-xl border border-pw-blue-300/20 bg-pw-white/6 p-5 shadow-3 backdrop-blur">
            <div className="rounded-lg bg-pw-white p-6 text-pw-ink">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-pw-blue-600">
                {t("servicePreviewLabel")}
              </p>
              <div className="mt-5 grid gap-4">
                {services.slice(0, 4).map((service) => (
                  <div
                    className="flex items-start justify-between gap-4 border-b border-pw-fog pb-4 last:border-0 last:pb-0"
                    key={service.title}
                  >
                    <div>
                      <h2 className="font-display text-base font-bold">
                        {service.title}
                      </h2>
                      <p className="mt-1 text-sm leading-6 text-pw-slate">
                        {service.body}
                      </p>
                    </div>
                    <p className="whitespace-nowrap font-mono text-xs font-semibold text-pw-blue-700">
                      {formatServicePrice(service, locale)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-pw-paper py-14">
        <div className="shell grid gap-5 md:grid-cols-3">
          {["trust", "mobile", "business"].map((key) => (
            <article className="rounded-md bg-pw-white p-6 shadow-1" key={key}>
              <h2 className="font-display text-xl font-bold">
                {t(`proof.${key}.title`)}
              </h2>
              <p className="mt-3 text-sm leading-7 text-pw-graphite">
                {t(`proof.${key}.body`)}
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
