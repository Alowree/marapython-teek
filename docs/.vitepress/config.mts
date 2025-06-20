import { defineConfig } from "vitepress";
import { defineTeekConfig } from "vitepress-theme-teek/config";

// Teek 主题配置
const teekConfig = defineTeekConfig({
  pageStyle: "segment-nav",
  author: { name: "Alowree", link: "https://github.com/Alowree" },
  banner: {
    enabled: true,
    name: "MaraPython", // Banner 标题，默认读取 vitepress 的 title 属性
    bgStyle: "fullImg", // Banner 背景风格：pure 为纯色背景，partImg 为局部图片背景，fullImg 为全屏图片背景
    pureBgColor: "#28282d", // Banner 背景色，bgStyle 为 pure 时生效
    imgSrc: ["/img/banner-bg1.jpg", "/img/banner-bg2.jpg"], // Banner 图片链接。bgStyle 为 partImg 或 fullImg 时生效
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
      "天行健，君子以自强不息。——《周易》",
      "路漫漫其修远兮，吾将上下而求索。——屈原",
      "业精于勤荒于嬉，行成于思毁于随。——韩愈",
      "千里之行，始于足下。——老子",
      "不积跬步，无以至千里；不积小流，无以成江海。——荀子",
      "敏而好学，不耻下问。——孔子",
      "知之者不如好之者，好之者不如乐之者。——孔子",
      "海纳百川，有容乃大；壁立千仞，无欲则刚。——林则徐",
      "志当存高远。——诸葛亮",
      "学而不思则罔，思而不学则殆。——孔子",
      "穷则独善其身，达则兼济天下。——《孟子》",
      "君子坦荡荡，小人长戚戚。——《论语》",
      "博观而约取，厚积而薄发。——苏轼",
      "不以物喜，不以己悲。——范仲淹",
      "会当凌绝顶，一览众山小。——杜甫",
      "莫等闲，白了少年头，空悲切。——岳飞",
      "纸上得来终觉浅，绝知此事要躬行。——陆游",
      "长风破浪会有时，直挂云帆济沧海。——李白",
      "三人行，必有我师焉。——《论语》",
      "天生我材必有用。——李白",
    ], // 描述信息
    switchTime: 4000, // 描述信息切换间隔时间，单位：毫秒。descStyle 为 switch 时生效
    switchShuffle: false, // 描述信息是否随机切换，为 false 时按顺序切换。descStyle 为 switch 时生效
    typesInTime: 200, // 输出一个文字的时间，单位：毫秒。descStyle 为 types 时生效
    typesOutTime: 100, // 删除一个文字的时间，单位：毫秒。descStyle 为 types 时生效
    typesNextTime: 800, // 打字与删字的间隔时间，单位：毫秒。descStyle 为 types 时生效
    typesShuffle: false, // 描述信息是否随机打字，为 false 时按顺序打字，descStyle 为 types 时生效
  },
  post: {
    postStyle: "list", // 文章列表风格
    excerptPosition: "top", // 文章摘要位置
    showMore: false, // 是否显示更多按钮
    moreLabel: "阅读全文 >", // 更多按钮文字
    coverImgMode: "default", // 文章封面图模式
    showCapture: true, // 是否在摘要位置显示文章部分文字，当为 true 且不使用 frontmatter.describe 和 <!-- more --> 时，会自动截取前 400 个字符作为摘要
  },
  page: {
    pageSize: 20,
  },
  blogger: {
    name: "Alowree", // 博主昵称
    avatar: "/img/blogger-avatar.jpg", // 博主头像
    slogan: "道阻且长，行则将至；行而不辍，未来可期", // 博主签名
    shape: "square", // 头像风格：square 为方形头像，circle 为圆形头像，circle-rotate 可支持鼠标悬停旋转
  },
  docAnalysis: {
    createTime: "2021-10-19",
    statistics: {
      provider: "busuanzi",
    },
  },
  vitePlugins: {
    autoFrontmatter: true,
    autoFrontmatterOption: {
      globOptions: {
        ignore: ["**/00.目录页/**", "**/*目录.md"],
      },
    },
    sidebarOption: {
      collapsed: true, // 打开侧边栏 收缩/展开 功能
    },
  },
  codeBlock: {
    disabled: false, // 是否禁用新版代码块
    collapseHeight: 700, // 超出高度后自动折叠，设置 true 则默认折叠，false 则默认不折叠
    copiedDone: (TkMessage: Message) => TkMessage.success("复制成功！"),
  },
  articleShare: { enabled: true },
  comment: {
    provider: "twikoo", // 评论区提供者
    options: {
      envId: "https://twikoo.marapython.com",
    },
  },
  footerInfo: {
    copyright: {
      createYear: 2021,
      suffix: "MaraPython",
    },
    customHtml: `<span id="runtime"></span>`, // 搭配 .vitepress/theme/helper/useRuntime.ts 使用
  },
});

// https://vitepress.dev/reference/site-config
export default defineConfig({
  // 1. Features and Functions offered by VitePress
  title: "MaraPython",
  description: "A VitePress Site",
  head: [
    [
      "link",
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/img/favicon.ico",
      },
    ],
    // [
    //   "link",
    //   {
    //     rel: "icon",
    //     type: "image/png",
    //     sizes: "16x16",
    //     href: "/favicon/favicon-180x180.png",
    //   },
    // ],

    // import font-awesome so you could use its icons on your website
    [
      "link",
      {
        rel: "stylesheet",
        href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css",
      },
    ],
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: "/favicon/logo.png",
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
          { text: "本站", link: "/site/intro" },
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
      label: "In this article",
    },
  },
  // 2. Features and Functions offered by Teek
  extends: teekConfig,
});
