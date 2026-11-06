import { describe, expect, it } from "vitest";
import { athleteInitials } from "../../src/lib/world-cup";

describe("athleteInitials", () => {
  it("takes the first letter of each name part", () => {
    expect(athleteInitials("Flora Fink")).toBe("FF");
  });

  it("uppercases and ignores extra whitespace", () => {
    expect(athleteInitials("  dayoung   cheong ")).toBe("DC");
  });
});
