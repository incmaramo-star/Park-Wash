import type { PriceType, ServicePricing } from "@/lib/pricing/format";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type CustomerType = "particular" | "business";
type VisibilityStatus = "draft" | "published" | "archived";
type SupportedLocale = "nl" | "fr" | "en";

export type PublicService = ServicePricing & {
  id: string;
  type: CustomerType;
  title: string;
  body: string;
  sortOrder: number;
};

export type PublicServiceRow = {
  id: string;
  type: CustomerType;
  name_nl: string;
  name_fr: string;
  name_en: string;
  description_nl: string;
  description_fr: string;
  description_en: string;
  price_min: number | string | null;
  price_max: number | string | null;
  price_type: PriceType;
  visibility_status: VisibilityStatus;
  sort_order: number;
};

type ServiceQueryResult = {
  data: PublicServiceRow[] | null;
  error: { message: string } | null;
};

type PublicServicesClient = {
  from(table: "services"): {
    select(columns: string): {
      eq(
        column: "visibility_status",
        value: "published",
      ): {
        order(
          column: "sort_order",
          options: { ascending: true },
        ): Promise<ServiceQueryResult>;
      };
    };
  };
};

const publicServiceColumns = [
  "id",
  "type",
  "name_nl",
  "name_fr",
  "name_en",
  "description_nl",
  "description_fr",
  "description_en",
  "price_min",
  "price_max",
  "price_type",
  "visibility_status",
  "sort_order",
].join(", ");

const localeFields: Record<
  SupportedLocale,
  { title: keyof PublicServiceRow; body: keyof PublicServiceRow }
> = {
  nl: { title: "name_nl", body: "description_nl" },
  fr: { title: "name_fr", body: "description_fr" },
  en: { title: "name_en", body: "description_en" },
};

function normalizeLocale(locale: string): SupportedLocale {
  return locale === "fr" || locale === "en" ? locale : "nl";
}

function normalizePrice(value: number | string | null): number | null {
  if (value === null) {
    return null;
  }

  const numericValue = typeof value === "number" ? value : Number(value);
  return Number.isFinite(numericValue) ? numericValue : null;
}

export function mapPublishedService(
  row: PublicServiceRow,
  locale: string,
): PublicService {
  const fields = localeFields[normalizeLocale(locale)];

  return {
    id: row.id,
    type: row.type,
    title: String(row[fields.title]),
    body: String(row[fields.body]),
    priceType: row.price_type,
    priceMin: normalizePrice(row.price_min),
    priceMax: normalizePrice(row.price_max),
    sortOrder: row.sort_order,
  };
}

export async function getPublishedServices(
  locale: string,
  client?: PublicServicesClient,
) {
  const supabase =
    client ??
    ((await createSupabaseServerClient()) as unknown as PublicServicesClient);

  const { data, error } = await supabase
    .from("services")
    .select(publicServiceColumns)
    .eq("visibility_status", "published")
    .order("sort_order", { ascending: true });

  if (error) {
    throw new Error(`Could not load published services: ${error.message}`);
  }

  return (data ?? [])
    .filter((service) => service.visibility_status === "published")
    .map((service) => mapPublishedService(service, locale));
}
