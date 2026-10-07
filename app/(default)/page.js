import LandingPage from "../../components/home/LandingPage";
import { getDictionary } from "../../content/dictionaries";

export default function HomePage() {
  return <LandingPage locale="fr" dictionary={getDictionary("fr")} />;
}
