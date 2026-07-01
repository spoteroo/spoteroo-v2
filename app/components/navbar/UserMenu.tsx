"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../../../lib/supabase";
import type { User } from "@supabase/supabase-js";

export default function UserMenu() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function getUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);
    }

    getUser();
  }, []);

  if (!user) {
    return (
      <Link
        href="/login"
        className="
          rounded-xl
          bg-blue-600
          px-6
          py-3
          text-white
          shadow-[0_0_20px_rgba(59,130,246,0.4)]
        "
      >
        Login
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <span className="text-sm text-slate-300 cursor-pointer">
        Account ▼
      </span>

      <button
        onClick={async () => {
          await supabase.auth.signOut();
          window.location.href = "/";
        }}
        className="
          rounded-xl
          bg-red-600
          px-4
          py-2
          text-white
        "
      >
        Logout
      </button>
    </div>
  );
}