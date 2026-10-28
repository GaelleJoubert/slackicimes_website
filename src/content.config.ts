import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const nonEmptyText = z.string().min(1);
const displayOrder = z.number().int().nonnegative();

const pages = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/pages" }),
  schema: z.object({
    title: nonEmptyText,
    description: nonEmptyText,
    heading: nonEmptyText,
  }),
});

const programItem = z.object({
  label: nonEmptyText,
  details: z.array(nonEmptyText).default([]),
});

const stages = defineCollection({
  loader: glob({ pattern: "**/*.yaml", base: "./src/content/stages" }),
  schema: ({ image }) =>
    z.object({
      order: displayOrder,
      name: nonEmptyText,
      duration: nonEmptyText,
      level: nonEmptyText,
      summary: nonEmptyText,
      image: image(),
      imageAlt: nonEmptyText,
      description: z.array(nonEmptyText).min(1),
      program: z.object({
        intro: z.array(nonEmptyText).default([]),
        items: z.array(programItem).min(1),
      }),
      prerequisites: z.array(nonEmptyText).min(1),
      dates: nonEmptyText,
      priceInEuros: z.number().positive(),
    }),
});

const faq = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/faq" }),
  schema: z.object({
    order: displayOrder,
    question: nonEmptyText,
  }),
});

const testimonials = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/testimonials" }),
  schema: z.object({
    order: displayOrder,
    author: nonEmptyText,
    stageName: nonEmptyText,
  }),
});

const home = defineCollection({
  loader: glob({ pattern: "*.yaml", base: "./src/content/home" }),
  schema: ({ image }) => {
    const illustration = z.object({ image: image(), alt: nonEmptyText });
    const textBlock = z.object({
      title: nonEmptyText,
      paragraphs: z.array(nonEmptyText).min(1),
    });
    return z.object({
      highlights: z
        .array(
          z.object({
            eyebrow: nonEmptyText,
            title: nonEmptyText,
            text: nonEmptyText,
            pageSlug: nonEmptyText,
            illustration,
          }),
        )
        .min(1),
      stagesTeaser: textBlock.extend({ illustration }),
      festivalTeaser: textBlock,
    });
  },
});

const galleries = defineCollection({
  loader: glob({ pattern: "**/*.yaml", base: "./src/content/galleries" }),
  schema: ({ image }) =>
    z.object({
      photos: z
        .array(
          z.object({
            image: image(),
            alt: nonEmptyText,
            caption: nonEmptyText.optional(),
          }),
        )
        .min(1),
    }),
});

const festivalEditions = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/festival-editions" }),
  schema: ({ image }) =>
    z.object({
      order: displayOrder,
      title: nonEmptyText,
      poster: image().optional(),
      posterAlt: nonEmptyText.optional(),
      gallery: nonEmptyText.optional(),
      galleryTitle: nonEmptyText.optional(),
    }),
});

const festival = defineCollection({
  loader: glob({ pattern: "*.yaml", base: "./src/content/festival" }),
  schema: ({ image }) =>
    z.object({
      announcement: z.object({
        title: nonEmptyText,
        paragraphs: z.array(nonEmptyText).min(1),
        poster: z.object({ image: image(), alt: nonEmptyText }),
      }),
    }),
});

const association = defineCollection({
  loader: glob({ pattern: "*.yaml", base: "./src/content/association" }),
  schema: ({ image }) => {
    const illustration = z.object({ image: image(), alt: nonEmptyText });
    const textBlock = z.object({
      title: nonEmptyText,
      paragraphs: z.array(nonEmptyText).min(1),
    });
    return z.object({
      origin: textBlock.extend({ illustration }),
      firstStages: textBlock,
      activities: z.object({
        title: nonEmptyText,
        intro: nonEmptyText,
        items: z
          .array(
            z.object({
              title: nonEmptyText,
              text: nonEmptyText,
              pageSlug: nonEmptyText.optional(),
              illustration,
            }),
          )
          .min(1),
      }),
      duo: textBlock.extend({
        valuesTitle: nonEmptyText,
        values: z.array(nonEmptyText).min(1),
      }),
      crew: textBlock,
    });
  },
});

const team = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/team" }),
  schema: ({ image }) =>
    z.object({
      order: displayOrder,
      group: z.enum(["duo", "crew"]),
      name: nonEmptyText,
      role: nonEmptyText,
      photo: image(),
      photoAlt: nonEmptyText,
      portrait: image().optional(),
      portraitAlt: nonEmptyText.optional(),
      facts: z
        .array(
          z.object({
            label: nonEmptyText,
            items: z.array(nonEmptyText).min(1),
          }),
        )
        .min(1),
    }),
});

export const collections = {
  pages,
  stages,
  faq,
  testimonials,
  home,
  galleries,
  festivalEditions,
  festival,
  association,
  team,
};
