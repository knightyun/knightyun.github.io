---
title:  jQuery 初识之安装与语法简介
layout: post
categories: JavaScript
tags: jquery语法 jQueryCDN
excerpt: jQuery简介，安装和语法介绍
---
# 概念

jQuery是一个JavaScript**函数库**，是一个比较流行的**js框架**，功能就是简化 js 代码的书写，因为一些功能用原生javascript书写代码量是很大的。可以理解为**javascript query**，毕竟Query也是它的一个功能。

# 安装

要使用jQuery库，可以从网上下载得到jQuery的 `.js` 文件，也可以使用**CDN (Content Delivery Content 内容分发网络)**加载jQuery。

## 下载

需要去jQuery官网：[jquery.com](http://jquery.com/) 下载需要的jQuery库，一般有两个版本，`production` 表示已被压缩精简的版本，用于放到实际网站中，`development` 表示测试开发版，用于编写和开发，是**可读**的代码。

例如目前最新的版本是 `jquery-3.3.1.js`，压缩版后缀是 `.min.js`，开发版文件有一万多行，就是正常格式的JavaScript源代码，包含一些注释，文件大小为 `266k`；压缩版就是去掉里面不必要的**空格**，**回车**与**注释**，所以最后文件实际内容只有**一行！**，文件大小为 `85k`，压缩了近**三倍**，这也是网页都使用压缩版，提升网页性能的原因。

下载好后放到网页文件夹中，然后使用 `<script>` 标签引用，例如：

``` html
<script scr="/js/jquery-3.3.1.min.js"></script>
```

路径中填写 `.js` 文件的实际存放位置。

## CDN

使用CDN（内容分发网络）就可以不用下载jQuery文件，优点是可以使用这个机制尽量避开网络中一些影响数据传输的路线，提高访问速度和稳定性。原理就是使用在各处配置的**节点服务器**，让用户就近获取所需内容。

常见CDN有很多，例如百度、新浪、谷歌、微软等，如果是国内站点的话，建议使用国内CDN，国外站点可以使用谷歌或微软，提高速度。

以百度CDN为例，安装方法如下：

``` html
<script src="http://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js"></script>
```

微软CDN：

``` html 
<script src="http://ajax.microsoft.com/ajax/jquery/jquery-1.3.2.min.js"></script>
```

微软jQuery历史版本可以从这里查看[https://docs.microsoft.com/en-us/aspnet/ajax/cdn/overview#jQuery_Releases_on_the_CDN_0](https://docs.microsoft.com/en-us/aspnet/ajax/cdn/overview#jQuery_Releases_on_the_CDN_0)。

更多内容可以访问**百度静态资源公共库**[(http://cdn.code.baidu.com/)](http://cdn.code.baidu.com/)，其他CDN可以自行百度搜索。

# 语法

jQuery的基础语法是通过**选取（query）**文档中的元素，对其进行**操作（action）**，语法是：

`$(selector).action()`

## 选择器

`selector` 是选择器，类似于**CSS选择器**，常见的有：

* 元素选择器，如： `$("p")`
* ID选择器，如：`$("#myId")`
* 类选择器，如：`$(".myClass")`
* 属性选择器，如：`$("[href]")`

## 操作

`action()` 是对所选元素执行的操作，例如：

* 隐藏元素：`.hide()`
* 单击事件：`.click(myFunction())`
* 双击：`.dblclick()`
* 悬停：`.hover()`

其他语法与JavaScript类似，代码写在 `<script>` 中，例如隐藏 p 元素：

``` html
<script>
	$("p").hide();
</script>
```

有时需要等文档加载完毕后执行代码，很像JavaScript中的 `window.onload`：

``` js
window.onload = function(){
	alert();
}
```

jQuery中就要这么写：

``` js
$(document).ready(function(){
	$("p").hide();
});
```

简化写法：

``` js
$(function(){
	$("p").hide();
});
```

结果都是在整个文档加载完后执行语句。

## 方法链接

相对于JavaScript，jQuery又一种特殊的操作方法叫做**方法链接（chaining）**，即在一条语句上，对一个元素执行多个操作，语法是：
`$(selector).action1().action2().action3()`

例如：

``` js
$("p").html("<b>Hello</b>").click(function(){
	alert("Hello world");
});
```

结果就是改变元素文本内容后绑定点击事件的调用函数，操作可以绑定多个，并且是**依次执行**，方法类似，其他操作以此类推。
