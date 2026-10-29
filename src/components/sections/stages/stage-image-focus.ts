import type { CollectionEntry } from "astro:content";

type StageImageFocus = CollectionEntry<"stages">["data"]["imageFocus"];

export const STAGE_IMAGE_FOCUS_CLASSES: Record<StageImageFocus, string> = {
  top: "object-top",
  high: "object-high",
  center: "object-center",
};
