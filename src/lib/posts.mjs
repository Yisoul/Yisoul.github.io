export function collectPosts(modules) {
  return Object.entries(modules).map(([filePath, module]) => ({
    slug: filePath.split("/").pop().replace(/\.md$/, ""),
    frontmatter: module.frontmatter,
    Content: module.Content ?? module.default,
  }));
}

