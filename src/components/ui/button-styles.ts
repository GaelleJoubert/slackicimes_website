export type ButtonVariant =
  | "primary"
  | "primaryOnDark"
  | "secondary"
  | "secondaryOnDark"
  | "cupPrimary"
  | "cupSecondary"
  | "cupSecondaryOnDark";

export type ButtonSize = "default" | "compact" | "large";

export type SquareIconButtonTone = "light" | "dark";

const SQUARE_ICON_BUTTON_SHAPE =
  "flex shrink-0 cursor-pointer items-center justify-center rounded-control border-thin transition";

const SQUARE_ICON_BUTTON_TONE_CLASSES: Record<SquareIconButtonTone, string> = {
  light: "border-slate text-slate hover:bg-slate hover:text-snow",
  dark: "border-snow text-snow hover:bg-snow hover:text-slate",
};

export function squareIconButtonClasses(tone: SquareIconButtonTone): string {
  return `${SQUARE_ICON_BUTTON_SHAPE} ${SQUARE_ICON_BUTTON_TONE_CLASSES[tone]}`;
}

const BASE_BUTTON_CLASSES =
  "inline-flex cursor-pointer items-center justify-center gap-3 text-center transition";

const SITE_BUTTON_SHAPE = "rounded-control font-semibold";

const CUP_BUTTON_SHAPE = "min-h-13 rounded-control px-6.5 py-2 font-bold";

const SITE_SIZE_CLASSES: Record<ButtonSize, string> = {
  default: "min-h-12 px-5.5 text-sm md:text-base",
  compact: "min-h-11 px-4 text-sm",
  large: "min-h-14 px-8 text-base md:min-h-15 md:px-10 md:text-lg",
};

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: "bg-coral text-white hover:bg-coral-strong",
  primaryOnDark: "bg-snow text-slate hover:bg-white",
  secondary:
    "border-thin border-slate text-slate hover:bg-slate hover:text-snow",
  secondaryOnDark:
    "border-thin border-snow text-snow hover:bg-snow hover:text-slate",
  cupPrimary: "bg-cup-pink-strong text-white hover:bg-cup-magenta",
  cupSecondary:
    "border-thin border-cup-navy text-cup-navy hover:bg-cup-navy hover:text-white",
  cupSecondaryOnDark:
    "border-thin border-white text-white hover:bg-white hover:text-cup-ink",
};

function isSiteVariant(variant: ButtonVariant): boolean {
  return !variant.startsWith("cup");
}

export function buttonClasses(
  variant: ButtonVariant,
  size: ButtonSize = "default",
): string {
  const shapeClasses = isSiteVariant(variant)
    ? `${SITE_BUTTON_SHAPE} ${SITE_SIZE_CLASSES[size]}`
    : CUP_BUTTON_SHAPE;
  return `${BASE_BUTTON_CLASSES} ${shapeClasses} ${VARIANT_CLASSES[variant]}`;
}
