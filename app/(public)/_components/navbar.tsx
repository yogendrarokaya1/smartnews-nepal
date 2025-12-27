"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

type User = {
  name: string;
  avatar: string;
};

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <nav className="bg-blue-900 text-white px-6 py-3 flex justify-between items-center">
      {/* Left */}
      <div className="flex items-center space-x-6">
        <h1 className="font-bold text-lg">SmartNews Nepal</h1>

        <Link href="/">Home</Link>
        <Link href="#">Live</Link>
        <Link href="#">Blog</Link>
        <Link href="#">Videos</Link>
        <Link href="#">Categories</Link>
      </div>

      {/* Right */}
      <div className="flex items-center space-x-4">
        {!user ? (
          <>
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
          </>
        ) : (
          <>
            {/* Notification */}
            <button title="Notifications">🔔</button>

            {/* Profile */}
            <div className="flex items-center space-x-2">
              <Image
                src={user.avatar}
                alt="profile"
                width={32}
                height={32}
                className="rounded-full"
              />
              <span>{user.name}</span>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}
