// ✅ File: app/config/layout.tsx
'use client';

import SidebarNav from '@/components/SidebarNav';
import '@/app/globals.css';
import { createContext, useContext, useState } from 'react';

export const SidebarContext = createContext({
  collapsed: true,
  toggle: () => {},
});

export default function ConfigLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <SidebarContext.Provider value={{ collapsed, toggle: () => setCollapsed(!collapsed) }}>
      <div className="flex bg-black text-white min-h-screen overflow-hidden">
        <SidebarNav />
        <main
          className={`transition-all duration-300 ease-in-out px-6 py-10 bg-gradient-to-b from-black via-zinc-900 to-gray-950 overflow-auto ${
            collapsed ? 'ml-16' : 'ml-64'
          } w-full`}
        >
          {children}
        </main>
      </div>
    </SidebarContext.Provider>
  );
}
