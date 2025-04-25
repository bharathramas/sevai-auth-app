'use client';

import dynamicImport from 'next/dynamic';
import Footer from '@/components/Footer';
import Image from 'next/image';

const AuthButtons = dynamicImport(() => import('../components/AuthButtons'), {
  ssr: false,
});

export const dynamic = 'force-dynamic';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-black text-white font-orbitron">
      <div className="flex-grow flex items-center justify-center relative px-6 py-16 text-center">
        {/* Top-right login */}
        <div className="absolute top-6 right-6">
          <AuthButtons />
        </div>

        {/* Optional Logo */}
        {/* <Image
          src="https://sevaiapp.s3.us-east-1.amazonaws.com/ui/images/SevAICloudstormLogoDesign.png"
          alt="SevAI Logo"
          width={64}
          height={64}
          unoptimized
          priority
          className="mx-auto mb-6"
        /> */}

        <div className="max-w-3xl">
          <h1 className="text-4xl sm:text-6xl font-extrabold mb-6 tracking-tight leading-tight bg-gradient-to-r from-blue-500 to-purple-400 text-transparent bg-clip-text">
            Meet SevAI
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 mb-4">
            Your AI-native Enterprise Assistant
          </p>
          <p className="text-md text-zinc-400 max-w-xl mx-auto">
            Built on a modern stack — SevAI helps enterprises intelligently navigate operations, support, and decision-making.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
