import { defineCollection, type SchemaContext } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { FAQ_THEMES } from "./lib/faq";
import { WORLD_CUP_SECTION_ID_LIST } from "./lib/world-cup";

type ImageFunction = SchemaContext["image"];

const nonEmptyText = z.string().min(1);
const displayOrder = z.number().int().nonnegative();

const pages = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/pages" }),
  schema: ({ image }) =>
    z.object({
      title: nonEmptyText,
      description: nonEmptyText,
      heading: nonEmptyText,
      headingAccent: nonEmptyText.optional(),
      eyebrow: nonEmptyText.optional(),
      illustration: z
        .object({
          image: image(),
          alt: nonEmptyText,
          focus: z.enum(["center", "upper", "centerRight"]).default("center"),
        })
        .optional(),
      keyFacts: z
        .array(z.object({ value: nonEmptyText, label: nonEmptyText }))
        .optional(),
      steps: z.array(nonEmptyText).optional(),
      video: z
        .object({
          url: z.url(),
          title: nonEmptyText,
          heading: nonEmptyText,
          text: nonEmptyText,
          thumbnail: image(),
        })
        .optional(),
      feature: z
        .object({
          title: nonEmptyText,
          paragraphs: z.array(nonEmptyText).min(1),
        })
        .optional(),
    }),
});

const programItem = z.object({
  label: nonEmptyText,
  place: nonEmptyText.optional(),
  details: z.array(nonEmptyText).default([]),
});

const stageImageFocus = z.enum(["top", "high", "center", "right", "raised"]);

const stages = defineCollection({
  loader: glob({ pattern: "**/*.yaml", base: "./src/content/stages" }),
  schema: ({ image }) =>
    z.object({
      order: displayOrder,
      name: nonEmptyText,
      duration: nonEmptyText,
      level: nonEmptyText,
      ageRange: nonEmptyText.optional(),
      summary: nonEmptyText,
      image: image(),
      imageAlt: nonEmptyText,
      imageFocus: stageImageFocus.default("center"),
      slideImageFocus: stageImageFocus.optional(),
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
    theme: z.enum(FAQ_THEMES),
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
    return z.object({
      hero: z.object({
        eyebrow: nonEmptyText,
        titleEmphasis: nonEmptyText,
        illustration,
        phoneImage: image(),
      }),
      highlights: z
        .array(
          z.object({
            eyebrow: nonEmptyText,
            illustration,
            imageFocus: z
              .enum(["center", "upper", "highRight"])
              .default("center"),
            title: nonEmptyText,
            text: nonEmptyText,
            pageSlug: nonEmptyText,
            sectionId: nonEmptyText.optional(),
          }),
        )
        .min(1),
      stats: z
        .array(z.object({ value: nonEmptyText, label: nonEmptyText }))
        .min(1),
      associationTeaser: z.object({
        paragraphs: z.array(nonEmptyText).min(1),
        illustration,
      }),
      stagesTeaser: z.object({
        paragraphs: z.array(nonEmptyText).min(1),
        title: nonEmptyText,
        datesNote: nonEmptyText,
        illustration,
      }),
      festivalTeaser: z.object({
        paragraphs: z.array(nonEmptyText).min(1),
      }),
      contactTeaser: z.object({ text: nonEmptyText }),
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
      layout: z.enum(["poster", "spotlight", "brief", "archive"]),
      period: nonEmptyText,
      editionNumber: z.number().int().positive().optional(),
      title: nonEmptyText,
      highlight: nonEmptyText.optional(),
      videoLinkLabel: nonEmptyText.optional(),
      poster: image().optional(),
      posterAlt: nonEmptyText.optional(),
      gallery: nonEmptyText.optional(),
      galleryTitle: nonEmptyText.optional(),
      videos: z.array(z.url()).default([]),
      videoThumbnail: image().optional(),
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
      activities: z.object({
        title: nonEmptyText,
        intro: nonEmptyText,
        items: z
          .array(
            z
              .object({
                title: nonEmptyText,
                text: nonEmptyText,
                pageSlug: nonEmptyText.optional(),
                externalUrl: z.url().optional(),
                illustration,
              })
              .refine(
                (activity) => !(activity.pageSlug && activity.externalUrl),
                {
                  message:
                    "An activity links either to a pageSlug or to an externalUrl, not both.",
                },
              ),
          )
          .min(1),
      }),
      duo: textBlock,
      team: z.object({ title: nonEmptyText }),
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
      photoFocus: z.enum(["center", "top"]).default("center"),
      portrait: image().optional(),
      portraitAlt: nonEmptyText.optional(),
      highlineSince: z.number().int().positive(),
      diplomaShortNames: z.array(nonEmptyText).min(1),
      excerpt: nonEmptyText,
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

const collagePhoto = (image: ImageFunction) =>
  z.object({
    image: image(),
    alt: nonEmptyText,
    shape: z.enum(["wide", "panorama", "half", "tall"]),
    focus: z.enum(["center", "upper", "low"]).default("center"),
  });

const titledParagraph = z.object({ title: nonEmptyText, text: nonEmptyText });

const services = defineCollection({
  loader: glob({ pattern: "*.yaml", base: "./src/content/services" }),
  schema: ({ image }) => {
    const accentedIntro = z.object({
      title: nonEmptyText,
      titleAccent: nonEmptyText,
    });
    return z.object({
      quoteButton: nonEmptyText,
      initiation: accentedIntro.extend({
        eyebrow: nonEmptyText,
        lead: nonEmptyText,
        formats: z.array(titledParagraph).min(1),
        highlights: z.array(nonEmptyText).min(1),
        photosLabel: nonEmptyText,
        photos: z.array(collagePhoto(image)).min(1),
      }),
      show: accentedIntro.extend({
        paragraphs: z.array(nonEmptyText).min(1),
        factsLabel: nonEmptyText,
        facts: z
          .array(z.object({ value: nonEmptyText, label: nonEmptyText }))
          .min(1),
        certification: titledParagraph,
        photosLabel: nonEmptyText,
        photos: z.array(collagePhoto(image)).min(1),
      }),
      process: accentedIntro.extend({
        stepsLabel: nonEmptyText,
        steps: z.array(titledParagraph).min(1),
        reassurance: titledParagraph,
      }),
      quote: z.object({
        eyebrow: nonEmptyText,
        title: nonEmptyText,
        lead: nonEmptyText,
      }),
    });
  },
});

const slackcamp = defineCollection({
  loader: glob({ pattern: "*.yaml", base: "./src/content/slackcamp" }),
  schema: ({ image }) => {
    const illustration = z.object({ image: image(), alt: nonEmptyText });
    const accentedIntro = z.object({
      eyebrow: nonEmptyText,
      title: nonEmptyText,
      titleAccent: nonEmptyText,
    });
    return z.object({
      zones: accentedIntro.omit({ eyebrow: true }).extend({
        audienceLabel: nonEmptyText,
        items: z
          .array(
            titledParagraph.extend({ audience: nonEmptyText, illustration }),
          )
          .min(1),
      }),
      stagesTeaser: accentedIntro.omit({ titleAccent: true }).extend({
        lead: nonEmptyText,
        linkLabel: nonEmptyText,
        illustration,
      }),
      bivouac: accentedIntro.extend({
        lead: nonEmptyText,
        lists: z
          .array(
            z.object({
              title: nonEmptyText,
              items: z.array(nonEmptyText).min(1),
            }),
          )
          .min(1),
        photosLabel: nonEmptyText,
        photos: z.array(collagePhoto(image)).min(1),
      }),
      access: accentedIntro.extend({
        routes: z
          .array(z.object({ label: nonEmptyText, text: nonEmptyText }))
          .min(1),
        gpsLabel: nonEmptyText,
        mapButton: nonEmptyText,
        plan: illustration,
      }),
      callToAction: z.object({
        eyebrow: nonEmptyText,
        title: nonEmptyText,
        questionLink: nonEmptyText,
      }),
    });
  },
});

const worldCup = defineCollection({
  loader: glob({ pattern: "*.yaml", base: "./src/content/world-cup" }),
  schema: ({ image }) => {
    const illustration = z.object({ image: image(), alt: nonEmptyText });
    const qualifiedAthlete = z.object({
      nameLines: z.tuple([nonEmptyText, nonEmptyText]),
      country: nonEmptyText,
      flag: image(),
      profileUrl: z.url(),
      photo: image().optional(),
    });
    const titledText = z.object({ title: nonEmptyText, text: nonEmptyText });
    const titledList = z.object({
      title: nonEmptyText,
      items: z.array(nonEmptyText).min(1),
    });
    const emphasis = z.enum(["regular", "highlight", "reserve"]);
    const sectionIntro = z.object({
      eyebrow: nonEmptyText,
      title: nonEmptyText,
    });
    return z.object({
      hero: z.object({
        badge: nonEmptyText,
        intro: nonEmptyText,
        facts: z.array(z.object({ label: nonEmptyText, value: nonEmptyText })),
        primaryCta: nonEmptyText,
        secondaryCta: nonEmptyText,
        fullLogo: illustration,
        poster: illustration,
      }),
      sectionNav: z.object({
        label: nonEmptyText,
        links: z
          .array(
            z.object({
              label: nonEmptyText,
              target: z.enum(WORLD_CUP_SECTION_ID_LIST),
              mobileOnly: z.boolean().default(false),
            }),
          )
          .nonempty(),
      }),
      event: sectionIntro.extend({
        paragraphs: z.array(nonEmptyText).min(1),
        illustration,
        stats: z.array(
          z.object({
            value: nonEmptyText,
            label: nonEmptyText,
            detail: nonEmptyText,
            isHighlighted: z.boolean().default(false),
          }),
        ),
      }),
      format: z.object({
        title: nonEmptyText,
        battle: titledText,
        origin: titledText,
        bracket: z.object({
          title: nonEmptyText,
          pool: titledText.extend({ ranks: z.array(nonEmptyText).min(1) }),
          grandFinal: titledText,
          rankFinals: titledText,
        }),
      }),
      programme: sectionIntro.extend({
        note: nonEmptyText,
        days: z.array(
          z.object({
            date: nonEmptyText,
            title: nonEmptyText,
            text: nonEmptyText,
            emphasis,
          }),
        ),
      }),
      results: sectionIntro.extend({
        qualified: z.object({
          title: nonEmptyText,
          intro: nonEmptyText,
          announcement: nonEmptyText,
          categories: z
            .array(
              z.object({
                name: nonEmptyText,
                athletes: z.array(qualifiedAthlete).default([]),
              }),
            )
            .min(1),
          slotsPerCategory: z.number().int().positive(),
          placeholderLabel: nonEmptyText,
          profileLinkLabel: nonEmptyText,
        }),
        live: z.object({
          badge: nonEmptyText,
          title: nonEmptyText,
          text: nonEmptyText,
          previewLabel: nonEmptyText,
          previewGroup: nonEmptyText,
          previewScore: nonEmptyText,
          previewRow: nonEmptyText,
          previewRowCount: z.number().int().positive(),
        }),
      }),
      infos: sectionIntro.extend({
        steps: z.array(
          titledText.extend({
            link: z.object({ label: nonEmptyText, url: z.url() }).optional(),
          }),
        ),
        facts: z.array(titledText),
        photo: illustration,
        caption: nonEmptyText,
      }),
      athletes: sectionIntro.extend({
        intro: nonEmptyText,
        contest: z.object({
          title: nonEmptyText,
          setup: titledList,
          prize: z.object({
            title: nonEmptyText,
            note: nonEmptyText,
            places: z.array(
              z.object({
                label: nonEmptyText,
                amountInEuros: z.number().positive(),
              }),
            ),
          }),
          rulebook: titledText,
        }),
        wildCard: z.object({
          title: nonEmptyText,
          timeline: z.array(
            z.object({ date: nonEmptyText, label: nonEmptyText, emphasis }),
          ),
          videoFormat: titledList,
          rules: titledList,
          judging: z.object({
            title: nonEmptyText,
            criteria: z.array(
              z.object({ label: nonEmptyText, points: nonEmptyText }),
            ),
            note: nonEmptyText,
          }),
          submission: z.object({
            text: nonEmptyText,
            formLabel: nonEmptyText,
            formUrl: z.url(),
            rulesLabel: nonEmptyText,
            rulesUrl: z.url(),
          }),
        }),
      }),
      organizers: sectionIntro.extend({
        paragraphs: z.array(nonEmptyText).min(1),
        illustration,
        linkLabel: nonEmptyText,
      }),
      partners: sectionIntro.extend({
        groups: z.array(
          z.object({
            label: nonEmptyText,
            size: z.enum(["main", "equipment", "support"]),
            partners: z.array(
              z.object({
                name: nonEmptyText,
                logo: image(),
                url: z.url().optional(),
                role: nonEmptyText.optional(),
              }),
            ),
          }),
        ),
        becomePartnerLabel: nonEmptyText,
      }),
      question: z.object({
        title: nonEmptyText,
        buttonLabel: nonEmptyText,
      }),
    });
  },
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
  services,
  slackcamp,
  worldCup,
};
