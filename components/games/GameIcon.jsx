export default function GameIcon({ name }) {
  if (name === "grid")
    return (
      <span className="grid-icon">
        {Array.from({ length: 9 }).map((_, index) => (
          <i aria-hidden="true" key={index} />
        ))}
      </span>
    );
  if (name === "xo")
    return (
      <span className="xo-icon" aria-hidden="true">
        <b>×</b>
        <i>○</i>
      </span>
    );
  if (name === "pulse")
    return (
      <span className="pulse-icon" aria-hidden="true">
        428
      </span>
    );
  if (name === "odd")
    return (
      <span className="odd-icon" aria-hidden="true">
        <i>●</i>
        <i>●</i>
        <i>■</i>
      </span>
    );
  return (
    <span className="cards-icon" aria-hidden="true">
      <i />
      <i />
      <i />
    </span>
  );
}
