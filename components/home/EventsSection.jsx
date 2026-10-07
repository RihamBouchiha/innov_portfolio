import Image from "next/image";
import Link from "next/link";

import { homepageEvents } from "../../content/homepage";
import SectionHeading from "./SectionHeading";
import styles from "./home.module.css";

const getPhotoRatio = (photo) => {
  if (typeof photo === "object" && photo?.width && photo?.height) {
    return `${photo.width} / ${photo.height}`;
  }

  return "16 / 10";
};

export default function EventsSection({ locale, content }) {
  return (
    <section
      className={styles.events}
      id="events"
      aria-labelledby="events-title"
    >
      <div className={styles.sectionTopline}>
        <SectionHeading
          id="events-title"
          eyebrow={content.eyebrow}
          title={content.title}
          description={content.description}
          dark
        />
        {/* <Link href={`/${locale}/club#events-title`}>
          {content.viewAll} <span aria-hidden="true">→</span>
        </Link> */}
      </div>

      <div className={styles.eventGrid}>
        {homepageEvents.map((event, index) => {
          const copy = content.items[event.id];
          const album = event.album?.length ? event.album : [event.photo];

          return (
            <article className={styles.eventCard} key={event.id}>
              <header className={styles.eventCopy}>
                {/* <span className={styles.eventIndex}>
                  {String(index + 1).padStart(2, "0")}
                </span> */}
                <div>
                  <p>{copy.category}</p>
                  <h3>{event.label}</h3>
                  <span>{copy.description}</span>
                </div>
                {/* <p className={styles.eventAlbumMeta}>
                  <strong>
                    {String(album.length).padStart(2, "0")}{" "}
                    {content.photosLabel}
                  </strong>
                  <span>
                    {content.albumLabel} <b aria-hidden="true">→</b>
                  </span>
                </p> */}
              </header>

              <div
                className={styles.eventAlbumRail}
                role="region"
                aria-label={`${content.albumLabel} — ${event.label}`}
                tabIndex={0}
              >
                {album.map((photo, photoIndex) => (
                  <figure
                    key={`${event.id}-${photoIndex}`}
                    style={{ "--photo-ratio": getPhotoRatio(photo) }}
                  >
                    <Image
                      src={photo}
                      alt={`${copy.alt} — ${photoIndex + 1}`}
                      fill
                      sizes="(max-width: 580px) 82vw, (max-width: 980px) 62vw, 36vw"
                      className={styles.eventImage}
                    />
                    <figcaption>
                      {String(photoIndex + 1).padStart(2, "0")}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
