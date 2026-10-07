import Image from "next/image";
import Link from "next/link";

import { homepageMembers } from "../../content/homepage";
import SectionHeading from "./SectionHeading";
import styles from "./home.module.css";

export default function TeamTeaser({ locale, content, roles }) {
  return (
    <section className={styles.team} id="team" aria-labelledby="team-title">
      <div className={styles.sectionTopline}>
        <SectionHeading
          id="team-title"
          eyebrow={content.eyebrow}
          title={content.title}
          description={content.description}
        />
        <Link href={`/${locale}/club`}>
          {content.viewTeam} <span aria-hidden="true">→</span>
        </Link>
      </div>
      <div className={styles.teamGrid}>
        {homepageMembers.map((member) => (
          <article key={member.name}>
            <div>
              <Image
                src={member.photo}
                alt={`${content.portraitOf} ${member.name}`}
                fill
                sizes="(max-width: 560px) 50vw, 25vw"
              />
            </div>
            <h3>{member.name}</h3>
            <p>{roles[member.role] ?? member.role}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
