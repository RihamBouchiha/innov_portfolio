import Image from "next/image";

import { homepageGallery } from "../../content/homepage";
import SectionHeading from "./SectionHeading";
import styles from "./home.module.css";

export default function LifeGallery({ content }) {
  return (
    <section className={styles.life} aria-labelledby="life-title">
      <SectionHeading
        id="life-title"
        eyebrow={content.eyebrow}
        title={content.title}
        description={content.description}
      />
      <div className={styles.lifeCollage}>
        {homepageGallery.map((photo, index) => (
          <figure key={photo.src}>
            <Image
              src={photo}
              alt={`${content.imageAlt} ${index + 1}`}
              fill
              loading="lazy"
              sizes={
                index === 0
                  ? "(max-width: 700px) 100vw, 50vw"
                  : "(max-width: 700px) 50vw, 25vw"
              }
            />
            <figcaption>{String(index + 1).padStart(2, "0")}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
