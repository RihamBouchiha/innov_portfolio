import SectionHeading from "./SectionHeading";
import styles from "./home.module.css";

export default function AboutSection({ content }) {
  return (
    <section className={styles.about} id="about" aria-labelledby="about-title">
      <SectionHeading
        id="about-title"
        eyebrow={content.eyebrow}
        title={content.title}
        description={content.description}
      />
      <div className={styles.aboutPrinciples}>
        {content.principles.map((principle, index) => (
          <article key={principle.title}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h3>{principle.title}</h3>
            <p>{principle.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
