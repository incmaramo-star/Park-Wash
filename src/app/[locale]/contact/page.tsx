import { getTranslations, setRequestLocale } from "next-intl/server";

import { ConsentNotice } from "@/components/forms/ConsentNotice";
import { PageIntro } from "@/components/layout/PageIntro";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "ContactPage" });
  const consent = await getTranslations({
    locale,
    namespace: "PrivacyConsent"
  });

  return (
    <>
      <PageIntro eyebrow={t("eyebrow")} title={t("title")} body={t("body")} />
      <ConsentNotice
        label={consent("contact.label")}
        linkLabel={consent("privacyLink")}
        notice={consent("contact.notice")}
        title={consent("contact.title")}
      />
    </>
  );
}
