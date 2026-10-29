export type ActionBadgeSize = "default" | "large";

const BASE_BADGE_CLASSES =
  "bg-coral text-ink shadow-pressable flex shrink-0 items-center justify-center rounded-full transition group-hover:press-sink group-active:press-sink";

const SIZE_CLASSES: Record<ActionBadgeSize, string> = {
  default: "size-8 md:size-9",
  large: "size-16",
};

export function actionBadgeClasses(size: ActionBadgeSize = "default"): string {
  return `${BASE_BADGE_CLASSES} ${SIZE_CLASSES[size]}`;
}
