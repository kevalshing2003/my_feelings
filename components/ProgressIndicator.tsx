"use client";

import { motion } from "framer-motion";
import { progressSteps } from "@/data/loveStory";

interface ProgressIndicatorProps {
  currentStep: number; // 0-indexed
  visible: boolean;
}

/**
 * A heartbeat-monitor line doubles as the progress indicator — each label
 * sits on a "beat" of the pulse, and the line lights up pink as you pass it.
 * This is the site's signature structural device: the progress bar for a
 * love story literally reads like a heartbeat.
 */
export default function ProgressIndicator({ currentStep, visible }: ProgressIndicatorProps) {
  const n = progressSteps.length;

  return (
    <motion.nav
      aria-label="Story progress"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: visible ? 0 : -80, opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="glass fixed left-1/2 top-4 z-40 hidden -translate-x-1/2 rounded-full px-6 py-3 md:block"
    >
      <ol className="flex items-center gap-1">
        {progressSteps.map((step, i) => {
          const active = i <= currentStep;
          return (
            <li key={step} className="flex items-center">
              <div className="flex flex-col items-center gap-1.5">
                <motion.span
                  animate={active ? { scale: [1, 1.35, 1] } : { scale: 1 }}
                  transition={{ duration: 0.9, repeat: active ? Infinity : 0, repeatDelay: 1.2 }}
                  className={`h-2.5 w-2.5 rounded-full ${
                    active
                      ? "bg-blush-500 shadow-[0_0_10px_rgba(255,77,132,0.8)]"
                      : "bg-plum-200 dark:bg-plum-700"
                  }`}
                />
                <span
                  className={`whitespace-nowrap text-[11px] font-medium tracking-wide ${
                    active
                      ? "text-blush-600 dark:text-blush-300"
                      : "text-plum-300 dark:text-plum-600"
                  }`}
                >
                  {step}
                </span>
              </div>
              {i < n - 1 && (
                <svg width="34" height="10" viewBox="0 0 34 10" className="mx-1 -mt-4">
                  <polyline
                    points="0,5 10,5 13,1 16,9 19,5 34,5"
                    fill="none"
                    stroke={i < currentStep ? "#ff4d84" : "#e8d9f7"}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </li>
          );
        })}
      </ol>
    </motion.nav>
  );
}
