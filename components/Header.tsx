"use client";

import Link from "next/link";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";

const pages = [
  { href: "/upload", label: "Upload" },
  { href: "/ingest", label: "Ingest" },
  { href: "/search", label: "Search" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/master/config", label: "Master Config" },
];

export default function Header() {
  const [fontSize, setFontSize] = useState("text-base");
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-lg bg-transparent border-b border-zinc-800 shadow-lg">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-blue-300 text-transparent bg-clip-text"
        >
          SevAI
        </Link>

        <nav className={`flex flex-wrap items-center gap-6 ${fontSize}`}>
          {/* Config Dropdown */}
          <div className="relative group">
            <button className="text-white font-medium">Config ▾</button>
            <div className="absolute left-0 mt-2 hidden group-hover:block bg-zinc-900 text-white rounded shadow-lg min-w-[160px] border border-zinc-700 z-50">
              <Link href="/config" className="block px-4 py-2 hover:bg-zinc-800">Organization</Link>
              <Link href="/config/connectors" className="block px-4 py-2 hover:bg-zinc-800">Connectors</Link>
              <Link href="/config/users" className="block px-4 py-2 hover:bg-zinc-800">Users</Link>
            </div>
          </div>

          {pages.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-white hover:text-blue-400 transition-colors font-medium"
            >
              {label}
            </Link>
          ))}

          <select
            value={fontSize}
            onChange={(e) => setFontSize(e.target.value)}
            className="bg-zinc-800 text-white border border-zinc-700 rounded px-2 py-1 text-sm hover:border-blue-400"
            title="Adjust Font Size"
          >
            <option value="text-sm">Small</option>
            <option value="text-base">Medium</option>
            <option value="text-lg">Large</option>
          </select>

          {/* Sign Out (if logged in) */}
          {session?.user && (
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="ml-4 text-sm text-white px-3 py-1 border border-white rounded hover:bg-white hover:text-black transition"
            >
              Sign out
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
