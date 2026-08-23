"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionWrapperProps {
  id: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}

export default function SectionWrapper({
  id,
  eyebrow,
  title,
  subtitle,
  children,
  className = "",
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={`relative mx-auto w-full max-w-5xl px-5 py-24 sm:px-8 ${className}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="mb-14 text-center"
      >
        {eyebrow && (
          <span className="mb-3 inline-block font-script text-xl text-blush-500 dark:text-blush-300">
            {eyebrow}
          </span>
        )}
        <h2 className="font-display text-3xl font-bold text-plum-800 dark:text-blush-100 sm:text-4xl">
          {title}
        </h2>
        {subtitle && (
          <p className="mx-auto mt-3 max-w-xl text-sm text-plum-500 dark:text-plum-300 sm:text-base">
            {subtitle}
          </p>
        )}
      </motion.div>
      {children}
    </section>
  );
}
