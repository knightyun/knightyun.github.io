<div align="center">
    <div align="right">
        <a href="README.md">简体中文</a> | English
    </div>
    <h1>knightyun.github.io</h1>
    <p>A responsive personal blog website based on jekyll.</p>

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

## Features

- Responsive for mobile phone, tablet, desktop | [Preview](https://knightyun.github.io)
- Show your GitHub repository fantastically | [Preview](https://knightyun.github.io/projects)
- Archive your articles with categories and tags | [Preview](https://knightyun.github.io/categories)
- Support search articles with key words | [Preview](https://knightyun.github.io)
- Article comment and site message board | [Preview](https://knightyun.github.io/message)
- Customized “About” page | [Preview](https://knightyun.github.io/about)

## Usage

Detailed tutorial：[Build Github Pages blog website](https://knightyun.github.io/2018/04/01/github-pages-blog)

jekyll guide：<https://www.jekyll.com.cn/>

## Configuration

The configuration file `_config.yml` locates in the root directory, looking for more details about the parameters of this file, please see the official documentation: <https://www.jekyll.com.cn/docs/configuration/>

Example config of my website:
```yml
# Welcome to Jekyll!
#
# This config file is meant for settings that affect your whole blog, values
# which you are expected to set up once and rarely edit after that. If you find
# yourself editing this file very often, consider using Jekyll's data files
# feature for the data you need to update frequently.
#
# For technical reasons, this file is *NOT* reloaded automatically when you use
# 'bundle exec jekyll serve'. If you change this file, please restart the server process.

# Global variable, can use it in HTML file,
# for example: <h1>{{ site.title }}</h1> 
title: 瑝琦的博客 # title for your website
description: > # description for your website, useful for search engine exhibition.
  基于 jekyll 的 Github Pages 个人博客网站，技术的学习、总结、分享与提升
url: "https://knightyun.github.io" # address of your website.
github_repo: knightyun/knightyun.github.io
github_profile: "https://github.com/knightyun" # your GitHub home page.
user: "瑝琦" # name in the sidebar
user_email: "2386209384@qq.com" # contact email in the sidebar
paginate: 5 # how many articles will show in your website home page.

# configuration related to jekyll
markdown: kramdown
repository: knightyun/knightyun.github.io
plugins:
  - jekyll-feed
  - jekyll-paginate
  - jekyll-seo-tag
  - jekyll-sitemap
exclude:
  - Gemfile
  - Gemfile.lock
  - vendor
  - README.md
  - COPYING
sass:
  style: compressed
future: true
permalink: /:year/:month/:day/:title
```

## Development

Commit and push your code to the remote repo, you may wait for a long time to see the change of your blog website, so recommend build develop environment in local, convenient for debugging.

Detialed tutorial: [Install jekyll](https://knightyun.github.io/2018/04/01/github-pages-blog#%E5%AE%89%E8%A3%85jekyll-)

run code bellow in shell after configuring well：
```cmd
bundle exec jekyll s
```

Then shell will print a message about open `http://127.0.0.1:4000` in browser to preview the website. Normally, what you see is the same as real GitHub Pages website, so, push your code to github after testing it well.

## Libraries

- [Materialize.css](http://materializecss.com/)：Famous materialize css style library.
- [GeoPattern](http://btmills.github.io/geopattern/)：Generate intersting backgroud images.
- [particles.js](https://marcbruederlin.github.io/particles.js/)：Particle lines effect.
- [Valine](https://valine.js.org/)：Blog article comment plugin.

## Reference

- https://github.com/ShawnTeoh/matjek

## License

[GPL v3](https://github.com/knightyun/knightyun.github.io/blob/master/COPYING)