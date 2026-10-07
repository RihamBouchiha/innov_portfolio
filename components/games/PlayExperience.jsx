"use client";

import { useState } from "react";
import GameHub from "./GameHub";
import GameScreen from "./GameScreen";
import Victory from "./Victory";

export default function PlayExperience({ locale, dictionary }) {
  const [gameId, setGameId] = useState(null);
  const [won, setWon] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  if (won) return <Victory locale={locale} dictionary={dictionary} />;
  if (gameId)
    return (
      <GameScreen
        gameId={gameId}
        locale={locale}
        dictionary={dictionary}
        onBack={() => setGameId(null)}
        onWin={() => setWon(true)}
        soundEnabled={soundEnabled}
      />
    );
  return (
    <GameHub
      locale={locale}
      dictionary={dictionary}
      onPlay={setGameId}
      soundEnabled={soundEnabled}
      setSoundEnabled={setSoundEnabled}
    />
  );
}
