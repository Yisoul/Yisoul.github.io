import { site } from "../data/site.mjs";
import { slugifyTag } from "../lib/content.mjs";
import { getPosts } from "../lib/site-posts.mjs";

const posts = getPosts();
const tags = new Set(
  posts.flatMap((post) =>
    (post.frontmatter.tags ?? []).map((tag) => slugifyTag(tag)),
  ),
);

const paths = [
  "/",
  "/blog/",
  "/archive/",
  "/tags/",
  ...posts.map((post) => `/blog/${post.slug}/`),
  ...[...tags].map((tag) => `/tags/${tag}/`),
];

export function GET() {
  const urls = paths
    .map((path) => `  <url><loc>${new URL(path, site.url)}</loc></url>`)
    .join("\n");

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`,
    {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
      },
    },
  );
}

