import {
  SKYLINE_POINTS,
  type SkylinePoint,
  type SkylineProfile,
} from "./skyline-profiles";

export const SKYLINE_WIDTH = 1440;
export const SKYLINE_HEIGHT = 100;

export type { SkylineProfile };

export interface SkylineDrawing {
  profile: SkylineProfile;
  isMirrored?: boolean;
}

export function skylinePoints({
  profile,
  isMirrored = false,
}: SkylineDrawing): SkylinePoint[] {
  const points = SKYLINE_POINTS[profile];
  if (!isMirrored) return [...points];
  return points.map(([x, y]): SkylinePoint => [SKYLINE_WIDTH - x, y]).reverse();
}

function pointsToPath(points: readonly SkylinePoint[]): string {
  return points
    .map(([x, y], pointIndex) => `${pointIndex === 0 ? "M" : "L"}${x} ${y}`)
    .join(" ");
}

export function skylineStrokePath(drawing: SkylineDrawing): string {
  return pointsToPath(skylinePoints(drawing));
}

export function skylineFillPath(
  drawing: SkylineDrawing,
  bottom: number = SKYLINE_HEIGHT,
): string {
  const ridge = skylinePoints(drawing);
  const closingCorners: SkylinePoint[] = [
    [SKYLINE_WIDTH, bottom],
    [0, bottom],
  ];
  return `${pointsToPath([...ridge, ...closingCorners])} Z`;
}

export type SkylineBackgroundTone = "light" | "dark";

export interface SkylineLayer {
  path: string;
  opacity: number;
  offsetX: number;
  offsetY: number;
}

const LIGHT_FRONT_OPACITY = 0.85;
const LIGHT_MIDDLE_OPACITY = 0.45;
const LIGHT_BACK_OPACITY = 0.2;
const DARK_FRONT_OPACITY = 0.16;
const DARK_MIDDLE_OPACITY = 0.09;
const DARK_BACK_OPACITY = 0.05;

const LAYER_OPACITIES: Record<SkylineBackgroundTone, readonly number[]> = {
  light: [LIGHT_FRONT_OPACITY, LIGHT_MIDDLE_OPACITY, LIGHT_BACK_OPACITY],
  dark: [DARK_FRONT_OPACITY, DARK_MIDDLE_OPACITY, DARK_BACK_OPACITY],
};

const LAYER_SHIFT_LEFT = 90;
const LAYER_DROP = 22;

export const MIN_BACKGROUND_LAYERS = 2;
export const MAX_BACKGROUND_LAYERS = MIN_BACKGROUND_LAYERS + 1;

export function skylineBackgroundLayers(
  profiles: readonly SkylineProfile[],
  tone: SkylineBackgroundTone,
  isMirrored = false,
): SkylineLayer[] {
  const hasValidLayerCount =
    profiles.length >= MIN_BACKGROUND_LAYERS &&
    profiles.length <= MAX_BACKGROUND_LAYERS;
  if (!hasValidLayerCount) {
    throw new Error(
      `A skyline background takes ${MIN_BACKGROUND_LAYERS} to ${MAX_BACKGROUND_LAYERS} profiles, got ${profiles.length}.`,
    );
  }
  return profiles.map((profile, layerIndex) => ({
    path: skylineStrokePath({ profile, isMirrored }),
    opacity: LAYER_OPACITIES[tone][layerIndex] ?? 0,
    offsetX: -LAYER_SHIFT_LEFT * layerIndex,
    offsetY: LAYER_DROP * layerIndex,
  }));
}
