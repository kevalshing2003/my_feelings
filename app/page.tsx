"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Moon, Sun } from "lucide-react";
import Hero from "@/components/Hero";
import StoryTimeline from "@/components/StoryTimeline";
import LoveReasons from "@/components/LoveReasons";
import LoveQuotes from "@/components/LoveQuotes";
import LoveQuiz from "@/components/LoveQuiz";
import CatchHeartsGame from "@/components/CatchHeartsGame";
import LoveLetter from "@/components/LoveLetter";
import Proposal from "@/components/Proposal";
import FinalMessage from "@/components/FinalMessage";
import LockedSection from "@/components/LockedSection";
import ProgressIndicator from "@/components/ProgressIndicator";
import CursorGlow from "@/components/CursorGlow";

const STORAGE_KEY = "love-story-progress";

interface Progress {
  opened: boolean;
  quizDone: boolean;
  gameDone: boolean;
  proposalAnswered: boolean;
}

const defaultProgress: Progress = {
  opened: false,
  quizDone: false,
  gameDone: false,
  proposalAnswered: false,
};

const sectionIds = ["our-story", "reasons", "love-quiz", "catch-hearts", "love-letter", "proposal"];

export default function Page() {
  const [progress, setProgress] = useState<Progress>(defaultProgress);
  const [hydrated, setHydrated] = useState(false);
  const [dark, setDark] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const catchHeartsRef = useRef<HTMLDivElement>(null);

  // Load persisted progress on mount
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setProgress({ ...defaultProgress, ...JSON.parse(raw) });
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setDark(prefersDark);
    } catch {
      // localStorage unavailable — proceed with defaults
    }
    setHydrated(true);
  }, []);

  // Persist progress
  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // ignore write failures (private browsing, etc.)
    }
  }, [progress, hydrated]);

  // Track scroll position to drive the progress indicator
  useEffect(() => {
    if (!progress.opened) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = entry.target.id;
          if (["our-story"].includes(id)) setActiveStep(0);
          else if (["reasons"].includes(id)) setActiveStep(1);
          else if (["love-quiz", "catch-hearts"].includes(id)) setActiveStep(2);
          else if (id === "love-letter") setActiveStep(3);
          else if (id === "proposal") setActiveStep(4);
        });
      },
      { threshold: 0.4 }
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [progress.opened]);

  const handleOpen = useCallback(() => {
    setProgress((p) => ({ ...p, opened: true }));
    setTimeout(() => {
      document.getElementById("our-story")?.scrollIntoView({ behavior: "smooth" });
    }, 900);
  }, []);

  const handleQuizComplete = useCallback(() => {
    setProgress((p) => ({ ...p, quizDone: true }));
  }, []);

  const handleGameComplete = useCallback(() => {
    setProgress((p) => ({ ...p, gameDone: true }));
  }, []);

  const handleGameContinue = useCallback(() => {
    document.getElementById("love-letter")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleProposalAnswer = useCallback(() => {
    setProgress((p) => ({ ...p, proposalAnswered: true }));
  }, []);

  const handleReplay = useCallback(() => {
    setProgress(defaultProgress);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (!hydrated) {
    return <div className="min-h-screen bg-[#fff5f8]" aria-hidden="true" />;
  }

  return (
    <div className={dark ? "dark" : ""}>
      <div className="min-h-screen bg-[#fff5f8] transition-colors duration-500 dark:bg-[#130621]">
        <CursorGlow />
        <Hero onOpen={handleOpen} closing={progress.opened} />

        {progress.opened && (
          <>
            <ProgressIndicator currentStep={activeStep} visible={true} />

            <button
              type="button"
              onClick={() => setDark((d) => !d)}
              aria-label={dark ? "Switch to light mode" : "Switch to dark romantic mode"}
              className="glass fixed bottom-5 left-5 z-50 flex h-12 w-12 items-center justify-center rounded-full text-plum-600 dark:text-blush-200"
            >
              {dark ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <main>
              <StoryTimeline />
              <LoveReasons />
              <LoveQuotes />
              <LoveQuiz onComplete={handleQuizComplete} completed={progress.quizDone} />

              <div ref={catchHeartsRef}>
                <LockedSection
                  locked={!progress.quizDone}
                  message="Finish the quiz above to unlock this next part of our story."
                >
                  <CatchHeartsGame
                    onComplete={handleGameComplete}
                    completed={progress.gameDone}
                    onContinue={handleGameContinue}
                  />
                </LockedSection>
              </div>

              <LockedSection
                locked={!progress.gameDone}
                message="Catch 15 hearts above to unlock the letter."
              >
                <LoveLetter />
              </LockedSection>

              <Proposal
                inView={progress.gameDone}
                answered={progress.proposalAnswered}
                onAnswer={handleProposalAnswer}
              />

              {progress.proposalAnswered && <FinalMessage onReplay={handleReplay} />}
            </main>
          </>
        )}
      </div>
    </div>
  );
}
