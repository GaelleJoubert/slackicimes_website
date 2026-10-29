import { describe, expect, it } from "vitest";
import { withSectionAnchor } from "../../src/lib/url";

describe("withSectionAnchor", () => {
  it("appends the section id as a fragment", () => {
    expect(withSectionAnchor("/contact", "formulaire")).toBe(
      "/contact#formulaire",
    );
  });

  it("returns the path unchanged without a section id", () => {
    expect(withSectionAnchor("/en/contact")).toBe("/en/contact");
  });
});
