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

  const isActive = (href: string) =>
  href === "/"
    ? pathname === "/"
    : pathname.startsWith(href);

  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

   // Close the mobile menu whenever navigation changes.
// eslint-disable-next-line react-hooks/set-state-in-effect
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
backdrop-blur-2xl
bg-white/5
    flex
    items-center
    justify-between
    rounded-2xl
    px-6
    py-5
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
  src="/SPOTEROO NEW LOGO1.png"
  alt="Spoteroo"
  width={220}
  height={220}
  priority
  className="h-14 w-auto"
/>
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
duration-300
hover:scale-105
hover:shadow-[0_0_30px_rgba(250,204,21,0.35)]

  ${
  isActive(item.href)
    ? "text-white font-semibold"
    : "text-gray-300 hover:text-white"
}
`}
              >
                <>
  <span>{item.name}</span>

{isActive(item.href) && (
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
    w-12
h-12
    rounded-lg
    hover:bg-white/10
    transition-all duration-300
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
      border
border-white/10
shadow-2xl
backdrop-blur-2xl
bg-white/5
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
              isActive(item.href)
  ? "text-white font-semibold"
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