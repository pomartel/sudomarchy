import assert from "node:assert/strict";
import test from "node:test";
import { formatPostDate } from "../src/utils/formatPostDate.js";

test("calendar dates keep their day in Toronto in summer and winter", () => {
  for (const [value, label] of [
    ["2026-05-13", "13 May, 2026"],
    ["2026-01-13", "13 Jan, 2026"],
    ["2026-10-01", "1 Oct, 2026"],
  ]) {
    for (const input of [value, new Date(value)]) {
      assert.deepEqual(formatPostDate(input, "America/Toronto"), {
        label,
        datetime: value,
      });
    }
  }
});

test("timestamps with a time of day still respect the configured timezone", () => {
  assert.deepEqual(formatPostDate("2026-05-13T02:00:00Z", "America/Toronto"), {
    label: "12 May, 2026",
    datetime: "2026-05-13T02:00:00.000Z",
  });
  assert.equal(
    formatPostDate("2026-05-13T02:00:00Z", "Asia/Tokyo").label,
    "13 May, 2026",
  );
});
