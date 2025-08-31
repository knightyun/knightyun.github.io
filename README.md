<div align="center">
    <div align="right">
        简体中文 | <a href="README-EN.md">English</a>
    </div>
    <h1>knightyun.github.io</h1>
    <p>基于 jekyll 的响应式 Github Pages 个人博客网站</p>

[![license](https://img.shields.io/github/license/knightyun/knightyun.github.io)](https://github.com/knightyun/knightyun.github.io/blob/master/COPYING)
[![Gitter](https://img.shields.io/gitter/room/knightyun/knightyun.github.i0)](https://gitter.im/knightyun-github-io/community?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)
[![Website](https://img.shields.io/website?down_color=lightgrey%09&down_message=offline&up_color=%09aqua&up_message=online&url=https%3A%2F%2Fknightyun.github.io)](https://knightyun.github.io)
[![GitHub deployments](https://img.shields.io/github/deployments/knightyun/knightyun.github.io/github-pages)](https://github.com/knightyun/knightyun.github.io/deployments)
![GitHub top language](https://img.shields.io/github/languages/top/knightyun/knightyun.github.io)

![GitHub stars](https://img.shields.io/github/stars/knightyun/knightyun.github.io?style=flat)
![GitHub forks](https://img.shields.io/github/forks/knightyun/knightyun.github.io?style=flat)
![GitHub followers](https://img.shields.io/github/followers/knightyun?style=flat)
[![Github issues](https://img.shields.io/badge/issues-welcome-success)](https://github.com/knightyun/knightyun.github.io/issues)
[![Github pull request](https://img.shields.io/badge/pull%20request-welcome-success)](https://github.com/knightyun/knightyun.github.io/pulls)

[![GitHub last commit](https://img.shields.io/github/last-commit/knightyun/knightyun.github.io)](https://github.com/knightyun/knightyun.github.io/commit/master)
[![GitHub commit activity](https://img.shields.io/github/commit-activity/m/knightyun/knightyun.github.io)](https://github.com/knightyun/knightyun.github.io/graphs/commit-activity)
![GitHub repo size](https://img.shields.io/github/repo-size/knightyun/knightyun.github.io)
</div>

## 特性

- 适配移动端与桌面端展示效果 | [预览](https://knightyun.github.io)
- 个性化自动展示 GitHub 项目 | [预览](https://knightyun.github.io/projects)
- 文章按类别与标签归档展示 | [预览](https://knightyun.github.io/categories)
- 支持搜索框，按关键词搜索全站文章 | [预览](https://knightyun.github.io)
- 文章评论与留言板功能 | [预览](https://knightyun.github.io/message)
- 生动的 “关于” 页面 | [预览](https://knightyun.github.io/about)

## 使用

详细搭建教程：[搭建 Github Pages 个人博客网站](https://knightyun.github.io/2018/04/01/github-pages-blog)

jekyll 使用教程：<https://www.jekyll.com.cn/>

## 配置

配置文件是位于主目录的 `_config.yml`，关于配置的完整参数介绍和默认值等内容，请查阅官网文档：<https://www.jekyll.com.cn/docs/configuration/>

以下是我的网站配置示例，以供参考：
```yml
# 以下为自定义的全局变量，可以在 HTML 文件中引用，
# 比如代码：<h1>{{ site.title }}</h1> 
# 将会展示为设定的值，也可以自行添加其他自定义全局变量。
title: 瑝琦的博客 # 网站的标题
description: > # 网站的描述，可能会出现在搜索引擎展示结果中
  基于 jekyll 的 Github Pages 个人博客网站，技术的学习、总结、分享与提升
url: "https://knightyun.github.io" # 网站地址
github_repo: knightyun/knightyun.github.io
github_profile: "https://github.com/knightyun" # GitHub 个人主页
user: "瑝琦" # 用于侧栏展示的名字
user_email: "2386209384@qq.com" # 侧栏展示的联系方式
paginate: 5 # 主页展示的博客文章数量

# jekyll 相关配置
markdown: kramdown
plugins:
  - jekyll-feed
  - jekyll-paginate
  - jekyll-seo-tag
  - jekyll-sitemap
exclude:
  - Gemfile
  - Gemfile.lock
  - README.md
  - COPYING
  - vendor
sass:
  style: compressed
future: true
permalink: /:year/:month/:day/:title
theme: jekyll-theme-slate
```

## 配置开发环境

提交推送代码后，GitHub Pages页面（即博客网站主页）更新较慢，所以推荐搭建本地开发环境，以便调试。

详细教程请见：[安装 jekyll](https://knightyun.github.io/2018/04/01/github-pages-blog#%E5%AE%89%E8%A3%85jekyll-)

配置好依赖后在项目主目录运行：
```cmd
bundle exec jekyll s
```

然后会提示浏览器打开 `http://127.0.0.1:4000` 预览网站，正常情况预览效果与 GitHub Pages 展示的一样，这样就可以在本地开发调试好了再推送到 GitHub。

## 用到的第三方库

- [Materialize.css](http://materializecss.com/)：一个不错的样式组件库
- [GeoPattern](http://btmills.github.io/geopattern/)：格式化生成有趣的背景图
- [particles.js](https://marcbruederlin.github.io/particles.js/)：粒子连接效果
- [Valine](https://valine.js.org/)：博客评论插件

## 参考

- https://github.com/ShawnTeoh/matjek

## License

[GPL v3](https://github.com/knightyun/knightyun.github.io/blob/master/COPYING)