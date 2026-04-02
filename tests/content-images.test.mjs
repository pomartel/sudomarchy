import assert from "node:assert/strict";
import path from "node:path";
import test from "node:test";
import {
  buildContentImageIndex,
  findDefaultImageAsset,
} from "../src/utils/contentImageLookup.js";
import { remarkDefaultImagePaths } from "../src/utils/remarkDefaultImagePaths.js";

const makeModules = entries =>
  Object.fromEntries(entries.map(([path, id]) => [path, { default: { id } }]));

test("content image lookup resolves bare names and folder-qualified paths in O(1) maps", () => {
  const modules = makeModules([
    ["../assets/images/foo.png", "foo"],
    ["../assets/images/nested/bar.webp", "bar"],
  ]);
  const index = buildContentImageIndex(modules);

  assert.deepEqual(findDefaultImageAsset(index, modules, "foo"), { id: "foo" });
  assert.deepEqual(findDefaultImageAsset(index, modules, "foo.png"), { id: "foo" });
  assert.deepEqual(findDefaultImageAsset(index, modules, "nested/bar"), { id: "bar" });
  assert.deepEqual(findDefaultImageAsset(index, modules, "nested/bar.webp"), {
    id: "bar",
  });
});

test("content image lookup rejects ambiguous bare names instead of picking one arbitrarily", () => {
  const modules = makeModules([
    ["../assets/images/a/shared.png", "first"],
    ["../assets/images/b/shared.png", "second"],
    ["../assets/images/foo.png", "foo-png"],
    ["../assets/images/foo.webp", "foo-webp"],
  ]);
  const index = buildContentImageIndex(modules);

  assert.throws(() => findDefaultImageAsset(index, modules, "shared.png"), /ambiguous/i);
  assert.throws(() => findDefaultImageAsset(index, modules, "foo"), /ambiguous/i);
  assert.deepEqual(findDefaultImageAsset(index, modules, "a/shared.png"), { id: "first" });
  assert.deepEqual(findDefaultImageAsset(index, modules, "foo.png"), { id: "foo-png" });
});

test("remarkDefaultImagePaths rewrites shorthand markdown images and preserves explicit paths", () => {
  const plugin = remarkDefaultImagePaths();
  const filePath = path.join(process.cwd(), "src/content/blog/_2026/post.md");
  const tree = {
    type: "root",
    children: [
      {
        type: "paragraph",
        children: [
          { type: "image", url: "foo.png", alt: "foo" },
          { type: "image", url: "./bar.png", alt: "bar" },
          { type: "image", url: "/assets/img/public.png", alt: "public" },
          { type: "image", url: "https://example.com/remote.png", alt: "remote" },
        ],
      },
      { type: "definition", identifier: "hero", url: "nested/hero.webp" },
      {
        type: "paragraph",
        children: [{ type: "imageReference", identifier: "hero", referenceType: "full" }],
      },
    ],
  };

  plugin(tree, { path: filePath });

  const [paragraph, definition] = tree.children;
  assert.equal(paragraph.children[0].url, "../../../assets/images/foo.png");
  assert.equal(paragraph.children[1].url, "./bar.png");
  assert.equal(paragraph.children[2].url, "/assets/img/public.png");
  assert.equal(paragraph.children[3].url, "https://example.com/remote.png");
  assert.equal(definition.url, "../../../assets/images/nested/hero.webp");
});
