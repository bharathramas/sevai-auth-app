// ✅ File: app/config/layout.tsx
import SidebarNav from "@/components/SidebarNav";
import "@/app/globals.css"; // ✅ Adjust path as needed

export const metadata = {
  title: "SevAI Config",
  description: "Customer-specific configuration options for SevAI",
};

export default function ConfigLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex bg-black text-white min-h-screen overflow-hidden">
      <SidebarNav />
      <main className="ml-64 w-full px-6 py-10 bg-gradient-to-b from-black via-zinc-900 to-gray-950 overflow-auto">
        {children}
      </main>
    </div>
  );
}
