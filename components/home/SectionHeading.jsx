import styles from "./home.module.css";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  dark,
  id,
}) {
  return (
    <header className={`${styles.sectionHeading} ${dark ? styles.dark : ""}`}>
      <span>{eyebrow}</span>
      <h2 id={id}>{title}</h2>
      {description ? <p>{description}</p> : null}
    </header>
  );
}
