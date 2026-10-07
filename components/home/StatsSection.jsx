import { homepageStats } from "../../content/homepage";
import styles from "./home.module.css";

export default function StatsSection({ content }) {
  const stats = [
    [homepageStats.members, content.members],
    [homepageStats.events, content.events],
    [homepageStats.workshops, content.workshops],
  ];
  return (
    <section className={styles.stats} aria-labelledby="stats-title">
      <p id="stats-title">{content.title}</p>
      <div>
        {stats.map(([value, label]) => (
          <article key={label}>
            <strong>{String(value).padStart(2, "0")}</strong>
            <span>{label}</span>
          </article>
        ))}
      </div>
      <small>{content.note}</small>
    </section>
  );
}
