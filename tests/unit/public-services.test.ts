import { describe, expect, it } from "vitest";

import {
  getPublishedServices,
  mapPublishedService,
  type PublicServiceRow,
} from "@/lib/services/public";

const baseService: PublicServiceRow = {
  id: "service-1",
  type: "particular",
  name_nl: "Basis detail",
  name_fr: "Detail de base",
  name_en: "Basic detail",
  description_nl: "Nederlandse beschrijving",
  description_fr: "Description francaise",
  description_en: "English description",
  price_min: "135.00",
  price_max: null,
  price_type: "from",
  visibility_status: "published",
  sort_order: 10,
};

function createServicesClient(rows: PublicServiceRow[]) {
  const calls: Array<[string, string]> = [];

  return {
    calls,
    client: {
      from(table: "services") {
        calls.push(["from", table]);

        return {
          select(columns: string) {
            calls.push(["select", columns]);

            return {
              eq(column: "visibility_status", value: "published") {
                calls.push(["eq", `${column}:${value}`]);

                return {
                  async order(
                    column: "sort_order",
                    options: { ascending: true },
                  ) {
                    calls.push(["order", `${column}:${options.ascending}`]);

                    return {
                      data: rows,
                      error: null,
                    };
                  },
                };
              },
            };
          },
        };
      },
    },
  };
}

describe("public service read path", () => {
  it("maps Supabase service rows to localized public services", () => {
    expect(mapPublishedService(baseService, "fr")).toMatchObject({
      id: "service-1",
      title: "Detail de base",
      body: "Description francaise",
      priceType: "from",
      priceMin: 135,
      priceMax: null,
      sortOrder: 10,
    });
  });

  it("queries and returns only published services", async () => {
    const draftService: PublicServiceRow = {
      ...baseService,
      id: "service-2",
      visibility_status: "draft",
      sort_order: 20,
    };
    const archivedService: PublicServiceRow = {
      ...baseService,
      id: "service-3",
      visibility_status: "archived",
      sort_order: 30,
    };
    const { calls, client } = createServicesClient([
      baseService,
      draftService,
      archivedService,
    ]);

    const services = await getPublishedServices("nl", client);

    expect(calls).toContainEqual(["from", "services"]);
    expect(calls).toContainEqual(["eq", "visibility_status:published"]);
    expect(calls).toContainEqual(["order", "sort_order:true"]);
    expect(services).toHaveLength(1);
    expect(services[0]).toMatchObject({
      id: "service-1",
      title: "Basis detail",
    });
  });

  it("keeps all supported price types available for display", async () => {
    const rows: PublicServiceRow[] = [
      { ...baseService, id: "fixed", price_type: "fixed", price_min: 95 },
      { ...baseService, id: "from", price_type: "from", price_min: 135 },
      {
        ...baseService,
        id: "range",
        price_type: "range",
        price_min: 250,
        price_max: 650,
      },
      {
        ...baseService,
        id: "request",
        price_type: "on_request",
        price_min: null,
        price_max: null,
      },
    ];
    const { client } = createServicesClient(rows);

    await expect(getPublishedServices("en", client)).resolves.toMatchObject([
      { id: "fixed", priceType: "fixed", priceMin: 95, priceMax: null },
      { id: "from", priceType: "from", priceMin: 135, priceMax: null },
      { id: "range", priceType: "range", priceMin: 250, priceMax: 650 },
      {
        id: "request",
        priceType: "on_request",
        priceMin: null,
        priceMax: null,
      },
    ]);
  });
});
