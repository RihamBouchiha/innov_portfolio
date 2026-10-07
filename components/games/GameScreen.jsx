"use client";

import dynamic from "next/dynamic";
import { allGames, GAME_COUNT } from "../../content/games";
import { useAudioFeedback } from "../../hooks/useAudioFeedback";
import Logo from "../layout/Logo";

const games = {
  bughunt: dynamic(() => import("./BugHunt")),
  binary: dynamic(() => import("./BinaryGate")),
  algorithm: dynamic(() => import("./AlgorithmGame")),
  sql: dynamic(() => import("./SQLGame")),
  console: dynamic(() => import("./ConsoleGame")),
  memory: dynamic(() => import("./Memory")),
  flashcode: dynamic(() => import("./FlashCode")),
  tictactoe: dynamic(() => import("./TicTacToe")),
  sudoku: dynamic(() => import("./Sudoku")),
  oddone: dynamic(() => import("./OddOne")),
};

export default function GameScreen({
  gameId,
  locale,
  dictionary: t,
  onBack,
  onWin,
  soundEnabled,
}) {
  const game = allGames.find((item) => item.id === gameId);
  const { play, unlock } = useAudioFeedback(soundEnabled);
  const Game = games[gameId];
  if (!game || !Game) return null;
  const handleWin = () => {
    play("win");
    onWin();
  };
  const handleFail = () => play("fail");
  return (
    <main className="play-shell">
      <div className="orb orb-three" />
      <header>
        <button className="back" onClick={onBack}>
          {t.backToLanding}
        </button>
        <Logo compact />
        <span className="counter">
          {game.number}/{String(GAME_COUNT).padStart(2, "0")}
        </span>
      </header>
      <section className="play-intro">
        <div className="eyebrow">
          <span /> {t.mission}
        </div>
        <h1>{t.gameTitles[gameId]}</h1>
        <p>{t.gameSubtitles[gameId]}</p>
      </section>
      <section
        className="game-zone"
        onPointerDownCapture={unlock}
        onKeyDownCapture={unlock}
      >
        <Game
          locale={locale}
          dictionary={t}
          onWin={handleWin}
          onFail={handleFail}
        />
      </section>
    </main>
  );
}
