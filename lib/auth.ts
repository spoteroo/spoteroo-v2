import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

export async function requireUser() {
  const cookieStore = await cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll() {},
      },
    }
  );

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user?.email) {
    throw new Error("Unauthorized");
  }

  return {
    user,
    email: user.email,
    supabase,
  };
}