---
title:  JavaScript 深度迭代遍历未知对象
layout: post
categories: JavaScript
tags: 迭代遍历 深度遍历 未知对象
excerpt: 介绍 js 中对未知对象的遍历方法
---
面向对象编程的语言，都存在对对象的一些操作，其中就包括遍历未知对象的属性值。

# 通常情况

常见的遍历对象的方法：
```js
var o = {
    name: 'cloud',
    age: 20
}
for (i in o) {
    console.log(i + ': ' + o[i]);
}
// name: cloud
// age: 20
```

# 特殊情况

但是对象中又含有子对象，对象的属性又是另一个对象，或者更深层嵌套，上面方法就不适用了；

下面使用**递归**实现这个功能：
```js
var o = {
    name: {
        firstName: 'cloud',
        lastName: 'huang'
    },
    age: 20
}
function myFn(obj) {
    for (i in obj) {
        console.log(i + ': ' + obj[i]);
        // 这里使用递归，属性类型为对象则进一步遍历
        if (typeof(obj[i]) == 'object') {
            myFn(obj[i]);
        }
    }
}
myFn(o);
// 输出：
// name: [object Object]
// firstName: cloud
// lastName: huang
// age: 20
```

这样的话不论对象有多复杂的结构都能全部遍历到位；

# 困境

但同时，这也是个问题，一些对象层次非常深甚至是死循环的情况就尴尬了，类似于子对象属性与父对象属性一样，尝试用上诉函数遍历一下浏览器的`window` 对象就能体会了，你会后悔的；

所以为避免这种尴尬情况，设置一个**迭代深度值**吧，指定遍历到第几代：
```js
var depth = 0;  // depth为迭代深度值
function myFn(obj) {
    for (i in obj) {
        console.log(i + ': ' + obj[i]);
        depth++;
        if (depth < 10
        && typeof(obj[i]) == 'object') {
            myFn(obj[i]);
        }
    }
}
```

或者使用一种类似**懒加载**的形式：
```js
function myFn(obj) {
    for (i in obj) {
        console.log(i + ': ' + obj[i]);
        if (typeof(obj[i]) == 'object') {
            // 判断用户是否要继续迭代
            if (confirmFn('是否深入遍历？')) {
                myFn(obj[i]);
            }
        }
    }
}
```