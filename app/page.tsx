'use client';

import dynamicImport from "next/dynamic";
import Footer from "../components/Footer";

const AuthButtons = dynamicImport(() => import("../components/AuthButtons"), { ssr: false });

export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <main className="bg-black text-white flex flex-col min-h-screen">
      <div className="flex-grow flex flex-col items-center justify-center px-6 text-center relative">
        {/* Login/Logout button top-right */}
        <div className="absolute top-6 right-6">
          <AuthButtons />
        </div>

        <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight leading-tight bg-gradient-to-r from-blue-500 to-purple-400 text-transparent bg-clip-text mb-6">
          Meet SevAI
        </h1>

        <p className="text-zinc-400 text-lg sm:text-xl max-w-2xl mb-4 leading-relaxed">
          Your AI-native Enterprise Assistant.
        </p>
        <p className="text-zinc-400 text-lg sm:text-xl max-w-2xl mb-2 leading-relaxed">
          Seamlessly monitor, support, and scale IT operations.
        </p>
        <p className="text-zinc-400 text-lg sm:text-xl max-w-2xl leading-relaxed">
          Multilingual. Secure. Designed for Enterprises.
        </p>
      </div>

      <Footer />
    </main>
  );
}
