"use server";

import {
  mapContactLeadFieldErrors,
  parseContactLeadForm,
  type ContactLeadActionState,
} from "@/lib/leads/contact";
import { hasSupabaseEnv } from "@/lib/supabase/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function submitContactLead(
  _previousState: ContactLeadActionState,
  formData: FormData,
): Promise<ContactLeadActionState> {
  const parsed = parseContactLeadForm(formData);

  if (!parsed.success) {
    return {
      status: "error",
      fieldErrors: mapContactLeadFieldErrors(parsed.error.issues),
      formError: "validation",
    };
  }

  if (!hasSupabaseEnv()) {
    return {
      status: "error",
      fieldErrors: {},
      formError: "setup",
    };
  }

  const lead = parsed.data;
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("leads").insert({
    name: lead.name,
    email: lead.email.toLowerCase(),
    phone: lead.phone || null,
    customer_type: lead.customerType,
    company_name: lead.companyName || null,
    message: lead.message,
    source: "contact_form",
    status: "new",
    privacy_consent_at: new Date().toISOString(),
  });

  if (error) {
    console.error("Contact lead submission failed", {
      code: error.code,
    });

    return {
      status: "error",
      fieldErrors: {},
      formError: "submit",
    };
  }

  return {
    status: "success",
    fieldErrors: {},
  };
}
