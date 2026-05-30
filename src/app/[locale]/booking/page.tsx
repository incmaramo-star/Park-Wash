import { getTranslations, setRequestLocale } from "next-intl/server";

import { PageIntro } from "@/components/layout/PageIntro";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function BookingPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "BookingPage" });

  return (
    <PageIntro
      action={{ href: "/contact", label: t("action") }}
      eyebrow={t("eyebrow")}
      title={t("title")}
      body={t("body")}
    />
  );
}
