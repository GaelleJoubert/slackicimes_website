import { describe, expect, it } from "vitest";
import {
  buildAlternateLinks,
  localizedPath,
  parseContentId,
  toRestRouteParam,
} from "../../src/i18n/routes";

describe("localizedPath", () => {
  it("keeps French at the root", () => {
    expect(localizedPath("", "fr")).toBe("/");
    expect(localizedPath("contact", "fr")).toBe("/contact");
  });

  it("prefixes English with /en", () => {
    expect(localizedPath("", "en")).toBe("/en");
    expect(localizedPath("contact", "en")).toBe("/en/contact");
  });
});

describe("buildAlternateLinks", () => {
  it("lists both locales and points x-default to French", () => {
    expect(buildAlternateLinks("contact")).toEqual([
      { hreflang: "fr-fr", href: "https://www.slackicimes.org/contact" },
      { hreflang: "en-us", href: "https://www.slackicimes.org/en/contact" },
      { hreflang: "x-default", href: "https://www.slackicimes.org/contact" },
    ]);
  });
});

describe("parseContentId", () => {
  it("maps a bare locale id to the home page", () => {
    expect(parseContentId("en")).toEqual({ locale: "en", pageSlug: "" });
  });

  it("reads the locale and the slug", () => {
    expect(parseContentId("fr/livre-d-or")).toEqual({
      locale: "fr",
      pageSlug: "livre-d-or",
    });
  });

  it("rejects an unknown locale", () => {
    expect(() => parseContentId("de/contact")).toThrow(
      /must start with a locale/,
    );
  });
});

describe("toRestRouteParam", () => {
  it("returns undefined for the home page", () => {
    expect(toRestRouteParam("/")).toBeUndefined();
    expect(toRestRouteParam("/en/contact")).toBe("en/contact");
  });
});
