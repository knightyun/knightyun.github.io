---
title: CSS3 之 2D 与 3D 变换
layout: post
categories: CSS
tags: css2d css3d transform
excerpt: 介绍 CSS 中元素的 2D 与 3D 变换方法
---
# 目录

-----------

- [目录](#目录)
- [关于坐标轴](#关于坐标轴)
- [2D变换](#2d变换)
  - [translate(x,y)](#translatexy)
  - [rotate(deg)](#rotatedeg)
  - [scale(x,y)](#scalexy)
  - [skew(xdeg,ydeg)](#skewxdegydeg)
  - [matrix(a,b,c,d,e)](#matrixabcde)
- [3D变换](#3d变换)
  - [translate3d(x,y,z)](#translate3dxyz)
  - [rotate3d(x,y,z,deg)](#rotate3dxyzdeg)
  - [scale3d(x,y,z)](#scale3dxyz)
  - [matrix3d()](#matrix3d)
  - [perspective](#perspective)
  - [perspective-origin](#perspective-origin)
  - [backface-visibility](#backface-visibility)
- [其他属性](#其他属性)
  - [transform-origin](#transform-origin)
  - [transform-style](#transform-style)
  - [CSS 3D](#css-3d)

------------

css3实现了对元素执行2D平面变换，以及视觉上的3D空间变换，2D变换平时可能用的较多，3D效果也能锦上添花；

# 关于坐标轴

初中数学的几何学里我们便开始接触坐标轴，最基本的是平面直角坐标系`XoY`，然后延伸出空间直角坐标系`XYZ`，现在我们来说一下css中的坐标系；

css甚至一下设备相关的开发中，基本都遵循这样一套坐标系：以手机屏幕为例，坐标系**圆点**位于屏幕最左上角；**x轴**水平，向右为正方向；**y轴**垂直，向下为正方向；**z轴**垂直于整个屏幕平面，向外为正方向，就是屏幕光线射向你眼睛的方向；

如图：

![image](https://i.loli.net/2019/01/26/5c4c05d7bfbf0.png)

# 2D变换

包括平移`translate()`，旋转`rotate()`，缩放`scale()`，倾斜`skew()`，矩阵`matrix()`；

## translate(x,y)

平移操作，包括`translateX(x)`, `translateY(y)`，括号内填平移参数值，可以是负值，即反方向；

例如：
```css
div {
    /*元素向右平移50px，向下移60px*/
    transform: translateX(50px);
    transform: translateY(60px);
}
/*简写形式，效果相同*/
div {
    transform: translate(50px, 60px);
}
```

**注意**`translate()`只指定一个值则默认是**x轴**位移，即水平移动；

## rotate(deg)

元素旋转，括号中参数为旋转角度，**顺时针**为正值，**逆时针**为负值，单位为`deg`，即多少度；

例如：
```css
div {
    /* 顺时针旋转30° */
    transform: rotate(30deg);
}
```

![rotate](https://i.loli.net/2019/01/26/5c4c1133253ba.png)

## scale(x,y)

缩放元素，参数分别为x轴，y轴缩放倍数，包括`scaleX(x)`和`scaleY(y)`，提供一个参数表示**按比例**缩放；

例如：
```css
div {
    /* 横向缩小一半，纵向放大一倍 */
    transform: scale(.5, 2);
}
```

![scale1](https://i.loli.net/2019/01/26/5c4c11e1729ad.png)

```css
div {
    /* 按比例放大3倍 */
    transform: scale(3);
}
```

![scale2](https://i.loli.net/2019/01/26/5c4c11e1b4e89.png)

## skew(xdeg,ydeg)

包含`skewX(deg)`, `skewY(deg)`，表示在水平和垂直方向倾斜的角度；

例如：
```css
div {
    transform: skewX(30deg);
    transform: skewY(45deg);
}
/* 简写 */
div {
    transform: skew(30deg, 45deg);
}
```

需要**注意**，如果元素为一个矩形，那么`skewX(30deg)`表示矩形**顶边固定**，底边**向右**倾斜`30deg`；`skewY(30deg)`表示矩形**左边框固定**，右边框**向下**倾斜`30deg`；

可以根据上面讲的屏幕坐标系来记忆，x轴位于屏幕顶部，方向向右；y轴位于屏幕左部，方向向下；

如果`skew()`只指定一个值，默认是**水平倾斜**；

**skewX(30deg)** 的效果：

![skewX](https://i.loli.net/2019/01/26/5c4c0fc60c6bd.png)

**skewY(30deg)** 的效果：

![skewY](https://i.loli.net/2019/01/26/5c4c10c4b187a.png)

## matrix(a,b,c,d,e)

这是一个综合属性，之前的平移，缩放，旋转，倾斜都能通过这个矩阵函数实现，对，大学里**线性代数**中的矩阵 T_T；

其实这个函数就是前面四种操作的**原理**，函数共有六个参数，四种操作都对应不同的参数改变方式，像我们这种非数学专业的就不赘述原理了，前面的操作基本够用了(想寻找刺激就去百度“css matrix”吧)~~;

# 3D变换

所谓3D就是在前面2D平面上多了一个**z轴**，方法名也差不多，然后能以分别以三根轴位基准进行变换，实现立体效果；

看一下所有3D操作方法：
## translate3d(x,y,z)

结合前面讲的空间坐标系和 x, y, z轴的位置，三个参数分别对应元素在三个坐标轴方向的平移值，也包含三个方法`translateX(x)`, `translateY(y)`, `translateZ(z)`；

举例：
```css
div {
    transform: translateX(50px);
    transform: translateY(60px);
    transform: translateZ(70px);
}
/* 简写 */
div {
    transform: translate3d(50px, 60px, 70px);
}
```

**注意：** 关于设置 `translateZ(z)` 看不出效果的问题，后面说到设置`persoective`时会解释；

## rotate3d(x,y,z,deg)

参数`x, y, z`为空间坐标系的一个坐标位置，然后由原点`(0, 0, 0)`指向这个点形成一个有方向的新轴，数学中称矢量，最后一个参数就是元素围绕刚才所形成的新轴旋转的度数；

也包括 `rotateX(deg)`, `rotateY(deg)`, `rotateZ(deg)`，之前2D的 `rotate()` 便是这里的 `rotateZ()`；

至于旋转的方向，判断方法类似于物理中的**左手定则**：角度指定为正的话，左手拇指与四指垂直，拇指指向元素围绕旋转的坐标轴或自定义轴，四指弯曲围绕方向就是旋转方向；

举例：
```css
div {
    transform: rotateX(30deg);
    transform: rotateY(30deg);
    transform: rotataZ(30deg);
}
/* 自定义轴旋转 */
div {
    transform: rotate3d(10, 10, 10, 30deg);
}
```

**rotateX(30deg)** 的效果：

![rotateX](https://i.loli.net/2019/01/26/5c4c13d0c4eef.png)

**rotateY(30deg)** 的效果：

![rotateY](https://i.loli.net/2019/01/26/5c4c142489a1d.png)

关于为什么这里的旋转不是想象中的效果，而是缩小，主要是没有设置视点，后面会讲；

## scale3d(x,y,z)

元素关于三个轴的缩放比例，包括`scaleX(x)`, `scaleY(y)`, `scaleZ(z)`，举例：

```css
div {
    transform: scaleX(2);
    transform: scaleY(2);
    transform: scaleZ(2);
}
/* 简写 */
div {
    transform: scale3d(2, 2, 2);
}
```

需要**注意**这里的`scaleZ()`，正常情况下，扩大z轴会是物体**变厚**，但是css里面呈现的平面元素并没有**厚度**，所以这里的缩放z轴其实是缩放元素在z轴的**坐标**，所以要有效果必须要指定`translateZ()`的值；

举例：
```css
body {
    perspective: 500;
}
div {
    /* 必须这个顺序，先缩放后平移，不然无效果 */
    transform: scaleZ(2) translateZ(100px);
}
```

![scaleZ](https://i.loli.net/2019/01/26/5c4c17ef48ae2.png)

按照上面样式才能看到`scaleZ(2)`的效果，因为后面在z轴上移动了`100px`，缩放比例为2，最终会移动`200px`，屏幕上则表现为元素放大了一下，这是透视效果，就是那个 `perspective` 值，下面会讲到；

## matrix3d()

和前面2D的`matrix()`相似，只不过这里括号里的参数有**16个**，矩阵更加复杂，跳过吧﹋o﹋，有兴趣可以自行百度~~；

## perspective

在上面的示例中，有关z轴的平移和缩放通常情况下是看不出效果的，正是缺少这项属性值，叫做 **透视**，美术或设计中会出现这个词汇，就是实现物体近大远小的效果，远小最终会小到一个点，那就是 **透视点**，`perspective`就是用来设置那个点距离元素有多远，一般300~600很体现很好的透视效果，**值越小元素透视变形越严重**；

需要**注意**的是，这项属性设置在应用透视效果元素的**父元素**的样式中，才能看出效果，例如：
```css
body {
    perspective: 500;
    /* 考虑浏览器兼容 */
    -webkit-perspective: 500;
}
```

也可以设置在元素本身，格式为：
```css
div {
    transform: perspective(500);
    -webkit-transform: perspective(500);
}
```

**rotateX(45deg)** 的更真实的效果：

![rotateX](https://i.loli.net/2019/01/26/5c4c1929babb1.png)

**rotateY(45deg)** 的效果：

![rotateY](https://i.loli.net/2019/01/26/5c4c19c45bbb4.png)

## perspective-origin

此项设置透视点的位置，默认在元素几何中心，需要设置的话，格式如下：
```css
body {
    /* 默认中心 */
    perspective-origin: center center;
    /* 左上角 */
    perspective-origin: left top;
    /* 右边中心 */
    perspective-origin: right center;
    /* 底部中心 */
    perspective-origin: bottom center;
    /* 也可以是长度 */
    perspective-origin: 30px 40px;
    /*最后记得加 -webkit- 兼容 */
}
```

**perspective-origin: left center** 的效果：

![lc](https://i.loli.net/2019/01/26/5c4c1c4ab6feb.png)

**perspective-origin: right center** 的效果：

![rc](https://i.loli.net/2019/01/26/5c4c1c4a7c0bf.png)

## backface-visibility

翻译过来叫背面是否可见，可以设置`visible`和`hidden`，默认可见，比如元素正面有文字，设置背面可见，则关于y轴旋转180°后元素内文字变成镜像，否则不会出现；

**backface-visibility: visible** 的效果：

![vi](https://i.loli.net/2019/01/26/5c4c1d8b0651d.png)

**backface-visibility: hidden** 的效果(有旋转，只是背面不可见，则看不见了)：

![hi](https://i.loli.net/2019/01/26/5c4c1e297689d.png)

# 其他属性

## transform-origin

设置2D/3D变化的基准，可以是长度值，也可以是 `left, right, top, bottom`，例如：
```css
div {
    /* 关于元素左上角旋转 */
    transform-origin: left top;
    transform: rotate(30deg);
}
```

![lt](https://i.loli.net/2019/01/26/5c4c1ed5f21a6.png)

## transform-style

设置元素如何在3D空间呈现被嵌套的元素，选择是 `flat` 和 `preserve-3d`，默认`flat`；

这里这么来理解，之前我们对一个元素执行变换时，都是以屏幕所在平面的坐标系在变换，但是元素如果存在子元素的话，`transform-style`就是用来确定在哪套坐标系上进行变换，`flat`表示任然以屏幕坐标系为基准，`preserve-3d`表示以**变换后的父元素所在平面的坐标系**为基准；

```css
#parent {
    transform-style: preserve-3d;
    -webkit-transform-style: preserve-3d;
    transform: perspective(500) rotateY(45deg);
    -webkit-transform: perspective(500) rotateY(45deg);
}
#child {
    transform: perspective(500) rotateX(45deg);
    -webkit-transform: perspective(500) rotateX(45deg);
}
```

**flat** 的效果：

![flat](https://i.loli.net/2019/01/26/5c4c238db14da.png)

**preserve-3d** 的效果：

![pre](https://i.loli.net/2019/01/26/5c4c238dc1ae1.png)

例如，父元素绕x轴旋转了45度，并且设置`transform-style: preserve-3d`，而嵌套的子元素只绕y轴旋转45度，那么最终效果就是子元素绕父元素平面的y轴旋转了45度，看起来就像先x轴转45度后y轴转45度的效果；

最后，别忘了为以上所有特性添加浏览器兼容前缀；

顺便附上一个以上功能综合效果的演示页面，请戳下面：

## [CSS 3D](http://huangqiyun.top/css3d/)