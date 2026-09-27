declare module "remark-collapse" {
  import type { RemarkPlugin } from "@astrojs/markdown-remark";

  interface CollapseOptions {
    test?: string;
    summary?: string;
  }

  const remarkCollapse: RemarkPlugin<[CollapseOptions?]>;
  export default remarkCollapse;
}
