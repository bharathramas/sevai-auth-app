'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  Bot,
  BookOpenCheck,
  History,
  Gauge,
  Megaphone,
  ChevronRight
} from "lucide-react";
import { motion, useAnimation } from "framer-motion";
import Header from "@/components/Header";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer
} from "recharts";

const ticketData = [
  { date: 'Apr 1', count: 24 },
  { date: 'Apr 2', count: 18 },
  { date: 'Apr 3', count: 36 },
  { date: 'Apr 4', count: 32 },
  { date: 'Apr 5', count: 40 },
  { date: 'Apr 6', count: 28 },
  { date: 'Apr 7', count: 44 },
];

const anomalyData = [
  { type: 'Latency Spike', value: 12 },
  { type: 'PII Trigger', value: 8 },
  { type: 'Incomplete Data', value: 5 },
];

const feedbackData = [
  { name: 'Positive', value: 76 },
  { name: 'Negative', value: 24 },
];

const COLORS = ['#00C49F', '#FF8042'];

export default function DashboardPage() {
  const { data: session } = useSession();
  const firstName = session?.user?.["custom:first_name"] || session?.user?.name?.split(" ")[0] || "there";
  const role = session?.user?.["custom:role"] || "customer_user";
  const controls = useAnimation();
  const [showBubble, setShowBubble] = useState(true);
  const [collapsed, setCollapsed] = useState(true);
  const [chartSlide, setChartSlide] = useState(0);

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
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex">
      <div className={`fixed top-0 right-0 h-full z-50 bg-black/70 backdrop-blur-xl border-l border-white/10 transition-all duration-500 ease-in-out ${collapsed ? 'w-16' : 'w-64'}`}>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute top-4 left-2 text-white text-xs bg-zinc-800 px-2 py-1 rounded hover:bg-zinc-700"
        >
          {collapsed ? '▶' : '◀'}
        </button>
        {!collapsed && <Header />}
      </div>

      <div className={`flex-1 px-4 sm:px-6 md:px-8 py-10 transition-all duration-500 ${collapsed ? 'lg:mr-16' : 'lg:mr-64'}`}>
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-white drop-shadow-lg">Welcome to SevAI Dashboard</h1>
          <p className="text-gray-300 text-base sm:text-lg">Your enterprise AI insights, actions, and agents in one view.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card><CardHeader><CardTitle>Active Tickets</CardTitle></CardHeader><CardContent><p className="text-3xl font-bold text-blue-400">128</p></CardContent></Card>
          <Card><CardHeader><CardTitle>Flagged Responses</CardTitle></CardHeader><CardContent><p className="text-3xl font-bold text-red-400">7</p></CardContent></Card>
          <Card><CardHeader><CardTitle>Today’s Queries</CardTitle></CardHeader><CardContent><p className="text-3xl font-bold text-purple-400">45</p></CardContent></Card>

          <Card><CardHeader><CardTitle><History className="inline w-5 h-5 mr-2" />Recent Queries</CardTitle></CardHeader><CardContent>
            <ul className="space-y-2 text-sm">
              <li>“Why did integration X fail?” – Relevance: 5</li>
              <li>“Last month’s claim trends” – Relevance: 4</li>
              <li>“Document with ID 3294” – Relevance: 3</li>
            </ul>
          </CardContent></Card>

          {role === "customer_admin" && (
            <Card><CardHeader><CardTitle><Gauge className="inline w-5 h-5 mr-2" />System Status</CardTitle></CardHeader><CardContent>
              <p className="text-sm">Titan Latency: <strong>89ms</strong></p>
              <p className="text-sm">OpenSearch Docs: <strong>104,232</strong></p>
              <p className="text-sm">Snapshots: <strong>Enabled</strong></p>
            </CardContent></Card>
          )}

          <Card className="sm:col-span-2 lg:col-span-3"><CardHeader><CardTitle><Megaphone className="inline w-5 h-5 mr-2" />Tips & Updates</CardTitle></CardHeader><CardContent>
            <ul className="text-sm list-disc list-inside">
              <li>Explore LangGraph workflows for agents.</li>
              <li>Review flagged responses weekly for quality.</li>
              <li>Use the /chat interface for deep document search.</li>
            </ul>
          </CardContent></Card>
        </div>

        {/* Chart Slider */}
        <div className="mt-12 relative">
          <h2 className="text-lg font-semibold mb-4 text-white">Analytics Overview</h2>
          <div className="overflow-hidden rounded-lg border border-white/10 backdrop-blur-md">
            <div className="flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${chartSlide * 100}%)` }}>
              {/* Slide 1 */}
              <div className="min-w-full grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
                <Card className="bg-blue-800 text-white p-4">
                  <CardHeader><CardTitle>📈 Ticket Volume</CardTitle></CardHeader>
                  <CardContent className="h-40">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={ticketData}>
                        <defs>
                          <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="date" stroke="#ccc" />
                        <YAxis stroke="#ccc" />
                        <Tooltip />
                        <Area type="monotone" dataKey="count" stroke="#8884d8" fillOpacity={1} fill="url(#colorCount)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card className="bg-purple-800 text-white p-4">
                  <CardHeader><CardTitle>📊 Anomaly Breakdown</CardTitle></CardHeader>
                  <CardContent className="h-40">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={anomalyData}><XAxis dataKey="type" stroke="#ccc" /><YAxis stroke="#ccc" /><Tooltip /><Bar dataKey="value" fill="#c084fc" /></BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              {/* Slide 2 */}
              <div className="min-w-full grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
                <Card className="bg-green-800 text-white p-4">
                  <CardHeader><CardTitle>🍩 Feedback Summary</CardTitle></CardHeader>
                  <CardContent className="h-40">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={feedbackData} cx="50%" cy="50%" outerRadius={60} fill="#8884d8" dataKey="value">
                          {feedbackData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card className="bg-yellow-600 text-white p-4">
                  <CardHeader><CardTitle>☁️ Top Query Terms</CardTitle></CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 text-sm">
                      {["integration", "claim", "latency", "summary", "trend", "fail", "escalate"].map((word, i) => (
                        <span key={i} className="bg-yellow-200 px-2 py-1 rounded-full shadow text-black">{word}</span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Slide Controls */}
          <button
            onClick={() => setChartSlide((chartSlide + 1) % 2)}
            className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-zinc-800 text-white p-2 rounded-full"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          <div className="absolute top-2 right-2 flex flex-col space-y-2">
            {[0, 1].map((dot) => (
              <span key={dot} className={`w-2 h-2 rounded-full ${chartSlide === dot ? "bg-blue-400" : "bg-zinc-600"}`} />
            ))}
          </div>
        </div>

        {/* Floating Chat Bot */}
        <motion.div
          className="fixed z-50"
          initial={{ bottom: 16, left: 16 }}
          animate={controls}
          onAnimationComplete={() => controls.start({ bottom: 24, right: 24, left: "auto", transition: { duration: 3.5 } })}
        >
          <Link href="/chat">
            <div className="relative flex items-center gap-3 bg-white text-black px-4 py-3 rounded-full shadow-2xl cursor-pointer backdrop-blur-lg bg-opacity-80 border border-white/30 ring-2 ring-blue-500 hover:ring-blue-400 transition-all">
              <Image src="https://cdn-icons-png.flaticon.com/512/4712/4712040.png" alt="Chatbot" width={32} height={32} className="rounded-full" />
              <span className="text-sm font-semibold">Welcome {firstName}, Start Chat</span>
              {showBubble && (
                <div className="absolute -top-10 left-0 bg-white text-black text-xs px-3 py-1 rounded-full shadow-lg animate-bounce">
                  Hello 👋
                </div>
              )}
            </div>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
