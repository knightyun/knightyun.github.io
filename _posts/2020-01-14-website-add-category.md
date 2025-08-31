---
title: 个人博客网站文章添加目录导航
layout: post
categories: 网站
tags: 目录 导航
excerpt: 关于网页文章添加目录导航的介绍与实现
---
# 概述

之前有写文章探索如何给[个人博客网站添加文章搜索功能](https://knightyun.github.io/2019/03/04/articles-search)，可以方便的通过关键词检索相关文章，现在再来探索一下另一个功能，即给文章添加目录导航；对于篇幅较短的文章，目录的有无影响不大，但是当文章篇幅过长时，一个能提供预览和跳转的目录结构预览，就显得意义重大了，接下来就来一步步将它实现出来；

# 原理

## 样式

实现功能必先思考其原理，目录预览其实就是一块内容，包含当前页面不同级别的标题的组合，并结构化的展示出来，首先我们可以参考一些网站的做法，比如 CSDN 的博客文章就有配置目录插件，下面就是我的某篇文章的目录预览图：

![category.png](https://i.loli.net/2020/01/14/SIP8mWhlTH1O43M.png)

它们的目录插件就是右边侧栏的一个按钮，鼠标放上去就会显示一个侧栏，内容就是当前文章的小标题的集合，不同级别的标题对应这不同程度的缩进，并且点击每个标题都会有相应的页面跳转，这也基本是我们常见而熟悉的目录形式，那么我们就以此为参考来实现；

## 目录获取

想要生成这么一个目录之前，当然是要先获取目录的内容，前面讲过，目录的内容就是当前文章的所有标题的集合，而我们知道，在 HTML 中标题相关的标签是 `h1, h2, h3, h4, h5, h6` 这几个，所以直接获取它们就行了，比如：
```js
// 获取所有的标签名为 h1 的元素
document.querySelectorAll('h1');
// 获取所有的标签名为 h1 - h6 的元素
document.querySelectorAll('h1, h2, h3, h4, h5, h6');
```

获取内容是一个数组，包含所有标题节点；接下来的问题就是考虑如何结构化存储，这样便于理解的同时又方便后期的读取，所谓结构化，即目录本身就是一类 **树** 结构，比如，目录包含多个一级标题，同时某些以及标题可能还有多个二级标题，甚至再向下延伸出三级标题等等，类似下面的结构：
```sh
├─ 一级标题 1
│  └─ 二级标题 1
│      └─ 三级标题 1
│          └─ 四级标题
├─ 一级标题 2
│  └─ 二级标题 1
├─ 一级标题 3
│  ├─ 二级标题 1
│  ├─ 二级标题 2
│  ├─ 二级标题 3
│  │  ├─ 三级标题 1
│  │  ├─ 三级标题 2
... ... 
```

理论的做法就是以树结构保存获取的标题，类似于下面这种：
```js
[{
    node: 'h1Node', // 一级标题 1 对应的节点
    child: [{
        node: 'h2Node', // 二级标题 1
        child: [{
            node: 'h3Node', // 三级标题 1
            child: []
        }]
    },
    {
        node: 'h2Node', // 二级标题 2
        child: []
    }]
},
{
    node: 'h1Node', // 一级标题 2
    child: [{
        node: 'h2Node', // 二级标题 1
        child: []
    }]
},
{
    node: 'h1Node', // 一级标题 3
    child: []
}]
```

看着还是比较复杂的，耗费的空间也较大，需要递归式获取，最后也要递归式的输出，一般文章目录包含的标题数量也是较少的，所以暂且不用这种结构来保存，可以换一种简单的思路，即我们最后生成该目录时可以选择一行一行递进的输出，即设计如下结构：
```js
[
    'h1Node', // 一级标题 1 对应的元素节点
    'h2Node', // 二级标题 1 （隶属于一级标题 1）
    'h3Node', // 三级标题 1 （隶属于二级标题 1）
    'h2Node', // 二级标题 2 （隶属于一级标题 1）
    'h1Node', // 一级标题 2
    'h2Node', // 二级标题 1 （隶属于一级标题 2）
    'h1Node'  // 一级标题 3
]
```

因为我们只要求最终能输出一列格式化的目录，即挨个依次输出，所以只需以此存储即可，这样占用的空间和复杂度都有所减少；

## 目录生成

最终展示效果设定为最上面的样图所示，按照之前设计的存储结构，遍历该数组一行一行打印出来即可；关于不用级别的标题应用不同程度的缩进，可以巧妙利用一下元素节点的 `nodeName` 这个属性，比如元素节点 `<h1></h1>` 对应的 `nodeName` 就是 `H1`，`h2` 就对应 `H2`，以此类推，我们就利用该值最后的那个数字，乘以一个固定缩进值，这样级别递增的标题节点也就拥有了递增的缩进值，最后样式部分就可以利用 `padding-left` 来实现缩进，js 代码的实现思路如下：
```js
// node 为标题节点，32 是标题级别增加而多缩进的值
node.style.paddingLeft = node.nodeName.slice(-1) * 32 + 'px';
```

对于点击标题跳转到文章对应标题所在位置这个功能，实现也比较简单，设置对应 **锚点** 即可，也就是标题元素需要设置一个 `id` 属性值，然后给点击的 `<a>` 标签的 `href` 属性也设置为这个 `id` 值即可，例如：
```html
<h1 id="my-h1">一级标题</h1>

<a href="my-h1">点我跳转到一级标题</a>
```

# 具体实现

## 第三方库

避免重复造轮子，一些基础的格式化样式就交给第三方库去解决吧，这里使用的是 **Materialize** 这个库，安装和引用教程去官网：<https://materializecss.com> 查看；

## HTML部分

具体参考代码与说明如下：

```html
<!-- 引用第三方库 -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

<!-- 固定于屏幕右下方的一个悬浮按钮 -->
<div class="fixed-action-btn">
    <a class="btn-floating btn-large blue z-depth-4">
        <i class="large material-icons">apps</i>
    </a>
    <ul>
        <!-- 文章目录按钮 -->
        <li class="category-btn hide">
            <a class="sidenav-trigger btn-floating blue lighten-2" data-target="category">
                <i class="material-icons">format_list_bulleted</i>
            </a>
        </li>
        <!-- 下面也可以添加其他按钮，如返回文章顶部等-->
        <li>
            <a class="btn-floating blue lighten-2" href="javascript: scrollTo(0, 0);">
                <i class="material-icons">publish</i>
            </a>
        </li>
    </ul>
</div>

<!-- 文章目录侧栏 -->
<ul id="category" class="hide sidenav grey lighten-4 grey-text text-darken-3">
    <li><p class="center-align">目录</p></li>
</ul>

<!-- 下面的元素中存放文章内容 -->
<div id="post-content">
    <!-- 文章内容，需要注意的只有，为不同的标题元素设置不同的 id 属性以实现跳转 -->
    <!-- 以下为示例内容 -->
    <h1 id="t1">Title 1</h1>
    <p>Hello World!</p>
    <p>Hello World!</p>
    
    <h2 id="t11">Title 1</h2>
    <p>Hello World!</p>
    <p>Hello World!</p>
    <p>Hello World!</p>
    <p>Hello World!</p>
    <p>Hello World!</p>
    
    <h2 id="t12">Title 1</h2>
    <h3 id="t121">Title 1</h3>
    <p>Hello World!</p>
    <p>Hello World!</p>
    <p>Hello World!</p>
    
    <h1 id="t2">Title 2</h1>
    <p>Hello World!</p>
    <p>Hello World!</p>
    <p>Hello World!</p>
    <p>Hello World!</p>
    <p>Hello World!</p>
    
    <h1 id="t3">Title 3</h1>
    <p>Hello World!</p>
    
    <h2 id="t31">Title 3</h2>
    <p>Hello World!</p>
    <p>Hello World!</p>
    <p>Hello World!</p>
    <p>Hello World!</p>
    <p>Hello World!</p>
    <p>Hello World!</p>
    <p>Hello World!</p>
</div>
```

## CSS部分

样式部分因人而异，可以自行设计调整，以下为参考：
```css
#category li a:before { /* 添加一个折叠符号，为了好看 */
    content: "∟";
    position: absolute;
    left: 10px;
    bottom: 5px;
    font-size: 12px;
}
```

## JavaScript部分

该部分就是核心所在了，对应上面的 HTML 和 CSS 部分，实现如下：
```js
// 初始化第三方库的插件
M.AutoInit(); 
document.addEventListener('DOMContentLoaded', function () {
    var elemCategory = document.querySelector('#category');
    M.Sidenav.init(elemCategory, {
        'edge': 'right' // right 表示在右侧栏显示，left 则表示在左边显示
    });
});

var postContent = document.querySelector('#post-content');

if (postContent) { // 存在文章内容
    var categories = postContent.querySelectorAll('h1, h2, h3, h4, h5, h6');

    if (categories.length > 0) { // 文章存在标题
        var category = document.querySelector('#category'),
            categoryBtn = document.querySelector('.category-btn');
        var li = document.createElement('li'),
            a = document.createElement('a');
        
        a.className = 'waves-effect';
        // 存在目录则显示目录按钮和侧栏
        category.classList.remove('hide');
        categoryBtn.classList.remove('hide');
    
        categories.forEach(node => {
            // 每次 cloneNode 取代 createElement
            // 因为克隆一个元素快于创建一个元素
            var _li = li.cloneNode(false),
                _a = a.cloneNode(false);
    
            _a.innerText = node.innerText;
            // 为标题设置跳转链接
            _a.href = '#' + node.id;
            _li.appendChild(_a);
            // 为不同级别标题应用不同的缩进
            _li.style.paddingLeft = node.nodeName.slice(-1) * 32 + 'px';
            category.appendChild(_li);
        })
    }
}
```

# 效果

最后附上几张本人博客网站实现的最终效果图，也欢迎点击 <https://knightyun.github.io> 前往访问 ^_^

![批注 2020-01-14 154351.png](https://i.loli.net/2020/01/14/qfkJO3XaMvAh48o.png)

![批注 2020-01-14 154311.png](https://i.loli.net/2020/01/14/BqOuLKszCFxviID.png)

![批注 2020-01-14 154435.png](https://i.loli.net/2020/01/14/GwTP9ZaDMbsyrgv.png)