// ✅ File: app/private/page.tsx

"use client";

import Header from "@/components/Header";
import TopBarHero from "@/components/TopBarHero";

export default function PrivatePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-gray-950">
        <TopBarHero />
      </main>
    </>
  );
}
