import type { ImageMetadata } from "astro";
import {
  buildContentImageIndex,
  findDefaultImageAsset,
} from "@/utils/contentImageLookup.js";

export type ContentImageInput = ImageMetadata | string | undefined;

export type ResolvedContentImage =
  | { kind: "asset"; asset: ImageMetadata }
  | { kind: "url"; url: string }
  | { kind: "none" };

const hasUrlScheme = (value: string) => /^[a-zA-Z][a-zA-Z\d+.-]*:/.test(value);

const shouldResolveFromDefaultImageDir = (value: string) =>
  !value.startsWith("/") && !value.startsWith(".") && !hasUrlScheme(value);

type ViteImportMeta = ImportMeta & {
  glob: <T>(pattern: string, options: { eager: true }) => Record<string, T>;
};

const contentImageModules = (import.meta as unknown as ViteImportMeta).glob<{
  default: ImageMetadata;
}>("../assets/images/**/*.{avif,gif,jpg,jpeg,png,webp}", { eager: true });
const contentImageIndex = buildContentImageIndex(contentImageModules);

export function resolveContentImage(image: ContentImageInput): ResolvedContentImage {
  if (!image) return { kind: "none" };

  if (typeof image !== "string") {
    return { kind: "asset", asset: image };
  }

  if (shouldResolveFromDefaultImageDir(image)) {
    const asset = findDefaultImageAsset(contentImageIndex, contentImageModules, image);

    if (asset) return { kind: "asset", asset };

    throw new Error(
      `Could not resolve image "${image}" from src/assets/images. Use a valid asset path, a site-absolute public path, or a remote URL.`,
    );
  }

  return { kind: "url", url: image };
}
