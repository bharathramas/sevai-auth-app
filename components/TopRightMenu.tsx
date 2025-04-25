// components/TopRightMenu.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';

export default function TopRightMenu() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { data: session } = useSession();
  const role = session?.user?.["custom:role"] || 'customer_user';

  const canAccessConfig = ["master_admin", "customer_admin"].includes(role);
  const isMasterAdmin = role === "master_admin";

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative z-40" ref={menuRef}>
      <button
        onClick={() => setOpen(!open)}
        className="bg-zinc-900 p-2 rounded-full border border-white/20 hover:bg-zinc-800"
      >
        <Menu className="w-6 h-6 text-white" />
      </button>

      {open && (
        <div className="absolute top-12 right-0 w-64 bg-white/10 backdrop-blur-md text-white shadow-xl border border-white/20 rounded-xl p-4">
          <h3 className="font-bold text-sm mb-3 text-blue-400">Navigation</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/private" className="hover:text-blue-400">🏠 Home</Link></li>
            <li><Link href="/dashboard" className="hover:text-blue-400">📊 Dashboard</Link></li>
            <li><Link href="/chat" className="hover:text-blue-400">💬 Chat</Link></li>
            <li><Link href="/upload" className="hover:text-blue-400">📁 Upload</Link></li>
            {canAccessConfig && (
              <li><Link href="/config" className="hover:text-blue-400">⚙️ Config</Link></li>
            )}
            {isMasterAdmin && (
              <li><Link href="/master/config" className="hover:text-blue-400">👑 Master Admin</Link></li>
            )}
            {session?.user && (
              <li>
                <button
                  onClick={() => signOut({ callbackUrl: `${window.location.origin}/` })}
                  className="w-full text-left px-4 py-2 text-sm text-white hover:text-red-400"
                >
                  🚪 Sign Out
                </button>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
