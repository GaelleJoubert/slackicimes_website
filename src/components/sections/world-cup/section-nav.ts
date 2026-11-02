import { findCurrentSectionIndex } from "../../../lib/scroll-spy";
import { prefersReducedMotion } from "../../ui/expand-animation";

const READING_LINE_VIEWPORT_SHARE = 0.3;
const SECTION_LINK_SELECTOR = "a[href^='#']";

function requireSection(sectionId: string): HTMLElement {
  const section = document.getElementById(sectionId);
  if (!section) {
    throw new Error(
      `Section nav links to #${sectionId}, but no element has that id.`,
    );
  }
  return section;
}

function readingLine(nav: HTMLElement): number {
  return (
    nav.getBoundingClientRect().bottom +
    window.innerHeight * READING_LINE_VIEWPORT_SHARE
  );
}

function markCurrentLinks(links: HTMLAnchorElement[], currentHash: string) {
  links.forEach((link) => {
    const isCurrent = link.hash === currentHash;
    link.toggleAttribute("data-current", isCurrent);
    if (isCurrent) link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  });
}

export function setUpSectionNav(nav: HTMLElement) {
  const menu = nav.querySelector<HTMLDetailsElement>("[data-section-menu]");
  const currentLabel = nav.querySelector<HTMLElement>(
    "[data-current-section-label]",
  );
  const links = [
    ...nav.querySelectorAll<HTMLAnchorElement>(SECTION_LINK_SELECTOR),
  ];
  const sectionHashes = [...new Set(links.map((link) => link.hash))];
  const sections = sectionHashes.map((hash) => requireSection(hash.slice(1)));

  function labelOf(hash: string): string {
    const link = links.find((candidate) => candidate.hash === hash);
    return link?.textContent?.trim() ?? "";
  }

  function showCurrentSection() {
    const sectionTops = sections.map(
      (section) => section.getBoundingClientRect().top,
    );
    const currentIndex = findCurrentSectionIndex(sectionTops, readingLine(nav));
    const currentHash = sectionHashes[currentIndex];
    markCurrentLinks(links, currentHash);
    if (currentLabel) currentLabel.textContent = labelOf(currentHash);
  }

  function scrollToSection(event: MouseEvent) {
    const link =
      event.target instanceof Element
        ? event.target.closest<HTMLAnchorElement>(SECTION_LINK_SELECTOR)
        : null;
    if (!link) return;
    event.preventDefault();
    if (menu) menu.open = false;
    requireSection(link.hash.slice(1)).scrollIntoView({
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
    history.pushState(null, "", link.hash);
  }

  let isFramePending = false;
  function scheduleUpdate() {
    if (isFramePending) return;
    isFramePending = true;
    requestAnimationFrame(() => {
      isFramePending = false;
      showCurrentSection();
    });
  }

  nav.addEventListener("click", scrollToSection);
  window.addEventListener("scroll", scheduleUpdate, { passive: true });
  window.addEventListener("resize", scheduleUpdate);
  showCurrentSection();
}
