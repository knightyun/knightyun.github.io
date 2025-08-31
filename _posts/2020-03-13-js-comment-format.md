---
title: JavaScript之注释规范化（JSDoc）
layout: post
categories: JavaScript
tags: jsdoc 注释 规范化 格式
excerpt: 介绍JavaScript中的一种规范化注释格式
---
## 前言

俗话说，无规矩不成方圆；虽说代码敲出来都是交给编译器解释执行的，只要不存在语法格式错误，排版无论多么反人类都是没有问题的，但是代码除了执行外的另一个广泛用途就是阅读了，翻阅自己过去的代码、理解别人的源码，等等；所以出现了代码风格化，美化外观的同时便于阅读，这就是目前 JSLint 等工具的作用；

当然，除了代码本身外，阅读更多的可能就是代码注释了，注释本身是不会被编译器编译执行的，其作用也是为了留下一些信息，方便更好的理解代码本身；所以，注释的规范化也是一个值得思考的问题；而接下来即将介绍的 **JSDoc** 就是这样的一款工具；

## JSDoc

根据其官网（<https://jsdoc.app/index.html>）的介绍，JSDoc 是一个针对 JavaScript 的 API 文档生成器，类似于 Java 中的 Javadoc 或者 PHP 中的 phpDocumentor；在源代码中添加指定格式的注释，JSDoc 工具便会自动扫描你的代码并生成一个 API 文档网站（在指定目录下生成相关的网页文件）；

生成 API 文档只是一方面，其更主要的贡献在于对代码注释格式进行了规范化，你可能没用过，但多半曾经在某个地方的源码中见过类似于下面的注释格式：
```js
/**
 * Returns the sum of a and b
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
function sum(a, b) {
    return a + b;
}
```

### 使用

工具的使用很简单，首先安装它：
```sh
npm install -g jsdoc
```

其次假设在一个名为 `doc.js` 的文件中书写以下代码：
```js
/**
 * Returns the sum of a and b
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
function sum(a, b) {
    return a + b;
}
/**
 * Return the diff fo a and b
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
function diff(a, b) {
    return a - b;
}
```

然后就是在当前目录执行以下命令：
```sh
jsdoc doc.js
```

最后就会在当前目录下生成一个名为 `out` 的目录（也可以另外指定），当前目录内容就会变成像下面这样：
```sh
├── doc.js
└── out
    ├── index.html
    ├── doc.js.html
    ├── global.html
    ├── fonts
    │   ├── OpenSans-BoldItalic-webfont.eot 
    │   ├── OpenSans-BoldItalic-webfont.svg 
    │   ├── OpenSans-BoldItalic-webfont.woff
    │   ├── OpenSans-Bold-webfont.eot       
    │   ├── OpenSans-Bold-webfont.svg       
    │   ├── OpenSans-Bold-webfont.woff      
    │   ├── OpenSans-Italic-webfont.eot     
    │   ├── OpenSans-Italic-webfont.svg     
    │   ├── OpenSans-Italic-webfont.woff    
    │   ├── OpenSans-LightItalic-webfont.eot
    │   ├── OpenSans-LightItalic-webfont.svg
    │   ├── OpenSans-LightItalic-webfont.woff
    │   ├── OpenSans-Light-webfont.eot
    │   ├── OpenSans-Light-webfont.svg
    │   ├── OpenSans-Light-webfont.woff
    │   ├── OpenSans-Regular-webfont.eot
    │   ├── OpenSans-Regular-webfont.svg
    │   └── OpenSans-Regular-webfont.woff
    ├── scripts
    │   ├── linenumber.js
    │   └── prettify
    │       ├── Apache-License-2.0.txt
    │       ├── lang-css.js
    │       └── prettify.js
    └── styles
        ├── jsdoc-default.css
        ├── prettify-jsdoc.css
        └── prettify-tomorrow.css
```

通过浏览器访问这个 `out` 目录中的相关网页，就会展示类似于下面的页面内容；

主页：

![jsdoc-home.png](https://i.loli.net/2020/03/13/i4qVtlwaCIEWjAp.png)

指定函数页：

![jsdoc-func.png](https://i.loli.net/2020/03/13/1Va8cR9YybirWIO.png)

网页样式模板也可以更换，根据命令行参数修改即可，这里不再探究，下面主要来学习一下它的注释格式；

### 注释格式

完整的格式介绍请参考官网（<https://jsdoc.app/index.html>），目前版本是 JSDoc 3，下面只介绍几种常用的标签并配合举例；当然如果嫌手写一堆标签麻烦，现在许多编辑器（比如 VS Code）都提供了相关的插件下载，直接在插件中搜索关键词 jsdoc 就会出现许多，都是带提示或者自动识别当前代码生成的，很方便；

#### 注释符

JSDoc 使用以下格式的注释符来对要添加的标签进行块级包裹：
```js
/**
 * 
 * 
 */
```

即星号列垂直对其，第一行使用两个星号，每个星号后要添加一个空格再写内容，比如：
```js
/**
 * 前面留一个空格，再写描述
 * 或者多行描述
 * @param {number} 关于该参数的描述
 */
```

行内包裹：
```js
/** @function */
```

#### @description

也可写作 `@desc`，描述当前注释对象的详细信息；
```js
/**
 * @function
 * @description 关于该函数的介绍内容
 */
function myFn() {}

/**
 * 也能在这里直接写介绍内容
 * @function
 * @description 如果这里又继续使用标签添加内容，则会覆盖第一行的介绍内容
 */
function myFn() {}
```

#### @file

注释写在文件开头，用于描述当前文件的相关信息；例如：
```js
/**
 * @file 这是一个用于...的文件，包含了...功能
 */
 
// 然后是代码正文...
```

#### @author

描述当前文件或者代码的作者的相关信息；
```js
/**
 * @author Jack <jack@example.com>
 */
```

#### @copyright

描述当前文件的版权相关信息
```js
/**
 * @copyright Jack 2020
 */
```

#### @license

描述当前文件许可证相关信息；
```js
/**
 * @license MIT
 */
```

或者是：
```js
/**
 * @license
 * Copyright (c) 2015 Example Corporation Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * ...
 */
```

#### @version

描述当前项目的版本号；
```js
/**
 * 这个版本修复了...问题
 * @version 1.2.3
 */
```

#### @since

描述某个功能是从哪个版本开始引入的；
```js
/**
 * 提供了...功能
 * @since 1.2.1
 */
function newFn() {}
```

#### @see

类似于“另见”、“详见"的意思，引导至其他位置，也可以使用 `@link` 引导至某一网络地址；
```js
/**
 * @see fn2
 */
function fn1() {}

/**
 * @see {@link http://example.com|some text}
 */
function fn2() {}
```

#### @todo

描述接下来准备做的事情；
```js
/**
 * @todo 添加...功能
 * @todo 修复...bug
 */
function myFn() {}
```

#### @function

与 `@func`, `@method` 含义相同，描述一个函数；
```js
/** @function */
var myFn = function() {}
```

#### @type

描述一个变量的类型；
```js
/**
 * 一个对象类型的变量
 * @type {object}
 */
var val1 = {};

/**
 * 一个字符或者数字类型的变量
 * @type {(string|number)}
 */
var val2;

/**
 * 类型为数字或为空
 * @type {?number}
 */
var val3;

/**
 * 类型为数字或且不能为空
 * @type {!number}
 */
var val4;

/**
 * 一个 MyClass 类的实例数组
 * @type {Array.<MyClass>}
 */
var arr = new MyClass();

/**
 * 一个字符串的数组
 * @type {string[]}
 */
var arr2 = ['a', 'b', 'c'];

/**
 * 一个包含一个字符串和一个数字类型的对象
 * @type {object.<string, number>}
 */
var obj1 = {a: 'one', b: 2}
{% raw %}
/**
 * 指定具体键和类型的对象
 * @type {{a: string, b: number}}
 */
var obj2 = {a: 'one', b: 2}
{% endraw %}
/**
 * 指定具体键和类型的命名对象
 * @type {object} obj3
 * @type {string} obj3.a
 * @type {number} obj3.b
 */
var obj3 = {a: 'one', b: 2}

```

#### @param

与 `@arg`, `@argument` 含义相同，描述一个函数的参数信息；
```js
/**
 * 标签后跟参数类型，然后是参数名，最后是参数描述
 * @param {number} a 这里写变量的描述
 * @param {string} b - 或者加上连字符便于阅读
 * @param {string} c - 又或者这个参数有一个很长很长很长
 * 很长很长很长很长很长非常长的描述，可以这样占用多行
 */
function myFn(a, b, c) {}

/**
 * 传入的参数是个对象
 * @param {object} option - 传入的对象参数
 * @param {string} option.name - 对象的 name 属性
 * @param {number} option.age - 对象的 age 属性
 */
function myFn(option) {
    var name = option.name;
    var age = option.age;
}

/**
 * 传入的参数是个字符串组成的数组
 * @param {string[]} arr - 传入的对象参数
 */
function myFn(arr) {
    var name = option.name;
    var age = option.age;
}

/**
 * 表示某个参数是可选的
 * @param {number} a - 这是必填参数
 * @param {number} [b] - 这是可选参数
 * @param {number=} c - 可选参数的另一种表示
 */
function myFn(a, b, c) {}

/**
 * 表示可选参数的默认值
 * @param {number} a
 * @param {number} [b=3] - 默认值为 3
 */
function myFn(a, b) {}

/**
 * 参数类型的各种表示
 * @param {number} a - 类型为数字
 * @param {number|string} b - 类型为数字或字符串
 * @param {?number} c - 类型为数字或者为空（null）
 * @param {!number} d - 类型为数字且不为空
 * @param {*} e - 类型不做限制，即可以为任意类型
 */
function myFn(a, b, c, d, e) {}

/**
 * 表示具有任意多个参数的函数
 * 下面的函数返回所有传入参数的和
 * @param {...number} num - 参数个数任意，但是都是数字类型
 */
function sum(num) {
    var len = arguments.length;
    var result = 0;
    
    for (let i = 0; i < len; i++) {
        result += arguments[i];
    }
    return result;
}
```

#### @typedef

用于描述自定义的变量类型；
```js
/**
 * 关于自定义类型的描述
 * @typedef {(string|number)} myType
 */

/**
 * 关于自定义类型的描述
 * @type {myType} val - 使用自定义的类型
 */
function myFn(val) {}
```

#### @callback

描述指定函数中作为回调函数的参数信息；
```js
/**
 * 这是关于回调函数的描述
 * @callback myCallback
 * @param {string} aa - 回调函数接受的参数
 * @param {number} [bb] - 回调函数接受的另一个可选参数
 */
 
/**
 * 这是关于函数本身的描述
 * @param {string} a
 * @param {myCallback} callback - 回调函数
 */
function myFn(a, callback) {}
```


#### @returns

或者写作 `@return`，描述函数的返回值的信息；
```js
/**
 * @param {number} a
 * @returns {number} 关于返回值的描述
 */
function myFn(a) {
    return a + 1;
}

/**
 * @param {number} a
 * @returns {(number|string)} 返回值可能是数字或字符类型
 */
function myFn2(a) {
    if (a > 1) {
        return 1;
    } else {
        return 'no.';
    }
}
```

#### @example

描述指定代码的使用示例；
```js
/**
 * 添加示例代码（格式会被高亮展示）
 * @param {string} a
 * @param {string} b
 * @returns {string} return a concat b.
 *
 * @example
 * console.log(myFn('hello ', 'world!'));
 * // "hello world!"
 */
function myFn(a, b) {
    return a + b;
}
```

#### @class

描述一个 `class` 类；
```js
/**
 * 关于该类的描述
 * @class
 */
class MyClass {}

/**
 * 或者是一个构造函数
 * @class
 */
function MyClass() {}
var ins = new MyClass();
```

#### @namespace

描述一个命名空间；
```js
/**
 * 指定一个对象对命名空间
 * @namespace
 */
var MyNamespace = {
    /**
     * 表示为 MyNamespace.fn
     * @returns {*}
     */
    fn: function() {},
    /**
     * 表示为 MyNamespace.a
     * @type {number}
     */
    a: 1
}

/**
 * 手动指定命名空间
 * @namespace MyNamespace
 */
/**
 * 一个成员函数，MyNamespace.myFn
 * @function
 * @returns {*}
 * @memberof MyNamespace
 */
function myFn() {}
```

#### @member

描述当前类的一个成员；
```js
/**
 * @class
 */
function MyClass() {
    /** @member {string} */
    this.name = 'knightyun';
    
    /**
     * 或者一个虚拟的成员
     * @member {number} age
     */
}
```

#### @memberof

描述成员所属的类；
```js
/**
 * @class
 */
class MyClass {
    /**
     * @constructor
     * @memberof MyClass
     */
    constructor() {}
    /*
     * @param {string} val
     * @returns {*}
     * @memberof MyClass
     */
    myFn(val) {}
}
```