import { createClient } from "@/lib/supabase/server";

export async function requireUser() {
  const supabase = await createClient();

 const {
  data: { user },
  error,
} = await supabase.auth.getUser();

console.log("========== AUTH DEBUG ==========");
console.log("User:", user);
console.log("Error:", error);
console.log("Email:", user?.email);
console.log("================================");

if (error || !user?.email) {
  throw new Error("Unauthorized");
}

  return {
    user,
    email: user.email,
    supabase,
  };
}