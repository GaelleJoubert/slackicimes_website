export function withSectionAnchor(path: string, sectionId?: string): string {
  return sectionId ? `${path}#${sectionId}` : path;
}
