"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import confetti from "canvas-confetti";
import { proposal } from "@/data/loveStory";
import FloatingHearts from "./FloatingHearts";

interface ProposalProps {
  inView: boolean;
  answered: boolean;
  onAnswer: (choice: "A" | "B") => void;
}

type Phase = "idle" | "buildup" | "realization" | "statement" | "question" | "celebrate";

export default function Proposal({ inView, answered, onAnswer }: ProposalProps) {
  const [phase, setPhase] = useState<Phase>(answered ? "celebrate" : "idle");
  const [lineIndex, setLineIndex] = useState(0);

  useEffect(() => {
    if (!inView || answered || phase !== "idle") return;
    const t = setTimeout(() => setPhase("buildup"), 400);
    return () => clearTimeout(t);
  }, [inView, answered, phase]);

  useEffect(() => {
    if (phase !== "buildup") return;
    if (lineIndex >= proposal.buildupLines.length) {
      const t = setTimeout(() => setPhase("realization"), 900);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setLineIndex((i) => i + 1), 1100);
    return () => clearTimeout(t);
  }, [phase, lineIndex]);

  useEffect(() => {
    if (phase !== "realization") return;
    const t = setTimeout(() => setPhase("statement"), 1800);
    return () => clearTimeout(t);
  }, [phase]);

  useEffect(() => {
    if (phase !== "statement") return;
    const t = setTimeout(() => setPhase("question"), 2600);
    return () => clearTimeout(t);
  }, [phase]);

  const fireConfetti = useCallback(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const duration = 2500;
    const end = Date.now() + duration;
    const colors = ["#ff6fa3", "#a855f7", "#ff4d84", "#ffffff"];

    (function frame() {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 70,
        origin: { x: 0 },
        colors,
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 70,
        origin: { x: 1 },
        colors,
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();

    confetti({
      particleCount: 140,
      spread: 100,
      origin: { y: 0.6 },
      colors,
    });
  }, []);

  const handleAnswer = (choice: "A" | "B") => {
    setPhase("celebrate");
    fireConfetti();
    onAnswer(choice);
  };

  return (
    <section
      id="proposal"
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-gradient-to-b from-[#1c0a30] via-[#2a1148] to-[#180a2e] px-5 py-24 text-center"
    >
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blush-500/20 blur-[130px] animate-pulse-glow"
      />
      <FloatingHearts count={18} variant="mixed" />

      <div className="relative z-10 mx-auto max-w-xl">
        <AnimatePresence mode="wait">
          {phase === "buildup" && (
            <motion.div key="buildup" className="space-y-4">
              {proposal.buildupLines.slice(0, lineIndex).map((line, i) => (
                <motion.p
                  key={line}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: i === lineIndex - 1 ? 1 : 0.35, y: 0 }}
                  transition={{ duration: 0.7 }}
                  className="font-script text-2xl text-blush-100 sm:text-3xl"
                >
                  {line}
                </motion.p>
              ))}
            </motion.div>
          )}

          {phase === "realization" && (
            <motion.p
              key="realization"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="font-display text-2xl font-semibold text-blush-100 sm:text-3xl"
            >
              {proposal.realization}
            </motion.p>
          )}

          {phase === "statement" && (
            <motion.p
              key="statement"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className="glow-text font-display text-3xl font-extrabold leading-tight text-white sm:text-5xl"
            >
              {proposal.bigStatement}
            </motion.p>
          )}

          {phase === "question" && (
            <motion.div key="question" className="space-y-8">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="font-script text-2xl text-blush-100 sm:text-3xl"
              >
                {proposal.questionIntro}
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4, type: "spring" }}
                className="glow-text font-display text-3xl font-extrabold leading-tight text-white sm:text-5xl"
              >
                {proposal.question}
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.1 }}
                className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row"
              >
                <motion.button
                  type="button"
                  onClick={() => handleAnswer("A")}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.94 }}
                  animate={{ scale: [1, 1.04, 1] }}
                  transition={{ scale: { duration: 1.6, repeat: Infinity } }}
                  className="glow-ring rounded-full bg-gradient-to-r from-blush-500 to-garnet-500 px-9 py-4 font-display text-lg font-bold text-white"
                >
                  {proposal.optionA}
                </motion.button>
                <motion.button
                  type="button"
                  onClick={() => handleAnswer("B")}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.94 }}
                  className="glow-ring rounded-full bg-gradient-to-r from-plum-500 to-blush-500 px-9 py-4 font-display text-lg font-bold text-white"
                >
                  {proposal.optionB}
                </motion.button>
              </motion.div>
            </motion.div>
          )}

          {phase === "celebrate" && (
            <motion.div
              key="celebrate"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, type: "spring" }}
              className="space-y-5"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.2, repeat: Infinity }}
              >
                <Heart size={56} className="mx-auto text-blush-400" fill="currentColor" />
              </motion.div>
              <h2 className="glow-text font-display text-2xl font-extrabold leading-tight text-white sm:text-4xl">
                {proposal.celebrationMessage}
              </h2>
              <p className="font-script text-2xl text-blush-100 sm:text-3xl">
                {proposal.afterMessage}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
