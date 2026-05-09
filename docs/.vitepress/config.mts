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
    socialLinks: [{ icon: "github", link: "https://github.com/Alowree/marapython-teek" }],
  },
  extends: teekConfig,
});
