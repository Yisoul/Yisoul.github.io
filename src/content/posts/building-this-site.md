---
title: "这个网站是怎么搭起来的"
description: "用 Astro、Markdown 和 GitHub Pages 搭一个足够轻、能长期维护的个人站。"
date: "2026-10-21"
tags:
  - 工程
  - 写作
---

这个站没有数据库，也没有后台服务。它是一组在构建阶段生成好的静态文件。

## 技术选择

页面由 Astro 生成，文章写在 Markdown 文件里。每篇文章的标题、日期、描述和标签放在 frontmatter 中，构建时会自动生成文章页、标签页、归档和 RSS。

样式使用原生 CSS，交互只保留主题切换和少量滚动淡入。没有引入 React 运行时，也没有套用通用博客主题。

## 发布方式

代码推送到 GitHub 的 `main` 分支后，GitHub Actions 会执行测试和构建，然后把 `dist` 目录发布到 GitHub Pages。

这样一来：

1. 写作是编辑 Markdown；
2. 发布是提交并推送；
3. 网站本身不需要服务器；
4. 页面加载时只下载必须的 HTML、CSS 和图片。

简单的结构反而更容易维护。

