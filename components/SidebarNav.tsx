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
  ChevronsLeft,
  ChevronsRight,
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

export default function SidebarNav({
  collapsed,
  toggle,
}: {
  collapsed: boolean;
  toggle: () => void;
}) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        'fixed top-0 left-0 h-screen transition-all duration-300 ease-in-out z-50',
        collapsed ? 'w-16 px-2' : 'w-64 px-6'
      )}
      style={{
        backdropFilter: 'blur(10px)',
        backgroundColor: 'rgba(24, 24, 27, 0.6)',
        borderRight: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      {/* Toggle Button */}
      <div className="flex justify-end pt-4 pb-2">
        <button onClick={toggle} className="text-zinc-400 hover:text-white">
          {collapsed ? <ChevronsRight size={18} /> : <ChevronsLeft size={18} />}
        </button>
      </div>

      {/* Logo / Brand */}
      {!collapsed && (
        <h2 className="text-2xl font-bold text-blue-500 mb-8 transition-opacity duration-300">SevAI</h2>
      )}

      {/* Navigation */}
      <nav className="flex flex-col gap-3">
        {navItems.map(({ href, label, icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              'flex items-center rounded px-3 py-2 text-sm font-medium transition-colors hover:bg-zinc-800 hover:text-white',
              pathname === href ? 'bg-zinc-800 text-white' : 'text-zinc-400',
              collapsed ? 'justify-center' : 'gap-3'
            )}
          >
            {icon}
            {!collapsed && <span>{label}</span>}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
