"use client";

import { useState } from "react";
import { useSafeTimeout } from "../../hooks/useSafeTimeout";

export default function AlgorithmGame({
  locale,
  dictionary: t,
  onWin,
  onFail,
}) {
  const [round, setRound] = useState(0);
  const [miss, setMiss] = useState(null);
  const schedule = useSafeTimeout();
  const rounds = [
    {
      title: t.quickSearch,
      code: t.sortedArray,
      answers: [t.linearSearch, t.binarySearch, t.fullScan],
      correct: t.binarySearch,
    },
    {
      title: t.complexity,
      code: t.nestedLoops,
      answers: ["O(n)", "O(log n)", "O(n²)"],
      correct: "O(n²)",
    },
    {
      title: t.suitableStructure,
      code: t.lifo,
      answers: [
        locale === "fr" ? "File" : "Queue",
        locale === "fr" ? "Pile" : "Stack",
        locale === "fr" ? "Arbre" : "Tree",
      ],
      correct: locale === "fr" ? "Pile" : "Stack",
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
        <b>{question.title}</b>
        <span>
          {locale === "fr" ? "Analyse" : "Analysis"} {round + 1} /{" "}
          {rounds.length}
        </span>
      </div>
      <div className="tech-terminal">
        <span>ALGORITHM.INPUT</span>
        <code>{question.code}</code>
        <i>
          {locale === "fr"
            ? "Choisis la solution optimale"
            : "Choose the optimal solution"}
        </i>
      </div>
      <div className="tech-options">
        {question.answers.map((answer) => (
          <button
            className={miss === answer ? "miss" : ""}
            onClick={() => pick(answer)}
            key={answer}
          >
            <small>OPTION</small>
            <b>{answer}</b>
          </button>
        ))}
      </div>
    </>
  );
}
