import { getTranslations, setRequestLocale } from "next-intl/server";

import { PageIntro } from "@/components/layout/PageIntro";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "ServicesPage" });

  return <PageIntro eyebrow={t("eyebrow")} title={t("title")} body={t("body")} />;
}
