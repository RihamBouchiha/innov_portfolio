"use client";

import { useState } from "react";
import { useSafeTimeout } from "../../hooks/useSafeTimeout";

const rounds = [
  {
    code: ["const club = 'Innoverse';", "console.log(club);", "return true;"],
    bug: 2,
  },
  { code: ["let score = 10;", "score += 5;", "console.log(scores);"], bug: 2 },
  { code: ["if (ready) {", "  launch();", "// accolade manquante"], bug: 2 },
];

export default function BugHunt({ locale, dictionary: t, onWin, onFail }) {
  const [round, setRound] = useState(0);
  const [miss, setMiss] = useState(null);
  const schedule = useSafeTimeout();
  const pick = (index) => {
    if (index !== rounds[round].bug) {
      setMiss(index);
      onFail();
      schedule(() => setMiss(null), 400);
      return;
    }
    if (round === rounds.length - 1) schedule(onWin, 400);
    else setRound(round + 1);
  };
  const code = rounds[round].code.map((line) =>
    line === "// accolade manquante" && locale === "en"
      ? "// missing closing brace"
      : line,
  );
  return (
    <>
      <div className="game-status" aria-live="polite">
        <b>{t.findBug}</b>
        <span>
          {t.file} {round + 1} / {rounds.length}
        </span>
      </div>
      <div className="code-window">
        <div>
          <i />
          <i />
          <i />
          <span>main.js</span>
        </div>
        {code.map((line, index) => (
          <button
            className={miss === index ? "line-miss" : ""}
            onClick={() => pick(index)}
            key={`${round}-${index}`}
          >
            <b>{index + 1}</b>
            <code>{line}</code>
          </button>
        ))}
      </div>
    </>
  );
}
