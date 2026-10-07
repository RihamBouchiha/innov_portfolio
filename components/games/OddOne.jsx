"use client";

import { useState } from "react";
import { useSafeTimeout } from "../../hooks/useSafeTimeout";

const rounds = [
  { top: "SIGNAL", normal: ["1011", "0110"], odd: ["1011", "0101"] },
  {
    top: "HTML",
    normal: ["<section>", "</section>"],
    odd: ["<section>", "<section/> "],
  },
  { top: "LOGIC", normal: ["{ [ (", ") ] }"], odd: ["{ [ )", "( ] } "] },
  { top: "HASH", normal: ["#6A5F", "E09C"], odd: ["#6A5E", "F09C"] },
];
const randomPosition = () => Math.floor(Math.random() * 6);

export default function OddOne({ locale, dictionary: t, onWin, onFail }) {
  const [round, setRound] = useState(0);
  const [position, setPosition] = useState(randomPosition);
  const [miss, setMiss] = useState(null);
  const schedule = useSafeTimeout();
  const labels =
    locale === "fr"
      ? [t.signalAnalysis, t.inspectTag, t.compareStructure, t.checkIdentifier]
      : [
          "Analyze the signal",
          "Inspect the tag",
          "Compare the structure",
          "Check the identifier",
        ];
  const choose = (index) => {
    if (index !== position) {
      setMiss(index);
      onFail();
      schedule(() => setMiss(null), 420);
      return;
    }
    if (round === rounds.length - 1) schedule(onWin, 450);
    else {
      setRound(round + 1);
      setPosition(randomPosition());
      setMiss(null);
    }
  };
  const data = rounds[round];
  return (
    <>
      <div className="game-status adult-status" aria-live="polite">
        <b>{labels[round]}</b>
        <span>{t.corruptedPacket}</span>
      </div>
      <div className="anomaly-console">
        <div className="scan-line" />
        <div className="anomaly-head">
          <span>
            <i /> {t.anomalyScanner}
          </span>
          <b>
            {t.live} · 0{round + 1}
          </b>
        </div>
        <div className="focus-meter">
          <i style={{ width: `${((round + 1) / rounds.length) * 100}%` }} />
        </div>
        <div className="packet-grid">
          {Array.from({ length: 6 }).map((_, index) => {
            const value = index === position ? data.odd : data.normal;
            return (
              <button
                className={miss === index ? "wrong-pick" : ""}
                onClick={() => choose(index)}
                key={index}
              >
                <span className="packet-top">
                  <small>0{index + 1}</small>
                  <i>{data.top}</i>
                </span>
                <code>
                  <b>{value[0]}</b>
                  <b>{value[1]}</b>
                </code>
                <span className="packet-bars">
                  <i />
                  <i />
                  <i />
                </span>
              </button>
            );
          })}
        </div>
        <div className="scan-footer">
          <span>{t.nodesConnected}</span>
          <span>
            {t.level} {round + 1}/{rounds.length}
          </span>
        </div>
      </div>
    </>
  );
}
