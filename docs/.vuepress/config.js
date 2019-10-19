/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-09 18:32:25
 * @LastEditTime: 2019-09-29 22:30:43
 * @LastEditors: Please set LastEditors
 */
module.exports = {
  title: 'Daisy Blog', // 页签标题 : A001_VuePress博客搭建的简单教程&问题分析 # | Wiki 1001
  description: 'Daisy Blog的博客', // meta 中的描述文字，意义不大，SEO用
  // 注入到当前页面的 HTML <head> 中的标签
  head: [
    // 增加一个自定义的 favicon(网页标签的图标)
    // 这里的 '/' 指向 docs/.vuepress/public 文件目录 
    // 即 docs/.vuepress/public/img/geass-bg.ico
    ['link', { rel: 'icon', href: '/img/geass-bg.ico' }],
  ],
  // base: '/Daisy/', // 这是部署到github相关的配置
  markdown: {
    lineNumbers: true // 代码块显示行号
  },
  themeConfig: {
    sidebarDepth: 4, // 将同时提取markdown中h2 和 h3 标题，显示在侧边栏上。
    lastUpdated: 'Last Updated',// 文档更新时间：每个文件git最后提交的时间,
    // 顶部导航栏
    nav: [
      // 单项 text：显示文字，link：指向链接
      // 这里的'/' 指的是 docs文件夹路径
      // [以 '/' 结尾的默认指向该路径下README.md文件]
      { text: '知识点整理', link: '/Base/' },
      { text: '算法' , link: '/Algorithm/'},
      // 多项，下拉形式
      {
        text: 'GitHub',
        items: [
          { text: 'GitHub首页', link: 'https://github.com/daisybaicai' },
        ]
      },
    ],
    sidebar:{
      // 打开FAQ主页链接时生成下面这个菜单
     '/Base/':[
         //多级菜单形式
         {
           title: '异步',
           children: [
            '/Base/Aysnc/001Promise',
            '/Base/Aysnc/002',
            '/Base/Aysnc/003await'
           ]
         },
         {
          title: '浏览器',
          children: [
           '/Base/Browser/001DOMBOM',
           '/Base/Browser/002Cookie'
          ]
        },
        {
          title: 'JS',
          children: [
            '/Base/JS/001prototype8',
            '/Base/JS/002debounce',
            '/Base/JS/003setmap',
            '/Base/JS/004arrayCompare',
            '/Base/JS/005Variablelifting',
            '/Base/JS/006Array',
            '/Base/JS/007callapplybind',
            '/Base/JS/008Operatorprecedence'
          ]
        },
        {
          title: 'React',
          children: [
            '/Base/React/001lifecycle',
            '/Base/React/002keys',
            '/Base/React/003setState',
            '/Base/React/004diff',
            '/Base/React/005redux'
          ]
        },
        {
          title: 'Vue',
          children: [
            '/Base/Vue/001Bidirectionalbinding',
            '/Base/Vue/002SPA',
            '/Base/Vue/003key',
            '/Base/Vue/004vifvshow',
            '/Base/Vue/005datafuntion',
            '/Base/Vue/006Unidirectionalflow',
            '/Base/Vue/007computedwatch',
            '/Base/Vue/008vuearray',
            '/Base/Vue/009keep-alive',
          ]
        },
        {
          title: 'Css',
          children: [
            '/Base/Css/001BFC',
            '/Base/Css/002display',
            '/Base/Css/003HZC',
          ]
        },
     ],
     '/Algorithm/':[
      {
        title: '数组',
        children: [
         '/Algorithm/array/001array'
        ]
      },
     ]
    },
  },
}