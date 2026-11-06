import { describe, expect, it } from "vitest";
import { LEGACY_REDIRECTS } from "../../src/lib/redirects";

describe("LEGACY_REDIRECTS", () => {
  const sources = Object.keys(LEGACY_REDIRECTS);
  const targets = Object.values(LEGACY_REDIRECTS);

  it("never chains redirects", () => {
    const chainedTargets = targets.filter((target) => sources.includes(target));
    expect(chainedTargets).toEqual([]);
  });

  it("keeps English sources pointing to English targets", () => {
    const englishSources = sources.filter((source) =>
      source.startsWith("/en/"),
    );
    for (const source of englishSources) {
      expect(LEGACY_REDIRECTS[source]).toMatch(/^\/en\//);
    }
  });
});
