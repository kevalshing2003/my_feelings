"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { Heart, Sparkle } from "lucide-react";

interface FloatingHeartsProps {
  count?: number;
  variant?: "hearts" | "mixed";
  className?: string;
}

/**
 * Ambient, decorative floating hearts + sparkles. Purely visual —
 * aria-hidden so screen readers skip it. Respects prefers-reduced-motion
 * via the .animate-float* classes defined in globals.css / tailwind config,
 * which are neutralized globally when reduced motion is requested.
 */
export default function FloatingHearts({
  count = 14,
  variant = "hearts",
  className = "",
}: FloatingHeartsProps) {
  const items = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.round(Math.random() * 100),
        delay: Math.round(Math.random() * 6 * 10) / 10,
        duration: 6 + Math.random() * 6,
        size: 12 + Math.random() * 18,
        isSparkle: variant === "mixed" && i % 3 === 0,
        opacity: 0.25 + Math.random() * 0.4,
      })),
    [count, variant]
  );

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {items.map((item) => (
        <motion.div
          key={item.id}
          className="absolute animate-float-slow"
          style={{
            left: `${item.left}%`,
            top: "100%",
            animationDelay: `${item.delay}s`,
            animationDuration: `${item.duration}s`,
          }}
          initial={{ y: 0, opacity: 0 }}
          animate={{ y: "-120vh", opacity: [0, item.opacity, item.opacity, 0] }}
          transition={{
            duration: item.duration + 6,
            delay: item.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {item.isSparkle ? (
            <Sparkle
              size={item.size}
              className="text-plum-300 dark:text-blush-200"
              fill="currentColor"
            />
          ) : (
            <Heart
              size={item.size}
              className="text-blush-400 dark:text-blush-300"
              fill="currentColor"
            />
          )}
        </motion.div>
      ))}
    </div>
  );
}
