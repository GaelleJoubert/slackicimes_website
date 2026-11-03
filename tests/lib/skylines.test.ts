import { describe, expect, it } from "vitest";
import {
  SKYLINE_POINTS,
  type SkylineProfile,
} from "../../src/lib/skyline-profiles";
import {
  SKYLINE_HEIGHT,
  SKYLINE_EDGE_HEIGHT,
  SKYLINE_WIDTH,
  creteInnerRidgePath,
  skylineBackgroundLayers,
  skylineFillPath,
  skylinePoints,
  skylineStrokePath,
} from "../../src/lib/skylines";

const PROFILES = Object.keys(SKYLINE_POINTS) as SkylineProfile[];

describe("skyline profiles", () => {
  it.each(PROFILES)("%s spans the full width inside the grid", (profile) => {
    const points = skylinePoints({ profile });
    const xValues = points.map(([x]) => x);
    const yValues = points.map(([, y]) => y);

    expect(xValues[0]).toBe(0);
    expect(xValues.at(-1)).toBe(SKYLINE_WIDTH);
    expect(Math.min(...yValues)).toBeGreaterThanOrEqual(0);
    expect(Math.max(...yValues)).toBeLessThanOrEqual(SKYLINE_HEIGHT);
  });

  it.each(PROFILES)("%s moves from left to right", (profile) => {
    const xValues = skylinePoints({ profile }).map(([x]) => x);
    const sortedXValues = [...xValues].sort((left, right) => left - right);

    expect(xValues).toEqual(sortedXValues);
  });
});

describe("skylinePoints", () => {
  it("mirrors a profile horizontally and keeps it left to right", () => {
    const [firstPoint] = skylinePoints({ profile: "crete" });
    const mirroredPoints = skylinePoints({
      profile: "crete",
      isMirrored: true,
    });

    expect(mirroredPoints.at(-1)).toEqual([SKYLINE_WIDTH, firstPoint?.[1]]);
    expect(mirroredPoints[0]?.[0]).toBe(0);
  });
});

describe("skylineStrokePath", () => {
  it("starts with a move and continues with lines", () => {
    const path = skylineStrokePath({ profile: "pourri" });

    expect(path.startsWith("M0 ")).toBe(true);
    expect(path).toContain(" L");
    expect(path).not.toContain("Z");
  });
});

describe("skylineFillPath", () => {
  it("closes the ridge along the bottom of the drawing", () => {
    const customBottom = 120;
    const path = skylineFillPath({ profile: "casse" }, customBottom);

    expect(
      path.endsWith(`L${SKYLINE_WIDTH} ${customBottom} L0 ${customBottom} Z`),
    ).toBe(true);
  });
});

describe("skylineBackgroundLayers", () => {
  it("fades and lowers each layer behind the previous one", () => {
    const layers = skylineBackgroundLayers(
      ["crete", "pourri", "casse"],
      "light",
    );
    const opacities = layers.map((layer) => layer.opacity);
    const offsetsY = layers.map((layer) => layer.offsetY);

    expect(opacities).toEqual([0.85, 0.45, 0.2]);
    expect(offsetsY[0]).toBe(0);
    expect(offsetsY[1]).toBeGreaterThan(0);
    expect(offsetsY[2]).toBeGreaterThan(offsetsY[1] ?? 0);
  });

  it("uses faint strokes on dark blocks", () => {
    const layers = skylineBackgroundLayers(["crete", "montBlanc"], "dark");

    expect(layers.map((layer) => layer.opacity)).toEqual([0.16, 0.09]);
  });

  it("refuses a single layer or more than three", () => {
    expect(() => skylineBackgroundLayers(["crete"], "light")).toThrow(
      /2 to 3 profiles, got 1/,
    );
    expect(() =>
      skylineBackgroundLayers(
        ["crete", "pourri", "casse", "montBlanc"],
        "light",
      ),
    ).toThrow(/got 4/);
  });
});

describe("creteInnerRidgePath", () => {
  const MIN_GAP_UNDER_CRETE = 2;

  const pointsOf = (path: string): number[][] =>
    [...path.matchAll(/(-?[\d.]+) (-?[\d.]+)/g)].map((match) => [
      Number(match[1]),
      Number(match[2]),
    ]);

  const heightAt = (points: number[][], x: number): number => {
    const segmentEnd = points.findIndex(([pointX = 0]) => pointX >= x);
    const [endX = 0, endY = 0] = points[segmentEnd] ?? [];
    const [startX = 0, startY = 0] = points[segmentEnd - 1] ?? [endX, endY];
    if (endX === startX) return endY;
    return startY + ((endY - startY) * (x - startX)) / (endX - startX);
  };

  it("stays under the crete ridge and inside the edge", () => {
    const innerPoints = pointsOf(creteInnerRidgePath());
    const cretePoints = skylinePoints({ profile: "crete" }).map(([x, y]) => [
      x,
      y,
    ]);

    for (let x = 0; x <= SKYLINE_WIDTH; x += 1) {
      expect(
        heightAt(innerPoints, x) - heightAt(cretePoints, x),
      ).toBeGreaterThanOrEqual(MIN_GAP_UNDER_CRETE);
      expect(heightAt(innerPoints, x)).toBeLessThanOrEqual(SKYLINE_EDGE_HEIGHT);
    }
  });
});
