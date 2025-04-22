"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Settings,
  FileText,
  UploadCloud,
  Users,
  Cog,
} from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/config", label: "Organization", icon: Cog },
  { href: "/config/connectors", label: "Connectors", icon: Settings },
  { href: "/config/users", label: "Users", icon: Users },
  { href: "/upload", label: "Upload", icon: UploadCloud },
  { href: "/ingest", label: "Ingest", icon: FileText },
];

export default function SidebarNav() {
  const pathname = usePathname();

  return (
    <aside className="h-screen w-64 bg-black border-r border-zinc-800 flex flex-col py-6 px-4 fixed z-40">
      <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-blue-300 text-transparent bg-clip-text mb-10 px-2">
        SevAI
      </Link>

      <nav className="flex flex-col gap-2">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-all hover:bg-zinc-800 hover:text-white ${
                isActive ? "bg-zinc-800 text-white" : "text-zinc-400"
              }`}
            >
              <Icon className="w-5 h-5" />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto text-xs text-zinc-600 px-2">© 2025 SevAI</div>
    </aside>
  );
}
