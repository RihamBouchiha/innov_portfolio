import styles from "./home.module.css";

export default function ProjectsTeaser({ content }) {
  return (
    <section
      className={styles.projects}
      id="projects"
      aria-labelledby="projects-title"
    >
      <div>
        <span>{content.eyebrow}</span>
        <h2 id="projects-title">{content.title}</h2>
      </div>
      <p>{content.description}</p>
      <span className={styles.projectStatus}>{content.status}</span>
    </section>
  );
}
