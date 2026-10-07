"use client";

import { useState } from "react";
import { useSafeTimeout } from "../../hooks/useSafeTimeout";

const start = [1, 0, 3, 0, 3, 0, 0, 0, 2];
const solution = [1, 2, 3, 2, 3, 1, 3, 1, 2];

export default function Sudoku({ locale, dictionary: t, onWin, onFail }) {
  const [board, setBoard] = useState(start);
  const [selected, setSelected] = useState(null);
  const [wrong, setWrong] = useState(null);
  const schedule = useSafeTimeout();
  const place = (number) => {
    if (selected === null || start[selected]) return;
    if (solution[selected] !== number) {
      setWrong(selected);
      onFail();
      schedule(() => setWrong(null), 400);
      return;
    }
    const next = [...board];
    next[selected] = number;
    setBoard(next);
    if (next.every((value, index) => value === solution[index]))
      schedule(onWin, 500);
  };
  return (
    <>
      <div className="game-status" aria-live="polite">
        <b>{t.gameTitles.sudoku} 3×3</b>
        <span>{t.sudokuRules}</span>
      </div>
      <div className="sudoku-board" role="grid" aria-label={t.sudokuRules}>
        {board.map((value, index) => {
          const row = Math.floor(index / 3) + 1;
          const column = (index % 3) + 1;
          return (
            <button
              key={index}
              className={`${selected === index ? "selected" : ""} ${wrong === index ? "wrong" : ""} ${start[index] ? "fixed" : ""}`}
              onClick={() => setSelected(index)}
              disabled={Boolean(start[index])}
              aria-label={`${locale === "fr" ? "Ligne" : "Row"} ${row}, ${locale === "fr" ? "colonne" : "column"} ${column}${value ? `: ${value}` : ""}`}
              aria-pressed={selected === index}
            >
              {value || ""}
            </button>
          );
        })}
      </div>
      <div className="number-pad">
        {[1, 2, 3].map((number) => (
          <button
            key={number}
            onClick={() => place(number)}
            aria-label={`${locale === "fr" ? "Placer" : "Place"} ${number}`}
          >
            {number}
          </button>
        ))}
      </div>
    </>
  );
}
