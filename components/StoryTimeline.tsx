"use client";

import { motion } from "framer-motion";
import { timeline } from "@/data/loveStory";
import SectionWrapper from "./SectionWrapper";

export default function StoryTimeline() {
  return (
    <SectionWrapper
      id="our-story"
      eyebrow="chapter one"
      title="Our Story"
      subtitle="Every love story is unique — this is where ours began."
    >
      <div className="relative">
        {/* center line on desktop, left line on mobile */}
        <div
          aria-hidden="true"
          className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-blush-300 via-plum-300 to-transparent sm:left-1/2 sm:-translate-x-1/2"
        />

        <ol className="space-y-10">
          {timeline.map((event, i) => {
            const leftSide = i % 2 === 0;
            return (
              <motion.li
                key={event.title}
                initial={{ opacity: 0, x: leftSide ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className={`relative flex flex-col gap-3 pl-12 sm:w-1/2 sm:pl-0 sm:pr-0 ${
                  leftSide
                    ? "sm:mr-auto sm:items-end sm:pr-10 sm:text-right"
                    : "sm:ml-auto sm:items-start sm:pl-10 sm:text-left"
                }`}
              >
                <span
                  aria-hidden="true"
                  className="glow-ring absolute left-2.5 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-blush-500 text-[10px] sm:left-1/2 sm:-translate-x-1/2"
                >
                  <span className="sr-only">Milestone {i + 1}</span>
                </span>

                <div className="glass w-full rounded-2xl p-5">
                  <div className="mb-1 flex items-center gap-2 sm:justify-end">
                    <span className="text-2xl" aria-hidden="true">
                      {event.emoji}
                    </span>
                    <h3 className="font-display text-lg font-semibold text-plum-800 dark:text-blush-100">
                      {event.title}
                    </h3>
                  </div>
                  <p className="mb-2 text-xs font-medium uppercase tracking-wide text-blush-500 dark:text-blush-300">
                    {event.date}
                  </p>
                  <p className="text-sm text-plum-600 dark:text-plum-200">
                    {event.description}
                  </p>
                </div>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </SectionWrapper>
  );
}
