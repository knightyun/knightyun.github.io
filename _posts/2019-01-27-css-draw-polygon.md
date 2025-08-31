---
title: 用 CSS 画一些多边形状
layout: post
categories: CSS
tags: css三角形 css多边形
excerpt: 介绍使用 CSS 画多边形的思路与方法
---
CSS是个很强大的网页开发工具，使生硬的网页变得丰富绚丽，css能实现很多效果，比如css3中的过渡与动画效果都很好看，最基本的就是画一个具有长宽的矩形，通过设置 `border-radius` 又能实现画圆形和椭圆形，但是其他多边形似乎没有直接能用的属性，比如**三角形**，**五角星**，**六边形**等等；

下面根据几何顺序依次来实现一下：

# 圆形

<html>
<div style="border:1px solid green;
padding:10px;">
    <div style="width:40px;
    height:40px;
    background:red;
    border-radius:20px;"></div>
</div>
<br />
</html>

> #### 分析:

在长宽相等的正方形中使用 `border-radius` 属性，其值等于长或宽的一半；

代码：

```html
<html>
<head>
    <title>CSS</title>
    <style>
        div {
            width: 40px;
            height: 40px;
            background: red;
            border-radius: 20px;
        }
    </style>
</head>
<body>
    <div></div>
</body>
</html>
```

# 椭圆形

<html>
<div style="border:1px solid green;
padding:10px;">
    <div style="width:60px;
    height:40px;
    background:red;
    border-radius:50%"></div>
</div>
<br />
</html>

> #### 分析

同样是 `border-radius` 属性，只不过其值有变化，使用 `border-radius: 30px/20px`，意思是原矩形宽度方向半径设为 30px，高度方向半径设为 20px，或者简写为 `boder-radius: 50%`，一个意思，宽度和高度方向的半径各位宽度和高度的一半；

代码：
```html
<html>
<head>
    <title>CSS</title>
    <style>
        div {
            width: 40px;
            height: 40px;
            background: red;
            border-radius: 30px / 20px;
            /* 或者这样
            border-radius: 50%;
            */
        }
    </style>
</head>
<body>
    <div></div>
</body>
</html>
```

# 三边形

<html>
<div style="border:1px solid green;
padding:10px;">
    <div style="width:30px;
    height:40px;
    border-left:20px solid transparent;
    border-right:20px solid transparent;
    border-bottom:40px solid red;"></div>
</div>
<br />
</html>

> #### 分析

没有直接能用的三角形的属性，可以利用CSS的**盒子模型**，就是下面这种，像 `<p>, <h1>, <div>` 这些标签都是一个“盒子”，标签内的文本是内容区，周围的彩色边界设置的是 `border` 值，当然还有边界与内容区中间的 `padding` 值，以及边界外的 `margin` 值；

<html>
<div style="border:1px solid green;
padding:10px">
    <div style="width: 60px;
    height: 40px;
    background: red;
    color: white;
    border-top:10px solid green;
    border-bottom: 10px solid blue;
    border-left: 15px solid yellow;
    border-right: 15px solid aqua">内容</div>
</div>
<br />
</html>

所以由图就能想到办法了，就是让某一条边界的宽度值直接等于盒子的宽度，并设置一个边界颜色，其他边界线设置不同的宽度值来调整三角形的斜度，并把边界线颜色设置为透明 `transparent` 即可；

代码：
```html
<html>
<head>
    <title>CSS</title>
    <style>
        div {
            width:30px;
            height:40px;
            border-left:20px solid transparent;
            border-right:20px solid transparent;
            border-bottom:40px solid red;
        }
    </style>
</head>
<body>
    <div></div>
</body>
</html>
```

# 矩形

<html>
<div style="border:1px solid green;
padding:10px">
    <div style="width: 60px;
    height: 40px;
    background: red;"></div>
</div>
<br />
</html>

最简单的形状，就不分析了；

# 梯形

<html>
<div style="border:1px solid green;
padding:10px">
    <div style="width: 60px;
    height: 40px;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 40px solid red;"></div>
</div>
<br />
</html>

> #### 分析

方法有些像三角形，只不过底部边界线宽度等于矩形高度，左右两边的边界线宽度小于矩形宽度值即可（感觉这两句话绕就比划着再读几遍 -_-）;

代码：
```html
<html>
<head>
    <title>CSS</title>
    <style>
        div {
            width: 60px;
            height: 40px;
            border-left: 10px solid transparent;
            border-right: 10px solid transparent;
            border-bottom: 40px solid red;
        }
    </style>
</head>
<body>
    <div></div>
</body>
</html>
```

# 平行四边形

<html>
<div style="border:1px solid green;
padding:10px">
    <div style="display: inline-block;
    width: 60px;
    height: 40px;
    border-left: 10px solid transparent;
    border-bottom: 40px solid red;">
    </div><div style="display: inline-block;
    width: 10px;
    height: 40px;
    border-left: 10px solid red;
    border-bottom: 40px solid transparent;"></div>
</div>
<br />
</html>

> #### 分析

看成一个倾斜过的矩形，所以可以使用 `transform: skew()` 属性，括号内是倾斜角度，比如30度就是 `30deg`，还有 `transform` 是CSS3中的一个新属性，所以需要加浏览器前缀进行兼容，例如 ：

```css
div {
    transform: skew(30deg);
    -webkit-transform: skew(30deg);
    -moz-transform: skew(30deg);
    -ms-transform: skew(30deg);
    -o-transform: skew(30deg);
}
```

另外脑洞够大可以发挥一下想象，平行四边形可以看成一个直角梯形与一个直角三角形的组合，或者一个矩形与两个直角三角形的组合；

直角梯形与直角三角形组合的代码：
```html
<html>
<head>
    <title>CSS</title>
    <style>
        #div0 {
            display: inline-block;
            width: 60px;
            height: 40px;
            border-left: 10px solid transparent;
            border-bottom: 40px solid red;
        }
        #div1 {
            display: inline-block;
            width: 10px;
            height: 40px;
            border-left: 10px solid red;
            border-bottom: 40px solid transparent;
        }
    </style>
</head>
<body>
    <div id="div0"></div><!--
    --><div id="div1"></div>
</body>
</html>
```

**注意：** 两个 `<div>` 标签之间如果有**换行**或者空格的话，最终两个块图形间会出现一条**细缝**，所以写的时候就要避免换行，或者像上面一样把换行**注释掉**；

# 五边形

<html>
<div style="border:1px solid green;
padding:10px">
    <div style="width: 50px;
    height: 10px;
    border-left: 25px solid transparent;
    border-right: 25px solid transparent;
    border-bottom: 10px solid red;">
    </div><div style="width: 50px;
    height: 40px;
    border-top: 40px solid red;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;"></div>
</div>
<br />
</html>

> 分析

五边形可以看成上面的三角形与下面梯形的组合，当然数学好的可以计算一下尺寸就能画出一个正五边形了；

代码：
```html
<html>
<head>
    <title>CSS</title>
    <style>
        #div0 {
            width: 50px;
            height: 10px;
            border-left: 25px solid transparent;
            border-right: 25px solid transparent;
            border-bottom: 10px solid red;
        }
        #div1 {
            width: 50px;
            height: 40px;
            border-top: 40px solid red;
            border-left: 10px solid transparent;
            border-right: 10px solid transparent;
        }
    </style>
</head>
<body>
    <div id="div0"></div>
    <div id="div1"></div>
</body>
</html>
```

更多边的形状基本思路都一样，想着用三角形，矩形，梯形这些基本形象进行组合基本上都能实现，下面的形状就只放形状和源码了；

# 五角星

<html>
<div style="border:1px solid green;
padding:10px">
    <div style="width: 40px;
    height: 60px;
    border-left: 20px solid transparent;
    border-right: 20px solid transparent;
    border-bottom: 60px solid red;">
        <div style="height: 20px;"></div>
        <div style="width: 60px;
        height: 18px;
        border-top: 25px solid red;
        border-left: 30px solid transparent;
        border-right: 30px solid transparent;
        margin-left: -30px;"></div>
        <div style="width: 40px;
        height: 15px;
        border-left: 20px solid transparent;
        border-right: 20px solid transparent;
        border-bottom: 15px solid white;
        margin-left: -20px;"></div>
    </div>
</div>
<br />
</html>

代码：
```html
<html>
<head>
    <title>CSS</title>
    <style>
        #div0 {
            width: 40px;
            height: 60px;
            border-left: 20px solid transparent;
            border-right: 20px solid transparent;
            border-bottom: 60px solid red;
        }
        #div1 {
            height: 20px;  
        }
        #div2 {
            width: 60px;
            height: 18px;
            border-top: 25px solid red;
            border-left: 30px solid transparent;
            border-right: 30px solid transparent;
            margin-left: -30px;
        }
        #div3 {
            width: 40px;
            height: 15px;
            border-left: 20px solid transparent;
            border-right: 20px solid transparent;
            border-bottom: 15px solid white;
            margin-left: -20px;
        }
    </style>
</head>
<body>
    <div id="div0">
        <div id="div1"></div>
        <div id="div2"></div>
        <div id="div3"></div>
    </div>
</body>
</html>
```

# 六边形

<html>
<div style="border:1px solid green;
padding:10px">
    <div style="width: 60px;
    height: 30px;
    border-left: 15px solid transparent;
    border-right: 15px solid transparent;
    border-bottom: 30px solid red;"></div>
    <div style="width: 60px;
    height: 30px;
    border-top: 30px solid red;
    border-left: 15px solid transparent;
    border-right: 15px solid transparent;"></div>
</div>
<br />
</html>

代码：
```html
<html>
<head>
    <title>CSS</title>
    <style>
        #div0 {
            width: 60px;
            height: 30px;
            border-left: 15px solid transparent;
            border-right: 15px solid transparent;
            border-bottom: 30px solid red;
        }
        #div1 {
            width: 60px;
            height: 30px;
            border-top: 30px solid red;
            border-left: 15px solid transparent;
            border-right: 15px solid transparent;
        }
    </style>
</head>
<body>
    <div id="div0"></div>
    <div id="div1"></div>
</body>
</html>
```

当然网页上画像上面这种基本图形，或者跟复杂的几何图形，曲线图形等，多半用到**canvas**或者**SVG**这两个工具，功能很强大，可以自行了解；