"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface Section {
  key: string;
  title: string;
}

interface ConfigSliderProps {
  sections: Section[];
  renderSection: (sectionKey: string) => React.ReactNode;
  showDots?: boolean;
  className?: string;
}

export default function ConfigSlider({
  sections,
  renderSection,
  showDots = true,
  className = "",
}: ConfigSliderProps) {
  const [step, setStep] = useState(0);
  const current = sections[step];

  return (
    <div className={cn("relative w-full max-w-4xl mx-auto", className)}>
      <AnimatePresence mode="wait">
        <motion.div
          key={current.key}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.4 }}
          className="rounded-xl bg-zinc-900 border border-zinc-700 p-6 shadow-lg"
        >
          <h2 className="text-2xl font-semibold text-white mb-4">
            {current.title}
          </h2>
          {renderSection(current.key)}
        </motion.div>
      </AnimatePresence>

      {showDots && (
        <div className="mt-6 flex justify-center space-x-3">
          {sections.map((s, i) => (
            <button
              key={s.key}
              onClick={() => setStep(i)}
              className={cn(
                "w-3 h-3 rounded-full transition-colors",
                i === step
                  ? "bg-blue-500"
                  : "bg-zinc-600 hover:bg-zinc-400"
              )}
              title={s.title}
            />
          ))}
        </div>
      )}
    </div>
  );
}
