import {
  AlertTriangle,
  Building2,
  Clock3,
  Inbox,
  Mail,
  Phone,
  UserRound,
} from "lucide-react";

import {
  getAdminLeads,
  type AdminLead,
  type AdminLeadCustomerType,
  type AdminLeadSource,
  type AdminLeadStatus,
} from "@/lib/leads/admin";

const customerTypeLabels: Record<AdminLeadCustomerType, string> = {
  particular: "Particulier",
  business: "Bedrijf",
};

const sourceLabels: Record<AdminLeadSource, string> = {
  contact_form: "Contactformulier",
  quote_request: "Offerteaanvraag",
};

const statusLabels: Record<AdminLeadStatus, string> = {
  new: "Nieuw",
  contacted: "Gecontacteerd",
  converted: "Omgezet",
  closed: "Afgesloten",
};

const statusStyles: Record<AdminLeadStatus, string> = {
  new: "border-pw-blue-200 bg-pw-blue-50 text-pw-blue-700",
  contacted: "border-pw-fog bg-pw-paper text-pw-graphite",
  converted: "border-pw-signal/25 bg-pw-signal/10 text-pw-blue-800",
  closed: "border-pw-fog bg-pw-white text-pw-slate",
};

const adminDateFormatter = new Intl.DateTimeFormat("nl-BE", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Europe/Brussels",
});

function formatAdminDate(value: string) {
  const timestamp = Date.parse(value);

  if (!Number.isFinite(timestamp)) {
    return "Onbekend";
  }

  return adminDateFormatter.format(timestamp);
}

function LeadStateSummary({ leads }: { leads: AdminLead[] }) {
  const newLeadCount = leads.filter((lead) => lead.status === "new").length;
  const latestLead = leads[0];

  return (
    <dl className="mt-8 grid gap-3 sm:grid-cols-3">
      <div className="rounded-md border border-pw-fog bg-pw-white p-4">
        <dt className="text-xs font-semibold uppercase text-pw-slate">
          Totaal
        </dt>
        <dd className="mt-2 font-display text-3xl font-extrabold text-pw-ink">
          {leads.length}
        </dd>
      </div>
      <div className="rounded-md border border-pw-fog bg-pw-white p-4">
        <dt className="text-xs font-semibold uppercase text-pw-slate">
          Nieuw
        </dt>
        <dd className="mt-2 font-display text-3xl font-extrabold text-pw-ink">
          {newLeadCount}
        </dd>
      </div>
      <div className="rounded-md border border-pw-fog bg-pw-white p-4">
        <dt className="text-xs font-semibold uppercase text-pw-slate">
          Laatste lead
        </dt>
        <dd className="mt-2 text-sm font-bold leading-6 text-pw-ink">
          {latestLead ? formatAdminDate(latestLead.createdAt) : "Geen leads"}
        </dd>
      </div>
    </dl>
  );
}

function AdminLeadsError() {
  return (
    <div
      className="mt-8 rounded-md border border-pw-alert/30 bg-pw-alert/10 p-5 text-pw-ink"
      role="alert"
    >
      <div className="flex gap-3">
        <span className="mt-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-pw-white text-pw-alert">
          <AlertTriangle aria-hidden size={20} />
        </span>
        <div>
          <h2 className="font-display text-xl font-bold">
            Leadgegevens konden niet geladen worden
          </h2>
          <p className="mt-2 text-sm leading-7 text-pw-graphite">
            Controleer de Supabase configuratie en RLS policies. Er worden geen
            persoonsgegevens in deze foutmelding getoond.
          </p>
        </div>
      </div>
    </div>
  );
}

function AdminLeadsEmpty() {
  return (
    <div className="mt-8 rounded-md border border-dashed border-pw-fog bg-pw-white p-8 text-center">
      <span className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-md bg-pw-blue-50 text-pw-blue-700">
        <Inbox aria-hidden size={24} />
      </span>
      <h2 className="mt-4 font-display text-2xl font-bold text-pw-ink">
        Nog geen contactleads
      </h2>
      <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-pw-graphite">
        Zodra het publieke contactformulier een aanvraag opslaat, verschijnt die
        hier voor opvolging door een allowlisted admin.
      </p>
    </div>
  );
}

function LeadContactActions({ lead }: { lead: AdminLead }) {
  return (
    <div className="mt-5 flex flex-col gap-3 sm:flex-row">
      <a
        className="focus-ring inline-flex min-h-11 min-w-0 items-center justify-center gap-2 rounded-md border border-pw-blue-200 px-4 py-3 text-sm font-bold text-pw-blue-700"
        href={`mailto:${lead.email}`}
      >
        <Mail aria-hidden className="shrink-0" size={17} />
        <span className="min-w-0 break-all">{lead.email}</span>
      </a>
      {lead.phone ? (
        <a
          className="focus-ring inline-flex min-h-11 min-w-0 items-center justify-center gap-2 rounded-md border border-pw-fog px-4 py-3 text-sm font-bold text-pw-graphite"
          href={`tel:${lead.phone}`}
        >
          <Phone aria-hidden className="shrink-0" size={17} />
          <span className="min-w-0 break-all">{lead.phone}</span>
        </a>
      ) : null}
    </div>
  );
}

function AdminLeadCard({ lead }: { lead: AdminLead }) {
  const audienceIcon =
    lead.customerType === "business" ? (
      <Building2 aria-hidden size={18} />
    ) : (
      <UserRound aria-hidden size={18} />
    );

  return (
    <article className="rounded-md border border-pw-fog bg-pw-white p-5 shadow-1">
      <header className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex min-h-8 items-center rounded-pill border px-3 text-xs font-bold ${statusStyles[lead.status]}`}
            >
              {statusLabels[lead.status]}
            </span>
            <span className="inline-flex min-h-8 items-center rounded-pill bg-pw-paper px-3 text-xs font-semibold text-pw-slate">
              {sourceLabels[lead.source]}
            </span>
          </div>
          <h2 className="mt-4 break-words font-display text-2xl font-bold text-pw-ink">
            {lead.name}
          </h2>
          <p className="mt-2 flex flex-wrap items-center gap-2 text-sm font-semibold text-pw-graphite">
            <span className="inline-flex items-center gap-2">
              {audienceIcon}
              {customerTypeLabels[lead.customerType]}
            </span>
            {lead.companyName ? (
              <span className="break-words text-pw-slate">
                {lead.companyName}
              </span>
            ) : null}
          </p>
        </div>
        <p className="inline-flex items-center gap-2 text-sm font-semibold text-pw-slate">
          <Clock3 aria-hidden size={17} />
          {formatAdminDate(lead.createdAt)}
        </p>
      </header>
      <p className="mt-5 whitespace-pre-line break-words rounded-md bg-pw-paper p-4 text-sm leading-7 text-pw-graphite">
        {lead.message}
      </p>
      <LeadContactActions lead={lead} />
      <p className="mt-4 text-xs leading-6 text-pw-slate">
        Privacytoestemming: {formatAdminDate(lead.privacyConsentAt)}
      </p>
    </article>
  );
}

function AdminLeadList({ leads }: { leads: AdminLead[] }) {
  if (leads.length === 0) {
    return <AdminLeadsEmpty />;
  }

  return (
    <>
      <LeadStateSummary leads={leads} />
      <div className="mt-6 grid gap-4">
        {leads.map((lead) => (
          <AdminLeadCard key={lead.id} lead={lead} />
        ))}
      </div>
    </>
  );
}

export default async function AdminPage() {
  const leadsResult = await getAdminLeads();

  return (
    <section className="py-12">
      <div className="shell">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.24em] text-pw-blue-600">
          Dashboard
        </p>
        <h1 className="mt-4 font-display text-4xl font-extrabold text-pw-ink">
          Contactleads
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-pw-graphite">
          Ingezonden contactaanvragen voor persoonlijke opvolging. Alleen
          allowlisted admins kunnen deze gegevens lezen; publieke en
          niet-admin accounts blijven door RLS uitgesloten.
        </p>
        {leadsResult.status === "error" ? (
          <AdminLeadsError />
        ) : (
          <AdminLeadList leads={leadsResult.leads} />
        )}
      </div>
    </section>
  );
}
