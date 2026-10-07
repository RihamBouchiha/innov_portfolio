"use client";

import { useCallback, useEffect, useState } from "react";
import { useSafeTimeout } from "../../hooks/useSafeTimeout";

const emptyBoard = Array(9).fill(null);
const lines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const winner = (board) =>
  lines.some(
    ([a, b, c]) => board[a] && board[a] === board[b] && board[a] === board[c],
  );
const randomChoice = (values) =>
  values[Math.floor(Math.random() * values.length)];

export default function TicTacToe({ locale, dictionary: t, onWin, onFail }) {
  const [board, setBoard] = useState(emptyBoard);
  const [status, setStatus] = useState(t.yourTurn);
  const schedule = useSafeTimeout();
  const reset = useCallback(() => {
    setBoard(emptyBoard);
    setStatus(t.yourTurn);
  }, [t.yourTurn]);

  const move = (index) => {
    if (board[index] || status === t.youWon) return;
    const next = [...board];
    next[index] = "X";
    if (winner(next)) {
      setBoard(next);
      setStatus(t.youWon);
      schedule(onWin, 650);
      return;
    }
    const free = next
      .map((value, position) => (value ? -1 : position))
      .filter((position) => position >= 0);
    if (!free.length) {
      setBoard(next);
      setStatus(t.tie);
      onFail();
      return;
    }
    const winMove = free.find((position) => {
      const test = [...next];
      test[position] = "O";
      return winner(test);
    });
    const blockMove = free.find((position) => {
      const test = [...next];
      test[position] = "X";
      return winner(test);
    });
    const bot = winMove ?? blockMove ?? randomChoice(free);
    next[bot] = "O";
    setBoard(next);
    if (winner(next)) {
      setStatus(t.nearly);
      onFail();
    }
  };

  useEffect(() => {
    if (status === t.nearly || status === t.tie) return schedule(reset, 900);
    return undefined;
  }, [reset, schedule, status, t.nearly, t.tie]);

  return (
    <>
      <div className="game-status" aria-live="polite">
        <b>{status}</b>
        <span>{t.align}</span>
      </div>
      <div className="tic-board">
        {board.map((value, index) => (
          <button
            onClick={() => move(index)}
            key={index}
            className={`tic-cell ${value ? `marked ${value}` : ""}`}
            aria-label={
              value
                ? `${locale === "fr" ? "Case" : "Square"} ${value}`
                : locale === "fr"
                  ? "Jouer cette case"
                  : "Play this square"
            }
            disabled={Boolean(value)}
          >
            <span className={value ? "tic-mark" : ""}>{value}</span>
          </button>
        ))}
      </div>
      <button className="text-button" onClick={reset}>
        {t.playAgain}
      </button>
    </>
  );
}
