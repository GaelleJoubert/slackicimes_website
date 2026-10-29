import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { beforeAll, describe, expect, it } from "vitest";
import { LEGACY_REDIRECTS } from "../src/lib/redirects";
import { absoluteUrl } from "../src/lib/seo";

const DIST_DIRECTORY = join(import.meta.dirname, "..", "dist");

// The Wix URLs Google knows, from docs/project.md. Never edit this list to make a test pass.
const CONTRACT_PAGE_SLUGS = [
  "",
  "stages-highline",
  "winter-festislack",
  "association",
  "stages-jeunes",
  "contact",
  "inscriptions",
  "livre-d-or",
  "anciennes-editions-winter-festislack",
  "coupe-du-monde",
];

const CONTRACT_PATHS = CONTRACT_PAGE_SLUGS.flatMap((slug) => [
  `/${slug}`,
  slug ? `/en/${slug}` : "/en",
]);

function distFileFor(path: string): string {
  const fileName = path === "/" ? "index.html" : `${path.slice(1)}.html`;
  return join(DIST_DIRECTORY, fileName);
}

function readBuiltPage(path: string): string {
  return readFileSync(distFileFor(path), "utf-8");
}

function countMatches(html: string, pattern: RegExp): number {
  return html.match(pattern)?.length ?? 0;
}

beforeAll(() => {
  if (!existsSync(DIST_DIRECTORY)) {
    throw new Error("dist/ is missing: run `npm run build` before `npm test`.");
  }
});

describe.each(CONTRACT_PATHS)("contract page %s", (path) => {
  it("is built", () => {
    expect(existsSync(distFileFor(path))).toBe(true);
  });

  it("has exactly one h1", () => {
    expect(countMatches(readBuiltPage(path), /<h1[\s>]/g)).toBe(1);
  });

  it("has a title and a meta description", () => {
    const html = readBuiltPage(path);
    expect(html).toMatch(/<title>[^<]+<\/title>/);
    expect(html).toMatch(/<meta name="description" content="[^"]+"/);
  });

  it("declares its own canonical URL", () => {
    expect(readBuiltPage(path)).toContain(
      `<link rel="canonical" href="${absoluteUrl(path)}"`,
    );
  });
});

describe.each(Object.entries(LEGACY_REDIRECTS))(
  "legacy redirect %s",
  (source, target) => {
    it("is built and points to its target", () => {
      expect(existsSync(distFileFor(source))).toBe(true);
      expect(readBuiltPage(source)).toContain(target);
    });

    it("targets a contract page", () => {
      expect(CONTRACT_PATHS).toContain(target);
    });
  },
);
