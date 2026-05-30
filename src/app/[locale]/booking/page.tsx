import { getTranslations, setRequestLocale } from "next-intl/server";

import { ConsentNotice } from "@/components/forms/ConsentNotice";
import { PageIntro } from "@/components/layout/PageIntro";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function BookingPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "BookingPage" });
  const consent = await getTranslations({
    locale,
    namespace: "PrivacyConsent"
  });

  return (
    <>
      <PageIntro
        action={{ href: "/contact", label: t("action") }}
        eyebrow={t("eyebrow")}
        title={t("title")}
        body={t("body")}
      />
      <ConsentNotice
        label={consent("booking.label")}
        linkLabel={consent("privacyLink")}
        notice={consent("booking.notice")}
        title={consent("booking.title")}
      />
    </>
  );
}
