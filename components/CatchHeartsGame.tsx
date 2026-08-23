"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import { catchHeartsGame } from "@/data/loveStory";
import SectionWrapper from "./SectionWrapper";

interface FallingHeart {
  id: number;
  left: number;
  duration: number;
  size: number;
  delay: number;
}

interface CatchHeartsGameProps {
  onComplete: () => void;
  completed: boolean;
  onContinue: () => void;
}

let heartId = 0;

export default function CatchHeartsGame({
  onComplete,
  completed,
  onContinue,
}: CatchHeartsGameProps) {
  const [active, setActive] = useState(false);
  const [hearts, setHearts] = useState<FallingHeart[]>([]);
  const [collected, setCollected] = useState(completed ? catchHeartsGame.targetCount : 0);
  const [won, setWon] = useState(completed);
  const containerRef = useRef<HTMLDivElement>(null);
  const spawnRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const spawnHeart = useCallback(() => {
    setHearts((prev) => [
      ...prev,
      {
        id: heartId++,
        left: 5 + Math.random() * 85,
        duration: 4.5 + Math.random() * 2.5,
        size: 26 + Math.random() * 20,
        delay: 0,
      },
    ]);
  }, []);

  useEffect(() => {
    if (!active || won) return;
    spawnRef.current = setInterval(spawnHeart, 550);
    return () => {
      if (spawnRef.current) clearInterval(spawnRef.current);
    };
  }, [active, won, spawnHeart]);

  const catchHeart = (id: number) => {
    setHearts((prev) => prev.filter((h) => h.id !== id));
    setCollected((c) => {
      const next = c + 1;
      if (next >= catchHeartsGame.targetCount) {
        setWon(true);
        setActive(false);
        onComplete();
      }
      return next;
    });
  };

  const removeHeart = (id: number) => {
    setHearts((prev) => prev.filter((h) => h.id !== id));
  };

  const startGame = () => {
    setActive(true);
    setCollected(0);
    setWon(false);
    setHearts([]);
  };

  return (
    <SectionWrapper
      id="catch-hearts"
      eyebrow="chapter four, part two"
      title="Catch the Hearts"
      subtitle="Tap or click the falling hearts before they disappear."
    >
      <div className="mx-auto max-w-2xl">
        <div className="mb-4 flex items-center justify-between text-sm font-medium text-plum-600 dark:text-blush-200">
          <span>
            {catchHeartsGame.counterLabel}{" "}
            <span className="font-display text-lg font-bold text-blush-600 dark:text-blush-300">
              {collected}
            </span>
          </span>
          <span>{catchHeartsGame.targetLabel}</span>
        </div>

        <div className="mb-4 h-2 w-full overflow-hidden rounded-full bg-plum-100 dark:bg-plum-800">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-blush-500 to-plum-500"
            animate={{
              width: `${Math.min((collected / catchHeartsGame.targetCount) * 100, 100)}%`,
            }}
            transition={{ duration: 0.3 }}
          />
        </div>

        <div
          ref={containerRef}
          className="glass relative h-[420px] w-full touch-none overflow-hidden rounded-3xl"
        >
          <AnimatePresence>
            {!active && !won && (
              <motion.div
                key="start"
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 p-6 text-center"
              >
                <Heart size={40} className="text-blush-400" fill="currentColor" />
                <p className="text-sm text-plum-600 dark:text-blush-200">
                  Ready to catch some hearts?
                </p>
                <motion.button
                  type="button"
                  onClick={startGame}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="rounded-full bg-gradient-to-r from-blush-500 to-plum-500 px-7 py-3 font-semibold text-white"
                >
                  Start Game
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          {active &&
            hearts.map((h) => (
              <motion.button
                key={h.id}
                type="button"
                aria-label="Catch heart"
                initial={{ top: "-8%" }}
                animate={{ top: "108%" }}
                transition={{ duration: h.duration, ease: "linear" }}
                onAnimationComplete={() => removeHeart(h.id)}
                onClick={() => catchHeart(h.id)}
                onTouchStart={() => catchHeart(h.id)}
                className="absolute z-0 -translate-x-1/2 cursor-pointer"
                style={{ left: `${h.left}%` }}
              >
                <Heart
                  size={h.size}
                  className="text-blush-500 drop-shadow-[0_0_8px_rgba(255,77,132,0.6)] transition-transform hover:scale-125"
                  fill="currentColor"
                />
              </motion.button>
            ))}

          <AnimatePresence>
            {won && (
              <motion.div
                key="won"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-white/40 p-6 text-center backdrop-blur-sm dark:bg-plum-900/40"
              >
                <Heart size={44} className="animate-beat text-blush-500" fill="currentColor" />
                <p className="max-w-sm font-script text-2xl text-plum-700 dark:text-blush-100">
                  {catchHeartsGame.successMessage}
                </p>
                <motion.button
                  type="button"
                  onClick={onContinue}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-2 rounded-full bg-gradient-to-r from-blush-500 to-plum-500 px-7 py-3 font-semibold text-white"
                >
                  {catchHeartsGame.continueButtonLabel}
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </SectionWrapper>
  );
}
