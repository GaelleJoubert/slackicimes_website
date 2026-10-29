export type ButtonVariant =
  | "primary"
  | "secondary"
  | "secondaryRaised"
  | "secondaryOnDark"
  | "navy"
  | "cupPrimary"
  | "cupOutlineLight"
  | "cupOutlineDark"
  | "cupLight";

export type ButtonSize = "default" | "compact";

const BASE_BUTTON_CLASSES =
  "inline-flex cursor-pointer items-center justify-center rounded-xl text-center font-extrabold transition";

const CUP_BUTTON_SIZE = "min-h-13 px-7";

const SITE_SIZE_CLASSES: Record<ButtonSize, string> = {
  default: "min-h-13 px-6",
  compact: "min-h-11 px-4 text-sm md:min-h-12 md:px-5 md:text-base",
};

const PRESSABLE = "hover:translate-y-0.5 hover:shadow-none";

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: `${PRESSABLE} bg-coral text-ink shadow-drop`,
  secondary: `border-3 border-navy text-navy hover:bg-navy hover:text-paper`,
  secondaryRaised: `${PRESSABLE} border-3 border-navy text-navy shadow-drop`,
  secondaryOnDark: `border-3 border-paper text-paper hover:bg-paper hover:text-navy`,
  navy: `bg-navy text-paper hover:bg-ink`,
  cupPrimary: `${CUP_BUTTON_SIZE} bg-cup-pink-strong text-white hover:bg-cup-magenta`,
  cupOutlineLight: `${CUP_BUTTON_SIZE} border-2 border-white text-white hover:bg-white hover:text-cup-ink`,
  cupOutlineDark: `${CUP_BUTTON_SIZE} border-2 border-cup-navy text-cup-navy hover:bg-cup-navy hover:text-white`,
  cupLight: `${CUP_BUTTON_SIZE} bg-white text-cup-ink hover:bg-cup-pale`,
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
