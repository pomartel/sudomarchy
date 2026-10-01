import { getCollection } from "astro:content";
import rss from "@astrojs/rss";
import { SITE } from "@/config";
import { getPath } from "@/utils/getPath";
import postFilter from "@/utils/postFilter";

export async function GET() {
  const posts = await getCollection("blog");
  const sortedPosts = posts.filter(postFilter).sort(
    (a, b) => new Date(b.data.pubDatetime).getTime() - new Date(a.data.pubDatetime).getTime(),
  );
  return rss({
    title: SITE.title,
    description: SITE.desc,
    site: SITE.website,
    items: sortedPosts.map(({ data, id, filePath }) => ({
      link: getPath(id, filePath),
      title: data.title,
      description: data.description,
      pubDate: new Date(data.pubDatetime),
    })),
  });
}
