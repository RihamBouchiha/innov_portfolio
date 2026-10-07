import Image from "next/image";

import { homepageWorkshops } from "../../content/homepage";
import { homepageWorkshopGallery } from "../../content/workshop-gallery-data";
import SectionHeading from "./SectionHeading";
import styles from "./home.module.css";

export default function WorkshopsSection({ content, topicLabels }) {
  return (
    <section
      className={styles.workshops}
      id="workshops"
      aria-labelledby="workshops-title"
    >
      <SectionHeading
        id="workshops-title"
        eyebrow={content.eyebrow}
        title={content.title}
        description={content.description}
      />
      <div className={styles.workshopList}>
        {homepageWorkshops.map((workshop, index) => {
          const topic = topicLabels[workshop.topic] ?? workshop.topic;
          return (
            <article key={workshop.topic}>
              <span className={styles.workshopIndex}>
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className={styles.workshopThumb}>
                <Image
                  src={workshop.photo}
                  alt={`${topic} — ${content.imageAlt}`}
                  fill
                  sizes="(max-width: 580px) calc(100vw - 2rem), (max-width: 1040px) 50vw, 25vw"
                />
              </div>
              <div>
                <p>{content.category}</p>
                <h3>{topic}</h3>
                <span>{content.items[workshop.topic]}</span>
              </div>
            </article>
          );
        })}
      </div>
      <div className={styles.workshopAlbum}>
        <div className={styles.workshopAlbumHeading}>
          <span>{content.albumEyebrow}</span>
          <h3>{content.albumTitle}</h3>
          <p>{content.albumDescription}</p>
        </div>
        <div className={styles.workshopAlbumGrid}>
          {homepageWorkshopGallery.map((photo, index) => (
            <figure key={photo}>
              <Image
                src={photo}
                alt={`${content.albumImageAlt} ${index + 1}`}
                fill
                loading="lazy"
                sizes="(max-width: 580px) 50vw, (max-width: 1040px) 50vw, 33vw"
              />
              <figcaption>{String(index + 1).padStart(2, "0")}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
