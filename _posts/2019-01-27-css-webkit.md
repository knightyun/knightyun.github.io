---
title:  css 属性前浏览器厂商前缀
layout: post
categories: CSS
tags: 浏览器兼容 css前缀
excerpt: CSS 属性中浏览器厂商前缀的介绍
---
CSS3中一些新功能也是目前导致各大浏览器不兼容的一个原因，这些新功能的出现，浏览器厂商们变便开始尝试融合、试验，所以就在这些功能前加上自己的特定前缀来执行自己的特定解决方法，为了让这些功能能在完全确认下来前使用；

下面就是我们经常用到的前缀及其兼容浏览器：

## -webkit-
Apple Webkit团队，兼容Android, Safari, Chrome, BlackBerry等；

## -moz-
Mozilla，兼容Firefox等;

## -ms-
Microsoft基金会，兼容IE;

## -o-
兼容Opera, Opera Mini, Opera Mobile;

因此对于一些较新的css3特性，需要添加以上前缀兼容每个浏览器，例如实现线性渐变，标准写法是 `linear-gradient()`，但是一下浏览器还未完全确定这一特性，就在前面添加一个前缀来进行试验执行，如 `-webkit-linear-gradient`；

下面是开发中常用的兼容写法：
```css
body {
    background: linear-gradient(0, green, blue);
    background: -webkit-linear-gradient(0, green, blue);
    background: -moz-linear-gradient(0, green, blue);
    background: -o-linear-gradient(0, green, blue);
    background: -ms-linear-gradient(0, green, blue);
}
```