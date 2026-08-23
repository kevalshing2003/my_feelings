"use client";

import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import { ReactNode } from "react";

interface LockedSectionProps {
  locked: boolean;
  message: string;
  children: ReactNode;
}

/**
 * Wraps a section that should stay hidden/blurred until an earlier
 * interactive moment (quiz, game) has been completed — used to give the
 * "unlock the next section" progression the brief asks for.
 */
export default function LockedSection({ locked, message, children }: LockedSectionProps) {
  if (!locked) return <>{children}</>;

  return (
    <div className="relative flex min-h-[50vh] items-center justify-center overflow-hidden px-6 py-24">
      <div aria-hidden="true" className="pointer-events-none select-none blur-md">
        {children}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="glass absolute inset-x-6 top-1/2 flex -translate-y-1/2 flex-col items-center gap-2 rounded-2xl py-8 text-center sm:inset-x-auto sm:w-96"
      >
        <Lock size={22} className="text-plum-400 dark:text-blush-300" />
        <p className="max-w-xs text-sm text-plum-500 dark:text-plum-200">{message}</p>
      </motion.div>
    </div>
  );
}
