import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import { SITE } from "@/config";

export const BLOG_PATH = "src/content/blog";

const blog = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: `./${BLOG_PATH}` }),
  schema: ({ image }) => {
    const shouldResolveAsAsset = (value: string) => {
      // Prevent trying to treat remote URLs as local assets.
      if (/^[a-zA-Z][a-zA-Z\d+.-]*:/.test(value)) return false;

      // Site-absolute/public paths are not src assets.
      if (value.startsWith("/")) return false;

      // Only resolve as an asset if it's clearly path-like.
      return value.includes("/") || value.startsWith(".");
    };

    const imagePath = z.string().refine(shouldResolveAsAsset).pipe(image());

    return z.object({
      author: z.string().default(SITE.author),
      pubDatetime: z.coerce.date(),
      modDatetime: z.date().optional().nullable(),
      title: z.string(),
      featured: z.boolean().optional(),
      draft: z.boolean().optional(),
      unlisted: z.boolean().optional(),
      ogImage: image().or(z.string()).optional(),
      heroImage: imagePath.or(z.string()).optional(),
      heroImageAlt: z.string().optional(),
      description: z.string(),
      canonicalURL: z.string().optional(),
      hideEditPost: z.boolean().optional(),
      timezone: z.string().optional(),
      // Additional fields from existing posts
      source: z.string().optional(),
      AIDescription: z.boolean().optional(),
    });
  },
});

export const collections = { blog };
