"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Heart } from "lucide-react";
import { loveReasons } from "@/data/loveStory";
import SectionWrapper from "./SectionWrapper";

export default function LoveReasons() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <SectionWrapper
      id="reasons"
      eyebrow="chapter two"
      title="Things I Love About You"
      subtitle="Ten little doors into the many, many reasons you are my favorite person."
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {loveReasons.map((reason, i) => (
          <motion.button
            key={reason.title}
            type="button"
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            initial={{ opacity: 0, y: 30, rotate: i % 2 === 0 ? -2 : 2 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: (i % 6) * 0.08, ease: "easeOut" }}
            whileHover={{ y: -6, scale: 1.02 }}
            aria-expanded={openIndex === i}
            className="glass flex min-h-[170px] flex-col items-start justify-between rounded-2xl p-6 text-left transition-colors hover:border-blush-400/60"
          >
            <span className="flex w-full items-center justify-between">
              <span className="text-2xl" aria-hidden="true">{reason.emoji}</span>
              <ChevronDown size={18} className={`text-blush-500 transition-transform ${openIndex === i ? "rotate-180" : ""}`} />
            </span>
            <span className="mt-5 font-display text-lg font-semibold text-plum-800 dark:text-blush-100">
              {reason.title}
            </span>
            <AnimatePresence initial={false}>
              {openIndex === i && (
                <motion.span
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-3 block overflow-hidden text-sm leading-relaxed text-plum-600 dark:text-blush-200"
                >
                  {reason.message}
                </motion.span>
              )}
            </AnimatePresence>
            <span className="mt-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-blush-500">
              <Heart size={12} fill="currentColor" aria-hidden="true" /> {openIndex === i ? "Close" : "Tap to reveal"}
            </span>
          </motion.button>
        ))}
      </div>
    </SectionWrapper>
  );
}
