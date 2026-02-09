#!/usr/bin/env node

import { spawnSync } from "node:child_process";

const files = process.argv.slice(2);

// lint-staged can call this even when the matched list ends up empty.
if (files.length === 0) process.exit(0);

// Biome can report "No files were processed" (exit 1) when a file is ignored by config.
// We only want to fail the commit if Biome actually finds issues or hits a real error.
const run = spawnSync(
  "npx",
  ["--no", "biome", "check", "--write", "--files-ignore-unknown=true", ...files],
  { encoding: "utf8" }
);

if (run.stdout) process.stdout.write(run.stdout);
if (run.stderr) process.stderr.write(run.stderr);

const code = run.status ?? 1;
if (code === 0) process.exit(0);

const combined = `${run.stdout || ""}\n${run.stderr || ""}`;
if (combined.includes("No files were processed")) process.exit(0);

process.exit(code);
