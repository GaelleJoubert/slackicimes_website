import { describe, expect, it } from "vitest";
import { authorInitial, isShortTestimonial } from "../../src/lib/testimonial";

describe("isShortTestimonial", () => {
  it("treats a one line thank you as short", () => {
    expect(isShortTestimonial("Merci pour tout !")).toBe(true);
  });

  it("treats a long story as long", () => {
    expect(isShortTestimonial("a".repeat(200))).toBe(false);
  });
});

describe("authorInitial", () => {
  it("returns the uppercase first letter, accents included", () => {
    expect(authorInitial("élodie")).toBe("É");
  });
});
