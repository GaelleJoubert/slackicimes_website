const EXPAND_DURATION_MS = 400;
const EXPAND_EASING = "cubic-bezier(0.45, 0, 0.2, 1)";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const ANIMATED_DETAILS_SELECTOR = "details[data-animated-details]";

const detailsClosers = new WeakMap<HTMLDetailsElement, () => void>();

function prefersReducedMotion(): boolean {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

async function animateHeight(
  panel: HTMLElement,
  fromHeight: number,
  toHeight: number,
): Promise<void> {
  if (prefersReducedMotion()) return;
  panel.getAnimations().forEach((animation) => animation.cancel());
  const isOpening = toHeight > fromHeight;
  panel.style.overflow = "hidden";
  const animation = panel.animate(
    [
      { height: `${fromHeight}px`, opacity: isOpening ? 0 : 1 },
      { height: `${toHeight}px`, opacity: isOpening ? 1 : 0 },
    ],
    { duration: EXPAND_DURATION_MS, easing: EXPAND_EASING },
  );
  try {
    await animation.finished;
  } catch {
    return;
  }
  panel.style.removeProperty("overflow");
}

export function expandPanel(panel: HTMLElement): Promise<void> {
  return animateHeight(panel, 0, panel.scrollHeight);
}

export function collapsePanel(panel: HTMLElement): Promise<void> {
  return animateHeight(panel, panel.offsetHeight, 0);
}

function requireChild<Found extends Element>(
  details: HTMLDetailsElement,
  selector: string,
): Found {
  const child = details.querySelector<Found>(`:scope > ${selector}`);
  if (!child) {
    throw new Error(`Animated details is missing "${selector}".`);
  }
  return child;
}

function closeOtherDetailsInGroup(details: HTMLDetailsElement): void {
  const { expandGroup } = details.dataset;
  if (!expandGroup) return;
  document
    .querySelectorAll<HTMLDetailsElement>(
      `${ANIMATED_DETAILS_SELECTOR}[data-expand-group="${expandGroup}"][open]`,
    )
    .forEach((sibling) => {
      if (sibling !== details) detailsClosers.get(sibling)?.();
    });
}

function enhanceDetails(details: HTMLDetailsElement): void {
  const summary = requireChild<HTMLElement>(details, "summary");
  const panel = requireChild<HTMLElement>(details, "[data-expand-panel]");
  let isClosing = false;

  // The native exclusive group would close siblings instantly, so JS takes over the grouping.
  if (details.name) {
    details.dataset.expandGroup = details.name;
    details.removeAttribute("name");
  }

  const close = async () => {
    isClosing = true;
    await collapsePanel(panel);
    if (!isClosing) return;
    details.open = false;
    isClosing = false;
  };

  const open = () => {
    isClosing = false;
    closeOtherDetailsInGroup(details);
    details.open = true;
    void expandPanel(panel);
  };

  detailsClosers.set(details, () => void close());
  summary.addEventListener("click", (event) => {
    event.preventDefault();
    const isShown = details.open && !isClosing;
    if (isShown) {
      void close();
      return;
    }
    open();
  });
}

export function enhanceAnimatedDetails(): void {
  document
    .querySelectorAll<HTMLDetailsElement>(ANIMATED_DETAILS_SELECTOR)
    .forEach((details) => {
      if (!detailsClosers.has(details)) enhanceDetails(details);
    });
}
