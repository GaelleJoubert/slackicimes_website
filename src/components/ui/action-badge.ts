export type ActionBadgeSize = "default" | "large";
export type ActionBadgeTone = "coral" | "cupPink";

const BASE_BADGE_CLASSES =
  "shadow-pressable flex shrink-0 items-center justify-center rounded-full transition group-hover:press-sink group-active:press-sink";

const SIZE_CLASSES: Record<ActionBadgeSize, string> = {
  default: "size-8 md:size-9",
  large: "size-16",
};

const TONE_CLASSES: Record<ActionBadgeTone, string> = {
  coral: "bg-coral text-ink",
  cupPink: "bg-cup-pink-strong text-white shadow-cup-navy",
};

export function actionBadgeClasses(
  size: ActionBadgeSize = "default",
  tone: ActionBadgeTone = "coral",
): string {
  return `${BASE_BADGE_CLASSES} ${SIZE_CLASSES[size]} ${TONE_CLASSES[tone]}`;
}
