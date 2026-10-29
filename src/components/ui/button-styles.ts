export type ButtonVariant =
  | "primary"
  | "primaryOnDark"
  | "secondary"
  | "secondaryOnDark"
  | "cupPrimary"
  | "cupSecondary"
  | "cupSecondaryOnDark";

export type ButtonSize = "default" | "compact" | "large";

export const PRESSABLE_CLASSES =
  "shadow-pressable hover:press-sink active:press-sink";

export const PRESSABLE_ON_DARK_CLASSES = `${PRESSABLE_CLASSES} shadow-ink`;

export type RoundIconButtonTone = "light" | "dark";

const ROUND_ICON_BUTTON_SHAPE =
  "flex shrink-0 cursor-pointer items-center justify-center rounded-full border-3 transition";

const ROUND_ICON_BUTTON_TONE_CLASSES: Record<RoundIconButtonTone, string> = {
  light: `${PRESSABLE_CLASSES} border-navy bg-paper text-navy`,
  dark: `${PRESSABLE_ON_DARK_CLASSES} border-paper bg-paper text-navy`,
};

export function roundIconButtonClasses(tone: RoundIconButtonTone): string {
  return `${ROUND_ICON_BUTTON_SHAPE} ${ROUND_ICON_BUTTON_TONE_CLASSES[tone]}`;
}

const BASE_BUTTON_CLASSES =
  "inline-flex cursor-pointer items-center justify-center rounded-xl py-2 text-center font-extrabold transition";

const CUP_BUTTON_SIZE = "min-h-13 px-7";

const SITE_SIZE_CLASSES: Record<ButtonSize, string> = {
  default: "min-h-13 px-6",
  compact: "min-h-11 px-4 text-sm md:min-h-12 md:px-5 md:text-base",
  large: "min-h-13 px-6 md:min-h-15 md:px-9 md:text-lg",
};

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: `${PRESSABLE_CLASSES} bg-coral text-ink`,
  primaryOnDark: `${PRESSABLE_ON_DARK_CLASSES} bg-coral text-ink`,
  secondary: `${PRESSABLE_CLASSES} border-3 border-navy bg-paper text-navy`,
  secondaryOnDark: `${PRESSABLE_ON_DARK_CLASSES} border-3 border-paper bg-paper text-navy`,
  cupPrimary: `${CUP_BUTTON_SIZE} ${PRESSABLE_CLASSES} shadow-cup-ink bg-cup-pink-strong text-white`,
  cupSecondary: `${CUP_BUTTON_SIZE} ${PRESSABLE_CLASSES} shadow-cup-navy border-2 border-cup-navy bg-white text-cup-navy`,
  cupSecondaryOnDark: `${CUP_BUTTON_SIZE} ${PRESSABLE_CLASSES} shadow-cup-ink border-2 border-white bg-white text-cup-ink`,
};

function isSiteVariant(variant: ButtonVariant): boolean {
  return !variant.startsWith("cup");
}

export function buttonClasses(
  variant: ButtonVariant,
  size: ButtonSize = "default",
): string {
  const siteClasses = isSiteVariant(variant) ? SITE_SIZE_CLASSES[size] : "";
  return `${BASE_BUTTON_CLASSES} ${siteClasses} ${VARIANT_CLASSES[variant]}`;
}
