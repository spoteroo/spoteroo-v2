"use client";

import Link from "next/link";
import UserMenu from "./navbar/UserMenu";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center mb-20">
      <h2 className="text-2xl font-bold">
        Spoteroo
      </h2>

      <div className="flex gap-8 items-center text-gray-300">
        <Link href="/">Home</Link>

        <Link href="/trends">Trends</Link>

        <Link href="/favorites">Favorites</Link>

        <Link href="/newsletter">Newsletter</Link>

        <Link href="/dashboard">Dashboard</Link>

        <Link
          href="/pricing"
          className="rounded-lg bg-yellow-500 px-4 py-2 font-semibold text-black"
        >
          Upgrade
        </Link>

        <Link href="/profile">
          Profile
        </Link>

        <UserMenu />
      </div>
    </nav>
  );
}