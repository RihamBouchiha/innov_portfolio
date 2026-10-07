"use client";

import { useCallback, useEffect, useRef } from "react";

export function useSafeTimeout() {
  const timers = useRef(new Set());

  const clear = useCallback((timer) => {
    clearTimeout(timer);
    timers.current.delete(timer);
  }, []);

  const schedule = useCallback(
    (callback, delay) => {
      const timer = setTimeout(() => {
        timers.current.delete(timer);
        callback();
      }, delay);
      timers.current.add(timer);
      return () => clear(timer);
    },
    [clear],
  );

  useEffect(
    () => () => {
      timers.current.forEach(clearTimeout);
      timers.current.clear();
    },
    [],
  );

  return schedule;
}
