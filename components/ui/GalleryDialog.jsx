"use client";

import Image from "next/image";
import { useCallback } from "react";

import { useDialogFocus } from "../../hooks/useDialogFocus";

export default function GalleryDialog({
  member,
  count,
  onClose,
  onPrevious,
  onNext,
  labels,
}) {
  const close = useCallback(() => onClose(), [onClose]);
  const previous = useCallback(() => onPrevious(), [onPrevious]);
  const next = useCallback(() => onNext(), [onNext]);
  const dialogRef = useDialogFocus(Boolean(member), {
    onClose: close,
    onPrevious: previous,
    onNext: next,
  });

  if (!member) return null;

  return (
    <div
      ref={dialogRef}
      className="photo-viewer"
      role="dialog"
      aria-modal="true"
      aria-label={`${labels.portraitOf} ${member.name}`}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) close();
      }}
    >
      <button
        className="viewer-close"
        onClick={close}
        aria-label={labels.close}
      >
        ×
      </button>
      <button
        className="viewer-step viewer-prev"
        onClick={previous}
        aria-label={labels.previousPhoto}
      >
        {labels.previous}
      </button>
      <figure>
        <Image
          src={member.photo}
          alt={`${labels.portraitOf} ${member.name}, ${labels.role}`}
          width={800}
          height={1067}
          sizes="90vw"
        />
        <figcaption>
          <b>{member.name}</b>
          <span>{labels.role}</span>
          <small>
            {member.index + 1} / {count}
          </small>
        </figcaption>
      </figure>
      <button
        className="viewer-step viewer-next"
        onClick={next}
        aria-label={labels.nextPhoto}
      >
        {labels.next}
      </button>
    </div>
  );
}
