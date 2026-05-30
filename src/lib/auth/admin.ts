import { redirect } from "next/navigation";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { hasSupabaseEnv } from "@/lib/supabase/env";

export type AdminRole = "owner" | "developer";

export type CurrentAdmin = {
  user: {
    id: string;
    email?: string;
  };
  admin: {
    id: string;
    email: string;
    role: AdminRole;
  };
};

export async function getCurrentAdmin(): Promise<CurrentAdmin | null> {
  if (!hasSupabaseEnv()) {
    return null;
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
    error: userError
  } = await supabase.auth.getUser();

  if (userError || !user?.email) {
    return null;
  }

  const { data: admin, error: adminError } = await supabase
    .from("admin_users")
    .select("id,email,role")
    .eq("email", user.email.toLowerCase())
    .eq("is_active", true)
    .maybeSingle();

  if (adminError || !admin) {
    return null;
  }

  return {
    user: {
      id: user.id,
      email: user.email
    },
    admin: {
      id: admin.id,
      email: admin.email,
      role: admin.role as AdminRole
    }
  };
}

export async function requireAdmin() {
  const currentAdmin = await getCurrentAdmin();

  if (!currentAdmin) {
    redirect("/admin/login");
  }

  return currentAdmin;
}
