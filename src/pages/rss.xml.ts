import { site } from "../data/site.mjs";
import { getPosts } from "../lib/site-posts.mjs";

const posts = getPosts();

function escapeXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export function GET() {
  const items = posts
    .map((post) => {
      const url = `${site.url}/blog/${post.slug}/`;
      return `
        <item>
          <title>${escapeXml(post.frontmatter.title)}</title>
          <description>${escapeXml(post.frontmatter.description)}</description>
          <pubDate>${new Date(`${post.frontmatter.date}T00:00:00Z`).toUTCString()}</pubDate>
          <link>${url}</link>
          <guid isPermaLink="true">${url}</guid>
        </item>`;
    })
    .join("");

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
      <channel>
        <title>${escapeXml(site.title)}</title>
        <description>${escapeXml(site.description)}</description>
        <link>${site.url}/</link>
        <atom:link href="${site.url}/rss.xml" rel="self" type="application/rss+xml" />
        <language>zh-CN</language>
        ${items}
      </channel>
    </rss>`,
    {
      headers: {
        "Content-Type": "application/rss+xml; charset=utf-8",
      },
    },
  );
}

