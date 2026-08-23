"use client";

import { motion } from "framer-motion";
import { Heart, RotateCcw } from "lucide-react";
import { finalMessage } from "@/data/loveStory";
import FloatingHearts from "./FloatingHearts";

interface FinalMessageProps {
  onReplay: () => void;
}

export default function FinalMessage({ onReplay }: FinalMessageProps) {
  return (
    <section
      id="final"
      className="relative flex min-h-[80vh] w-full items-center justify-center overflow-hidden bg-gradient-to-b from-[#fff5f8] to-[#ffe4ee] px-5 py-24 text-center dark:from-[#180a2e] dark:to-[#2a1148]"
    >
      <FloatingHearts count={10} />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 mx-auto max-w-lg"
      >
        <Heart size={40} className="mx-auto mb-6 animate-beat text-blush-500" fill="currentColor" />
        <div className="space-y-3">
          {finalMessage.lines.map((line, i) => (
            <motion.p
              key={line}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.25 }}
              className="font-display text-lg text-plum-700 dark:text-blush-100 sm:text-xl"
            >
              {line}
            </motion.p>
          ))}
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-6 font-script text-3xl text-blush-500 dark:text-blush-300"
        >
          {finalMessage.closing}
        </motion.p>

        <motion.button
          type="button"
          onClick={onReplay}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 1.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="glass mt-10 inline-flex items-center gap-2 rounded-full px-7 py-3 font-semibold text-plum-700 dark:text-blush-100"
        >
          <RotateCcw size={18} />
          {finalMessage.replayButtonLabel}
        </motion.button>
      </motion.div>
    </section>
  );
}
