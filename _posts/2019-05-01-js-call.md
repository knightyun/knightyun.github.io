---
title: JavaScript 之 call，bind，apply 方法及 this 的用法辨析
layout: post
categories: JavaScript
tags: bind call apply this
excerpt: JavaScript 中方法call, apply, bind 的区别
---
# 概述

JavaScript函数中的三个方法`.call()`, `.apply()`, `.bind()`，总体来说主要功能就是改变函数中 `this` 关键字的指向，因为 `this` 默认指向**当前环境的对象**；

例如：
```js
var obj = {
    name: 'Knight',
    getName: function() {
        // this 指向 obj 对象
        console.log(this.name);
    }
}
obj.getName(); // 'Knight'
```

# call()

`.call()` 可以用于改变 `this` 值的指向，例如：
```js
this.name = 'Knight'; // 此处 this 指向全局对象 window;
var obj = {
    name: 'Cloud'
}
function fn() {
    console.log(this.name);
}

fn();         // 'Knight'
fn.call(obj); // 'Cloud'
// 此处指向了 obj 对象，所以 name 变了
```

也可以传递函数参数，平常调用函数的形式可能是这样：
```js
function fn(a, b) {
    console.log(a + b);
}

fn(2 + 3); // 5
```

现在也可以这样调用：
```js
function fn(a, b) {
    console.log(a + n);
}

fn.call(null, 2, 3); // 5
// 因为函数里没有用到 this，
// 所以可以设置为 null
```

# apply()

`.apply()` 与 `.call()` 类似，第一个参数也是用于改变 `this` 指向，区别就是 `apply()` 接受的函数参数是一个**数组**，例如：
```js
function fn(a, b) {
    console.log('Mu name is ' +
    this.name + (a + b) +
    ' years old.');
}
var obj = {
    name: 'Knight'
}
var arr = [2, 3];

fn.apply(obj, arr);
// My name is Knight, 5 years old.

// 使用 call() 的情况：
fn.call(obj, 2, 3);
// My name is Knight, 5 years old.
```

# bind()

`.bind()` 也与 `.call()` 类似，改变 this 指向，传递函数参数，区别在于 `.bind()` 方法结果是创建一个新的 **绑定函数**，而之前的 `.call()` 和 `.apply()` 结果都是 **立即执行函数**，举例来理解：
```js
var obj = {
    name: 'Knight'
}
function fn(a, b) {
    console.log('My name is ' +
    this.name + (a + b) +
    ' years old.');
}

var fnn = fn.bind(obj, 2, 3);
// fn.bind() 是一个函数，不会立即执行
fnn();
// My name is Knight, 5 years old.

fn.bind(obj, 2, 3)();
// 这种写法就是立即执行函数了，
// 结果与上面一样;
```

# this 的困境

考虑以下情况：
```js
function fn1() {
    function fn2() {
        console.log('fn2: ' +
        this);
    }
    fn2();
    console.log('fn1: ' + this);
}

fn1.call('here'); // 'fn1: here'
```

结果不会输出 `fn2: here`，因为函数定义 `fn2` 里的 `this` 是一个新的指向，并且未定义，与外部函数 `fn1` 中的 `this` 不同；

所以我们通常会进行一下处理：
```js
function fn1() {
    function fn2() {
        console.log('fn2: ' +
        this);
    }
    
    // 对 this 进行转存
    var that = this;
    fn2.call(that);
    
    console.log('fn1: ' +
    this);
}

fn1.call('here');
/*
fn2: here
fn1: here
*/
```

当然，ES6中的**箭头函数**解决了上述问题：
```js
function fn1() {
    var fn2 = () => {
        console.log('fn2: ' + this);
    }
    fn2();
    fn2.call('there');
    console.log('fn1: ' + this);
}

fn1.call('here');
/*
fn2: here
fn2: here
fn1: here
*/
```

由于 `.call()` 方法对箭头函数不起作用，所以上面的第二行输出与第一行相同；