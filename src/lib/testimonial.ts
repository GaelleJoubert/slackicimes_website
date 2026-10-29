const SHORT_TESTIMONIAL_MAX_LENGTH = 160;

export function isShortTestimonial(text: string): boolean {
  return text.trim().length <= SHORT_TESTIMONIAL_MAX_LENGTH;
}

export function authorInitial(author: string): string {
  return author.charAt(0).toLocaleUpperCase();
}
