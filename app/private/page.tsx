// app/private/page.tsx
'use client';

import Header from '@/components/Header';
import TopBarHero from '@/components/TopBarHero';
import Footer from '@/components/Footer';

export default function PrivateHome() {
  return (
    <main className="bg-black text-white min-h-screen flex flex-col font-sans">
      <Header />
      <div className="flex-grow">
        <TopBarHero />
      </div>
      <Footer />
    </main>
  );
}
