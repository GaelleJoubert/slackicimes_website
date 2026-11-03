import profilePoints from "./skyline-profiles.json";

export type SkylineProfile = "crete" | "montBlanc" | "pourri" | "casse";

export type SkylinePoint = readonly [x: number, y: number];

export function toSkylinePoints(points: number[][]): SkylinePoint[] {
  return points.map(([x, y]) => {
    if (x === undefined || y === undefined) {
      throw new Error("A skyline point needs both an x and a y coordinate.");
    }
    return [x, y];
  });
}

export const SKYLINE_POINTS: Record<SkylineProfile, readonly SkylinePoint[]> = {
  crete: toSkylinePoints(profilePoints.crete),
  montBlanc: toSkylinePoints(profilePoints.montBlanc),
  pourri: toSkylinePoints(profilePoints.pourri),
  casse: toSkylinePoints(profilePoints.casse),
};
