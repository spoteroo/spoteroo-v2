"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
  const admin = localStorage.getItem("admin");

  console.log("ADMIN:", admin);

  if (!admin) {
    router.push("/login");
  }
}, [router]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function login() {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (response.ok) {
      localStorage.setItem("admin", "true");
      router.push("/dashboard");
    } else {
      alert("Invalid login");
    }
  }

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="bg-gray-900 p-8 rounded-xl w-full max-w-md">
        <h1 className="text-4xl font-bold mb-6">
          Admin Login
        </h1>

        <input
          className="w-full p-3 rounded bg-black border border-gray-700 mb-4"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full p-3 rounded bg-black border border-gray-700 mb-4"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={login}
          className="bg-blue-600 px-6 py-3 rounded w-full"
        >
          Login
        </button>
      </div>
    </main>
  );
}