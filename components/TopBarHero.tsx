// ✅ File: components/TopBarHero.tsx

"use client";

import { motion } from "framer-motion";
import { Rocket, ShieldCheck, Settings2 } from "lucide-react";
import Image from "next/image";

export default function TopBarHero() {
  return (
    <section className="text-white px-6 py-16 bg-gradient-to-b from-black via-zinc-900 to-gray-950">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-blue-500 to-purple-400 text-transparent bg-clip-text">
          Welcome to SevAI
        </h1>
        <p className="text-zinc-400 mt-4 max-w-2xl mx-auto text-lg">
          Your intelligent assistant for enterprise IT support. Navigate, monitor, and scale operations with AI-native workflows.
        </p>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-zinc-900 border border-zinc-700 p-6 rounded-2xl shadow hover:shadow-blue-500/20 transition-shadow"
        >
          <div className="flex items-center gap-3 mb-4">
            <Rocket className="text-blue-400" />
            <h3 className="text-xl font-semibold">Real-Time Dashboard</h3>
          </div>
          <p className="text-zinc-400 text-sm">
            Monitor ingestion pipelines, query speed, system status — all from a single glass.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-zinc-900 border border-zinc-700 p-6 rounded-2xl shadow hover:shadow-blue-500/20 transition-shadow"
        >
          <div className="flex items-center gap-3 mb-4">
            <Settings2 className="text-blue-400" />
            <h3 className="text-xl font-semibold">Smart Config</h3>
          </div>
          <p className="text-zinc-400 text-sm">
            Configure your organization's AI experience with modular plug-and-play controls.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-zinc-900 border border-zinc-700 p-6 rounded-2xl shadow hover:shadow-blue-500/20 transition-shadow"
        >
          <div className="flex items-center gap-3 mb-4">
            <ShieldCheck className="text-blue-400" />
            <h3 className="text-xl font-semibold">Enterprise-Grade Security</h3>
          </div>
          <p className="text-zinc-400 text-sm">
            With RBAC, audit logs, PII masking and sensitivity levels — SevAI keeps you protected.
          </p>
        </motion.div>
      </div>

      {/* Image Slider with Public Dashboards */}
      <div className="mt-20 overflow-hidden">
        <motion.div
          className="flex gap-6 animate-slide-loop px-6"
          initial={{ x: 0 }}
          animate={{ x: "-100%" }}
          transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
        >
          {[1, 2, 3, 4, 5].map((i) => (
            <Image
              key={i}
              src={`https://images.ctfassets.net/6azqgko1w1r9/6A9iYgx3qyaD2iElWHDKPl/78b35d1bbcb3a1803eb49b85c032eec1/dash${i}.png`}
              alt={`Dashboard ${i}`}
              width={600}
              height={300}
              className="rounded-lg border border-zinc-800 shadow-md"
            />
          ))}
        </motion.div>
      </div>

      {/* Animated Robot or Placeholder Illustration */}
      <div className="mt-20 flex justify-center">
        <Image
          src="https://cdn.dribbble.com/users/29850/screenshots/17216319/media/7d573e33728279012d07d625af34fc02.gif"
          alt="AI Assistant Illustration"
          width={300}
          height={300}
          className="rounded-xl border border-zinc-700 shadow-xl"
        />
      </div>
    </section>
  );
}
