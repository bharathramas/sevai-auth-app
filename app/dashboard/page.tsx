'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Bot, BookOpenCheck, History, Gauge, Megaphone, MessageSquare } from "lucide-react";
import { motion, useAnimation } from "framer-motion";
import Header from "@/components/Header";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const { data: session } = useSession();
  const firstName = session?.user?.["custom:first_name"] || session?.user?.name?.split(" ")[0] || "there";
  const controls = useAnimation();
  const [showBubble, setShowBubble] = useState(true);

  useEffect(() => {
    controls.start({
      x: [0, 40, -30, 25, -20, 15, 0],
      y: [0, -10, 8, -6, 4, -2, 0],
      transition: { duration: 4, ease: "easeOut" }
    });

    const timer = setTimeout(() => setShowBubble(false), 5000);
    return () => clearTimeout(timer);
  }, [controls]);

  return (
    <div className="min-h-screen bg-black text-white px-4 sm:px-6 md:px-8 py-10">
      <Header />

      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">Welcome to SevAI Dashboard</h1>
        <p className="text-gray-400 text-base sm:text-lg">Your enterprise AI insights, actions, and agents in one view.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="hover:shadow-xl transition-all backdrop-blur-sm bg-white/10 border border-white/20">
            <CardHeader>
              <CardTitle>Active Tickets</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-primary">128</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="hover:shadow-xl transition-all backdrop-blur-sm bg-white/10 border border-white/20">
            <CardHeader>
              <CardTitle>Flagged Responses</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-destructive">7</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="hover:shadow-xl transition-all backdrop-blur-sm bg-white/10 border border-white/20">
            <CardHeader>
              <CardTitle>Today’s Queries</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-primary">45</p>
            </CardContent>
          </Card>
        </motion.div>

        <Card className="sm:col-span-2 lg:col-span-3 backdrop-blur-sm bg-white/10 border border-white/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5" /> Quick Launch
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <Button variant="secondary" className="flex gap-2"><Bot /> Summarize Tickets</Button>
            <Button variant="secondary" className="flex gap-2"><Gauge /> Detect Anomaly</Button>
            <Button variant="secondary" className="flex gap-2"><BookOpenCheck /> Search Docs</Button>
          </CardContent>
        </Card>
      </div>

      {/* Floating Chat Bot */}
      <motion.div
        className="fixed z-50"
        initial={{ bottom: 16, left: 16 }}
        animate={controls}
        onAnimationComplete={() => controls.start({ bottom: 24, right: 24, left: "auto" })}
      >
        <div
          className="relative flex items-center gap-3 bg-white text-black px-4 py-3 rounded-full shadow-xl hover:shadow-2xl cursor-pointer backdrop-blur-lg bg-opacity-80 border border-white/30 ring-2 ring-blue-500 animate-pulse"
          onClick={() => window.open("https://sevai.co/chat", "_blank")}
        >
          <Image
            src="https://cdn-icons-png.flaticon.com/512/4712/4712040.png"
            alt="Chatbot"
            width={32}
            height={32}
            className="rounded-full"
          />
          <span className="text-sm font-semibold">Welcome {firstName}, Start Chat</span>

          {showBubble && (
            <div className="absolute -top-10 left-0 bg-white text-black text-xs px-3 py-1 rounded-full shadow-lg animate-bounce">
              Hello 👋
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
