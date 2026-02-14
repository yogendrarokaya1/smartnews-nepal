"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/live", label: "Live" },
  { href: "/blog", label: "Blog" },
  { href: "/videos", label: "Videos" },
  { href: "/horoscope", label: "Horoscope" },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, logout } = useAuth();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname?.startsWith(href);

  return (
    <header className="w-full sticky top-0 z-50 shadow-md">

      {/* ===== Top Bar ===== */}
      <div className="bg-[#0B0140] text-white text-xs px-4 py-1 flex justify-between">
        <span>🌤 Mostly Cloudy | 16°C</span>
        <span>Fri, 19 November | 1:00 pm</span>
      </div>

      {/* ===== Middle Header (Logo + BG Image) ===== */}
      <div className="relative w-full h-16">
        <Image
          src="/images/headerimg.png"
          alt="Header Background"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 flex items-center h-full px-6">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={48}
              height={48}
              className="object-contain"
            />
            <span className="text-xl font-bold text-white">SmartNews</span>
          </Link>
        </div>
      </div>

      {/* ===== Bottom Navbar ===== */}
      <nav className="bg-[#0B0140] px-4 md:px-14">
        <div className="flex items-center justify-between h-12">

          {/* Left Menu */}
          <div className="flex items-center gap-6 text-sm font-medium">

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden text-xl text-white"
            >
              ☰
            </button>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-6 text-white">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={
                    "transition-colors duration-200 " +
                    (isActive(link.href)
                      ? "text-red-500 font-semibold"
                      : "hover:text-red-500")
                  }
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Right Auth / Profile */}
          <div className="hidden md:flex items-center gap-3 relative" ref={dropdownRef}>
            {user ? (
              <>
                {/* Profile Button */}
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-2 py-1 rounded-full transition"
                >
                  <Image
                    src={user.avatar || "/images/avatar.png"}
                    alt="Profile Avatar"
                    width={32}
                    height={32}
                    className="rounded-full object-cover"
                  />
                  <span className="text-white font-medium">
                    {user.fullName.split(" ")[0]}
                  </span>
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </button>

                {/* Dropdown Menu */}
                <div
                  className={
                    "absolute right-0 mt-2 w-44 bg-white rounded-md shadow-lg overflow-hidden transition-all duration-200 " +
                    (dropdownOpen
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-95 pointer-events-none")
                  }
                >
                  <Link
                    href="/dashboard"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/settings"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Settings
                  </Link>
                  <button
                    onClick={() => { logout(); setDropdownOpen(false); }}
                    className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-4 py-1.5 rounded-md border border-white text-white font-semibold hover:bg-red-600 transition-colors duration-200 shadow-sm"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-1.5 rounded-md border border-white text-white font-semibold hover:bg-red-600 transition-colors duration-200 shadow-sm"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>

        {/* ===== Mobile Menu ===== */}
        <div
          className={
            "md:hidden overflow-hidden transition-all duration-300 " +
            (mobileOpen ? "max-h-96 py-3" : "max-h-0")
          }
        >
          <div className="flex flex-col gap-2 text-white">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={
                  "px-3 py-2 rounded-md transition-colors duration-200 " +
                  (isActive(link.href)
                    ? "bg-red-500 text-white"
                    : "hover:bg-white/10 hover:text-red-500")
                }
              >
                {link.label}
              </Link>
            ))}

            {/* Mobile Auth */}
            <div className="flex gap-2 mt-3">
              {user ? (
                <button
                  onClick={logout}
                  className="flex-1 px-3 py-2 bg-white text-red-500 rounded-md font-medium"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="flex-1 px-3 py-2 border border-white rounded-md text-center font-medium hover:bg-white hover:text-red-500 transition"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="flex-1 px-3 py-2 bg-red-500 text-white rounded-md text-center font-semibold"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
