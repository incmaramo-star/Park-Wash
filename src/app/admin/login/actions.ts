"use server";

import { redirect } from "next/navigation";

import { getCurrentAdmin } from "@/lib/auth/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { hasSupabaseEnv } from "@/lib/supabase/env";

function redirectWithError(error: "setup" | "credentials" | "forbidden") {
  redirect(`/admin/login?error=${error}`);
}

export async function signInAdmin(formData: FormData) {
  if (!hasSupabaseEnv()) {
    redirectWithError("setup");
  }

  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    redirectWithError("credentials");
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    redirectWithError("credentials");
  }

  const admin = await getCurrentAdmin();

  if (!admin) {
    await supabase.auth.signOut();
    redirectWithError("forbidden");
  }

  redirect("/admin");
}
