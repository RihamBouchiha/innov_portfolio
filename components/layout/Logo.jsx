export default function Logo({ compact = false }) {
  return (
    <div className={`brand ${compact ? "compact" : ""}`}>
      <span className="brand-mark" role="img" aria-label="Logo Innoverse" />
      <div>
        <strong>INNOVERSE</strong>
        <span>INNOVATION CLUB</span>
      </div>
    </div>
  );
}
