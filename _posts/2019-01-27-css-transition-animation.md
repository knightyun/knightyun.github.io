---
title:  CSS3 过渡与动画
layout: post
categories: CSS
tags: css3过渡 css3动画 transition animation
excerpt: CSS3 中的过渡与动画效果的介绍
---
CSS3中出现很多新的特性，下面就讲一下其中比较好玩的**3D操作**，**过渡**和**动画**效果；

# 过渡(transition)
过渡就是使瞬间的样式变化，按照一定方式变得缓慢平缓；

例如鼠标划过超链接时颜色的变化，点击按钮后的颜色变化等，默认转化都是瞬间完成，可能你已经习惯了这种变换，但有时候平缓一些看着还是比较舒适的；

要实现样式的过渡变化，那么首先就学要有**样式变换**，例如鼠标划过，单击按钮，点击图片等操作，来实现颜色，尺寸，位置等样式的变化；

下面是鼠标划过段落使文本变红的操作，应用所有 `transition`属性：
```css
p:hover {
    color: red;
}
p {
    transition-property: color;
    transition-duration: 2s;
    transition-timing-function: linear;
    transition-delay: 0;
}
```

![image](https://i.loli.net/2019/01/26/5c4c3488ab322.gif)

一共四个值，功能基本都是字面翻译的意思：
- **transition-property**

执行过渡的属性，例子设置为颜色color的变化，也可以是width, font-size等，不设置的话默认是`all`，即所有属性；

- **transition-duration**

过渡的时间，单位是秒，如1s, 2.3s，不设置的话默认 `0s`，即无过渡效果；

- **transition-timing-function**

设置过渡时的变化方式，默认是 `ease`，即速度由慢到快再到慢，常用的还有 `linear`，线性变化速度均匀，还有其他几个方式，过渡时间短的话看不出什么区别；

- **transition-delay**

延迟时间，即多少秒后执行过渡效果，默认 `0s`，不延迟；

当然这么多单词可能记不住，一般使用快捷写法：
```css
p {
    transition: color 2s linear 0;
}
/*最少要指定过渡时间*/
p {
    transition: 2s;
}
```

也可以设置每个样式分别过渡，例如：
```css
p {
    transition: color 2s linear,
                font-size .5s,
                background: 1s;
}
```

每个样式过渡之间用**逗号**隔开就行了；

最后，由于是新特性，为了兼容性需要加上浏览器厂商前缀：
```css
p {
    transition: 2s;
    -webkit-transition: 2s;
    -moz-transition: 2s;
    -ms-transition: 2s;
    -o-transition: 2s;
}
```

# 动画(animation)
CSS3的动画是个很不错的技术，基本能取代一些动图，javascript，flash等；

而动画里最重要的概念就是**关键帧**，也许你用PS做gif动图的时候看见过这个概念，所谓动画就是一帧一帧图片连续切换实现的效果，关键帧就是里面主要的一些帧；

实现CSS动画也需要设置关键帧 `@keyframes`：
```css
@keyframes my-animation {
    0% {
        color: red;
    }
    50% {
        color: green;
    }
    100% {
        color: blue;
    }
}
```

格式如上，@keyframes后面跟的是自定义的**动画名称**，后面会用到。里面的**0%，50%，100%**便是设置的三个关键帧及其对应样式，如果只需要设置首尾两个关键帧，可以这样写：
```css
@keyframes my-animation {
    from {
        color: green;
    }
    to {
        color: blue;
    }
}
```

效果：

![image](https://i.loli.net/2019/01/26/5c4c4eae8329a.gif)

当然样式除了color还能设置多项样式；

定义好关键帧后就直接在需要应用动画的元素标签内使用就行了，格式及所有属性如下：
```
p {
    animation-name: my-animation;
    animation-duration: 3s;
    animation-timing-function: ease;
    animation-delay: 0;
    animation-iteration-count: 3;
    animation-direction: normal;
    animation-play-state: running;
}
```

发现了吧，很多属性和**transition**里面一样，简单介绍下：

- **animation-name**

就是之前跟在@keyframea后面的自定义名称，之前设置的是 `my-animation`;

- **animation-duration**
- **animation-timing-function**
- **animation-delay**

和前面一样，默认分别为 `0, ease, 0`；

- **animation-iteration-count**

动画播放的次数，默认 `1`，但一般设置为 `infinite`，即无限循环；

- **animation-direction**

动画播放的方向，`normal`为默认，正向播放，`reverse`为反向播放，`alternate`为正向后反向，`alternate-reverse`为反向后正向；

- **animation-play-state**

播放状态，默认 `running`，运行，`paused`为暂停，可以在javascript中使用对动画进行控制；

当然，这个属性比之前的transition还多，也有简便写法：
```css
p {
    animation: my-animation 3s linear infinite alternate;
}
```

其中 `animation-name` 和 `animation-duration`为必须设置的属性；

同样，记得考虑浏览器兼容：
```css
@-webkit-keyframes mycanimation {
    from {
        color: green;
    }
    to {
        color: blue;
    }
}
p {
    -webkit-animation: my-animation 3s linear infinite;
}
/* -moz-, -ms-, -o- 格式类似 */
```