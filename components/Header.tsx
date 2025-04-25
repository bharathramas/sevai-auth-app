// components/Header.tsx
'use client';

import Link from "next/link";
import { useSession } from "next-auth/react";
import TopRightMenu from "./TopRightMenu";

const pages = [
  { href: "/chat", label: "Chat" },
  { href: "/dashboard", label: "Dashboard" },
];

export default function Header() {
  const { data: session } = useSession();
  const firstName = session?.user?.["custom:first_name"] || session?.user?.name?.split(" ")[0] || "there";
  console.log("SESSION →", session)

  return (
    <header className="fixed top-0 z-50 w-full h-16 bg-gradient-to-r from-black via-zinc-900 to-black backdrop-blur-lg border-b border-zinc-800 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500 text-transparent bg-clip-text drop-shadow"
          >
            SevAI
          </Link>
          <span className="text-sm text-white/60 hidden sm:inline">Empowering Enterprise Intelligence</span>
        </div>

        <nav className="flex items-center gap-4 text-sm font-medium">
          {pages.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-white hover:text-blue-400 transition-colors"
            >
              {label}
            </Link>
          ))}

          <span className="hidden sm:inline text-xs text-white/60 italic">Welcome, {firstName}</span>

          <TopRightMenu />
        </nav>
      </div>
    </header>
  );
}
