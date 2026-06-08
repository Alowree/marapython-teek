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
      { text: "Home", link: "/en/" },
      {
        text: "Frontend",

        items: [
          { text: "HTML", link: "/en/pages/76b51d" },
          { text: "CSS", link: "/en/pages/79c1f6" },
          {
            text: "JavaScript",
            link: "/en/08.frontend/03.javascript/01.语法基础.md",
          },
          {
            text: "Articles",
            items: [
              { text: "Categories", link: "/en/categories/" },
              { text: "Tags", link: "/en/tags/" },
              { text: "Archives", link: "/en/archives/" },
            ],
          },
        ],
      },
      {
        text: "About",

        items: [
          { text: "Site", link: "/en/site/introduction" },
          { text: "Start", link: "/en/site/start" },
          { text: "Writing", link: "/en/site/compose" },
          {
            text: "Articles",
            items: [
              { text: "Categories", link: "/en/categories/" },
              { text: "Tags", link: "/en/tags/" },
              { text: "Archives", link: "/en/archives/" },
              { text: "List", link: "/en/articleOverview/" },
            ],
          },
        ],
      },
    ],
    editLink: {
      text: "Edit this page on GitHub",
      pattern:
        "https://github.com/Kele-Bingtang/vitepress-theme-teek/edit/master/docs/:path",
    },
    logo: "/favicon/logo.png",
  },
});
