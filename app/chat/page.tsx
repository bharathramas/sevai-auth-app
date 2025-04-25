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
  const tenantId = session?.user?.["custom:tenant_id"] || "public";
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const [showBubble, setShowBubble] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowBubble(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/search`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: input, tenant_id: tenantId })
      });

      const data = await response.json();
      const resultText = data.results?.[0]?.text || "No relevant results found.";
      const docCount = data.doc_count || 0;
      const responseTime = data.response_time_ms || 0;
      const aiMessage = {
        role: "ai",
        text: `${resultText}\n\n📊 Results: ${docCount} • ⏱ ${responseTime}ms`,
        showActions: true
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.error("Search error:", err);
      setMessages((prev) => [...prev, { role: "ai", text: "⚠️ Error fetching results.", showActions: true }]);
    } finally {
      setInput("");
    }
  };

  const regenerateMessage = (index: number) => {
    const updated = [...messages];
    updated[index].text = "Thinking again...";
    setMessages(updated);
  };

  return (
    <div className="min-h-screen flex flex-col bg-black text-white font-sans">
      <Header />

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
