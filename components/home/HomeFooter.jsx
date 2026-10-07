import Link from "next/link";

import { socialLinks } from "../../lib/constants";
import LocaleSwitcher from "../layout/LocaleSwitcher";
import Logo from "../layout/Logo";
import styles from "./home.module.css";

export default function HomeFooter({ locale, content, languageLabel }) {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerMain}>
        <div className={styles.footerBrand}>
          <Link className={styles.logoLink} href={`/${locale}`}>
            <Logo />
          </Link>
          <p>{content.description}</p>
        </div>
        <nav aria-label={content.navigationLabel}>
          <strong>{content.explore}</strong>
          <a href="#about">{content.about}</a>
          <a href="#events">{content.events}</a>
          <a href="#workshops">{content.workshops}</a>
          <a href="#team">{content.team}</a>
        </nav>
        <nav aria-label={content.socialLabel}>
          <strong>{content.connect}</strong>
          <a href={socialLinks.instagram} target="_blank" rel="noreferrer">
            Instagram <span aria-hidden="true">↗</span>
          </a>
          <a href={socialLinks.linkedin} target="_blank" rel="noreferrer">
            LinkedIn <span aria-hidden="true">↗</span>
          </a>
          <LocaleSwitcher
            locale={locale}
            label={languageLabel}
            className={styles.footerLanguage}
          />
        </nav>
      </div>
      <div className={styles.footerBottom}>
        <span>© {new Date().getFullYear()} INNOVERSE · ENIAD</span>
        <span>{content.signature}</span>
      </div>
    </footer>
  );
}
