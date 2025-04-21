'use client';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="bg-black text-white px-6 py-8 relative">
      {/* Login button top-right */}
      <div className="absolute top-6 right-6">
        <Link
          href="/login"
          className="bg-white text-black text-sm px-4 py-2 rounded-full shadow hover:bg-gray-200 transition"
        >
          Login
        </Link>
      </div>

      <div className="text-center mt-12">
        <h1 className="text-4xl sm:text-6xl font-extrabold mb-6 tracking-tight leading-tight">
          Meet <span className="text-blue-500">SevAI</span><br />Your AI-native IT Assistant
        </h1>
        <p className="text-lg sm:text-xl text-gray-300 mb-8">
          Built on a modern stack — SevAI helps enterprises intelligently navigate operations, support, and decision-making.
        </p>
        <a
          href="https://app.sevai.co"
          className="inline-block bg-white text-black text-sm px-5 py-3 rounded-full shadow hover:bg-gray-200 transition"
        >
          <span className="font-semibold">Coming Soon at</span> app.sevai.co
        </a>
      </div>
    </div>
  );
}
