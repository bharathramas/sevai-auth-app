'use client';

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import Header from "@/components/Header";
import Link from "next/link";
import Image from "next/image";
import { Menu, RefreshCw, ThumbsUp, ThumbsDown } from "lucide-react";

export default function ChatPage() {
  const { data: session } = useSession();
  const firstName = session?.user?.["custom:first_name"] || session?.user?.name?.split(" ")[0] || "there";
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const [showBubble, setShowBubble] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowBubble(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMessage = { role: "user", text: input };
    setMessages([...messages, newMessage, { role: "ai", text: "Let me think about that...", showActions: true }]);
    setInput("");
  };

  const regenerateMessage = (index: number) => {
    const updated = [...messages];
    updated[index].text = "Thinking again...";
    setMessages(updated);
  };

  return (
    <div className="min-h-screen flex flex-col bg-black text-white font-orbitron">
      <Header />

      {/* Floating Nav Menu */}
      <div className="fixed top-4 right-4 z-50 group">
        <div className="bg-zinc-900 p-2 rounded-full border border-white/20 hover:bg-zinc-800 cursor-pointer">
          <Menu className="w-6 h-6 text-white" />
        </div>
        <div className="absolute top-10 right-0 w-64 bg-white/10 backdrop-blur-md text-white shadow-xl border border-white/20 rounded-xl p-4 transition-all duration-500 ease-out opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100">
          <h3 className="font-bold text-sm mb-3 text-blue-400">Navigation</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/private" className="hover:text-blue-400 transition-colors duration-300">🏠 Home</Link></li>
            <li><Link href="/dashboard" className="hover:text-blue-400 transition-colors duration-300">📊 Dashboard</Link></li>
            <li><Link href="/chat" className="hover:text-blue-400 transition-colors duration-300">💬 Chat</Link></li>
            <li><Link href="/upload" className="hover:text-blue-400 transition-colors duration-300">📁 Upload</Link></li>
            <li><Link href="/config" className="hover:text-blue-400 transition-colors duration-300">⚙️ Config</Link></li>
            <li><Link href="/master/config" className="hover:text-blue-400 transition-colors duration-300">👑 Master Admin</Link></li>
          </ul>
        </div>
      </div>

      <div className="flex-1 px-4 sm:px-6 md:px-8 py-6 space-y-4 overflow-y-auto backdrop-blur-sm bg-white/5">
        <h2 className="text-2xl font-bold mb-4">Welcome {firstName}, Ask me anything</h2>

        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-xl px-4 py-3 max-w-xl space-y-2 ${
              msg.role === "user" ? "bg-blue-600 ml-auto" : "bg-white text-black mr-auto"
            }`}
          >
            <p>{msg.text}</p>
            {msg.role === "ai" && msg.showActions && (
              <div className="flex items-center gap-3 mt-2 text-sm">
                <button onClick={() => regenerateMessage(i)} className="flex items-center gap-1 text-blue-600 hover:underline">
                  <RefreshCw className="w-4 h-4" /> Regenerate
                </button>
                <div className="flex gap-2 ml-auto">
                  <ThumbsUp className="w-4 h-4 hover:text-green-500 cursor-pointer" />
                  <ThumbsDown className="w-4 h-4 hover:text-red-500 cursor-pointer" />
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <div className="sticky bottom-0 w-full border-t border-white/20 backdrop-blur-lg bg-black/80 px-4 py-4">
        <div className="max-w-4xl mx-auto flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
            placeholder="Type your question..."
            className="flex-1 px-4 py-2 bg-white/10 text-white rounded-md outline-none border border-white/20"
          />
          <button
            onClick={sendMessage}
            className="px-5 py-2 bg-blue-600 rounded-md hover:bg-blue-500 transition"
          >
            Send
          </button>
        </div>
      </div>

      {/* Floating Chat Bubble */}
      <motion.div
        className="fixed z-50 bottom-6 left-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Link href="/chat">
          <div className="relative flex items-center gap-3 bg-white text-black px-4 py-3 rounded-full shadow-2xl cursor-pointer backdrop-blur-lg bg-opacity-80 border border-white/30 ring-2 ring-blue-500 hover:ring-blue-400 transition-all">
            <Image src="https://cdn-icons-png.flaticon.com/512/4712/4712040.png" alt="Chatbot" width={32} height={32} className="rounded-full" />
            <span className="text-sm font-semibold">Start Chat</span>
            {showBubble && (
              <div className="absolute -top-10 left-0 bg-white text-black text-xs px-3 py-1 rounded-full shadow-lg animate-bounce">
                Hello 👋
              </div>
            )}
          </div>
        </Link>
      </motion.div>
    </div>
  );
}
