import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";
import config from "@/config";

export const BLOG_PATH = "../note";

const posts = defineCollection({
  loader: glob({
    pattern: [
      "**/[^_]*.{md,mdx}",
      "!**/lianlg_md_note/**",
      "!**/cacu_md_note/**",
    ],
    base: `./${BLOG_PATH}`,
  }),
  schema: ({ image }) =>
    z.object({
      author: z.string().default(config.site.author),
      pubDatetime: z.date(),
      modDatetime: z.date().optional().nullable(),
      title: z.string(),
      featured: z.boolean().optional(),
      draft: z.boolean().optional(),
      tags: z.array(z.string()).default(["others"]),
      ogImage: image().or(z.string()).optional(),
      description: z.string(),
      canonicalURL: z.string().optional(),
      hideEditPost: z.boolean().optional(),
      timezone: z.string().optional(),
    }),
});

const pages = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "../pages" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    ogImage: z.string().optional(),
    canonicalURL: z.string().optional(),
    email: z.email().optional(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "../projects" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    status: z.string().optional(),
    url: z.url().optional(),
    featured: z.boolean().default(false),
    order: z.number().default(0),
    draft: z.boolean().default(false),
    category: z.string().optional(),
    cover: z.enum(["map", "journey", "generic"]).default("generic"),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { posts, pages, projects };
