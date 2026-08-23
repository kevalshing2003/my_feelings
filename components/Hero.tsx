"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import FloatingHearts from "./FloatingHearts";
import { landing } from "@/data/loveStory";

interface HeroProps {
  onOpen: () => void;
  closing: boolean;
}

export default function Hero({ onOpen, closing }: HeroProps) {
  return (
    <AnimatePresence>
      {!closing && (
        <motion.section
          key="hero"
          exit={{
            opacity: 0,
            scale: 1.15,
            filter: "blur(12px)",
            transition: { duration: 0.9, ease: [0.65, 0, 0.35, 1] },
          }}
          className="fixed inset-0 z-30 flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#fff5f8] via-[#ffe4ee] to-[#f6f1fb] dark:from-[#130621] dark:via-[#1c0a30] dark:to-[#2a1148]"
        >
          {/* Glowing ambient orbs */}
          <div
            aria-hidden="true"
            className="absolute -left-24 top-1/4 h-72 w-72 rounded-full bg-blush-300/40 blur-[100px] animate-pulse-glow"
          />
          <div
            aria-hidden="true"
            className="absolute -right-20 bottom-1/4 h-80 w-80 rounded-full bg-plum-400/30 blur-[110px] animate-pulse-glow"
            style={{ animationDelay: "1.2s" }}
          />

          <FloatingHearts count={16} variant="mixed" />

          <div className="relative z-10 mx-auto flex max-w-lg flex-col items-center px-6 text-center">
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 120, damping: 10, delay: 0.2 }}
              className="mb-6"
            >
              <Heart size={48} className="animate-beat text-blush-500" fill="currentColor" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="font-display text-4xl font-bold text-plum-800 dark:text-blush-100 sm:text-5xl"
            >
              {landing.greeting}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-4 font-script text-2xl text-plum-600 dark:text-blush-200 sm:text-3xl"
            >
              {landing.subtitle}
            </motion.p>

            <motion.button
              type="button"
              onClick={onOpen}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.3 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              className="glow-ring mt-10 rounded-full bg-gradient-to-r from-blush-500 via-garnet-500 to-plum-500 px-9 py-4 font-display text-lg font-semibold text-white shadow-lg shadow-blush-300/50"
            >
              {landing.buttonLabel}
            </motion.button>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 2 }}
              className="mt-8 text-xs uppercase tracking-[0.3em] text-plum-400 dark:text-plum-300"
            >
              scroll-free · just tap and feel
            </motion.p>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
