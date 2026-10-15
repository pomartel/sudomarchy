import assert from "node:assert/strict";
import test from "node:test";
import { hasPostComments } from "../src/utils/postComments.js";

test("existing posts remain excluded, including with an explicit opt-in", () => {
  assert.equal(hasPostComments("/posts/colour-the-cat"), false);
  assert.equal(hasPostComments("/posts/colour-the-cat/", true), false);
  assert.equal(hasPostComments("/posts/hyprland-short-long-press-shortcuts"), false);
});

test("new posts and previously unpublished drafts get comments by default", () => {
  assert.equal(hasPostComments("/posts/a-new-post"), true);
  assert.equal(hasPostComments("/posts/code-block-highlights"), true);
});

test("new posts can opt out", () => {
  assert.equal(hasPostComments("/posts/a-new-post", false), false);
});
