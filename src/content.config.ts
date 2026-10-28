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

export const collections = { pages, stages, faq, testimonials };
