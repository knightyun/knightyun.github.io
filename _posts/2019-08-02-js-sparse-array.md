---
title:  JavaScript 稀疏数组
layout: post
categories: JavaScript
tags: 稀疏数组 sparse
excerpt: 关于JavaScript 中稀疏数组的介绍
---
# 稀疏数组

## 概念

在一些后端语言中，如 C，数组内的值通常被分配在一系列连续的内存地址上，但是在 js 中，某些数组内存则不是连续的，所谓**稀疏**，顾名思义，不连续，存在一些空隙；

例如：
```js
var arr = new Array(3);
console.log(arr);
// (3) [empty × 3]
```

通过以上方法创建数组，其中 `Array(3)` 中的参数 3 表示数组的长度，这个数组就是稀疏的，控制台输出一般带有 `empty` 字样，或者像下面这样创建数组：

```js
var arr = [1,,2];
console.log(arr);
// (3) [1, empty, 2]
```

因为定义语句中两个逗号之间无字符，没有定义值，同样带有 `empty` 字样，代表稀疏数组，这里可以把 `empty` 理解为上面讲到的 **空隙**；

## 特点

接下来看一下稀疏数组特殊在什么地方，举个例子说明：
```js
var arr1 = [1, 2, 3];  // 正常数组
var arr2 = new Array(3);  // 稀疏数组
var arr3 = [1, , 3];  // 稀疏数组

console.log(arr1.length, arr2.length, arr3.length);
// 3 3 3
console.log(arr2[0], arr3[1]);
// undefined undefined
for (var i = 0; i < 3; i++) {
    console.log(arr1[i], arr2[i], arr3[i]);
}
// 1 undefined 1
// 2 undefined undefined
// 3 undefined 3
arr1.forEach(function(x){
    console.log(x);
});
// 1
// 2
// 3
arr2.forEach(function(x){
    console.log(x);
});
// （无输出）
arr3.forEach(function(x){
    console.log(x);
});
// 1
// 3
console.log(0 in arr3, 1 in arr3);
// true false
```

总结一下，创建的稀疏数组，其长度（length）与定义长度值一致；**空隙** 值可以被单独访问到，并且不是之前出现的 `empty` 字样，而是 `undefined`，比如例子中出现 `undefined` 时都是使用 `arr[i]` 这样的索引直接访问方式；使用某些数组方法如 `forEach()` 时，会忽略掉空隙值，只处理正常值，所以也会使得 `1 in arr3` 值为 `false`，即数组中不存在该索引；

细想一下，js 这样处理的原因多半是去除不必要的性能开销，当数组相当大时，可以避免处理一些未初始化的值，但这样也同时使得开发中会出现一些问题，所以应尽量避免；

举个例子来查看一下性能如何：
```js
console.time('one');
// 密集数组
Array(...Array(1e5)).forEach(function(){
    ;
});
console.timeEnd('one');

console.time('two');
// 稀疏数组
Array(1e5).forEach(function(){
    ;
});
console.timeEnd('two');

// one: 26.3759765625ms
// two: 5.701171875ms
```

可以看出在处理较大数组时，稀疏数组确实能降低不少性能开销；

# 密集数组

## 概念

与稀疏相对应，则存在密集，定义也就是元素中不存在 **空隙** 值，其实密集数组基本就是平时常见的正常数组；

例如：
```js
var arr1 = [1, 2, 3];
var arr2 = new Array(1, 2, 3);
arr2.forEach(function(x){
    console.log(x);
});
// 1
// 2
// 3
```

以上都是一些定义密集数组的方法，并且数组中的值都能被正常访问或遍历处理；

## 区别

运用时需要注意以下情况：
```js
var arr1 = [undefined, undefined, undefined];
var arr2 = new Array(3);
console.log(arr1[0], arr2[0]);
// undefined undefined
arr1.forEach(function(x){
    console.log(x);
})
// undefined
// undefined
// undefined
arr2.forEach(function(x){
    console.log(x);
})
// （无输出）
```

即显式的声明值为 `undefined` 并不代表这个值就是之前提到的**空隙**值，虽然二者通过索引访问时的值都返回 `undefined`，但是其根本还是有区别的，显式声明过的是可以被遍历等操作访问的，不会被当成空隙值被忽略；

## 拓展

通常在很多情况下，我们想要直接声明一个数组并赋予其一些特定的初始值，并且为了避免问题，通常是希望申明为密集数组的，下面就介绍一些常用的方法或技巧：
```js
var arr1 = new Array(3).fill(1);
console.log(arr1);
// [1, 1, 1]

var arr2 = Array.fill().map((x, i) => i);
console.log(arr2);
// [0, 1, 2]

var arr3 = Array.apply(null, Array(3));
console.log(arr3);
// [undefined, undefined, undefined]
// 这样声明的是密集数组，不是稀疏的

var arr4 = new Array(4).join('a').split('');
console.log(arr4);
// ['a', 'a', 'a']
// 注意定义数组长度比输出数组大 1
```

其它更多的方法可以自行类推；