export type ButtonVariant = "primary" | "secondary";

const BASE_BUTTON_CLASSES =
  "font-heading inline-block cursor-pointer rounded-full px-6 py-3 font-bold transition-colors";

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: "bg-coral-strong text-white hover:bg-navy",
  secondary: "border-2 border-navy text-navy hover:bg-navy hover:text-white",
};

export function buttonClasses(variant: ButtonVariant): string {
  return `${BASE_BUTTON_CLASSES} ${VARIANT_CLASSES[variant]}`;
}
