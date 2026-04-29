import { defineConfig } from "vitepress";
import shared, { teekConfig } from "./locales/shared";
import zh from "./locales/zh";
import en from "./locales/en";

// VitePress Configurations {{{1
export default defineConfig({
  ...shared,
  locales: {
    root: { label: "简体中文", ...zh },
    "/zh/": { label: "简体中文", ...zh },
    "/en/": { label: "English", ...en },
  },
  rewrites: {
    "zh/:rest*": ":rest*",
  },
  description: "A VitePress Site",
  // head: [
  //   // {{{2
  //   [
  //     "link",
  //     {
  //       rel: "icon",
  //       type: "image/png",
  //       sizes: "32x32",
  //       href: "/img/favicon.ico",
  //     },
  //   ],
  //
  //   // import font-awesome so you could use its icons on your website
  //   [
  //     "link",
  //     {
  //       rel: "stylesheet",
  //       href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css",
  //     },
  //   ],
  // ], // 2}}}
  themeConfig: {
    // {{{
    // logo: "/favicon/logo.png",
    socialLinks: [{ icon: "github", link: "https://github.com/Alowree/marapython-teek" }],
    // search: {
    //   provider: "local",
    // },
  }, // }}}
  extends: teekConfig,
});
