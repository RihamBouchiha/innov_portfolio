import Link from "next/link";

export default function Victory({ locale, dictionary: t }) {
  return (
    <main className="victory">
      <div className="victory-rays" />
      <div className="victory-mark">✓</div>
      <div className="eyebrow">
        <span /> {t.accessGranted}
      </div>
      <h1>
        {t.wellDone}
        <br />
        <em>{t.brilliant}</em>
      </h1>
      <p>
        {t.unlockedPortfolio}
        <br />
        {t.innoverseWorld}
      </p>
      <Link className="victory-action" href={`/${locale}/club`}>
        {t.enterPortfolio}
      </Link>
      <small>{t.discoverTeam}</small>
    </main>
  );
}
