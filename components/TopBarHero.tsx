// components/TopBarHero.tsx
"use client";

import { motion } from "framer-motion";
import { Rocket, ShieldCheck, Settings2 } from "lucide-react";
import Image from "next/image";

export default function TopBarHero() {
  return (
    <section className="text-white pt-40 pb-24 px-6 bg-gradient-to-b from-black via-zinc-900 to-gray-950 relative overflow-hidden">
      <div className="max-w-6xl mx-auto text-center">
        <Image
          src="https://sevaiapp.s3.us-east-1.amazonaws.com/ui/images/SevAICloudstormLogoDesign.png"
          alt="SevAI Logo"
          width={80}
          height={80}
          className="mx-auto mb-6"
        />

        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-blue-500 to-purple-400 text-transparent bg-clip-text">
          Welcome to SevAI
        </h1>
        <p className="mt-4 text-sm text-blue-500 font-semibold uppercase tracking-wide">
          Built for Enterprise, Designed for Intelligence — Modular & Multilingual
        </p>
        <p className="text-zinc-400 mt-6 max-w-3xl mx-auto text-lg leading-relaxed">
          SevAI is your intelligent co-pilot for IT support and enterprise operations.
          Built on modular, secure AI pipelines, it unifies documents, logs, and data into a seamless search experience — across languages, systems, and domains.
        </p>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mt-16">
        <FeatureCard icon={<Rocket className="text-blue-400" />} title="Real-Time Dashboard" description="Monitor ingestion pipelines, search usage, and live data health." />
        <FeatureCard icon={<Settings2 className="text-blue-400" />} title="Modular Configuration" description="Customize AI behavior and connectors by role and department." />
        <FeatureCard icon={<ShieldCheck className="text-blue-400" />} title="Security First" description="PII masking, RBAC, and audit-ready logs built in from day one." />
      </div>

      {/* Dashboard Grid */}
      <div className="mt-24 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Image
            key={i}
            src={`https://images.ctfassets.net/6azqgko1w1r9/6A9iYgx3qyaD2iElWHDKPl/78b35d1bbcb3a1803eb49b85c032eec1/dash${(i % 5) + 1}.png`}
            alt={`Preview ${i}`}
            width={400}
            height={250}
            className="rounded-xl border border-zinc-800 shadow-md hover:scale-105 transition-transform duration-300"
          />
        ))}
      </div>

      {/* Floating Robot Assistant */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5, x: "-50%", y: "-50%" }}
        animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
        transition={{ duration: 2 }}
        className="fixed bottom-8 right-8 z-40 pointer-events-none"
      >
        <Image
          src="https://cdn.dribbble.com/users/29850/screenshots/17216319/media/7d573e33728279012d07d625af34fc02.gif"
          alt="AI Assistant"
          width={140}
          height={140}
          className="rounded-full opacity-90"
        />
      </motion.div>
    </section>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
      className="bg-zinc-900 border border-zinc-700 p-6 rounded-2xl shadow hover:shadow-blue-500/20 transition-shadow"
    >
      <div className="flex items-center gap-3 mb-4">
        {icon}
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      <p className="text-zinc-400 text-sm">{description}</p>
    </motion.div>
  );
}
