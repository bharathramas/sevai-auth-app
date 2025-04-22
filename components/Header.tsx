// components/Header.tsx
"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

const pages = [
  { href: "/upload", label: "Upload" },
  { href: "/ingest", label: "Ingest" },
  { href: "/search", label: "Search" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/master/config", label: "Master Config" },
];

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="fixed top-0 z-50 w-full bg-black/80 backdrop-blur-lg border-b border-zinc-800 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-blue-500 to-purple-400 text-transparent bg-clip-text"
        >
          SevAI
        </Link>

        <nav className="flex items-center gap-6 text-sm font-medium">
          <div className="relative group">
            <button className="text-white">Config ▾</button>
            <div className="absolute left-0 mt-2 hidden group-hover:block bg-zinc-900 text-white rounded shadow-lg min-w-[160px] border border-zinc-700 z-50">
              <Link href="/config" className="block px-4 py-2 hover:bg-zinc-800">Organization</Link>
              <Link href="/config/connectors" className="block px-4 py-2 hover:bg-zinc-800">Connectors</Link>
              <Link href="/config/users" className="block px-4 py-2 hover:bg-zinc-800">Users</Link>
            </div>
          </div>

          {pages.map(({ href, label }) => (
            <Link key={href} href={href} className="text-white hover:text-blue-400 transition-colors">
              {label}
            </Link>
          ))}

          {session?.user && (
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="ml-4 text-white text-sm px-3 py-1 border border-white rounded hover:bg-white hover:text-black transition"
            >
              Sign out
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
