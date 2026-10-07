"use client";

import { useState } from "react";
import { useSafeTimeout } from "../../hooks/useSafeTimeout";

const rounds = [
  { code: "console.log(2 + 3 * 2)", answers: [10, 8, 7], correct: 8 },
  { code: "'code'.length", answers: [3, 4, 5], correct: 4 },
  { code: "Boolean(0)", answers: ["true", "false", "null"], correct: "false" },
];

export default function ConsoleGame({ dictionary: t, onWin, onFail }) {
  const [round, setRound] = useState(0);
  const [miss, setMiss] = useState(null);
  const schedule = useSafeTimeout();
  const pick = (answer) => {
    if (answer !== rounds[round].correct) {
      setMiss(answer);
      onFail();
      schedule(() => setMiss(null), 350);
      return;
    }
    if (round === rounds.length - 1) schedule(onWin, 350);
    else setRound(round + 1);
  };
  return (
    <>
      <div className="game-status" aria-live="polite">
        <b>{t.predictOutput}</b>
        <span>
          {t.command} {round + 1} / {rounds.length}
        </span>
      </div>
      <div className="console-box">
        <span>innoverse@lab:~$</span>
        <code>{rounds[round].code}</code>
        <i>_</i>
      </div>
      <div className="console-options">
        {rounds[round].answers.map((answer) => (
          <button
            className={miss === answer ? "miss" : ""}
            onClick={() => pick(answer)}
            key={answer}
          >
            {String(answer)}
          </button>
        ))}
      </div>
    </>
  );
}
