---
title: "Code Block Highlights"
description: "Examples of diff and highlight annotations in code blocks."
pubDatetime: "2026-01-15"
draft: true
---

Use Shiki notation comments to mark diffs, highlights, and words.

## Diff lines

```ts
console.log("old") // [!code --]
console.log("new") // [!code ++]
console.log("unchanged")
```

## Highlight a line

```ts
console.log("normal")
console.log("highlighted") // [!code highlight]
console.log("normal")
```

## Highlight a word

```ts
// [!code word:Hello]
const greeting = "Hello World"
console.log(greeting)
```
