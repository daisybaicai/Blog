const path = require("path");
const rootpath = path.dirname(__dirname);
const getConfig = require("vuepress-bar");
const barConfig = getConfig(`${rootpath}`, {
  pinyinNav: true,
  addReadMeToFirstGroup: false
});

// 生成配置信息

module.exports = {
  title: "Dasiy Blog",
  description: "Daisy Blog的博客",
  lang: "zh-CN",
  head: [["link", { rel: "icon", href: "/icon.png" }]],
  themeConfig: {
    nav: [...barConfig.nav],
    sidebar: barConfig.sidebar,
    sidebarDepth: 3,
    lastUpdated: "Last Updated"
  },

  plugins: [
    "reading-progress",
    "permalink-pinyin",
    "rpurl",
    "@vuepress/back-to-top",
    [
      "vuepress-plugin-git-log",
      {
        additionalArgs: "--no-merge",
        onlyFirstAndLastCommit: true
      }
    ],
    [
      "vuepress-plugin-container",
      {
        type: "tip",
        defaultTitle: {
          "/": "提示"
        }
      }
    ],
    [
      ("git-log",
      {
        additionalArgs: "--no-merge",
        onlyFirstAndLastCommit: true
      })
    ]
  ]
};
