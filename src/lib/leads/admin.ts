import { createSupabaseServerClient } from "@/lib/supabase/server";
import { hasSupabaseEnv } from "@/lib/supabase/env";

export type AdminLeadStatus = "new" | "contacted" | "converted" | "closed";
export type AdminLeadSource = "contact_form" | "quote_request";
export type AdminLeadCustomerType = "particular" | "business";

export type AdminLead = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  customerType: AdminLeadCustomerType;
  companyName: string | null;
  message: string;
  source: AdminLeadSource;
  status: AdminLeadStatus;
  privacyConsentAt: string;
  createdAt: string;
  updatedAt: string;
};

export type AdminLeadRow = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  customer_type: AdminLeadCustomerType;
  company_name: string | null;
  message: string;
  source: AdminLeadSource;
  status: AdminLeadStatus;
  privacy_consent_at: string;
  created_at: string;
  updated_at: string;
};

type AdminLeadQueryResult = {
  data: AdminLeadRow[] | null;
  error: { code?: string; message: string } | null;
};

export type AdminLeadsClient = {
  from(table: "leads"): {
    select(columns: string): {
      order(
        column: "created_at",
        options: { ascending: false },
      ): Promise<AdminLeadQueryResult>;
    };
  };
};

export type AdminLeadsResult =
  | { status: "success"; leads: AdminLead[] }
  | { status: "error"; reason: "setup" | "query" | "unexpected" };

const adminLeadColumns = [
  "id",
  "name",
  "email",
  "phone",
  "customer_type",
  "company_name",
  "message",
  "source",
  "status",
  "privacy_consent_at",
  "created_at",
  "updated_at",
].join(", ");

export function mapAdminLead(row: AdminLeadRow): AdminLead {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone,
    customerType: row.customer_type,
    companyName: row.company_name,
    message: row.message,
    source: row.source,
    status: row.status,
    privacyConsentAt: row.privacy_consent_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function getAdminLeads(
  client?: AdminLeadsClient,
): Promise<AdminLeadsResult> {
  if (!client && !hasSupabaseEnv()) {
    return { status: "error", reason: "setup" };
  }

  try {
    const supabase =
      client ??
      ((await createSupabaseServerClient()) as unknown as AdminLeadsClient);

    const { data, error } = await supabase
      .from("leads")
      .select(adminLeadColumns)
      .order("created_at", { ascending: false });

    if (error) {
      return { status: "error", reason: "query" };
    }

    return {
      status: "success",
      leads: (data ?? []).map(mapAdminLead),
    };
  } catch {
    return { status: "error", reason: "unexpected" };
  }
}
