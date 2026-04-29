import { defineConfig } from "vitepress";

const description = ["Teek Documentation", "VitePress Theme"].toString();

export default defineConfig({
  lang: "en-US",
  description: description,
  head: [
    ["meta", { name: "description", description }],
    ["meta", { name: "keywords", description }],
  ],
  markdown: {
    container: {
      tipLabel: "Tip",
      warningLabel: "Warning",
      dangerLabel: "Danger",
      infoLabel: "Info",
      detailsLabel: "Details",
    },
  },
  themeConfig: {
    darkModeSwitchLabel: "Theme",
    sidebarMenuLabel: "Menu",
    returnToTopLabel: "To Top",
    lastUpdatedText: "LastUpdated",
    outline: {
      level: [2, 4],
      label: "Page Navigation",
    },
    docFooter: {
      prev: "prev",
      next: "next",
    },
    nav: [
      { text: "Home", link: "/" },
      {
        text: "Frontend",

        items: [
          { text: "HTML", link: "/pages/76b51d" },
          { text: "CSS", link: "/pages/79c1f6" },
          {
            text: "JavaScript",
            link: "/08.frontend/03.javascript/01.语法基础.md",
          },
          {
            text: "Articles",
            items: [
              { text: "Categories", link: "/categories/" },
              { text: "Tags", link: "/tags/" },
              { text: "Archives", link: "/archives/" },
            ],
          },
        ],
      },
      {
        text: "About",

        items: [
          { text: "Site", link: "/site/introduction" },
          { text: "Start", link: "/site/start" },
          { text: "Writing", link: "/site/compose" },
          {
            text: "Articles",
            items: [
              { text: "Categories", link: "/categories/" },
              { text: "Tags", link: "/tags/" },
              { text: "Archives", link: "/archives/" },
              { text: "List", link: "/articleOverview/" },
            ],
          },
        ],
      },
    ],
    editLink: {
      text: "Edit this page on GitHub",
      pattern: "https://github.com/Kele-Bingtang/vitepress-theme-teek/edit/master/docs/:path",
    },
  },
});
