import type { CollectionEntry } from "astro:content";

export type WorldCupContent = CollectionEntry<"worldCup">["data"];

export type WorldCupVenue = Pick<WorldCupContent["infos"], "photo" | "caption">;
