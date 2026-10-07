"use client";

import { useState } from "react";
import { useSafeTimeout } from "../../hooks/useSafeTimeout";

const rounds = [
  { bits: "0101", value: 5 },
  { bits: "1001", value: 9 },
  { bits: "1110", value: 14 },
];

export default function BinaryGate({ dictionary: t, onWin, onFail }) {
  const [round, setRound] = useState(0);
  const [miss, setMiss] = useState(false);
  const schedule = useSafeTimeout();
  const choose = (number) => {
    if (number !== rounds[round].value) {
      setMiss(true);
      onFail();
      schedule(() => setMiss(false), 350);
      return;
    }
    if (round === rounds.length - 1) schedule(onWin, 350);
    else setRound(round + 1);
  };
  const answers = [
    rounds[round].value,
    rounds[round].value + 2,
    Math.max(0, rounds[round].value - 3),
  ].sort((a, b) => a - b);
  return (
    <>
      <div className="game-status" aria-live="polite">
        <b>{t.convertDecimal}</b>
        <span>
          {t.signal} {round + 1} / {rounds.length}
        </span>
      </div>
      <div className={`binary-signal ${miss ? "miss" : ""}`}>
        {rounds[round].bits.split("").map((bit, index) => (
          <span key={index}>{bit}</span>
        ))}
      </div>
      <div className="binary-options">
        {answers.map((number) => (
          <button onClick={() => choose(number)} key={number}>
            {number}
          </button>
        ))}
      </div>
    </>
  );
}
