import { defineConfig } from "vitepress";

const description = ["Teek 使用文档", "VitePress 主题"].toString();

export default defineConfig({
  lang: "zh-CN",
  description: description,
  head: [
    ["meta", { name: "description", description }],
    ["meta", { name: "keywords", description }],
  ],
  markdown: {
    container: {
      tipLabel: "提示",
      warningLabel: "警告",
      dangerLabel: "危险",
      infoLabel: "信息",
      detailsLabel: "详细信息",
    },
  },
  themeConfig: {
    darkModeSwitchLabel: "主题",
    sidebarMenuLabel: "菜单",
    returnToTopLabel: "返回顶部",
    lastUpdatedText: "上次更新时间",
    outline: {
      level: [2, 4],
      label: "本页导航",
    },
    docFooter: {
      prev: "上一页",
      next: "下一页",
    },
    nav: [
      { text: "首页", link: "/" },
      {
        text: "前端",

        items: [
          { text: "HTML", link: "/pages/76b51d" },
          { text: "CSS", link: "/pages/79c1f6" },
          {
            text: "JavaScript",
            link: "/08.frontend/03.javascript/01.语法基础.md",
          },
          {
            text: "文章",
            items: [
              { text: "分类", link: "/categories/" },
              { text: "标签", link: "/tags/" },
              { text: "归档", link: "/archives/" },
            ],
          },
        ],
      },
      {
        text: "关于",

        items: [
          { text: "本站", link: "/site/introduction" },
          { text: "开始", link: "/site/start" },
          { text: "写作", link: "/site/compose" },
          {
            text: "文章",
            items: [
              { text: "分类", link: "/categories/" },
              { text: "标签", link: "/tags/" },
              { text: "归档", link: "/archives/" },
              { text: "清单", link: "/articleOverview/" },
            ],
          },
        ],
      },
    ],
    // editLink: {
    //   text: "在 GitHub 上编辑此页",
    //   pattern: "https://github.com/Kele-Bingtang/vitepress-theme-teek/edit/master/docs/:path",
    // },
  },
});
