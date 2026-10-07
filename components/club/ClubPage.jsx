import Image from "next/image";
import Link from "next/link";

import {
  eventMemories,
  hackathonMemories,
  workshopMemories,
} from "../../content/events";
import { members, teamPhoto } from "../../content/members";
import { socialLinks } from "../../lib/constants";
import Footer from "../layout/Footer";
import LocaleSwitcher from "../layout/LocaleSwitcher";
import Logo from "../layout/Logo";
import TeamGallery from "../team/TeamGallery";

export default function ClubPage({ locale, dictionary: t }) {
  const teamDictionary = {
    teamAlbum: t.teamAlbum,
    members: t.members,
    album: t.album,
    enlargePhoto: t.enlargePhoto,
    portraitOf: t.portraitOf,
    close: t.close,
    previousPhoto: t.previousPhoto,
    nextPhoto: t.nextPhoto,
    previous: t.previous,
    next: t.next,
    roles: t.roles,
  };
  return (
    <main className="portfolio">
      <nav className="portfolio-nav" aria-label={t.navLabel}>
        <Logo />
        <div className="portfolio-nav-actions">
          <LocaleSwitcher locale={locale} label={t.changeLanguage} />
          <Link className="portfolio-home" href={`/${locale}`}>
            {t.backToLanding}
          </Link>
        </div>
      </nav>
      <section className="club-intro">
        <div className="club-copy">
          <div className="portfolio-kicker">
            <i aria-hidden="true" /> {t.clubKicker}
          </div>
          <h1>
            {t.clubIntroTitle} <em>{t.together}</em>
          </h1>
          <p>{t.clubDescription}</p>
          <a
            className="linkedin-link"
            href={socialLinks.linkedin}
            target="_blank"
            rel="noreferrer"
          >
            {t.discoverOnLinkedIn}
          </a>
          <div className="club-count">
            <b>{members.length}</b>
            <span>
              {t.portraits}
              <br />
              {t.team}
            </span>
          </div>
        </div>
        <figure className="team-photo">
          <Image
            src={teamPhoto}
            alt={t.teamPhotoAlt}
            width={800}
            height={800}
            priority
            sizes="(max-width: 760px) 100vw, 48vw"
          />
          <figcaption>INNOVERSE · ENIAD</figcaption>
        </figure>
      </section>
      <TeamGallery dictionary={teamDictionary} />
      <section className="events-section" aria-labelledby="events-title">
        <div className="events-heading">
          <div>
            <span className="events-kicker">
              INNOVERSE · {locale === "fr" ? "SUR LE TERRAIN" : "IN ACTION"}
            </span>
            <h2 id="events-title">{t.events}</h2>
          </div>
          <small>
            {eventMemories.length} {t.memories} · OCT. 2025
          </small>
        </div>
        <section
          className="event-subsection"
          aria-labelledby="integration-title"
        >
          <h3 id="integration-title">{t.integrationDay}</h3>
          <div className="event-album" aria-label={t.eventAlbum} tabIndex="0">
            {eventMemories.map((memory, index) => (
              <figure
                className={`event-memory ${memory.type}`}
                key={memory.type === "video" ? memory.src : memory.photo.src}
              >
                {memory.type === "video" ? (
                  <video
                    controls
                    playsInline
                    preload="metadata"
                    poster={memory.poster}
                    aria-label={`${t.moving} ${index + 1}`}
                  >
                    <source src={memory.src} type="video/mp4" />
                  </video>
                ) : (
                  <Image
                    src={memory.photo}
                    alt={`${t.eventPhoto} ${index + 1}`}
                    width={memory.photo.width}
                    height={memory.photo.height}
                    sizes="(max-width: 620px) 75vw, 300px"
                  />
                )}
                <figcaption>
                  <span>
                    {memory.type === "video" ? t.moving : t.integration}
                  </span>
                  <b>{String(index + 1).padStart(2, "0")}</b>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
        <section
          className="event-subsection workshop-subsection"
          aria-labelledby="workshops-title"
        >
          <div className="workshop-intro">
            <span className="events-kicker">{t.workshopKicker}</span>
            <h3 id="workshops-title">{t.workshops}</h3>
            <p>{t.workshopIntro}</p>
          </div>
          <div
            className="event-album workshop-album"
            aria-label={t.workshopAlbum}
            tabIndex="0"
          >
            {workshopMemories.map((memory, index) => (
              <figure
                className="event-memory workshop-memory"
                key={memory.photo.src ?? memory.photo}
              >
                <Image
                  src={memory.photo}
                  alt={`${t.topics[memory.topic] ?? memory.topic}: ${t.workshopPhotoAlt}`}
                  width={memory.width ?? memory.photo.width}
                  height={memory.height ?? memory.photo.height}
                  sizes="(max-width: 620px) 76vw, 300px"
                />
                <figcaption>
                  <span>{t.topics[memory.topic] ?? memory.topic}</span>
                  <b>{String(index + 1).padStart(2, "0")}</b>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
        <section
          className="event-subsection workshop-subsection hackathon-subsection"
          aria-labelledby="hackathons-title"
        >
          <div className="workshop-intro">
            <span className="events-kicker">{t.hackathonKicker}</span>
            <h3 id="hackathons-title">{t.hackathons}</h3>
          </div>
          <div
            className="event-album workshop-album"
            aria-label={t.hackathonAlbum}
            tabIndex="0"
          >
            {hackathonMemories.map((memory, index) => (
              <figure
                className="event-memory workshop-memory"
                key={memory.photo.src}
              >
                <Image
                  src={memory.photo}
                  alt={`${t.eventsLabels[memory.event] ?? memory.event}: ${t.eventPhoto}`}
                  width={memory.photo.width}
                  height={memory.photo.height}
                  sizes="(max-width: 620px) 76vw, 300px"
                />
                <figcaption>
                  <span>{t.eventsLabels[memory.event] ?? memory.event}</span>
                  <b>{String(index + 1).padStart(2, "0")}</b>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      </section>
      <section className="join-us" aria-labelledby="join-us-title">
        <div>
          <span className="events-kicker">{t.stayConnected}</span>
          <h2 id="join-us-title">
            {t.joinUs}
            <span>.</span>
          </h2>
        </div>
        <nav aria-label={t.socialLinks}>
          <a href={socialLinks.instagram} target="_blank" rel="noreferrer">
            Instagram
          </a>
          <a href={socialLinks.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
        </nav>
      </section>
      <Footer status={t.teamFooter} />
    </main>
  );
}
