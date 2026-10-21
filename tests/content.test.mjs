import assert from "node:assert/strict";
import test from "node:test";

import {
  excerpt,
  formatDate,
  readingTime,
  slugifyTag,
  sortPosts,
} from "../src/lib/content.mjs";

test("formatDate renders a readable Chinese date", () => {
  assert.equal(formatDate("2026-10-21"), "2026 年 10 月 21 日");
});

test("slugifyTag keeps Chinese and normalizes English spacing", () => {
  assert.equal(slugifyTag(" 机器学习 "), "机器学习");
  assert.equal(slugifyTag("Reinforcement Learning"), "reinforcement-learning");
});

test("excerpt strips Markdown syntax and collapses whitespace", () => {
  const markdown = [
    "## 标题",
    "",
    "这是**第一段**，包含[一个链接](https://example.com)。",
    "",
    "```js",
    "console.log('ignored');",
    "```",
  ].join("\n");

  assert.equal(excerpt(markdown), "标题 这是第一段，包含一个链接。");
});

test("readingTime returns at least one minute and accounts for Chinese text", () => {
  assert.equal(readingTime("短文"), 1);
  assert.equal(readingTime("研".repeat(601)), 3);
});

test("sortPosts returns newest posts first without mutating the input", () => {
  const posts = [
    { slug: "older", date: "2025-01-01" },
    { slug: "newer", date: "2026-02-01" },
  ];

  assert.deepEqual(sortPosts(posts).map((post) => post.slug), [
    "newer",
    "older",
  ]);
  assert.deepEqual(posts.map((post) => post.slug), ["older", "newer"]);
});
