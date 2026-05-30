import Link from "next/link";

import { requireAdmin } from "@/lib/auth/admin";

export const dynamic = "force-dynamic";

export default async function ProtectedAdminLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const { admin } = await requireAdmin();

  return (
    <div className="min-h-dvh bg-pw-paper">
      <header className="border-b border-pw-fog bg-pw-white">
        <div className="shell flex min-h-16 items-center justify-between gap-4">
          <div>
            <p className="font-display text-lg font-extrabold text-pw-ink">
              Park&Wash Admin
            </p>
            <p className="text-xs text-pw-slate">
              {admin.email} - {admin.role}
            </p>
          </div>
          <Link
            className="focus-ring inline-flex min-h-11 items-center rounded-pill border border-pw-fog px-4 text-sm font-bold text-pw-graphite"
            href="/admin/logout"
          >
            Uitloggen
          </Link>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
