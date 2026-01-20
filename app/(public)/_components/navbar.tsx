"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { handleLogout } from "@/lib/actions/auth-action";
import Cookies from "js-cookie";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
];

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ✅ CHECK COOKIE ON LOAD
  useEffect(() => {
    const token = Cookies.get("auth_token"); // must match cookie name
    setIsLoggedIn(!!token);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname?.startsWith(href);

  // ✅ LOGOUT HANDLER
  const onLogout = async () => {
    await handleLogout(); // server action → clears cookies
    Cookies.remove("auth_token");
    Cookies.remove("user_data");

    setIsLoggedIn(false);
    router.push("/login");
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur border-b border-black/10 dark:border-white/10">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between md:grid md:grid-cols-[1fr_auto_1fr]">

          {/* LEFT LOGO */}
          <Link href="/" className="flex items-center gap-2">
            <span className="h-8 w-8 rounded-md bg-black text-white flex items-center justify-center font-bold">
              M
            </span>
            <span className="font-semibold">MyApp</span>
          </Link>

          {/* CENTER LINKS */}
          <div className="hidden md:flex gap-6 justify-center">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium ${
                  isActive(link.href)
                    ? "text-black"
                    : "text-gray-500 hover:text-black"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* RIGHT AUTH */}
          <div className="flex items-center gap-2 justify-end">
            {!isLoggedIn ? (
              <Link
                href="/login"
                className="h-9 px-3 inline-flex items-center rounded-md border text-sm font-medium"
              >
                Login
              </Link>
            ) : (
              <button
                onClick={onLogout}
                className="h-9 px-3 inline-flex items-center rounded-md border text-sm font-medium"
              >
                Logout
              </button>
            )}

            {/* MOBILE MENU BUTTON */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden h-9 w-9 border rounded-md flex items-center justify-center"
            >
              ☰
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {open && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="px-3 py-2 text-sm"
                >
                  {link.label}
                </Link>
              ))}

              {!isLoggedIn ? (
                <Link
                  href="/login"
                  className="px-3 py-2 border rounded-md text-sm"
                >
                  Login
                </Link>
              ) : (
                <button
                  onClick={onLogout}
                  className="px-3 py-2 border rounded-md text-sm"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
