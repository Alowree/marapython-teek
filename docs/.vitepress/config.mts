import { defineConfig } from "vitepress";
import { defineTeekConfig } from "vitepress-theme-teek/config";

// Teek 主题配置
const teekConfig = defineTeekConfig({
  banner: {
    enabled: true,
    name: "MaraPython", // Banner 标题，默认读取 vitepress 的 title 属性
    bgStyle: "fullImg", // Banner 背景风格：pure 为纯色背景，partImg 为局部图片背景，fullImg 为全屏图片背景
    pureBgColor: "#28282d", // Banner 背景色，bgStyle 为 pure 时生效
    imgSrc: ["/img/bg1.jpg", "/img/bg2.jpg"], // Banner 图片链接。bgStyle 为 partImg 或 fullImg 时生效
    imgInterval: 15000, // 当多张图片时（imgSrc 为数组），设置切换时间，单位：毫秒
    imgShuffle: false, // 图片是否随机切换，为 false 时按顺序切换，bgStyle 为 partImg 或 fullImg 时生效
    imgWaves: true, // 是否开启 Banner 图片波浪纹，bgStyle 为 fullImg 时生效
    mask: true, // Banner 图片遮罩，bgStyle 为 partImg 或 fullImg 时生效
    maskBg: "rgba(0, 0, 0, 0.4)", // Banner 遮罩颜色，如果为数字，则是 rgba(0, 0, 0, ${maskBg})，如果为字符串，则作为背景色。bgStyle 为 partImg 或 fullImg 且 mask 为 true 时生效
    textColor: "#ffffff", // Banner 字体颜色，bgStyle 为 pure 时为 '#000000'，其他为 '#ffffff'
    titleFontSize: "3.2rem", // 标题字体大小
    descFontSize: "1.4rem", // 描述字体大小
    descStyle: "types", // 描述信息风格：default 为纯文字渲染风格（如果 description 为数组，则取第一个），types 为文字打印风格，switch 为文字切换风格
    description: [
      "Your time is limited, so don’t waste it living someone else’s life. — Steve Jobs",
      "The way to get started is to quit talking and begin doing. — Walt Disney",
      "I find that the harder I work, the more luck I seem to have. — Thomas Jefferson",
      "Don’t watch the clock; do what it does. Keep going. — Sam Levenson",
      "Strive not to be a success, but rather to be of value. — Albert Einstein",
      "It always seems impossible until it’s done. — Nelson Mandela",
      "You miss 100% of the shots you don’t take. — Wayne Gretzky",
      "Dream big and dare to fail. — Norman Vaughan",
      "Do one thing every day that scares you. — Eleanor Roosevelt",
    ], // 描述信息
    switchTime: 4000, // 描述信息切换间隔时间，单位：毫秒。descStyle 为 switch 时生效
    switchShuffle: false, // 描述信息是否随机切换，为 false 时按顺序切换。descStyle 为 switch 时生效
    typesInTime: 100, // 输出一个文字的时间，单位：毫秒。descStyle 为 types 时生效
    typesOutTime: 50, // 删除一个文字的时间，单位：毫秒。descStyle 为 types 时生效
    typesNextTime: 800, // 打字与删字的间隔时间，单位：毫秒。descStyle 为 types 时生效
    typesShuffle: false, // 描述信息是否随机打字，为 false 时按顺序打字，descStyle 为 types 时生效
  },
  post: {
    excerptPosition: "top", // 文章摘要位置
    showMore: true, // 是否显示更多按钮
    moreLabel: "阅读全文 >", // 更多按钮文字
    coverImgMode: "default", // 文章封面图模式
    showCapture: true, // 是否在摘要位置显示文章部分文字，当为 true 且不使用 frontmatter.describe 和 <!-- more --> 时，会自动截取前 400 个字符作为摘要
  },
  page: {
    pageSize: 20,
  },
  blogger: {
    name: "Alowree", // 博主昵称
    avatar: "img/avatar.jpg", // 博主头像
    slogan: "道阻且长，行则将至；行而不辍，未来可期", // 博主签名
    shape: "circle", // 头像风格：square 为方形头像，circle 为圆形头像，circle-rotate 可支持鼠标悬停旋转
  },
  vitePlugins: {
    autoFrontmatter: true,
    autoFrontmatterOption: {
      globOptions: {
        ignore: ["**/00.目录页/**", "**/*目录.md"],
      },
    },
  },
  comment: {
    provider: "twikoo", // 评论区提供者
    // 评论区配置项，根据 provider 不同而不同，具体看对应官网的使用介绍
    options: {
      envId: "https://twikoo.marapython.com",
    },
  },
});

// https://vitepress.dev/reference/site-config
export default defineConfig({
  // 1. Features and Functions offered by VitePress
  title: "MaraPython",
  description: "A VitePress Site",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "首页", link: "/" },
      {
        text: "前端",

        items: [
          { text: "HTML", link: "/08.frontend/01.html/01.element.md" },
          { text: "CSS", link: "/08.frontend/02.css/01.层叠、优先级和继承.md" },
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
          { text: "本站", link: "/00.目录页/20.关于 - 目录.md" },
          { text: "开始", link: "/20.关于/20.关于 - 本站/02.本站 - 开始.md" },
          { text: "写作", link: "/20.关于/20.关于 - 本站/05.本站 - 文章.md" },
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
    ],

    // sidebar: [
    //   {
    //     text: "Examples",
    //     items: [
    //       { text: "Markdown Examples", link: "/markdown-examples" },
    //       { text: "Runtime API Examples", link: "/api-examples" },
    //     ],
    //   },
    // ],

    socialLinks: [
      { icon: "github", link: "https://github.com/Alowree/marapython-teek" },
    ],

    search: {
      provider: "local",
    },
    outline: {
      level: [2, 4],
      label: "文章目录",
    },
  },
  // 2. Features and Functions offered by Teek
  extends: teekConfig,
});
