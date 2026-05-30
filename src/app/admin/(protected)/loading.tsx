export default function AdminLoading() {
  return (
    <section className="py-12" aria-busy="true" aria-live="polite">
      <div className="shell">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.24em] text-pw-blue-600">
          Dashboard
        </p>
        <h1 className="mt-4 font-display text-4xl font-extrabold text-pw-ink">
          Contactleads laden
        </h1>
        <div className="mt-8 grid gap-4">
          {[0, 1, 2].map((item) => (
            <div
              className="rounded-md border border-pw-fog bg-pw-white p-5 shadow-1"
              key={item}
            >
              <div className="h-8 w-32 rounded-pill bg-pw-cloud" />
              <div className="mt-5 h-7 w-2/3 rounded-sm bg-pw-cloud" />
              <div className="mt-4 h-24 rounded-md bg-pw-paper" />
              <div className="mt-5 h-11 w-full rounded-md bg-pw-cloud sm:w-80" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
