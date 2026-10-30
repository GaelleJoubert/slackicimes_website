import { prefersReducedMotion } from "./expand-animation";

const FADE_OUT_MS = 250;
const FADE_IN_MS = 450;
const SWITCH_DURATION_MS = FADE_OUT_MS + FADE_IN_MS;
const SWITCH_EASING = "cubic-bezier(0.33, 1, 0.68, 1)";
const FADING_CONTENT_SELECTOR = "[data-switch-content] > *";

const fadingContentOf = (panel: HTMLElement): HTMLElement[] => [
  ...panel.querySelectorAll<HTMLElement>(FADING_CONTENT_SELECTOR),
];

function fade(
  elements: HTMLElement[],
  toOpacity: number,
  duration: number,
): Animation[] {
  const fromOpacity = 1 - toOpacity;
  return elements.map((element) =>
    element.animate([{ opacity: fromOpacity }, { opacity: toOpacity }], {
      duration,
      easing: SWITCH_EASING,
      fill: "forwards",
    }),
  );
}

const finished = (animations: Animation[]) =>
  Promise.allSettled(animations.map((animation) => animation.finished));

export async function crossfadePanels(
  outgoing: HTMLElement,
  incoming: HTMLElement,
  swap: () => void,
): Promise<void> {
  if (prefersReducedMotion()) {
    swap();
    return;
  }
  const outgoingHeight = outgoing.offsetHeight;
  const fadeOuts = fade(fadingContentOf(outgoing), 0, FADE_OUT_MS);
  await finished(fadeOuts);
  swap();
  fadeOuts.forEach((animation) => animation.cancel());
  const incomingHeight = incoming.offsetHeight;
  incoming.style.overflow = "hidden";
  const resize = incoming.animate(
    [{ height: `${outgoingHeight}px` }, { height: `${incomingHeight}px` }],
    { duration: FADE_IN_MS, easing: SWITCH_EASING },
  );
  const fadeIns = fade(fadingContentOf(incoming), 1, FADE_IN_MS);
  await finished([resize, ...fadeIns]);
  fadeIns.forEach((animation) => animation.cancel());
  incoming.style.removeProperty("overflow");
}

export function glideTo(element: HTMLElement, place: () => void): void {
  const previousLeft = element.offsetLeft;
  place();
  const shift = previousLeft - element.offsetLeft;
  if (shift === 0 || prefersReducedMotion()) return;
  element.animate(
    [{ transform: `translateX(${shift}px)` }, { transform: "translateX(0)" }],
    { duration: SWITCH_DURATION_MS, easing: SWITCH_EASING },
  );
}
