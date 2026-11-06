import { pageDots } from "../../lib/pagination";

export interface CarouselControlElements {
  controls: HTMLElement;
  previousButton: HTMLButtonElement;
  nextButton: HTMLButtonElement;
  dots: HTMLElement[];
}

export function requireCarouselElement<Found extends Element>(
  carousel: Element,
  selector: string,
): Found {
  const element = carousel.querySelector<Found>(selector);
  if (!element) {
    throw new Error(`Carousel is missing "${selector}".`);
  }
  return element;
}

export function findCarouselControls(
  carousel: Element,
): CarouselControlElements {
  return {
    controls: requireCarouselElement(carousel, "[data-carousel-controls]"),
    previousButton: requireCarouselElement(
      carousel,
      "[data-carousel-previous]",
    ),
    nextButton: requireCarouselElement(carousel, "[data-carousel-next]"),
    dots: [...carousel.querySelectorAll<HTMLElement>("[data-carousel-dot]")],
  };
}

export function showPageDots(
  dots: HTMLElement[],
  currentPageIndex: number,
  totalPages: number,
): void {
  const visibleDots = pageDots(currentPageIndex, totalPages);
  dots.forEach((dot, dotIndex) => {
    const pageDot = visibleDots[dotIndex];
    dot.hidden = !pageDot;
    dot.toggleAttribute("data-active", pageDot?.isActive ?? false);
    dot.toggleAttribute("data-more", pageDot?.hintsMorePages ?? false);
  });
}
