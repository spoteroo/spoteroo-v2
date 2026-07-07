"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import UserMenu from "./navbar/UserMenu";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Trends", href: "/trends" },
  { name: "Dashboard", href: "/dashboard" },
  { name: "Favorites", href: "/favorites" },
  { name: "Newsletter", href: "/newsletter" },
  { name: "Profile", href: "/profile" },
];

export default function Navbar() {
  const pathname = usePathname();

  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

    useEffect(() => {
  setMobileMenuOpen(false);
}, [pathname]);

useEffect(() => {
  function handleEscape(event: KeyboardEvent) {
    if (event.key === "Escape") {
      setMobileMenuOpen(false);
    }
  }

  window.addEventListener("keydown", handleEscape);

  return () => {
    window.removeEventListener(
      "keydown",
      handleEscape
    );
  };
}, []);

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl py-2">
      <div className="mx-auto max-w-7xl px-4 py-5">

        <div
  className="
    glass
    flex
    items-center
    justify-between
    rounded-2xl
    px-6
    py-4
    shadow-2xl
    border
    border-white/10
  "
>

          {/* Logo */}

<Link
  href="/"
  className="flex items-center gap-3"
>
  <Image
    src="/logo.svg"
    alt="Spoteroo"
    width={36}
    height={36}
    priority
  />

  <span className="text-2xl font-bold text-white transition hover:text-blue-400">
    Spoteroo
  </span>
</Link>

          {/* Desktop Navigation */}

          <div className="hidden lg:flex items-center gap-7">

            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`
  relative
  font-medium
  transition-all
  duration-200

  ${
    pathname === item.href
      ? "text-blue-400"
      : "text-gray-300 hover:text-white"
  }
`}
              >
                <>
  <span>{item.name}</span>

{pathname === item.href && (
  <span
      className="
        absolute
        -bottom-2
        left-0
        h-0.5
        w-full
        rounded-full
        bg-blue-400
      "
    />
  )}
</>
              </Link>
            ))}

            {/* Pricing Button */}

            <Link
              href="/pricing"
              className="
                rounded-xl
                bg-gradient-to-r
                from-yellow-400
                to-orange-500
                px-5
                py-2
                font-semibold
                text-black
                shadow-lg
                transition-all
                hover:scale-105
              "
            >
              Pricing
            </Link>

            <UserMenu />

          </div>

          {/* Mobile Menu Button */}

<button
  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
  className="
    lg:hidden
    flex
    flex-col
    justify-center
    gap-1.5
    w-10
    h-10
    rounded-lg
    hover:bg-white/10
    transition
  "
  aria-label="Toggle Menu"
>
  <span
    className={`block h-0.5 bg-white transition-all ${
      mobileMenuOpen
        ? "rotate-45 translate-y-2"
        : ""
    }`}
  />

  <span
    className={`block h-0.5 bg-white transition-all ${
      mobileMenuOpen
        ? "opacity-0"
        : ""
    }`}
  />

  <span
    className={`block h-0.5 bg-white transition-all ${
      mobileMenuOpen
        ? "-rotate-45 -translate-y-2"
        : ""
    }`}
  />
</button>

        </div>
        {/* Mobile Navigation */}

{mobileMenuOpen && (
  <div
    className="
      lg:hidden
      mt-4
      glass
      rounded-2xl
      overflow-hidden
      animate-in
      slide-in-from-top-2
      duration-300
    "
  >
    <div className="flex flex-col">

      {navigation.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          onClick={() => setMobileMenuOpen(false)}
          className={`
            px-6
            py-4
            border-b
            border-white/10
            transition

            ${
              pathname === item.href
                ? "bg-blue-500/20 text-blue-400"
                : "text-gray-300 hover:bg-white/5 hover:text-white"
            }
          `}
        >
          {item.name}
        </Link>
      ))}

      <Link
        href="/pricing"
        onClick={() => setMobileMenuOpen(false)}
        className="
          m-4
          rounded-xl
          bg-gradient-to-r
          from-yellow-400
          to-orange-500
          py-3
          text-center
          font-semibold
          text-black
          shadow-lg
        "
      >
        Pricing
      </Link>

      <div className="px-4 pb-4">
        <UserMenu />
      </div>

    </div>
  </div>
)}
      </div>
    </nav>
  );
}