// @ts-check

import { readFileSync, readdirSync, statSync } from "node:fs";
import { basename, extname, join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { unified } from "@astrojs/markdown-remark";
import sitemap from "@astrojs/sitemap";
import {
  transformerNotationDiff,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
} from "@shikijs/transformers";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import matter from "gray-matter";
import kebabcase from "lodash.kebabcase";
import remarkCollapse from "remark-collapse";
import remarkAlert from "remark-github-blockquote-alert";
import remarkToc from "remark-toc";
import { SITE } from "./src/config";
import { remarkDefaultImagePaths } from "./src/utils/remarkDefaultImagePaths.js";
import { transformerFileName } from "./src/utils/transformers/fileName";

const blogDir = fileURLToPath(new URL("./src/content/blog", import.meta.url));

/** @param {string} pathname */
const normalizePathname = pathname => {
  if (pathname !== "/" && pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }

  return pathname;
};

/** @param {string} relativePath */
const getFileLastmod = relativePath =>
  new Date(statSync(fileURLToPath(new URL(relativePath, import.meta.url))).mtime);

/**
 * @param {string} directory
 * @returns {string[]}
 */
const collectFiles = directory =>
  readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const fullPath = join(directory, entry.name);

    if (entry.isDirectory()) {
      return collectFiles(fullPath);
    }

    return fullPath;
  });

const blogEntries = collectFiles(blogDir)
  .filter(filePath => [".md", ".mdx"].includes(extname(filePath)))
  .filter(filePath => !basename(filePath).startsWith("_"))
  .map(filePath => {
    const { data } = matter(readFileSync(filePath, "utf8"));

    if (data.draft) {
      return undefined;
    }

    const relativePath = relative(blogDir, filePath).split(sep);
    const fileName = relativePath.pop();

    if (!fileName) {
      return undefined;
    }

    const slug = kebabcase(basename(fileName, extname(fileName)));
    const pathSegments = relativePath
      .filter(Boolean)
      .filter(segment => !segment.startsWith("_"))
      .map(segment => kebabcase(segment));

    const pathname = normalizePathname(["", "posts", ...pathSegments, slug].join("/"));
    const rawLastmod = data.modDatetime ?? data.pubDatetime;
    const parsedLastmod = rawLastmod ? new Date(rawLastmod) : getFileLastmod(filePath);
    const lastmod = Number.isNaN(parsedLastmod.getTime())
      ? getFileLastmod(filePath)
      : parsedLastmod;

    return { pathname, lastmod };
  })
  .filter(entry => entry !== undefined);

const latestPostLastmod =
  blogEntries.length > 0
    ? blogEntries.reduce(
        (latest, entry) => (entry.lastmod > latest ? entry.lastmod : latest),
        new Date(0),
      )
    : getFileLastmod("./src/pages/index.astro");

const sitemapLastmodByPathname = new Map([
  ["/", latestPostLastmod],
  ["/about", getFileLastmod("./src/pages/about.md")],
  ["/posts", latestPostLastmod],
]);

for (const entry of blogEntries) {
  sitemapLastmodByPathname.set(entry.pathname, entry.lastmod);
}

/** @param {string} page */
const sitemapFilter = page => normalizePathname(new URL(page).pathname) !== "/search";

/** @param {import("@astrojs/sitemap").SitemapItem} item */
const sitemapSerialize = item => {
  const pathname = normalizePathname(new URL(item.url).pathname);
  const lastmod = sitemapLastmodByPathname.get(pathname);

  return {
    ...item,
    ...(lastmod ? { lastmod: lastmod.toISOString() } : {}),
  };
};

// https://astro.build/config
export default defineConfig({
  site: SITE.website,
  trailingSlash: "never",
  compressHTML: true,
  markdown: {
    processor: unified({
      remarkPlugins: [
        remarkDefaultImagePaths,
        remarkAlert,
        remarkToc,
        [remarkCollapse, { test: "Table of contents" }],
      ],
    }),
    shikiConfig: {
      // For more themes, visit https://shiki.style/themes
      themes: { light: "min-light", dark: "night-owl" },
      defaultColor: false,
      wrap: false,
      transformers: [
        transformerFileName({ style: "v2", hideDot: true }),
        transformerNotationHighlight(),
        transformerNotationWordHighlight(),
        transformerNotationDiff({ matchAlgorithm: "v3" }),
      ],
    },
  },
  integrations: [
    sitemap({
      filter: sitemapFilter,
      serialize: sitemapSerialize,
    }),
  ],
  vite: {
    resolve: {
      alias: {
        "@": "/src",
      },
    },
    plugins: [tailwindcss()],
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"],
    },
  },
  image: {
    responsiveStyles: true,
    layout: "constrained",
  },
});
