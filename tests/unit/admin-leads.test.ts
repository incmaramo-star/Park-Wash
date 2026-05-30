import { describe, expect, it } from "vitest";

import {
  getAdminLeads,
  mapAdminLead,
  type AdminLeadRow,
  type AdminLeadsClient,
} from "@/lib/leads/admin";

const baseLeadRow: AdminLeadRow = {
  id: "lead-1",
  name: "Test Visitor",
  email: "visitor@example.com",
  phone: "+32470000000",
  customer_type: "business",
  company_name: "Test Fleet",
  message: "We need recurring mobile detailing for several vehicles.",
  source: "contact_form",
  status: "new",
  privacy_consent_at: "2026-05-30T10:00:00.000Z",
  created_at: "2026-05-30T10:01:00.000Z",
  updated_at: "2026-05-30T10:01:00.000Z",
};

function createLeadsClient(result: {
  data: AdminLeadRow[] | null;
  error: { code?: string; message: string } | null;
}) {
  const calls: Array<[string, string]> = [];

  const client: AdminLeadsClient = {
    from(table) {
      calls.push(["from", table]);

      return {
        select(columns) {
          calls.push(["select", columns]);

          return {
            async order(column, options) {
              calls.push(["order", `${column}:${options.ascending}`]);

              return result;
            },
          };
        },
      };
    },
  };

  return { calls, client };
}

describe("admin lead read path", () => {
  it("maps Supabase lead rows to admin view models", () => {
    expect(mapAdminLead(baseLeadRow)).toMatchObject({
      id: "lead-1",
      name: "Test Visitor",
      email: "visitor@example.com",
      phone: "+32470000000",
      customerType: "business",
      companyName: "Test Fleet",
      source: "contact_form",
      status: "new",
      privacyConsentAt: "2026-05-30T10:00:00.000Z",
      createdAt: "2026-05-30T10:01:00.000Z",
      updatedAt: "2026-05-30T10:01:00.000Z",
    });
  });

  it("queries leads with explicit columns ordered newest first", async () => {
    const { calls, client } = createLeadsClient({
      data: [baseLeadRow],
      error: null,
    });

    await expect(getAdminLeads(client)).resolves.toMatchObject({
      status: "success",
      leads: [{ id: "lead-1", customerType: "business" }],
    });

    expect(calls).toContainEqual(["from", "leads"]);
    expect(calls).toContainEqual(["order", "created_at:false"]);
    expect(calls.find(([method]) => method === "select")?.[1]).toContain(
      "privacy_consent_at",
    );
  });

  it("returns a generic query error without exposing Supabase details", async () => {
    const { client } = createLeadsClient({
      data: null,
      error: { code: "42501", message: "permission denied for table leads" },
    });

    await expect(getAdminLeads(client)).resolves.toEqual({
      status: "error",
      reason: "query",
    });
  });
});
