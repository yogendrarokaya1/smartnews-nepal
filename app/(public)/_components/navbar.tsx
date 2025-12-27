"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface User {
  name: string;
  email: string;
}

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    router.push("/");
  };

  return (
    <header className="w-full">
      {/* Top Info Bar */}
      <div className="bg-blue-700 text-white text-sm px-6 py-2 flex justify-between">
        <span>☁️ Mostly Cloudy | 16°C</span>
        <span>Fri, 19 November | 1:00 pm</span>
      </div>

      {/* Main Navbar */}
      <nav className="bg-[#0a0a3c] text-white px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Image
            src="/images/logo2.png"
            alt="SmartNews"
            width={40}
            height={40}
          />
          <span className="font-bold text-lg">SmartNews Nepal</span>
        </div>

        {/* Menu */}
        <ul className="hidden md:flex gap-6 text-sm font-medium">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/live">Live</Link></li>
          <li><Link href="/blog">Blog</Link></li>
          <li><Link href="/videos">Videos</Link></li>
          <li><Link href="/horoscope">Horoscope</Link></li>
          <li className="cursor-pointer">Categories ▾</li>
        </ul>

        {/* Auth Section */}
        {!user ? (
          <Link
            href="/login"
            className="bg-white text-blue-700 px-4 py-1.5 rounded-md text-sm font-semibold hover:bg-gray-200"
          >
            Login
          </Link>
        ) : (
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium">
              👋 {user.name}
            </span>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-md text-sm"
            >
              Logout
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}
