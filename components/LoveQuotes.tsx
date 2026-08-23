"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Quote } from "lucide-react";
import { quotes } from "@/data/loveStory";
import SectionWrapper from "./SectionWrapper";

export default function LoveQuotes() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % quotes.length);
    }, 5200);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <SectionWrapper id="love-quotes" eyebrow="chapter three" title="A Few Things I Know">
      <div className="relative mx-auto max-w-3xl overflow-hidden rounded-[2rem] border border-blush-300/30 bg-gradient-to-br from-[#fff8fb] via-[#f8effb] to-[#ffe4ee] px-7 py-14 text-center shadow-[0_24px_80px_rgba(122,60,196,0.16)] dark:from-plum-900 dark:via-[#241033] dark:to-[#3a153f] sm:px-16">
        <Quote className="mx-auto mb-7 text-blush-400" size={34} fill="currentColor" aria-hidden="true" />
        <div className="min-h-[130px]">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={quotes[index]}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.6 }}
              className="font-display text-2xl font-semibold leading-tight text-plum-800 dark:text-blush-100 sm:text-4xl"
            >
              “{quotes[index]}”
            </motion.blockquote>
          </AnimatePresence>
        </div>
        <p className="mt-8 font-script text-2xl text-blush-500 dark:text-blush-300">One more thing, Chinky...</p>
        <div className="mt-6 flex justify-center gap-2" aria-label="Quote selector">
          {quotes.map((quote, quoteIndex) => (
            <button key={quote} type="button" onClick={() => setIndex(quoteIndex)} aria-label={`Show quote ${quoteIndex + 1}`} className={`h-2 rounded-full transition-all ${quoteIndex === index ? "w-8 bg-blush-500" : "w-2 bg-blush-200 dark:bg-plum-600"}`} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}