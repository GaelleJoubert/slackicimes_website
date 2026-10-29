const PAST_FESTIVAL_EDITIONS_PATH = "/anciennes-editions-winter-festislack";
const ENGLISH_PREFIX = "/en";
const STAGES_PATH = "/stages-highline";
const CONTACT_PATH = "/contact";
const SERVICES_PATH = "/prestations";
const FESTIVAL_PATH = "/winter-festislack";
const FESTIVAL_REGISTRATIONS_PATH = "/inscriptions-winter-festislack";
const ASSOCIATION_PATH = "/association";
const EXPEDITIONS_PATH = "/expeditions";

const PAST_EVENT_SLUGS = [
  "stage-premier-pas",
  "weekend-decouverte-2024-06-22-08-00",
  "weekend-decouverte-2024-06-29-09-00",
  "weekend-decouverte-2024-07-06-09-00",
  "weekend-decouverte-2024-07-20-09-00",
  "weekend-decouverte-2024-08-03-09-00",
  "weekend-decouverte-2024-08-10-09-00",
  "weekend-decouverte-2024-08-24-09-00",
  "weekend-decouverte-2024-09-07-09-00",
];

const RENAMED_FESTIVAL_EDITIONS_PATHS = [
  "/copie-de-winter-festislack",
  "/old-winterfestislack-editions",
];

const pastEventRedirects = PAST_EVENT_SLUGS.map((slug) => [
  `/event-details/${slug}`,
  STAGES_PATH,
]);

const renamedFestivalRedirects = RENAMED_FESTIVAL_EDITIONS_PATHS.flatMap(
  (oldPath) => [
    [oldPath, PAST_FESTIVAL_EDITIONS_PATH],
    [
      `${ENGLISH_PREFIX}${oldPath}`,
      `${ENGLISH_PREFIX}${PAST_FESTIVAL_EDITIONS_PATH}`,
    ],
  ],
);

const REMOVED_PAGE_TARGETS: Record<string, string> = {
  [SERVICES_PATH]: CONTACT_PATH,
  [FESTIVAL_REGISTRATIONS_PATH]: FESTIVAL_PATH,
  [EXPEDITIONS_PATH]: ASSOCIATION_PATH,
};

const removedPageRedirects = Object.entries(REMOVED_PAGE_TARGETS).flatMap(
  ([removedPath, targetPath]) => [
    [removedPath, targetPath],
    [`${ENGLISH_PREFIX}${removedPath}`, `${ENGLISH_PREFIX}${targetPath}`],
  ],
);

export const LEGACY_REDIRECTS: Record<string, string> = Object.fromEntries([
  ...renamedFestivalRedirects,
  ...pastEventRedirects,
  ...removedPageRedirects,
]);
