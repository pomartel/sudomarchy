import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
  const markdownContent = `# sudomarchy (@sudomarchy)

My Omarchy and Hyprland customization

## Navigation

- [About](/about.md)
- [Recent Posts](/posts.md)
- [Archives](/archives.md)
- [RSS Feed](/rss.xml)

## Links

- Twitter: [@sudomarchy](https://x.com/sudomarchy)
- GitHub: [@sudomarchy](https://github.com/pomartel)
- Email: pomartel@coderubik.com

---

*This is the markdown-only version of sudomarchy. Visit [sudomarchy](http://localhost:4321/) for the full experience.*`;

  return new Response(markdownContent, {
    status: 200,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
