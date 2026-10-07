"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { joinFormUrl } from "../../lib/constants";
import LocaleSwitcher from "../layout/LocaleSwitcher";
import Logo from "../layout/Logo";
import styles from "./home.module.css";

export default function HomeHeader({ locale, navigation, languageLabel }) {
  const [open, setOpen] = useState(false);
  const menuButton = useRef(null);
  const firstLink = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    firstLink.current?.focus();
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <Link className={styles.logoLink} href={`/${locale}`}>
          <Logo />
        </Link>
        <button
          ref={menuButton}
          className={styles.menuButton}
          type="button"
          aria-expanded={open}
          aria-controls="home-navigation"
          aria-label={open ? navigation.closeMenu : navigation.openMenu}
          onClick={() => setOpen((current) => !current)}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>
        <nav
          id="home-navigation"
          className={`${styles.navigation} ${open ? styles.navigationOpen : ""}`}
          aria-label={navigation.label}
        >
          <div className={styles.navLinks}>
            {navigation.items.map((item, index) => (
              <a
                ref={index === 0 ? firstLink : undefined}
                href={item.href}
                key={item.href}
                onClick={() => setOpen(false)}
              >
                <span className={styles.navIndex} aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>{item.label}</span>
                <span className={styles.navArrow} aria-hidden="true">
                  ↗
                </span>
              </a>
            ))}
          </div>
          <div className={styles.navActions}>
            <LocaleSwitcher
              locale={locale}
              label={languageLabel}
              className={styles.localeSwitcher}
            />
            <a
              className={styles.navCta}
              href={joinFormUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => setOpen(false)}
            >
              {navigation.join}
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
