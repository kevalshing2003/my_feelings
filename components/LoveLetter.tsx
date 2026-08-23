"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Heart } from "lucide-react";
import { loveLetter } from "@/data/loveStory";
import SectionWrapper from "./SectionWrapper";

export default function LoveLetter() {
  const [open, setOpen] = useState(false);

  return (
    <SectionWrapper
      id="love-letter"
      eyebrow="chapter five"
      title="The Love Letter"
      subtitle={loveLetter.envelopeText}
    >
      <div className="mx-auto flex max-w-lg flex-col items-center">
        <AnimatePresence mode="wait">
          {!open ? (
            <motion.button
              key="envelope"
              type="button"
              onClick={() => setOpen(true)}
              exit={{ opacity: 0, scale: 0.8 }}
              whileHover={{ scale: 1.04, y: -4 }}
              whileTap={{ scale: 0.97 }}
              aria-label="Open the love letter"
              className="group relative flex h-56 w-full max-w-sm items-center justify-center rounded-2xl bg-gradient-to-br from-blush-200 to-plum-200 shadow-xl shadow-plum-300/30 dark:from-plum-700 dark:to-plum-900"
            >
              <div className="absolute inset-x-0 top-0 h-0 w-0 border-l-[9.5rem] border-r-[9.5rem] border-t-[6.5rem] border-l-transparent border-r-transparent border-t-blush-300 transition-transform duration-300 group-hover:-translate-y-1 dark:border-t-plum-600" />
              <Mail
                size={40}
                className="relative z-10 text-plum-600 transition-transform group-hover:scale-110 dark:text-blush-100"
              />
              <span className="absolute bottom-4 font-script text-lg text-plum-700 dark:text-blush-100">
                tap to open
              </span>
            </motion.button>
          ) : (
            <motion.div
              key="letter"
              initial={{ opacity: 0, y: 40, rotateX: -20 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="glass w-full rounded-2xl p-8 sm:p-10"
            >
              <Heart
                size={24}
                className="mx-auto mb-4 text-blush-400"
                fill="currentColor"
                aria-hidden="true"
              />
              <p className="mb-4 font-script text-2xl text-plum-700 dark:text-blush-100">
                {loveLetter.salutation}
              </p>
              <div className="space-y-4">
                {loveLetter.paragraphs.map((para, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.25 }}
                    className="text-sm leading-relaxed text-plum-700 dark:text-blush-50 sm:text-base"
                  >
                    {para}
                  </motion.p>
                ))}
              </div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 + loveLetter.paragraphs.length * 0.25 + 0.3 }}
                className="mt-6 text-right font-script text-2xl text-blush-500 dark:text-blush-300"
              >
                — {loveLetter.signature}
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SectionWrapper>
  );
}
