import type { Metadata } from "next";

import { signInAdmin } from "./actions";

export const metadata: Metadata = {
  title: "Admin login | Park&Wash"
};

const errorMessages = {
  credentials: "Controleer e-mail en wachtwoord.",
  forbidden: "Dit account staat niet in de admin allowlist.",
  setup: "Supabase environment variables ontbreken nog."
} as const;

type Props = {
  searchParams: Promise<{ error?: keyof typeof errorMessages }>;
};

export default async function AdminLoginPage({ searchParams }: Props) {
  const { error } = await searchParams;
  const message = error ? errorMessages[error] : null;

  return (
    <section className="min-h-dvh bg-pw-paper py-16">
      <div className="shell flex min-h-[calc(100dvh-128px)] items-center justify-center">
        <div className="w-full max-w-md rounded-md bg-pw-white p-6 shadow-2">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.24em] text-pw-blue-600">
            Admin
          </p>
          <h1 className="mt-3 font-display text-3xl font-extrabold text-pw-ink">
            Inloggen
          </h1>
          <p className="mt-3 text-sm leading-6 text-pw-graphite">
            Alleen allowlisted Park&Wash admins krijgen toegang tot het
            dashboard.
          </p>
          {message ? (
            <p
              className="mt-5 rounded-sm border border-pw-alert/30 bg-pw-alert/10 p-3 text-sm font-semibold text-pw-alert"
              role="alert"
            >
              {message}
            </p>
          ) : null}
          <form action={signInAdmin} className="mt-6 grid gap-4">
            <label className="grid gap-2 text-sm font-semibold text-pw-ink">
              E-mail
              <input
                autoComplete="email"
                className="min-h-11 rounded-sm border border-pw-fog px-3 text-base font-normal outline-none transition focus:border-pw-blue-600"
                name="email"
                required
                type="email"
              />
            </label>
            <label className="grid gap-2 text-sm font-semibold text-pw-ink">
              Wachtwoord
              <input
                autoComplete="current-password"
                className="min-h-11 rounded-sm border border-pw-fog px-3 text-base font-normal outline-none transition focus:border-pw-blue-600"
                name="password"
                required
                type="password"
              />
            </label>
            <button
              className="min-h-11 rounded-pill bg-pw-blue-600 px-5 text-sm font-bold text-pw-white shadow-blue"
              type="submit"
            >
              Inloggen
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
