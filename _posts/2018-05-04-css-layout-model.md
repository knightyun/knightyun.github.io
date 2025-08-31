---
title:  CSS 布局模型详细介绍
layout: post
categories: CSS
tags: css布局模型 绝对定位 相对定位 固定定位 position
excerpt: CSS 布局类型详细介绍与举例说明
---
HTML中元素有三种布局模型：流动模型、浮动模型、层模型。

# 流动模型（flow）
HTML网页默认布局就是流动模型，布局如下：

**块级元素(block)**自上而下垂直分布，因为块级元素默认宽度为浏览器窗口的**100%**，或者理解为每个块级元素默认**占一行**。常见块级元素有 `div`, `p`, `h` 等；

**内联元素(inline)**从左到右水平分布，即不像块级元素那样每个独占一行。常见内联元素有 `a`, `span`, `em` 等。


# 浮动模型（float）
上面提到的块级元素是每个独占一行显示，但是定义css浮动模型后就能使两个块级元素**并排一行**显示。
例如HTML代码：

``` html
<div id = "div1">
	<p>Hello</p>
</div>
<div id = "div2">
	<p>World !</p>
</div>
```

显示结果是这样：

	Hello
	World !

但是设置浮动css后：

``` css
div {
float: left;
}
```

效果就是这样：

	HelloWorld !

也可以设置元素一左一右显示：

``` css
#div1 {
float: left;
}

#div2 {
float: right;
}
```

# 层模型（layer）（position）
类似于PS中的**图层**编辑，HTML中也存在层模型布局，对元素进行**定位**。
层模型有三种：**绝对定位**(absolute)、**相对定位**(relative)、**固定定位**(fixed)。

## 绝对定位
理解就是字面上的意思，简言之就是**相对于上级设置了 position 属性的元素**进行定位，如果没有这类上级就是相对于 `body` 标签，也是**浏览器窗口**。需要设置css：`position: absolute;`，然后就可以使用 `top`, `right`, `bottom`, `left` 这类属性进行定位。例如：

``` css
div {
position: absolute;
top: 100px;
left: 150px;
}
```

这样就使板块**向下**移动100像素，**向右**移动150像素。

## 相对定位
这里的**相对**较难理解，与数理中的“相对”不太一样，这里是**“相对于自己原来应在的位置”**，需要设置css：`position:  relative;`，重要的是不用关心**上级是否设置了position属性**，这样就很方便。例如：

``` css
div {
position: relative;
top: 100px;
right: 100px;
}
```

板块就相对于自己没设置样式前的位置，同时向左向下移动100px。

## 固定定位
这个就好理解了，所谓**固定**就是指固定于整个浏览器网页窗口不动，即使滚动网页内容也不改变位置，需要设置css：`position: fixed`，也可以设置 `top`, `right`等调整固定的位置。还记得浏览器某些网页右下角的小广告吗，是不是固定在那怎么浏览网页都不动 -_- .