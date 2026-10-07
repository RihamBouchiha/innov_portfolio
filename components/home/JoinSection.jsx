import { socialLinks } from "../../lib/constants";
import styles from "./home.module.css";

export default function JoinSection({ content }) {
  return (
    <section className={styles.join} id="join" aria-labelledby="join-title">
      <div>
        <p>{content.eyebrow}</p>
        <h2 id="join-title">{content.title}</h2>
      </div>
      <div className={styles.joinAction}>
        <p>{content.description}</p>
        <a href={socialLinks.instagram} target="_blank" rel="noreferrer">
          {content.cta} <span aria-hidden="true">↗</span>
        </a>
        <small>{content.note}</small>
      </div>
    </section>
  );
}
