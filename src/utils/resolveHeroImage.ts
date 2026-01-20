import type { ImageMetadata } from "astro";

export type HeroImageInput = ImageMetadata | string | undefined;

export type ResolvedHeroImage =
  | { kind: "asset"; asset: ImageMetadata }
  | { kind: "url"; url: string }
  | { kind: "none" };

const isBareFilename = (value: string) => {
  // If it has any slashes, it's already a path.
  if (value.includes("/") || value.includes("\\")) return false;

  // Treat anything with a scheme as a URL.
  if (/^[a-zA-Z][a-zA-Z\d+.-]*:/.test(value)) return false;

  // Disallow explicit relative paths like ./image.png
  if (value.startsWith(".")) return false;

  return true;
};

type ViteImportMeta = ImportMeta & {
  glob: <T>(pattern: string, options: { eager: true }) => Record<string, T>;
};

const heroImageModules = (import.meta as unknown as ViteImportMeta).glob<{
  default: ImageMetadata;
}>("../assets/images/**/*.{avif,gif,jpg,jpeg,png,webp}", { eager: true });

function findHeroImageAssetByBasename(options: {
  year: string;
  slug: string;
  basename: string;
}): ImageMetadata | undefined {
  const folderSuffix = `/assets/images/${options.year}/${options.slug}/`;
  const match = Object.entries(heroImageModules).find(([path]) => {
    if (!path.includes(folderSuffix)) return false;

    const filename = path.split("/").pop();
    if (!filename) return false;

    return filename === options.basename || filename.startsWith(`${options.basename}.`);
  });

  return match ? match[1].default : undefined;
}

export function resolveHeroImage(options: {
  heroImage: HeroImageInput;
  pubDatetime: Date;
  id: string;
}): ResolvedHeroImage {
  const { heroImage, pubDatetime, id } = options;

  if (!heroImage) return { kind: "none" };

  if (typeof heroImage !== "string") {
    return { kind: "asset", asset: heroImage };
  }

  // Existing behavior: if it's a real path/URL, just use it.
  if (!isBareFilename(heroImage)) {
    return { kind: "url", url: heroImage };
  }

  const year = String(pubDatetime.getFullYear());
  const idSegments = id.split("/");
  const slug = idSegments.length > 0 ? idSegments[idSegments.length - 1] : id;

  const asset = findHeroImageAssetByBasename({
    year,
    slug,
    basename: heroImage,
  });

  if (asset) return { kind: "asset", asset };

  // Fall back to treating it as a URL/path if we couldn't find it.
  return { kind: "url", url: heroImage };
}
