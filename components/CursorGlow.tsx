"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Desktop-only heart cursor + soft glow that follows the mouse.
 * Automatically disabled on touch devices and when prefers-reduced-motion
 * is set, since large ambient motion isn't appropriate there.
 */
export default function CursorGlow() {
  const dotRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const isTouch = window.matchMedia("(hover: none)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setEnabled(!isTouch && !reduced);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    let raf = 0;
    let gx = window.innerWidth / 2;
    let gy = window.innerHeight / 2;
    let tx = gx;
    let ty = gy;

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${tx}px, ${ty}px) translate(-50%, -50%)`;
      }
    };

    const loop = () => {
      gx += (tx - gx) * 0.08;
      gy += (ty - gy) * 0.08;
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${gx}px, ${gy}px) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={glowRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9998] h-[420px] w-[420px] rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(255,111,163,0.35) 0%, rgba(168,85,247,0.18) 45%, transparent 70%)",
        }}
      />
      <div ref={dotRef} className="heart-cursor" aria-hidden="true">
        <svg viewBox="0 0 32 32" width="22" height="22">
          <path
            fill="#ff4d84"
            d="M16 28.5s-11-7-13.8-13.6C.5 10.2 2.6 5 7.6 4.2c2.9-.5 5.7 1 7.4 3.3 1.7-2.3 4.5-3.8 7.4-3.3 5 .8 7.1 6 5.4 10.7C27 21.5 16 28.5 16 28.5z"
          />
        </svg>
      </div>
    </>
  );
}
