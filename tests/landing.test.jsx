import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({ usePathname: () => "/fr" }));
vi.mock("next/image", () => ({
  default: ({ fill, priority, ...props }) => <img {...props} />,
}));
vi.mock("../components/home/StarfieldCanvas", () => ({
  default: () => null,
}));
vi.mock("../content/homepage", () => ({
  homepageStats: { members: 15, events: 4, workshops: 7 },
  homepageHeroImage: "/hero.jpg",
  homepageEvents: [
    {
      id: "enigmaVerse",
      label: "ENIGMA VERSE",
      photo: "/event.jpg",
      featured: true,
    },
  ],
  homepageWorkshops: [{ topic: "GIT & GITHUB", photo: "/workshop.jpg" }],
  homepageGallery: [{ src: "/gallery.jpg" }],
  homepageMembers: [
    { name: "Test Member", role: "Team Leader", photo: "/member.jpg" },
  ],
}));

import LandingPage from "../components/home/LandingPage";
import { getDictionary } from "../content/dictionaries";

describe("localized landing", () => {
  it.each(["fr", "en"])("renders navigation for /%s", (locale) => {
    render(<LandingPage locale={locale} dictionary={getDictionary(locale)} />);
    expect(
      screen.getByRole("link", {
        name: getDictionary(locale).homepage.team.viewTeam,
      }),
    ).toHaveAttribute("href", `/${locale}/club`);
    expect(
      screen.getByRole("link", {
        name: getDictionary(locale).homepage.hero.labLink,
      }),
    ).toHaveAttribute("href", `/${locale}/play`);
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: getDictionary(locale).homepage.hero.title.join(" "),
      }),
    ).toBeInTheDocument();
  });
});
