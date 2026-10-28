export type ButtonVariant =
  | "primary"
  | "secondary"
  | "cupPrimary"
  | "cupOutlineLight"
  | "cupOutlineDark"
  | "cupLight";

const BASE_BUTTON_CLASSES =
  "inline-flex cursor-pointer items-center font-bold transition-colors";

const SITE_BUTTON_SHAPE = "font-heading rounded-full px-6 py-3";
const CUP_BUTTON_SHAPE = "min-h-13 rounded-xl px-7";

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: `${SITE_BUTTON_SHAPE} bg-coral-strong text-white hover:bg-navy`,
  secondary: `${SITE_BUTTON_SHAPE} border-2 border-navy text-navy hover:bg-navy hover:text-white`,
  cupPrimary: `${CUP_BUTTON_SHAPE} bg-cup-pink-strong text-white hover:bg-cup-magenta`,
  cupOutlineLight: `${CUP_BUTTON_SHAPE} border-2 border-white text-white hover:bg-white hover:text-cup-ink`,
  cupOutlineDark: `${CUP_BUTTON_SHAPE} border-2 border-cup-navy text-cup-navy hover:bg-cup-navy hover:text-white`,
  cupLight: `${CUP_BUTTON_SHAPE} bg-white text-cup-ink hover:bg-cup-pale`,
};

export function buttonClasses(variant: ButtonVariant): string {
  return `${BASE_BUTTON_CLASSES} ${VARIANT_CLASSES[variant]}`;
}
