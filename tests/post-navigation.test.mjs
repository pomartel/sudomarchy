import assert from "node:assert/strict";
import test from "node:test";
import { getAdjacentPosts } from "../src/utils/getAdjacentPosts.js";

const older = { id: "older", data: { pubDatetime: "2026-01-01", modDatetime: "2026-10-01" } };
const middle = { id: "middle", data: { pubDatetime: "2026-02-01" } };
const newer = { id: "newer", data: { pubDatetime: "2026-03-01" } };
const posts = [newer, older, middle];

test("previous is older and next is newer regardless of modification date", () => {
  assert.deepEqual(getAdjacentPosts(posts, middle), { prevPost: older, nextPost: newer });
  assert.deepEqual(posts, [newer, older, middle]);
});

test("first and last posts have only their available neighbor", () => {
  assert.deepEqual(getAdjacentPosts(posts, older), { prevPost: null, nextPost: middle });
  assert.deepEqual(getAdjacentPosts(posts, newer), { prevPost: middle, nextPost: null });
});

test("excluded posts do not receive unrelated neighbors", () => {
  assert.deepEqual(getAdjacentPosts(posts, { id: "unlisted" }), { prevPost: null, nextPost: null });
  assert.deepEqual(getAdjacentPosts([middle], middle), { prevPost: null, nextPost: null });
});

test("posts sharing a publication date have a stable order", () => {
  const a = { id: "a", data: { pubDatetime: "2026-02-01" } };
  const b = { id: "b", data: { pubDatetime: "2026-02-01" } };
  assert.deepEqual(getAdjacentPosts([b, a], a), { prevPost: null, nextPost: b });
});
