import Image from "next/image";
import Link from "next/link";

import { homepageHeroImage } from "../../content/homepage";
import { joinFormUrl } from "../../lib/constants";
import styles from "./home.module.css";

export default function HeroSection({ locale, content, imageAlt }) {
  return (
    <div className={styles.heroOuter}>
      <section className={styles.hero} aria-labelledby="home-title">
        <div className={styles.heroCopy}>
          <div className={styles.eyebrowWrap}>
            <span className={styles.eyebrowStar} aria-hidden="true">
              ✦
            </span>
            <p className={styles.eyebrow}>{content.eyebrow}</p>
          </div>
          <h1 id="home-title" aria-label={content.title.join(" ")}>
            {content.title.map((line, index) => (
              <span
                key={line}
                className={index === 1 ? styles.titleAccent : undefined}
              >
                {line}{" "}
              </span>
            ))}
          </h1>
          <p className={styles.heroDescription}>{content.description}</p>
          <div className={styles.heroActions}>
            <a className={styles.primaryButton} href="#about">
              {content.primaryCta} <span aria-hidden="true">↓</span>
            </a>
            <a
              className={styles.secondaryButton}
              href={joinFormUrl}
              target="_blank"
              rel="noreferrer"
            >
              {content.secondaryCta}
            </a>
          </div>
          {/* <Link className={styles.labLink} href={`/${locale}/play`}>
            <span className={styles.labIcon} aria-hidden="true">
              ⌁
            </span>{" "}
            {content.labLink}
          </Link> */}
        </div>
        <figure className={styles.heroVisual}>
          <div className={styles.heroVisualAura} aria-hidden="true" />
          <div className={styles.heroVisualFrame}>
            <Image
              src={homepageHeroImage}
              alt={imageAlt}
              fill
              preload
              sizes="(max-width: 800px) 100vw, 50vw"
              className={styles.heroImage}
            />
            <figcaption>
              <span>{content.imageLabel}</span>
            </figcaption>
          </div>
        </figure>
      </section>
    </div>
  );
}
