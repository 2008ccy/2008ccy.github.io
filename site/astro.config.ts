import { defineConfig, envField, svgoOptimizer } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { unified } from "@astrojs/markdown-remark";
import remarkToc from "remark-toc";
import remarkMath from "remark-math";
import remarkNoteLinks from "./src/utils/remarkNoteLinks";
import rehypeKatex from "rehype-katex";
import remarkCollapse from "remark-collapse";
import rehypeCallouts from "rehype-callouts";
import {
  transformerNotationDiff,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
} from "@shikijs/transformers";
import { transformerFileName } from "./src/utils/transformers/fileName";
import config from "./astro-paper.config";

export default defineConfig({
  site: config.site.url,
  redirects: {
    "/posts/linalg_notes/linalg_web_notes/web_linalg_1_":
      "/posts/linalg_notes/linalg_web_note/web_linalg_1_/",
    "/posts/linalg_notes/linalg_web_notes/web_linalg_2":
      "/posts/linalg_notes/linalg_web_note/web_linalg_2/",
    "/posts/linalg_notes/web_notes/web_linalg_1_":
      "/posts/linalg_notes/linalg_web_note/web_linalg_1_/",
    "/posts/linalg_notes/web_notes/web_linalg_2":
      "/posts/linalg_notes/linalg_web_note/web_linalg_2/",
    "/posts/web_notes/web_linalg_1_":
      "/posts/linalg_notes/linalg_web_note/web_linalg_1_/",
    "/posts/web_notes/web_linalg_2":
      "/posts/linalg_notes/linalg_web_note/web_linalg_2/",
    "/posts/linear-algebra-1-1":
      "/posts/linalg_notes/linalg_web_note/web_linalg_1_/",
    "/posts/web_linalg_1_":
      "/posts/linalg_notes/linalg_web_note/web_linalg_1_/",
  },
  integrations: [
    mdx(),
    sitemap({
      filter: page =>
        config.features?.showArchives !== false || !page.endsWith("/archives/"),
    }),
  ],
  i18n: {
    locales: ["zh-CN"],
    defaultLocale: "zh-CN",
    routing: {
      prefixDefaultLocale: false,
    },
  },
  markdown: {
    processor: unified({
      remarkPlugins: [
        remarkMath,
        remarkNoteLinks,
        remarkToc,
        [remarkCollapse, { test: "Table of contents" }],
      ],
      rehypePlugins: [rehypeCallouts, rehypeKatex],
    }),
    shikiConfig: {
      themes: { light: "min-light" },
      defaultColor: false,
      wrap: false,
      transformers: [
        transformerFileName({ style: "v2", hideDot: false }),
        transformerNotationHighlight(),
        transformerNotationWordHighlight(),
        transformerNotationDiff({ matchAlgorithm: "v3" }),
      ],
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
  env: {
    schema: {
      PUBLIC_GOOGLE_SITE_VERIFICATION: envField.string({
        access: "public",
        context: "client",
        optional: true,
      }),
    },
  },
  experimental: {
    svgOptimizer: svgoOptimizer(),
  },
});
