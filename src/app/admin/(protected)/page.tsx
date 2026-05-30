export default function AdminPage() {
  return (
    <section className="py-12">
      <div className="shell">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.24em] text-pw-blue-600">
          Dashboard
        </p>
        <h1 className="mt-4 font-display text-4xl font-extrabold text-pw-ink">
          Park&Wash dashboard
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-pw-graphite">
          Auth en allowlist-checks zijn actief. Bookings, leads, services,
          pricing en availability management worden in latere Fase 1 stappen
          ingevuld.
        </p>
      </div>
    </section>
  );
}
