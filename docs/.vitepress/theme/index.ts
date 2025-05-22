// .vitepress/theme/index.ts
import Teek from "vitepress-theme-teek";
import "vitepress-theme-teek/index.css";

// Import your own custom css files
import "./style/custom.css";
// import "./style/style.css";

export default {
  extends: Teek,
};
