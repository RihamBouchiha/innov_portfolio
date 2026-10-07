"use client";

import Link from "next/link";
import { useRef, useState } from "react";

import { advancedGames, beginnerGames } from "../../content/games";
import Footer from "../layout/Footer";
import LocaleSwitcher from "../layout/LocaleSwitcher";
import Logo from "../layout/Logo";
import GameIcon from "./GameIcon";

export default function GameHub({
  locale,
  dictionary: t,
  onPlay,
  soundEnabled,
  setSoundEnabled,
}) {
  const [audience, setAudience] = useState("discovery");
  const [slide, setSlide] = useState(0);
  const carousel = useRef(null);
  const visibleGames = audience === "discovery" ? beginnerGames : advancedGames;
  const go = (index) => {
    const next = (index + visibleGames.length) % visibleGames.length;
    setSlide(next);
    carousel.current?.scrollTo({
      left: next * carousel.current.clientWidth,
      behavior: "smooth",
    });
  };
  const changeAudience = (nextAudience) => {
    setAudience(nextAudience);
    setSlide(0);
    carousel.current?.scrollTo({ left: 0 });
  };
  return (
    <main className="page-shell">
      <div className="orb orb-one" />
      <div className="orb orb-two" />
      <header>
        <Logo />
        <div className="home-actions">
          <LocaleSwitcher locale={locale} label={t.changeLanguage} />
          <button
            className="sound"
            onClick={() => setSoundEnabled(!soundEnabled)}
            aria-label={soundEnabled ? t.soundOff : t.soundOn}
            aria-pressed={soundEnabled}
          >
            {soundEnabled ? "⌁" : "×"}
          </button>
          <Link className="home-return" href={`/${locale}`}>
            {t.home}
          </Link>
        </div>
      </header>
      <section className="hero">
        <div className="eyebrow">
          <span /> {t.portfolioAccess}
        </div>
        <h1>
          {t.homeTitle}
          <br />
          <em>{t.homeTitleEm}</em>
        </h1>
        <p>
          {t.homeDescription}
          <br />
          {t.homeSubdescription}
        </p>
        <Link className="portfolio-entry" href={`/${locale}/club`}>
          {t.directPortfolio}
        </Link>
        <div className="game-invitation">{t.playInvitation}</div>
      </section>
      <section className="game-section">
        <div className="level-switch" role="group" aria-label={t.chooseGame}>
          <button
            className={audience === "discovery" ? "active" : ""}
            onClick={() => changeAudience("discovery")}
            aria-pressed={audience === "discovery"}
          >
            <b>{t.discovery}</b>
            <small>{t.prepClass}</small>
          </button>
          <button
            className={audience === "engineer" ? "active" : ""}
            onClick={() => changeAudience("engineer")}
            aria-pressed={audience === "engineer"}
          >
            <b>{t.engineer}</b>
            <small>{t.engineeringCycle}</small>
          </button>
        </div>
        <div className="section-head">
          <span>{t.chooseGame}</span>
          <i>{t.swipeExplore}</i>
        </div>
        <div className="challenge-route" aria-hidden="true">
          <span>{t.start}</span>
          <i />
          <i />
          <i />
          <b>{t.portfolio}</b>
        </div>
        <div className="arcade-console">
          <div className="console-top">
            <span>
              <i /> INNOVERSE OS
            </span>
            <b>
              {String(slide + 1).padStart(2, "0")} /{" "}
              {String(visibleGames.length).padStart(2, "0")}
            </b>
          </div>
          <div
            className="game-list"
            ref={carousel}
            onScroll={(event) => {
              const width = event.currentTarget.clientWidth;
              if (width)
                setSlide(Math.round(event.currentTarget.scrollLeft / width));
            }}
          >
            {visibleGames.map((game, index) => (
              <button
                className={`game-card ${game.tone}`}
                key={game.id}
                onClick={() => onPlay(game.id)}
              >
                <span className="game-number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="icon-orbit">
                  <GameIcon name={game.icon} />
                </span>
                <span className="game-copy">
                  <strong>{t.gameTitles[game.id]}</strong>
                  <small>{t.gameSubtitles[game.id]}</small>
                </span>
                <span className="game-start-label">{t.start}</span>
                <span className="play-label">{t.play}</span>
                {index === 0 && (
                  <span className="recommended">{t.recommended}</span>
                )}
              </button>
            ))}
          </div>
          <div className="carousel-controls">
            {visibleGames.map((game, index) => (
              <button
                onClick={() => go(index)}
                aria-label={`${t.chooseGame} : ${t.gameTitles[game.id]}`}
                aria-pressed={index === slide}
                key={game.id}
              >
                <i
                  aria-hidden="true"
                  className={index === slide ? "active" : ""}
                />
              </button>
            ))}
          </div>
          <div className="console-speaker" aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
            <i />
          </div>
        </div>
      </section>
      <Footer status={t.systemReady} end="INNOVERSE © 2026" />
    </main>
  );
}
