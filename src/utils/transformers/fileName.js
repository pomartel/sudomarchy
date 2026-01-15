/**
 * Custom Shiki transformer that adds file name labels to code blocks.
 *
 * Looks for the `file="filename"` meta attribute in code fences
 * and renders a styled label showing the filename.
 *
 * @param {Object} options - Configuration options
 * @param {string} [options.style="v2"] - Styling variant ("v1" or "v2")
 * @param {boolean} [options.hideDot=false] - Hide the dot indicator
 */
export const transformerFileName = ({ style = "v2", hideDot = false } = {}) => ({
  pre(node) {
    const fileNameOffset = style === "v1" ? "0.75rem" : "-0.75rem";
    node.properties.style =
      (node.properties.style || "") + `--file-name-offset: ${fileNameOffset};`;

    const raw = this.options.meta?.__raw?.split(" ");

    if (!raw) return;

    const metaMap = new Map();

    for (const item of raw) {
      const [key, value] = item.split("=");
      if (!key || !value) continue;
      metaMap.set(key, value.replace(/["'`]/g, ""));
    }

    const file = metaMap.get("file");

    if (!file) return;

    this.addClassToHast(node, `mt-8 ${style === "v1" ? "rounded-tl-none" : ""}`);

    node.children.push({
      type: "element",
      tagName: "div",
      properties: {
        class: [
          "absolute text-foreground text-xs font-medium leading-4",
          hideDot
            ? "px-2"
            : "pl-4 pr-2 before:inline-block before:size-1 before:bg-green-500 before:rounded-full before:absolute before:top-[45%] before:left-2",
          style === "v1"
            ? "py-1 left-0 -top-6 rounded-t-md border border-b-0 bg-muted/50"
            : "py-0.5 left-2 top-(--file-name-offset) border rounded-md !bg-background",
        ],
      },
      children: [
        {
          type: "text",
          value: file,
        },
      ],
    });
  },
});
