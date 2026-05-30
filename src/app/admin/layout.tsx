import type { Metadata } from "next";

import "../globals.css";
import { montserrat, poppins } from "@/app/fonts";

export const metadata: Metadata = {
  title: "Park&Wash Admin",
  description: "Admin dashboard for Park&Wash."
};

export default function AdminLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl" className={`${poppins.variable} ${montserrat.variable}`}>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
