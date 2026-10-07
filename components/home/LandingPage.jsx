import AboutSection from "./AboutSection";
import EventsSection from "./EventsSection";
import HomeFooter from "./HomeFooter";
import HomeHeader from "./HomeHeader";
import HeroSection from "./HeroSection";
import JoinSection from "./JoinSection";
import LifeGallery from "./LifeGallery";
import ProjectsTeaser from "./ProjectsTeaser";
import StarfieldCanvas from "./StarfieldCanvas";
import StatsSection from "./StatsSection";
import TeamTeaser from "./TeamTeaser";
import WorkshopsSection from "./WorkshopsSection";
import styles from "./home.module.css";

export default function LandingPage({ locale, dictionary: t }) {
  const home = t.homepage;
  const navigation = {
    ...home.navigation,
    label: t.navLabel,
    items: [
      { label: home.navigation.about, href: "#about" },
      { label: home.navigation.events, href: "#events" },
      { label: home.navigation.workshops, href: "#workshops" },
      { label: home.navigation.projects, href: "#projects" },
      { label: home.navigation.team, href: "#team" },
    ],
  };
  return (
    <main className={styles.page}>
      <StarfieldCanvas className={styles.globalBackground} />
      <HomeHeader
        locale={locale}
        navigation={navigation}
        languageLabel={t.changeLanguage}
      />
      <HeroSection
        locale={locale}
        content={home.hero}
        imageAlt={t.teamPhotoAlt}
      />
      <StatsSection content={home.stats} />
      <AboutSection content={home.about} />
      <EventsSection locale={locale} content={home.events} />
      <WorkshopsSection content={home.workshops} topicLabels={t.topics} />
      {/* <ProjectsTeaser content={home.projects} /> */}
      <LifeGallery content={home.life} />
      <TeamTeaser locale={locale} content={home.team} roles={t.roles} />
      <JoinSection content={home.join} />
      <HomeFooter
        locale={locale}
        content={home.footer}
        languageLabel={t.changeLanguage}
      />
    </main>
  );
}
