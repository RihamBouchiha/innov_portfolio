"use client";

import { useMemo, useState } from "react";
import { useSafeTimeout } from "../../hooks/useSafeTimeout";
import { shuffleArray } from "../../lib/shuffle-array";

const symbols = ["</>", "{ }", "01", "#_", "</>", "{ }", "01", "#_"];

export default function Memory({ locale, dictionary: t, onWin, onFail }) {
  const deck = useMemo(() => shuffleArray(symbols), []);
  const [open, setOpen] = useState([]);
  const [done, setDone] = useState([]);
  const schedule = useSafeTimeout();
  const flip = (index) => {
    if (open.length === 2 || open.includes(index) || done.includes(index))
      return;
    const next = [...open, index];
    setOpen(next);
    if (next.length === 2)
      schedule(() => {
        if (deck[next[0]] === deck[next[1]]) {
          const matched = [...done, ...next];
          setDone(matched);
          if (matched.length === deck.length) schedule(onWin, 400);
        } else onFail();
        setOpen([]);
      }, 550);
  };
  return (
    <>
      <div className="game-status" aria-live="polite">
        <b>{t.pairs}</b>
        <span>
          {done.length / 2} / 4 {t.pairsFound}
        </span>
      </div>
      <div className="memory-board">
        {deck.map((symbol, index) => {
          const revealed = open.includes(index) || done.includes(index);
          return (
            <button
              key={index}
              onClick={() => flip(index)}
              className={revealed ? "flipped" : ""}
              aria-label={
                revealed
                  ? symbol
                  : `${locale === "fr" ? "Carte" : "Card"} ${index + 1}`
              }
              aria-pressed={revealed}
            >
              <span aria-hidden={!revealed}>{symbol}</span>
            </button>
          );
        })}
      </div>
    </>
  );
}
