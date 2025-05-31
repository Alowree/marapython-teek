// .vitepress/theme/index.ts
// 1.组件导入
import Teek from "vitepress-theme-teek";

// 2.样式导入
import "vitepress-theme-teek/index.css";

// 3.引入 VitePress 样式增强 和 Teek 样式增强
import "vitepress-theme-teek/theme-chalk/tk-sidebar.css"; // 侧边栏字体样式
import "vitepress-theme-teek/theme-chalk/tk-nav.css"; // 导航栏样式
import "vitepress-theme-teek/theme-chalk/tk-nav-blur.css"; // 导航栏毛玻璃样式
import "vitepress-theme-teek/theme-chalk/tk-aside.css"; // 文章目录样式
import "vitepress-theme-teek/theme-chalk/tk-doc-h1-gradient.css"; // 文档以及标题样式
import "vitepress-theme-teek/theme-chalk/tk-mark.css"; // 文章 mark 标签样式
// import "vitepress-theme-teek/theme-chalk/tk-index-rainbow.css";
// import "vitepress-theme-teek/theme-chalk/tk-doc-fade-in.css";
import "vitepress-theme-teek/theme-chalk/tk-banner-desc-gradient.css";

// 4.Import your own custom css files
import "./style/index.css";

export default {
  extends: Teek,
};
