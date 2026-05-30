import { Link } from "@/i18n/navigation";

type PageIntroProps = {
  eyebrow: string;
  title: string;
  body: string;
  action?: {
    href: string;
    label: string;
  };
};

export function PageIntro({ action, eyebrow, title, body }: PageIntroProps) {
  return (
    <section className="bg-pw-paper py-20 md:py-28">
      <div className="shell">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.24em] text-pw-blue-600">
          {eyebrow}
        </p>
        <h1 className="mt-4 max-w-4xl font-display text-4xl font-extrabold leading-tight text-pw-ink md:text-6xl">
          {title}
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-pw-graphite">
          {body}
        </p>
        {action ? (
          <Link
            className="focus-ring mt-8 inline-flex min-h-11 items-center justify-center rounded-pill bg-pw-blue-600 px-6 py-3 font-body text-sm font-bold text-pw-white shadow-blue"
            href={action.href}
          >
            {action.label}
          </Link>
        ) : null}
      </div>
    </section>
  );
}
