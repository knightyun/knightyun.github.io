---
title: JavaScript 变量提升（Hoisting）详解
layout: post
categories: JavaScript
tags: 提升 hoisting
excerpt: JavaScript 中关于提升行为的介绍
---
# 概念

**变量提升**是 JavaScript 的一种执行机制，大致就是字面意思，将声明的变量提前，但并不是指在编译时改变语句的顺序，而是将变量**提前**放入内存中，供后续操作，下面通过实例进行分析；


# 函数申明

在 JavaScript 中，声明一个函数并执行的话，通常会是以下形式：
```js
function fn() {
    console.log('run');
}

fn();  // run
```

上面是正常的思维顺序，但是包括其他一些编程语言在内，通常会使用如下形式：
```js
fn();

function fn() {
    console.log('run');
}
// run
```

这样做在执行上是没用问题的，同时可以在包含大量语句和函数申明的情况下，也可以使用这种特性将普通语句和函数申明分开，提高可读性；

以上情况便是一种常见的**提升(Hoisting)**，即编译时提前将当前执行上下文包含的申明的函数，提前放入内存中，供全文语句执行时调用，为了方便理解而抽象成一种提升行为；

但是如果使用下面的方式申明函数并执行：
```js
fn();

var fn = function() {
    console.log('run');
}
// TypeError: fn is not a function
```

这里就没有像上面一样的结果了，这属于下面将介绍的变量提升行为；

# 变量申明

当然函数只是一种类型的变量，还存在其他的变量类型，例如考虑以下语句：
```js
var a = 1;
console.log(a);
// 1
```

逻辑和执行都是正常的，输出结果也是预期的，但是如果变一下顺序：
```js
console.log(a);
var a = 1;
```

这种情况，通常可能会认为第一行调用了一个未定义的变量，然后输出 `Uncaught ReferenceError: a is not defined` 这样的错误，但是呢，并非如此，输出信息如下：
```js
undefined
```

没错，就只有一个单独的 `undefined`，这种输出情况就类似于以下代码的执行：
```js
var a;
console.log(a);
// undefined
```

从这里便可以大致分析出，前面的顺序怪异的代码，相当于在编译时**提前**将后面出现的变量申明提前，然后执行就输出了一个已申明但未 **初始化（赋值）** 的值，这便是其他类型的变量的**提升**行为，即在当前执行上下文中，将后面申明的变量提前放入内存，供前面的语句调用；

**注意**，前面的代码最后一行的语句是 `var a = 1`，即对变量进行了申明并赋值，但是最后输出仍然是 `undefined` 而不是 `1`，证明变量提升行为只会对变量进行申明操作，并不会对其初始化赋值，不管原语句是否有赋值操作；

然后便能解释之前的代码：
```js
fn();

var fn = function() {
    console.log('run');
}
// TypeError: fn is not a function
```

这种情况便是将变量 `fn` 提升，值为 `undefined`，所以执行 `fn()` 语句会提示 `fn is not a function` 而不是 `fn is not defined`，与使用关键字 `function` 申明函数情况不一样；

# 拓展

## return 的限制

另外值得一提的是，我们都知道 `return` 是函数内代码执行结束的标志，其后代码不会执行，但是提升行为却不受此限制，例如：
```js
function fn() {
    console.log(a);
    fnn();
    return ;

    var a = 1;
    function fnn() {
        console.log('exist.')
    }
}

fn();
// undefined
// exist.
```

## 提升优先级

上面提到两种提升行为，那么它们的优先级顺序是如何的呢？还是通过代码说明：
```js
function fn1() {
    console.log(a);
    var a = 1;
    function a(){};
}
function fn2() {
    console.log(a);
    function a(){};
    var a = 1;
}

fn1(); // f a() {}
fn2(); // f a() {}
```

结果证明函数的提升优先级始终高于普通变量的提升；

## 提升的执行

再来看一种情况：
```js
function fn() {
    fnn();

    var a = 1;
    function fnn() {
        console.log(a);
    }
}

fn(); // undefined
```

这里按照正常的逻辑，申明函数 `fnn()` 之前就已经申明了变量 `a`，所以会感觉函数 fnn 应该可以访问变量 a，但是最后输出的并不是 `1`，输出 `undefined` 说明函数 fnn 并没有访问到赋值后的 a，并且所访问的 a 也触发了提升机制，因为输出的不是 `RefferenceError`，那么就能大致梳理出提升真
正的执行顺序了：

1. 执行 fn();
2. 执行 fnn();
   1. 发现前面没有关于函数 fnn() 的申明，于是向后寻找，最后找到了；
   2. 执行 console.log(a);
   3. 发现 fnn 内部没有 a 的定义，向外一层寻找；
3. a 申明在 fnn() 执行语句以后，所以 a 触发提升，供之前的 console.log 使用；
   
因此上面的代码相当于是以下面的顺序执行的：
```js
function fn() {
    console.log(a);
    var a = 1;
}

fn();
```

# var, let, const的区别

JavaScript 中申明变量的方式以及对应效果如下：
```js
a = 0;       // 全局变量
var b = 1;   // 局部作用域变量（当前上下文）
let c = 2;   // 块级作用域变量（当前块级上下文）
const d = 3; // 常量
```

## 作用域

这里解释一下，变量 a 申明时没有带任何关键字，默认其为全局变量；变量 b 申明带有关键字 `var`，为当前上下文的局部作用域，如果用在全局则为全局变量；变量 c 使用关键字关键字 `let`，d 使用关键字 `const`，二者都是**ES6**中新增的**块级**作用域申明，只不过 `const` 申明的是常量，值不可更改；

通过例子看一下它们的区别；
```js
var a = '全局';
function fn() {
    var aa = '局部'
    console.log(aa);
}
if (true) {
    var b = '全局';
    let bb = '块级';
    const bbb = '块级';
}
for (i = 0; i < 1; i++) {
    var c = '全局'
    let cc = '块级';
    const ccc = '块级';
}

console.log(a);  // “全局”
fn();  // “局部”
console.log(aa); // aa is not defined
console.log(b, c); // “全局” “全局”
console.log(bb, cc); // bb is not defined  cc is not defined
console.log(bbb, ccc); // bbb is not defined  ccc is not defined
```

可以看出，var 的**局部**限于全局或者函数内部上下文，而 let 和 const 的**块级**的意思则是被 **块(block)** 所包含的上下文，也就是包含在花括号 `{}` 内部的作用域中，所以也包括函数在内，加上 if, for, while, switch 等情况，且不能被外部作用域访问；

## 全局变量提升

首先看申明全局变量时的提升行为：
```js
console.log(a);
a = 0;
// ReferenceError: a is not defined
```

证明不带关键字的申明全局变量，似乎并没有执行变量的提升行为，与以下代码的执行无异：
```js
console.log(a); // a 前面未申明
// ReferenceError: a is not defined
```

## 局部变量提升

使用关键字 `var` 申明的情况：
```js
function fn() {
    console.log(aa);
    var aa = 1;
}
console.log(a);
var a = 1;
// undefined
fn();
// undefined
```

前面已解释，不再赘述，只是需要注意下面这种情况：
```js
if (false) {
    var a = 1;
}
console.log(a);
// undefined
```

正常思维可能会理解 if 条件判断为假所以不会执行内部语句，最后会输出 `a is not defined`，然而并非如此，仍然将申明的变量执行了提升机制；这里可以简单理解为**存在即提升**，也就是为了避免以上问题的影响，所以出现了块级变量申明 `let` 与 `const`；

## 块级变量提升

使用 `let` 与 `const` 的情况：
```js
if (true) {
    console.log(a);
    let a = 1;
    console.log(aa);
}
// ReferenceError: Cannot access 'a' before initialization
// ReferenceError: aa is not defined

if (true) {
    console.log(b);
    const b = 1;
    console.log(bb);
}
// ReferenceError: Cannot access 'b' before initialization
// ReferenceError: bb is not defined
```

可以看出，块级变量申明似乎也执行了类似提升的机制，但是处理却与 `var` 有区别，这里是直接以错误的形式处理输出，提示该变量未进行初始化，而没有变量的申明语句的情况，则是提示未定义的错误，且 `let` 与 `const` 的处理情况一致；