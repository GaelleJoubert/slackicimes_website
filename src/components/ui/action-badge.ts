export type ActionBadgeSize = "default" | "large";
export type ActionBadgeTone =
  "outline" | "filled" | "cupOutline" | "cupOutlineOnDark";

const SQUARE_BADGE_SHAPE =
  "flex shrink-0 items-center justify-center rounded-control transition";

export const STANDALONE_BADGE_CLASSES =
  "group-hover:bg-slate group-hover:text-snow";

const SIZE_CLASSES: Record<ActionBadgeSize, string> = {
  default: "size-9 md:size-10",
  large: "size-16",
};

const TONE_CLASSES: Record<ActionBadgeTone, string> = {
  outline: `${SQUARE_BADGE_SHAPE} border-thin border-slate text-slate`,
  filled: `${SQUARE_BADGE_SHAPE} bg-coral text-white group-hover:bg-coral-strong`,
  cupOutline: `${SQUARE_BADGE_SHAPE} border-thin border-cup-navy text-cup-navy group-hover:bg-cup-navy group-hover:text-white`,
  cupOutlineOnDark: `${SQUARE_BADGE_SHAPE} border-thin border-white text-white`,
};

export function actionBadgeClasses(
  size: ActionBadgeSize = "default",
  tone: ActionBadgeTone = "outline",
): string {
  return `${SIZE_CLASSES[size]} ${TONE_CLASSES[tone]}`;
}
