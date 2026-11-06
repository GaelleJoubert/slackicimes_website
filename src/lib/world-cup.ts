export const WORLD_CUP_SECTION_IDS = {
  event: "evenement",
  programme: "programme",
  athletes: "athletes",
  results: "resultats",
  practicalInfo: "infos",
  format: "format",
  wildCards: "participer",
  partners: "partenaires",
} as const;

export type WorldCupSectionId =
  (typeof WORLD_CUP_SECTION_IDS)[keyof typeof WORLD_CUP_SECTION_IDS];

export const WORLD_CUP_SECTION_ID_LIST = Object.values(
  WORLD_CUP_SECTION_IDS,
) as [WorldCupSectionId, ...WorldCupSectionId[]];
