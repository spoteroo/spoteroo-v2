"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const router = useRouter();

  function login() {
  if (password === "1234") {
    localStorage.setItem("admin", "true");
    router.push("/admin");
  } else {
    alert("Wrong password");
  }
}

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="w-full max-w-md space-y-4">
        <h1 className="text-4xl font-bold">
          Spoteroo Admin
        </h1>

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="w-full p-3 bg-gray-900 rounded"
        />

        <button
          onClick={login}
          className="w-full bg-white text-black p-3 rounded"
        >
          Login
        </button>
      </div>
    </main>
  );
}