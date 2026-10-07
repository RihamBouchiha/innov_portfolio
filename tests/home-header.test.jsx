import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({ usePathname: () => "/fr" }));

import HomeHeader from "../components/home/HomeHeader";
import { getDictionary } from "../content/dictionaries";

describe("HomeHeader", () => {
  it("exposes and closes the mobile navigation accessibly", async () => {
    const user = userEvent.setup();
    const t = getDictionary("fr");
    const navigation = {
      ...t.homepage.navigation,
      label: t.navLabel,
      items: [{ label: t.homepage.navigation.about, href: "#about" }],
    };
    render(
      <HomeHeader
        locale="fr"
        navigation={navigation}
        languageLabel={t.changeLanguage}
      />,
    );

    const trigger = screen.getByRole("button", { name: navigation.openMenu });
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    await user.keyboard("{Escape}");
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(trigger).toHaveFocus();
  });
});
