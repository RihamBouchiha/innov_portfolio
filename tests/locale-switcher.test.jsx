import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({ usePathname: () => "/fr/club" }));

import LocaleSwitcher from "../components/layout/LocaleSwitcher";

describe("LocaleSwitcher", () => {
  it("keeps the current page while changing locale", () => {
    render(<LocaleSwitcher locale="fr" label="Language" />);
    expect(screen.getByRole("link", { name: "Language" })).toHaveAttribute(
      "href",
      "/en/club",
    );
  });
});
