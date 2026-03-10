"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Marketplace", href: "/marketplace" },
  { name: "Careers", href: "/careers" },
  { name: "Contact Us", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

   if (pathname.startsWith("/admin")) {
    return <div />; // empty div for admin routes
  }

  return (
    <nav className="border-b border-black/10 bg-white/90 backdrop-blur-md sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" onClick={() => setOpen(false)}>
          <img
            src="/logo.png"
            alt="Black Atlas"
            className="h-10 w-auto hover:scale-105 transition-transform"
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
                key={item.name}
                href={item.href}
                className={`relative pb-2 text-sm font-medium transition-colors
                    ${isActive(item.href)
                    ? "text-black"
                    : "text-black/60 hover:text-black"}`}
                >
                {item.name}

                <span
                    className={`absolute left-1/2 bottom-0.5 h-1 w-full rounded-full bg-red-600
                    transform -translate-x-1/2 transition-transform duration-300
                    ${isActive(item.href) ? "scale-x-100" : "scale-x-0"}`}
                />
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-md hover:bg-black/5 transition"
          aria-label="Toggle menu"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden border-t border-black/10 bg-white
            transition-all duration-300 ease-out
            ${open ? "max-h-96 opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-2"}
        `}
        >
        <div className="flex flex-col px-6 py-4 space-y-4">
            {navItems.map((item) => (
            <Link
                key={item.name}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`text-sm font-medium pb-2 border-b transition-colors
                ${isActive(item.href)
                    ? "text-black border-red-600"
                    : "text-black/70 border-transparent hover:text-black"}`}
            >
                {item.name}
            </Link>
            ))}
        </div>
    </div>

    </nav>
  );
}
