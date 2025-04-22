'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Building,
  PlugZap,
  Users,
  Settings,
  UploadCloud,
  ServerCog,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
  { href: '/config', label: 'Organization', icon: <Building className="w-4 h-4" /> },
  { href: '/config/connectors', label: 'Connectors', icon: <PlugZap className="w-4 h-4" /> },
  { href: '/config/users', label: 'Users', icon: <Users className="w-4 h-4" /> },
  { href: '/upload', label: 'Upload', icon: <UploadCloud className="w-4 h-4" /> },
  { href: '/ingest', label: 'Ingest', icon: <ServerCog className="w-4 h-4" /> },
  { href: '/master/config', label: 'Master Config', icon: <Settings className="w-4 h-4 text-blue-400" /> },
];

export default function SidebarNav() {
  const pathname = usePathname();

  return (
    <aside className="w-64 fixed top-0 left-0 h-screen bg-zinc-950 border-r border-zinc-800 px-6 py-10">
      <h2 className="text-2xl font-bold text-blue-500 mb-8">SevAI</h2>
      <nav className="flex flex-col gap-4">
        {navItems.map(({ href, label, icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              'flex items-center gap-3 text-sm font-medium rounded px-3 py-2 transition-colors hover:bg-zinc-800 hover:text-white',
              pathname === href ? 'bg-zinc-800 text-white' : 'text-zinc-400'
            )}
          >
            {icon}
            <span>{label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
