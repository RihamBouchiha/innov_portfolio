"use client";

import { useEffect, useState } from "react";
import { useSafeTimeout } from "../../hooks/useSafeTimeout";

const makeCode = () =>
  Array.from({ length: 4 }, () => Math.floor(Math.random() * 9) + 1);

export default function FlashCode({ dictionary: t, onWin, onFail }) {
  const [code, setCode] = useState(makeCode);
  const [visible, setVisible] = useState(true);
  const [answer, setAnswer] = useState([]);
  const [message, setMessage] = useState(t.rememberCode);
  const schedule = useSafeTimeout();

  useEffect(
    () =>
      schedule(() => {
        setVisible(false);
        setMessage(t.rebuildCode);
      }, 2200),
    [code, schedule, t.rebuildCode],
  );

  const press = (number) => {
    if (visible || answer.length === 4) return;
    const next = [...answer, number];
    setAnswer(next);
    if (next.length === 4) {
      if (next.join("") === code.join("")) schedule(onWin, 450);
      else {
        onFail();
        schedule(() => {
          setCode(makeCode());
          setAnswer([]);
          setVisible(true);
          setMessage(t.tryAgain);
        }, 650);
      }
    }
  };
  return (
    <>
      <div className="game-status" aria-live="polite">
        <b>{message}</b>
        <span>{t.digitsTwoSeconds}</span>
      </div>
      <div className={`flash-display ${visible ? "visible" : ""}`}>
        {visible
          ? code.map((number, index) => <span key={index}>{number}</span>)
          : [0, 1, 2, 3].map((_, index) => (
              <span key={index}>{answer[index] ?? "·"}</span>
            ))}
      </div>
      <div className="flash-pad">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
          <button key={number} onClick={() => press(number)} disabled={visible}>
            {number}
          </button>
        ))}
      </div>
    </>
  );
}
