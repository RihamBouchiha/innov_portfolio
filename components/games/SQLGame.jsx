"use client";

import { useState } from "react";
import { useSafeTimeout } from "../../hooks/useSafeTimeout";

export default function SQLGame({ locale, dictionary: t, onWin, onFail }) {
  const [round, setRound] = useState(0);
  const [miss, setMiss] = useState(null);
  const schedule = useSafeTimeout();
  const table = locale === "fr" ? "membres" : "members";
  const rounds = [
    {
      goal: t.showMembers,
      answers: [
        `SELECT * FROM ${table};`,
        `GET ${table} ALL;`,
        `SHOW * ${table};`,
      ],
      correct: `SELECT * FROM ${table};`,
    },
    {
      goal: t.filterScores,
      answers: ["WHERE score > 10", "FILTER score > 10", "IF score > 10"],
      correct: "WHERE score > 10",
    },
    {
      goal: t.sortScores,
      answers: ["ORDER BY score DESC", "SORT score DOWN", "GROUP BY score"],
      correct: "ORDER BY score DESC",
    },
  ];
  const question = rounds[round];
  const pick = (answer) => {
    if (answer !== question.correct) {
      setMiss(answer);
      onFail();
      schedule(() => setMiss(null), 400);
      return;
    }
    if (round === rounds.length - 1) schedule(onWin, 400);
    else setRound(round + 1);
  };
  return (
    <>
      <div className="game-status" aria-live="polite">
        <b>{t.query}</b>
        <span>
          {t.missionNumber} {round + 1} / {rounds.length}
        </span>
      </div>
      <div className="database-visual">
        <div className="db-disc" />
        <span>INNOVERSE_DB</span>
        <b>{question.goal}</b>
      </div>
      <div className="tech-options sql-options">
        {question.answers.map((answer) => (
          <button
            className={miss === answer ? "miss" : ""}
            onClick={() => pick(answer)}
            key={answer}
          >
            <small>QUERY</small>
            <code>{answer}</code>
          </button>
        ))}
      </div>
    </>
  );
}
