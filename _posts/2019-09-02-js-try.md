---
title: JavaScript 中 try, catch, throw 的用法
layout: post
categories: JavaScript
tags: try catch 错误
excerpt: JavaScript 中关于错误的调试方法
---
程序在运行中难免遇到 bug，所以就需要好的调试手段找出问题所在，`try, catch, throw` 便是 JavaScript 中用来调试并对错误执行相关操作的工具，下面具体介绍其用法；

# try, catch

基本语法结构：
```js
try {
    // ...
    // 这里写需要调试的代码段
} catch(error) {
    // ...
    // 这里写要对获取的错误信息执行的操作
}
```

举例：
```js
try {
    // 这里故意写错函数名，为了抛出错误
    console.logg('This is an error and will not display');
} catch (e) {
    console.log(e);         // TypeError: console.logg is not a function
    console.log(e.message); // console.logg is not a function
    console.log(e.name);    // TypeError
    console.log(e.stack);   // TypeError: console.logg is not a function
}
```

上面的错误代码如果直接在正常环境中执行，便会直接在后台输出错误：
```
TypeError: console.loggg is not a function
```

但是使用 `try, catch` 结构的话，就可以获取一个包含错误信息的对象，其包含各个部分的错误信息，便于进行一些自定义操作；

# throw

`throw` 是在上述结构中使用的一个函数，接受一个参数作为输出信息，throw 的作用是中断后面**所有**语句的执行，包括错误源，但是它前面的语句都会正常执行，它可以用于判断错误的具体位置，例如：
```js
try {
    console.log('This will display.');
    throw('My error position.'); // throw 将会中断语句的执行
    // 同样故意制造错误
    console.logg('This is an error and will not display.');
    // 后面是正常语句
    console.log('This will not display, either.')
} catch (e) {
    console.log(e);
}
// This will display.
// My error position.
```

如果错误发生在 `throw` 语句之前的话，错误便会被正常抛出，而 `throw` 传递的信息不会被输出，例如：
```js
try {
    console.logg('This is an error and wil not display.');
    throw('My error position.');
    // 后面的执行同样会被中断
    console.log('This will not display, either.')
} catch(e) {
    console.log(e); 
}
// TypeError: console.logg is not a function.
```

因此，在调试过程中可以结合上面两种情况，一步步找出错误的具体位置；