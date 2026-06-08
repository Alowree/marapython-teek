import { defineConfig } from "vitepress";
import shared, { teekConfig } from "./locales/shared";
import zh from "./locales/zh";
import en from "./locales/en";

// VitePress Configurations {{{1
export default defineConfig({
  ...shared,
  locales: {
    root: { label: "简体中文", ...zh },
    en: { label: "English", link: "/en/", ...en },
  },
  rewrites: {
    "zh/:rest*": ":rest*",
  },
  themeConfig: {
    search: {
      provider: "local",
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: "搜索文档",
                buttonAriaLabel: "搜索文档",
              },
              modal: {
                noResultsText: "无法找到相关结果",
                resetButtonTitle: "清除查询条件",
                footer: {
                  selectText: "选择",
                  navigateText: "切换",
                  closeText: "关闭",
                },
              },
            },
          },
          en: {
            translations: {
              button: {
                buttonText: "Search",
                buttonAriaLabel: "Search",
              },
              modal: {
                noResultsText: "No results found",
                resetButtonTitle: "Clear query",
                footer: {
                  selectText: "to select",
                  navigateText: "to navigate",
                  closeText: "to close",
                },
              },
            },
          },
        },
      },
    },
    socialLinks: [{ icon: "github", link: "https://github.com/Alowree/marapython-teek" }],
  },
});
