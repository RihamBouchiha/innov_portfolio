import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/image", () => ({ default: (props) => <img {...props} /> }));

import GalleryDialog from "../components/ui/GalleryDialog";

const labels = {
  portraitOf: "Portrait of",
  close: "Close",
  previousPhoto: "Previous photo",
  nextPhoto: "Next photo",
  previous: "Previous",
  next: "Next",
  role: "Team Lead",
};
const member = { name: "Member", photo: "/member.jpg", index: 0 };

describe("GalleryDialog", () => {
  it("focuses, navigates with arrows, and closes with Escape", () => {
    const onClose = vi.fn();
    const onPrevious = vi.fn();
    const onNext = vi.fn();
    render(
      <GalleryDialog
        member={member}
        count={1}
        labels={labels}
        onClose={onClose}
        onPrevious={onPrevious}
        onNext={onNext}
      />,
    );
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Close" })).toHaveFocus();
    fireEvent.keyDown(document, { key: "ArrowRight" });
    fireEvent.keyDown(document, { key: "ArrowLeft" });
    fireEvent.keyDown(document, { key: "Escape" });
    expect(onNext).toHaveBeenCalledOnce();
    expect(onPrevious).toHaveBeenCalledOnce();
    expect(onClose).toHaveBeenCalledOnce();
  });
});
