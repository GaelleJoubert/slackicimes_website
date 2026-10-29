import { SITE_ORIGIN } from "./site";

const HOME_PATH = "/";

// Wix canonicals have no trailing slash, even for the home page.
export function absoluteUrl(path: string): string {
  if (!path.startsWith(HOME_PATH)) {
    throw new Error(`Expected a path starting with "/", received "${path}".`);
  }
  const isHomePath = path === HOME_PATH;
  return isHomePath ? SITE_ORIGIN : `${SITE_ORIGIN}${path}`;
}

export function robotsDirective(isIndexable: boolean): string {
  return isIndexable ? "index, follow" : "noindex, nofollow";
}
