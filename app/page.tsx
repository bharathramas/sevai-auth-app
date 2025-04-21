'use client';
import dynamicImport from "next/dynamic";
const AuthButtons = dynamicImport(() => import("../components/AuthButtons"), { ssr: false });


export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <div className="bg-black text-white px-6 py-8 relative">
      {/* Login/Logout button top-right */}
      <div className="absolute top-6 right-6">
        <AuthButtons />
      </div>

      <div className="text-center mt-12">
        <h1 className="text-4xl sm:text-6xl font-extrabold mb-6 tracking-tight leading-tight">
          Meet <span className="text-blue-500">SevAI</span><br />Your AI-native Enterprise Assistant
        </h1>
        <p className="text-lg sm:text-xl text-gray-300 mb-8">
          Built on a modern stack — SevAI helps enterprises intelligently navigate operations, support, and decision-making.
        </p>
      </div>
    </div>
  );
}
