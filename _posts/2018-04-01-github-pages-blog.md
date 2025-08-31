---
title: 搭建 Github Pages 个人博客网站
layout: post
tags: github-pages jekyll
categories: 网站
excerpt: Jekyll 搭建 Github Pages 个人博客
---

# 目录 <span id="home">

* [引言](#1)
	* [关于博客](#1.1)
	* [关于Github](#1.2)
* [创建Github账号](#2)
* [创建仓库](#3)
	* [填充仓库](#3.1)
	* [配置Github Pages功能](#3.2)
* [博客的书写与上传](#4)
	* [Git基础](#4.1)
	* [git配置](#4.2)
	* [git Desktop版](#4.3)
* [创建本地仓库](#5)
* [安装Jekyll](#6)
	* [关于Jekyll](#6.1)
	* [安装步骤](#6.2)
	* [开启jekyll](#6.3)
* [写博客与上传](#7)
	* [Markdown基础](#7.1)
	* [工具介绍](#7.2)
	* [图床介绍](#7.3)
	* [关于图片尺寸](#7.4)
* [域名配置](#8)

---------------

# 引言 <span id="1">

## 关于博客 <span id="1.1">
写博客对于程序猿来说，应该是个优秀的习惯，个人也觉得蛮高大上的 ^_^。网上的博客论坛网站也多种多样，个人觉得在长久以来的不断竞争淘汰中，各大网站的功能等可能都相差无几了，选择自己稍微偏好的就可以了。

我的个人情况就是结合CSDN博客和Github Pages的独立个人博客网页，因为听说拥有自己的Github主页也是一件蛮高大上的事 -_- 。

## 关于Github <span id="1.2">

然后简单介绍一下Github以及其Github Pages功能。

GitHub是一个面向开源及私有软件项目的托管平台，也是一个分布式版本控制系统，详情见[百度百科][github]。说到分布式，自然也有另外一种集中式版本控制系统：SVN，有兴趣小伙伴可以了解[百度百科][svn]。GIt是SVN的发展版，而且现在主流也是GIt，但某些大公司依然在使用SVN，二者各有优劣，自行体会，此处不做详解，用一张图简单说明：

---------------

![20180331184953574.png](https://i.loli.net/2018/04/15/5ad359a34859f.png)

-----------
GIthub Pages则是github上的一项功能，可以放置网页文件到指定文件夹，然后给你一个专属域名用于展示一些项目，但现在大多用来开发制作个人博客网站。接下来就一步步按照我曾经的步骤来搭建个人博客，顺便讲讲沿途遇到过的坑，如没有的提及请自行百度。

# 创建Github账号 <span id="2">

github pages 功能依赖于github账号，没有的话先去[官网][gitreg]注册一个：

![20180331192629516.jpg](https://i.loli.net/2018/04/15/5ad359e00a5bb.jpg)
然后好像要邮箱验证，就是填写的那个，点击那个验证链接就注册成功了。

# 创建仓库 <span id="3">

有了自己的账号后，可以跟着官网的引导，创建自己的第一个仓库，就是 **repository**：

![20180331193717261.jpg](https://i.loli.net/2018/04/15/5ad359e5dd951.jpg)

-------------------
填好信息

![20180331195826465.jpg](https://i.loli.net/2018/04/15/5ad359fb3ba18.jpg)

--------------
创建完成

![20180331200133497.jpg](https://i.loli.net/2018/04/15/5ad35a03b9186.jpg)

---------------

到这里就创建好了自己的仓库，可以上传文件到这个目录下，接下我们用这个仓库来使用github pages功能。 
 
## 填充仓库 <span id="3.1">

仓库建好了，接下来就是往里面装东西了，就是支撑博客首页的一些网页文件和配置文件，对于新手来说要自己编写这些文件就有点开玩笑了，所以可以选择使用已有的主题，你可以选择复制我的<https://github.com/knightyun/knightyun.github.io>，然后选择自己仓库，网页基础好的同学以后修改网页内容就行了。

> **嫌修改麻烦可以跳过这一步，到后面的步骤选择喜欢的主题**

![20180331204755801.jpg](https://i.loli.net/2018/04/15/5ad35a0cd1ddf.jpg)

------------------

## 配置Github Pages功能 <span id="3.2">

然后我们来配置github pages

![20180331200909318.jpg](https://i.loli.net/2018/04/15/5ad35a1317bee.jpg)

--------------------

重命名，注意格式

![20180331202913817.jpg](https://i.loli.net/2018/04/15/5ad35a1ac689a.jpg)

----------------------

把上面的页面向下滑，现在就可以访问了

![20180331203510375.jpg](https://i.loli.net/2018/04/15/5ad35ad3a3f49.jpg)

-------------------

当然github也提供了一些主题供选择，点击上面的“choose a theme”按钮进行选择

![20180331205610766.jpg](https://i.loli.net/2018/04/15/5ad35ad9ad0e8.jpg)

---------------

这个网站有更多主题工选择：<http://jekyllthemes.org/>，如有选择困难症请绕路 -_-

# 博客的书写与上传 <span id="4">

## Git基础 <span id="4.1">

前面说到向自己的github仓库上传文件，我们使用“git”这个工具，进行拉取、克隆、提交等一系列操作，Linux系统应该是自带，官网下载地址：<https://git-scm.com/>。
并且需要掌握一些git基本操作，如 `git commit` , `git push`, `git clone` 等，这里有很完整的教程：[Git语法说明][git-full].

## git配置 <span id="4.2">

* 安装好后cmd输入 `git` 有反应则安装成功：

![20180331215746907.jpg](https://i.loli.net/2018/04/15/5ad35adf42ae1.jpg)

* 进行如下配置：

```sh
git config --global user.name "YOUR NAME"
git config --global user.email "YOUR EMAIL ADDRESS"
```

> **NAME 指你的昵称，EMAIL ADDRESS 是你的注册邮箱**

* 然后生成相应的令牌，本地一份，Github 一份，这样 Github 可以在你使用仓库的时候，进行校验确定你的身份。

```sh
cd ~/.ssh
mkdir key_backup
ssh-keygen -t rsa -C "*your_email@youremail.com*"
```

> **注意这里不是在cmd里输入，是使用刚安装的 git bash 软件，可以在电脑菜单里面搜索**

然后会生成如下两个文件：

![20180331221012285.jpg](https://i.loli.net/2018/04/15/5ad35ae510df3.jpg)

`id_rsa.pub` 就是我们待会需要的公钥文件，使用命令 `cat id_rsa.pub` 再将内容复制到剪切板，然后进入github账号设置里面粘贴

![20180331221601652.jpg](https://i.loli.net/2018/04/15/5ad35aea5e8c2.jpg)

--------------------

选择添加SSH key：

![20180331221949179.jpg](https://i.loli.net/2018/04/15/5ad35afc4616a.jpg)

-----------------

把刚才复制的内容粘贴进去

![20180331222325449.jpg](https://i.loli.net/2018/04/15/5ad35afc52683.jpg)

------------

然后输入 `ssh -T git@github.com` 测试连通状态

> **我的Windows版没有成功，不知道Linux是否成功，报错如下 ，应该是windows ssh配置问题**

![20180331222821644.jpg](https://i.loli.net/2018/04/15/5ad35b07f16b6.jpg)

## git Desktop版 <span id="4.3">

如果你也出现以上状况，不必担心，git还能使用https协议连接，只不过要每次输入账号和密码，但是可以选择github官方提供的git desktop软件：

>**这里我是下载过的**

![20180331223500277.jpg](https://i.loli.net/2018/04/15/5ad35b2fb62f6.jpg)

---------------------------------

界面如下，需要登录，以后提交文件就方便了，cmd也能使用git提交，不用每次输入密码

![20180331223916609.jpg](https://i.loli.net/2018/04/15/5ad35b347f466.jpg)

----------------------------

可以查看变化文件，甚至文件内变化的内容，commit 后点击 fetch 按钮提交

![20180401085504366.jpg](https://i.loli.net/2018/04/15/5ad35c4838fe1.jpg)

> **软件功能不算复杂，自己摸索一会就会了，图形界面的软件使得一些命令行的操作变得容易、友好。**

# 创建本地仓库 <span id="5">

选择一个本地文件夹，用作保存本地仓库文件，尽量是空文件夹，然后使用命令 `git init` 初始化文件夹，其实是在当前文件夹下生成一个叫 `.git` 的隐藏文件夹，里面是一些配置文件，不要随意更改。

使用 `git clone https://github.com/name/repository.git` 将远程仓库克隆到本地此文件夹下，
`name` 是自己的昵称，`repository` 是自己的仓库名，不要忘记末尾的 **`.git`** 后缀。

然后此文件夹下会多一个和你仓储名一样的文件夹，内部文件与远程仓库一样。

![20180331230145814.jpg](https://i.loli.net/2018/04/15/5ad35c4e8b088.jpg)

绑定远程仓库，方便提交：

```sh
git remote add origin git@github.com:username/username.github.io.git
```

介绍几个常用命令：

```sh
git add .  # 添加文件
git commit -m "commit-messages"  # 提交本地仓库
git push origin master  # 提交远程仓库
git pull  # 拉取远程文件，与以下命令类似
git branch temp  # 创建本地分支
git fetch origin master:temp
git merge master
```

# 安装Jekyll <span id="6">

## 关于Jekyll <span id="6.1">

Jekyll 是一个简单免费的生成博客网页的框架，Github Pages 功能就是使用的 Jekyll 框架把仓库内的文件生成静态网页给人们浏览，其本来目的是提供给 GitHub 项目“自我介绍”用的，只不过后来陆续有人发现了其博客网站的用途，也就是上面介绍的博客网站，详情参考官网：<https://jekyllrb.com/>, 也有一个中文版的：<https://www.jekyll.com.cn/> 方便阅读。上面那个主题网站也是jekyll的，还有一个类似的工具叫“hexo”，自行了解。

由于上传修改后的文件到 github 仓库后需要一段时间才能看到网页的变化或修改效果，使得对于页面效果和功能的调试不太方便，所以如果选择在本地安装 jekyll 框架开发环境的话，可以快速预览生成效果，方便调试，最后再把成品上传到 GitHub 仓库中就可以得到预期效果了。

## 安装步骤 <span id="6.2">

* **安装Ruby**：jekyll依赖于 Ruby 环境，需要提前安装，官网下载链接：<http://www.ruby-lang.org/en/downloads/>，windows/Linux/Mac 的版本都有。
* **安装gem**：官网链接<https://rubygems.org/pages/download>，貌似安装 ruby 后自带 gem。
可以 cmd 命令行输入 `gem` 检查是否安装成功：

![20180331213445607.jpg](https://i.loli.net/2018/04/15/5ad35c5295bb6.jpg)

* **安装jekyll**：cmd命令行输入 `gem install jekyll`

![20180331213739704.jpg](https://i.loli.net/2018/04/15/5ad35c57c50b5.jpg)

## 开启jekyll <span id ="6.3">

直接输入 `jekyll s` 开启jekyll服务，windows可能会遇到以下问题：

![20180401085818819.jpg](https://i.loli.net/2018/04/15/5ad35c5c2c9f1.jpg)

使用 `bundle exec jekyll s` 命令就可以运行了，如果提示没有安装 `bundler` ，就 `gem install bundler` 再 `bundle install`，可能还会提示没有安装其他组件，记下名称， `gem install xxx` 就可以了；

然后就可以成功运行了，退出按 `ctrl + c ` 键：

![20180401085938699.jpg](https://i.loli.net/2018/04/15/5ad35c5fa50e4.jpg)

运行时保持这个窗口不要关闭，浏览器输入 `127.0.0.1:4000` 或 `localhost:4000` 进行预览，不过我的windows预览效果不太好，加载不出图片，其他系统没试过；

# 写博客与上传 <span id="7">

## Markdown基础 <span id="7.1">

Jekyll使用[Markdown][md]语言书写博客，markdown是一种简单易读的标记性语言，不同于 `html`，大量的标签不易于阅读，写着也麻烦，用markdown写博客很合适。

首先你需要了解一些markdown语法，这里有完整版语法说明：[Markdown语法说明][markdown-full]，了解一些基础后就可以开始写博客了。

## 工具介绍 <span id="7.2">

这篇文章：[Markdown简明语法][markdown-tutorial]最后有介绍一些好用的markdown编辑器，自行选择。
不过每次都用编辑器写好 `.md` 文件然后用 git 上传到 github 根目录下的 **`_post`** 文件夹好像很繁琐，Jekyll官方提供了一款方便的博客编辑器，方便书写、预览、上传，官网链接：<http://jekyllwriter.com/>，三种系统版本都有。接下来简单介绍一些使用：

安装后主界面：
![20180401093410604.jpg](https://i.loli.net/2018/04/15/5ad35c729800f.jpg)

------------------------------------

添加账号
![20180401093825352.jpg](https://i.loli.net/2018/04/15/5ad35c786326c.jpg)

配置 token

![20180401094705731.jpg](https://i.loli.net/2018/04/15/5ad35c7dc4e18.jpg)

保存后会生成一个 token ，返回软件粘贴进输入框就行了

![20180401094911796.jpg](https://i.loli.net/2018/04/15/5ad35c836423d.jpg)

----------

写完后保存并上传

![20180401094200638.jpg](https://i.loli.net/2018/04/15/5ad35c88b1b6f.jpg)

-----------------------------

可以在这里查看和修改账户下的博客

![2018040109525674.jpg](https://i.loli.net/2018/04/15/5ad35c8e19921.jpg)

----------------

![20180401095443179.jpg](https://i.loli.net/2018/04/15/5ad35c92b3b2b.jpg)

> **软件其他功能还在完善，自行摸索**

## 图床介绍 <span id="7.3">

写博客就无法避免上传图片，图床就是这么一个地方，就是一个网站，你发自己的图片上传到它的网站，然后它给你一个这个图片的链接，插入博客中就能显示图片了。

推荐一个知名的，七牛云<https://portal.qiniu.com/>，注册完实名认证后有一些优惠。
还有一个神奇的网站：<https://sm.ms/>，也能用

然后在 jekyll writer中配置一下：

![20180401100517435.jpg](https://i.loli.net/2018/04/15/5ad35c9795b52.jpg)

----------------

> **当然我用的是CSDN在线编辑器写博客，图片能直接上传到CSDN上，直接生成链接，其工具也能用**

## 关于图片尺寸 <span id="7.4">

markdown 的图片插入方式 `![title](http://xxx.com/xxx.png/)` 是没办法修改图片尺寸的，可以使用html中的 `<img>` 标签：
`<img src="http://xxx.com/xxx.png/" alt="title" width=XXpx height=XXpx>`
`width` 和 `height` 添加想要的尺寸。

# 域名配置 <span id="8">

自己的博客网站就建好了，想要分享出去的小伙伴就要想办法让自己的网页能被百度等搜索引擎搜到，或者这样，百度搜索： `site:name.github.io` ，出现错误页面就表示搜不到。

很遗憾，百度是禁止抓取 github pages 的内容的，可以购买一个自己的专属域名，有很多选择，阿里云、腾讯、花生壳域名等，百度站长平台有个链接提交功能，但是它只是加速爬取，并未解决收录：

![20180401103839442.jpg](https://i.loli.net/2018/04/15/5ad35ca96986d.jpg)

----------------

貌似它们的熊掌号服务可以解决这问题：

![20180401104100873.jpg](https://i.loli.net/2018/04/15/5ad35cb06c1c5.jpg)

---------------

然后，就没有然后了 -_-

![20180401104147731.jpg](https://i.loli.net/2018/04/15/5ad35cb55c7cd.jpg)

---------------

以花生壳域名为例，其它大同小异，配置一下：

![20180401102926509.jpg](https://i.loli.net/2018/04/15/5ad35cb937be5.jpg)

------------------

再添加两条 github 的ip的 A记录值 ：`192.30.252.153` `192.30.252.154`

> 最后搜索: `"site:你的域名"` 有结果就成功了

开始自己的博客生涯吧。

----------------

# 返回[顶部](#home)

[github]: (https://baike.baidu.com/item/github/10145341)
[svn]: https://baike.baidu.com/item/SVN/3311103?fr=aladdin
[gitreg]: https://github.com/
[md]: https://baike.baidu.com/item/markdown/3245829?fr=aladdin
[git-full]: https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000
[markdown-full]: https://blog.csdn.net/KNIGH_YUN/article/details/79733814
[markdown-tutorial]: <https://blog.csdn.net/KNIGH_YUN/article/details/79718481>