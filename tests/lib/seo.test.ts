import { describe, expect, it } from "vitest";
import { absoluteUrl, robotsDirective } from "../../src/lib/seo";

describe("absoluteUrl", () => {
  it("returns the origin without trailing slash for the home page", () => {
    expect(absoluteUrl("/")).toBe("https://www.slackicimes.org");
  });

  it("appends the path to the origin", () => {
    expect(absoluteUrl("/en/stages-highline")).toBe(
      "https://www.slackicimes.org/en/stages-highline",
    );
  });

  it("rejects a relative path", () => {
    expect(() => absoluteUrl("contact")).toThrow(/starting with "\/"/);
  });
});

describe("robotsDirective", () => {
  it("allows indexing only when the site is indexable", () => {
    expect(robotsDirective(true)).toBe("index, follow");
    expect(robotsDirective(false)).toBe("noindex, nofollow");
  });
});
