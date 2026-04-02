import path from "node:path";

const hasUrlScheme = value => /^[a-zA-Z][a-zA-Z\d+.-]*:/.test(value);

const shouldRewriteImageUrl = url =>
  typeof url === "string" &&
  url.length > 0 &&
  !url.startsWith("/") &&
  !url.startsWith(".") &&
  !url.startsWith("#") &&
  !hasUrlScheme(url);

const toPosixPath = value => value.split(path.sep).join("/");

const visitNodes = (node, visitor) => {
  visitor(node);

  if (!Array.isArray(node?.children)) return;

  for (const child of node.children) {
    visitNodes(child, visitor);
  }
};

export const remarkDefaultImagePaths =
  ({ assetsDir = "src/assets/images" } = {}) =>
  (tree, file) => {
    const filePath =
      typeof file?.path === "string"
        ? file.path
        : Array.isArray(file?.history) && typeof file.history[0] === "string"
          ? file.history[0]
          : undefined;

    if (!filePath) return;

    const imageReferenceIds = new Set();

    visitNodes(tree, node => {
      if (node?.type === "imageReference" && typeof node.identifier === "string") {
        imageReferenceIds.add(node.identifier);
      }
    });

    const relativeAssetsDir = toPosixPath(
      path.relative(path.dirname(filePath), path.resolve(assetsDir)),
    );

    visitNodes(tree, node => {
      if (!node || typeof node !== "object" || typeof node.url !== "string") return;

      const isInlineImage = node.type === "image";
      const isReferencedImageDefinition =
        node.type === "definition" && typeof node.identifier === "string"
          ? imageReferenceIds.has(node.identifier)
          : false;

      if (!isInlineImage && !isReferencedImageDefinition) return;
      if (!shouldRewriteImageUrl(node.url)) return;

      node.url = toPosixPath(path.join(relativeAssetsDir, node.url));
    });
  };
