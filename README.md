# Yisoul.github.io

个人主页与技术博客。使用 Astro 构建，发布到 GitHub Pages：

<https://yisoul.github.io>

## 本地开发

```bash
npm install
npm run dev
```

## 验证

```bash
npm test
npm run build
```

## 修改内容

- 个人信息、新闻和项目：`src/data/site.mjs`
- 博客文章：`src/content/posts/*.md`
- 全站样式：`src/styles/global.css`

文章文件名会成为 URL，例如 `hello-world.md` 对应 `/blog/hello-world/`。

## 发布

推送 `main` 分支后，GitHub Actions 会自动构建并部署到 GitHub Pages。

