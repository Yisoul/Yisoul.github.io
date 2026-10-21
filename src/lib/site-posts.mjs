import { sortPosts } from "./content.mjs";
import { collectPosts } from "./posts.mjs";

const modules = import.meta.glob("../content/posts/*.md", { eager: true });

export function getPosts() {
  return sortPosts(collectPosts(modules));
}

