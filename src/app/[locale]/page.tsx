import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CalendarClock,
  CarFront,
  CheckCircle2,
  ClipboardCheck,
  Sparkles,
} from "lucide-react";

import { Link } from "@/i18n/navigation";
import { formatServicePrice } from "@/lib/pricing/format";
import { getPublishedServices } from "@/lib/services/public";

type Props = {
  params: Promise<{ locale: string }>;
};

export const dynamic = "force-dynamic";

const heroStepKeys = ["handover", "service", "quote"] as const;
const audienceKeys = [
  { key: "private", Icon: CarFront },
  { key: "business", Icon: Building2 },
] as const;
const processKeys = [
  { key: "inspect", Icon: ClipboardCheck },
  { key: "detail", Icon: Sparkles },
  { key: "followUp", Icon: CalendarClock },
] as const;
const proofKeys = [
  { key: "trust", Icon: BadgeCheck },
  { key: "mobile", Icon: CarFront },
  { key: "business", Icon: Building2 },
] as const;

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "HomePage" });

  const services = await getPublishedServices(locale);

  return (
    <div>
      <section className="bg-pw-blue-950 text-pw-white">
        <div className="shell grid min-h-[calc(88dvh-80px)] items-center gap-10 py-14 md:grid-cols-[1fr_420px] md:py-18">
          <div>
            <p className="inline-flex min-h-11 items-center rounded-pill border border-pw-blue-300/35 px-4 font-mono text-xs font-semibold uppercase text-pw-blue-200">
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
                className="focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-pill bg-pw-blue-600 px-6 py-3 font-body text-sm font-bold text-pw-white shadow-blue"
                href="/contact"
              >
                {t("primaryAction")}
                <ArrowRight aria-hidden size={18} />
              </Link>
              <Link
                className="focus-ring inline-flex min-h-11 items-center justify-center rounded-pill border border-pw-blue-300/40 px-6 py-3 font-body text-sm font-bold text-pw-white"
                href="/services"
              >
                {t("secondaryAction")}
              </Link>
            </div>
            <dl className="mt-10 grid gap-4 text-sm text-pw-blue-100 sm:grid-cols-3">
              {heroStepKeys.map((key) => (
                <div className="border-l border-pw-blue-300/35 pl-4" key={key}>
                  <dt className="font-display text-base font-bold text-pw-white">
                    {t(`heroSteps.${key}.title`)}
                  </dt>
                  <dd className="mt-1 leading-6">
                    {t(`heroSteps.${key}.body`)}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <aside
            aria-label={t("previewPanel.label")}
            className="rounded-md border border-pw-blue-300/25 bg-pw-white p-6 text-pw-ink shadow-3"
          >
            <p className="font-mono text-xs font-semibold uppercase text-pw-blue-600">
              {t("previewPanel.eyebrow")}
            </p>
            <h2 className="mt-3 font-display text-3xl font-extrabold leading-tight">
              {t("previewPanel.title")}
            </h2>
            <p className="mt-4 text-sm leading-7 text-pw-graphite">
              {t("previewPanel.body")}
            </p>
            <div className="mt-6 grid gap-3">
              {proofKeys.map(({ key, Icon }) => (
                <div className="flex gap-3" key={key}>
                  <span className="mt-1 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-pw-blue-50 text-pw-blue-700">
                    <Icon aria-hidden size={17} />
                  </span>
                  <div>
                    <h3 className="font-display text-base font-bold">
                      {t(`proof.${key}.title`)}
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-pw-slate">
                      {t(`proof.${key}.body`)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>
      <section className="bg-pw-white py-14 md:py-18">
        <div className="shell grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
          <div>
            <p className="font-mono text-xs font-semibold uppercase text-pw-blue-600">
              {t("servicePreviewLabel")}
            </p>
            <h2 className="mt-3 font-display text-3xl font-extrabold leading-tight text-pw-ink md:text-4xl">
              {t("servicesIntro.title")}
            </h2>
            <p className="mt-4 text-sm leading-7 text-pw-graphite">
              {t("servicesIntro.body")}
            </p>
            <Link
              className="focus-ring mt-6 inline-flex min-h-11 items-center gap-2 rounded-pill border border-pw-blue-200 px-5 py-3 text-sm font-bold text-pw-blue-700"
              href="/services"
            >
              {t("servicesIntro.action")}
              <ArrowRight aria-hidden size={17} />
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {services.slice(0, 4).map((service) => (
              <article
                className="rounded-md border border-pw-fog bg-pw-paper p-5 shadow-1"
                key={service.id}
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-display text-xl font-bold text-pw-ink">
                    {service.title}
                  </h3>
                  <p className="whitespace-nowrap rounded-pill bg-pw-blue-50 px-3 py-1 font-mono text-xs font-semibold text-pw-blue-700">
                    {formatServicePrice(service, locale)}
                  </p>
                </div>
                <p className="mt-3 text-sm leading-7 text-pw-graphite">
                  {service.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-pw-paper py-14 md:py-18">
        <div className="shell">
          <div className="max-w-3xl">
            <p className="font-mono text-xs font-semibold uppercase text-pw-blue-600">
              {t("audiences.eyebrow")}
            </p>
            <h2 className="mt-3 font-display text-3xl font-extrabold leading-tight text-pw-ink md:text-4xl">
              {t("audiences.title")}
            </h2>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {audienceKeys.map(({ key, Icon }) => (
              <article
                className="rounded-md border border-pw-fog bg-pw-white p-6 shadow-1"
                key={key}
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-md bg-pw-blue-50 text-pw-blue-700">
                  <Icon aria-hidden size={22} />
                </span>
                <h3 className="mt-5 font-display text-2xl font-bold text-pw-ink">
                  {t(`audiences.${key}.title`)}
                </h3>
                <p className="mt-3 text-sm leading-7 text-pw-graphite">
                  {t(`audiences.${key}.body`)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-pw-white py-14 md:py-18">
        <div className="shell grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
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
            {processKeys.map(({ key, Icon }) => (
              <article
                className="rounded-md border border-pw-fog bg-pw-paper p-5"
                key={key}
              >
                <div className="flex gap-4">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-pw-white text-pw-blue-700 shadow-1">
                    <Icon aria-hidden size={20} />
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-bold text-pw-ink">
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
      <section className="bg-pw-ink py-14 text-pw-white md:py-18">
        <div className="shell grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="font-mono text-xs font-semibold uppercase text-pw-blue-300">
              {t("finalCta.eyebrow")}
            </p>
            <h2 className="mt-3 max-w-3xl font-display text-3xl font-extrabold leading-tight md:text-4xl">
              {t("finalCta.title")}
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-pw-blue-100">
              {t("finalCta.body")}
            </p>
          </div>
          <Link
            className="focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-pill bg-pw-white px-6 py-3 text-sm font-bold text-pw-ink"
            href="/contact"
          >
            {t("finalCta.action")}
            <CheckCircle2 aria-hidden size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
