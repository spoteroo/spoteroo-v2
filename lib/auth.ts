import { createClient } from "@/lib/supabase/server";

export async function requireUser() {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    console.error("Supabase auth error:", error);
    throw new Error("Unauthorized");
  }

  if (!user) {
    throw new Error("Unauthorized");
  }

  return {
    supabase,
    user,
    email: user.email!,
  };
}