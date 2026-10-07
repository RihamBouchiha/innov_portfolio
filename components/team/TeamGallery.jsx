"use client";

import Image from "next/image";
import { useCallback, useState } from "react";

import { members } from "../../content/members";
import GalleryDialog from "../ui/GalleryDialog";

export default function TeamGallery({ dictionary: t }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const close = useCallback(() => setActiveIndex(null), []);
  const previous = useCallback(
    () =>
      setActiveIndex((index) => (index + members.length - 1) % members.length),
    [],
  );
  const next = useCallback(
    () => setActiveIndex((index) => (index + 1) % members.length),
    [],
  );
  const activeMember =
    activeIndex === null
      ? null
      : { ...members[activeIndex], index: activeIndex };

  return (
    <>
      <section
        className="team-section album-section"
        aria-labelledby="team-title"
      >
        <div className="team-heading">
          <h2 id="team-title">{t.teamAlbum}</h2>
          <small>
            {members.length} {t.members} · 01 {t.album}
          </small>
        </div>
        <div className="member-album">
          {members.map((member, index) => {
            const role = t.roles[member.role] ?? member.role;
            return (
              <button
                className="album-item"
                key={member.name}
                onClick={() => setActiveIndex(index)}
                aria-label={`${t.enlargePhoto} ${member.name}`}
              >
                <span className="album-photo">
                  <Image
                    src={member.photo}
                    alt={`${t.portraitOf} ${member.name}, ${role}`}
                    width={800}
                    height={1067}
                    sizes="(max-width: 620px) 68vw, 250px"
                  />
                </span>
                <span className="album-caption">
                  <b>{member.name}</b>
                  <small>{role}</small>
                </span>
              </button>
            );
          })}
        </div>
      </section>
      <GalleryDialog
        member={activeMember}
        count={members.length}
        onClose={close}
        onPrevious={previous}
        onNext={next}
        labels={{
          ...t,
          role: activeMember
            ? (t.roles[activeMember.role] ?? activeMember.role)
            : "",
        }}
      />
    </>
  );
}
