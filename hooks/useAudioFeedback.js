"use client";

import { useCallback, useEffect, useRef } from "react";

export function useAudioFeedback(enabled) {
  const contextRef = useRef(null);

  const getContext = useCallback(() => {
    if (!enabled || typeof window === "undefined") return null;
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return null;
    if (!contextRef.current) contextRef.current = new AudioContextClass();
    if (contextRef.current.state === "suspended")
      void contextRef.current.resume();
    return contextRef.current;
  }, [enabled]);

  const play = useCallback(
    (result) => {
      const context = getContext();
      if (!context) return;
      const notes =
        result === "win" ? [523.25, 659.25, 783.99, 1046.5] : [311.13, 233.08];
      const start = context.currentTime;
      notes.forEach((frequency, index) => {
        const oscillator = context.createOscillator();
        const volume = context.createGain();
        const noteStart = start + index * (result === "win" ? 0.105 : 0.14);
        const duration = result === "win" ? 0.3 : 0.38;
        oscillator.type = result === "win" ? "sine" : "triangle";
        oscillator.frequency.setValueAtTime(frequency, noteStart);
        volume.gain.setValueAtTime(0.0001, noteStart);
        volume.gain.exponentialRampToValueAtTime(
          result === "win" ? 0.48 : 0.42,
          noteStart + 0.025,
        );
        volume.gain.exponentialRampToValueAtTime(0.0001, noteStart + duration);
        oscillator.connect(volume);
        volume.connect(context.destination);
        oscillator.start(noteStart);
        oscillator.stop(noteStart + duration);
      });
    },
    [getContext],
  );

  useEffect(
    () => () => {
      if (contextRef.current && contextRef.current.state !== "closed")
        void contextRef.current.close();
    },
    [],
  );

  return { play, unlock: getContext };
}
