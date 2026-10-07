export default function Footer({ status, end = "ENIAD" }) {
  return (
    <footer>
      <span>
        <i aria-hidden="true" /> {status}
      </span>
      <span>{end}</span>
    </footer>
  );
}
