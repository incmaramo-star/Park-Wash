import { Link } from "@/i18n/navigation";

type ConsentNoticeProps = {
  title: string;
  label: string;
  notice: string;
  linkLabel: string;
};

export function ConsentNotice({
  title,
  label,
  notice,
  linkLabel
}: ConsentNoticeProps) {
  return (
    <section className="bg-pw-paper pb-16">
      <div className="shell">
        <div className="max-w-3xl rounded-md border border-pw-fog bg-pw-white p-6 shadow-1">
          <h2 className="font-display text-2xl font-bold text-pw-ink">
            {title}
          </h2>
          <div className="mt-5 flex gap-3 text-sm leading-7 text-pw-graphite">
            <span
              aria-hidden
              className="mt-1 h-5 w-5 shrink-0 rounded-xs border-2 border-pw-blue-600"
            />
            <p>
              {label}{" "}
              <Link
                className="focus-ring font-semibold text-pw-blue-700 underline underline-offset-4 hover:text-pw-blue-900"
                href="/privacy-policy"
              >
                {linkLabel}
              </Link>
              .
            </p>
          </div>
          <p className="mt-4 text-sm leading-7 text-pw-slate">{notice}</p>
        </div>
      </div>
    </section>
  );
}
