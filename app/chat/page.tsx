'use client';

import { useState } from "react";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import Header from "@/components/Header";

export default function ChatPage() {
  const { data: session } = useSession();
  const firstName = session?.user?.["custom:first_name"] || session?.user?.name?.split(" ")[0] || "there";
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<any[]>([]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMessage = { role: "user", text: input };
    setMessages([...messages, newMessage, { role: "ai", text: "Let me think about that..." }]);
    setInput("");
  };

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Header />

      <div className="flex-1 px-4 sm:px-6 md:px-8 py-6 space-y-4 overflow-y-auto backdrop-blur-sm bg-white/5">
        <h2 className="text-xl font-semibold mb-4">Chat with SevAI</h2>

        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-xl px-4 py-3 max-w-xl ${
              msg.role === "user" ? "bg-blue-600 ml-auto" : "bg-white text-black mr-auto"
            }`}
          >
            {msg.text}
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
    </div>
  );
}
