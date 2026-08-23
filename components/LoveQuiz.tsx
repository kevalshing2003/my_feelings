"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";
import { quizQuestions, quizCompleteMessage } from "@/data/loveStory";
import SectionWrapper from "./SectionWrapper";

interface LoveQuizProps {
  onComplete: () => void;
  completed: boolean;
}

export default function LoveQuiz({ onComplete, completed }: LoveQuizProps) {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [finished, setFinished] = useState(completed);

  const question = quizQuestions[step];
  const isLast = step === quizQuestions.length - 1;

  const handleSelect = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
  };

  const handleNext = () => {
    setSelected(null);
    if (isLast) {
      setFinished(true);
      onComplete();
    } else {
      setStep((s) => s + 1);
    }
  };

  return (
    <SectionWrapper
      id="love-quiz"
      eyebrow="chapter four"
      title="How Well Do You Know Us?"
      subtitle="A little game before we continue our story."
    >
      <div className="mx-auto max-w-xl">
        <div className="glass rounded-3xl p-6 sm:p-10">
          <AnimatePresence mode="wait">
            {!finished ? (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.4 }}
              >
                <p className="mb-1 text-xs font-medium uppercase tracking-wide text-blush-500 dark:text-blush-300">
                  Question {step + 1} of {quizQuestions.length}
                </p>
                <h3 className="mb-6 font-display text-xl font-semibold text-plum-800 dark:text-blush-100 sm:text-2xl">
                  {question.question}
                </h3>

                <div className="space-y-3">
                  {question.options.map((option, idx) => {
                    const isChosen = selected === idx;
                    return (
                      <motion.button
                        key={option}
                        type="button"
                        onClick={() => handleSelect(idx)}
                        whileHover={selected === null ? { scale: 1.02 } : undefined}
                        whileTap={selected === null ? { scale: 0.98 } : undefined}
                        disabled={selected !== null}
                        className={`w-full rounded-xl border px-5 py-3.5 text-left text-sm font-medium transition-colors sm:text-base ${
                          isChosen
                            ? "border-blush-400 bg-blush-100/70 text-blush-700 dark:bg-blush-500/20 dark:text-blush-100"
                            : "border-plum-200 bg-white/50 text-plum-700 hover:border-blush-300 dark:border-plum-600 dark:bg-plum-800/40 dark:text-blush-100"
                        }`}
                      >
                        {option}
                      </motion.button>
                    );
                  })}
                </div>

                <AnimatePresence>
                  {selected !== null && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-5 flex items-start gap-2 rounded-xl bg-gradient-to-r from-blush-100 to-plum-100 p-4 text-sm text-plum-700 dark:from-plum-800/60 dark:to-plum-700/40 dark:text-blush-100">
                        <Sparkles size={18} className="mt-0.5 shrink-0 text-blush-500" />
                        <p>{question.responseMessage}</p>
                      </div>
                      <motion.button
                        type="button"
                        onClick={handleNext}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="mt-4 w-full rounded-full bg-gradient-to-r from-blush-500 to-plum-500 py-3 font-semibold text-white"
                      >
                        {isLast ? "See my score" : "Next question"}
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ) : (
              <motion.div
                key="done"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, type: "spring" }}
                className="flex flex-col items-center py-6 text-center"
              >
                <Heart size={44} className="mb-4 animate-beat text-blush-500" fill="currentColor" />
                <h3 className="font-display text-2xl font-bold text-plum-800 dark:text-blush-100">
                  {quizCompleteMessage.title}
                </h3>
                <p className="mt-2 font-script text-xl text-plum-600 dark:text-blush-200">
                  {quizCompleteMessage.subtitle}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </SectionWrapper>
  );
}
