"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import TopBar from "./TopBar";
import BreakingNews from "./BreakingNews";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/live", label: "Live" },
  { href: "/videos", label: "Videos" },
  { href: "/horoscope", label: "Horoscope" },
];

// ✅ Categories Added Here
const CATEGORIES = [
  { slug: "national", label: "National" },
  { slug: "politics", label: "Politics" },
  { slug: "sports", label: "Sports" },
  { slug: "technology", label: "Technology" },
  { slug: "business", label: "Business" },
  { slug: "entertainment", label: "Entertainment" },
  { slug: "health", label: "Health" },
  { slug: "world", label: "World" },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, logout } = useAuth();
  const [currentUser, setCurrentUser] = useState(user);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCurrentUser(user);
  }, [user]);

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
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname?.startsWith(href);

  return (
    <header className="w-full sticky top-0 z-50 shadow-md">
      {/* ===== Top Bar ===== */}
      {/* ===== Dynamic Top Bar ===== */}
      <TopBar location="Kathmandu, Nepal" />

      {/* ===== Logo Section with Breaking News ===== */}
      <div className="relative w-full h-16">
        <Image
          src="/images/headerimage.jpg"
          alt="Header Background"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
        
        <div className="relative z-10 flex items-center h-full px-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0">
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={48}
              height={48}
              className="object-contain"
            />
            <span className="text-xl font-bold text-white">
              SmartNews
            </span>
          </Link>

          {/* Breaking News Ticker */}
          <BreakingNews />
        </div>
      </div>


      {/* ===== Navbar ===== */}
      <nav className="bg-[#0B0140] px-4 md:px-14">
        <div className="flex items-center justify-between h-12">
          {/* Left Section */}
          <div className="flex items-center gap-6 text-sm font-medium">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden text-xl text-white"
            >
              ☰
            </button>

            {/* Desktop Menu */}
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

              {/* ✅ Categories Dropdown */}
              <div className="relative group">
                <span className="cursor-pointer hover:text-red-500">
                  Categories ▾
                </span>

                <div className="absolute left-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 z-50">
                  {CATEGORIES.map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/news?category=${cat.slug}`}
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      {cat.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Auth Section */}
          <div
            className="hidden md:flex items-center gap-3 relative"
            ref={dropdownRef}
          >
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-2 py-1 rounded-full transition"
                >
                  <Image
                    src={
                      currentUser.avatar || "/images/avatar.png"
                    }
                    alt="Profile Avatar"
                    width={24}
                    height={24}
                    className="rounded-full object-cover"
                  />
                  <span className="text-white font-medium">
                    {currentUser.fullName.split(" ")[0]}
                  </span>
                </button>

                <div
                  className={
                    "absolute right-0 top-full mt-2 w-44 bg-white rounded-md shadow-lg overflow-hidden transition-all duration-200 z-50 " +
                    (dropdownOpen
                      ? "opacity-100 scale-100 pointer-events-auto"
                      : "opacity-0 scale-95 pointer-events-none")
                  }
                >
                  <Link
                    href="/user/dashboard"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/user/profile"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Edit Profile
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-4 py-1.5 rounded-md border border-white text-white font-semibold hover:bg-red-600 transition"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-1.5 rounded-md border border-white text-white font-semibold hover:bg-red-600 transition"
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
            (mobileOpen ? "max-h-[500px] py-3" : "max-h-0")
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

            {/* ✅ Mobile Categories */}
            <div className="mt-3 border-t border-white/20 pt-3">
              <p className="text-sm font-semibold px-3 mb-2">
                Categories
              </p>

              {CATEGORIES.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/news?category=${cat.slug}`}
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2 rounded-md hover:bg-white/10 hover:text-red-500"
                >
                  {cat.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
