---
title:  JavaScript 逻辑运算符 “&&” 和 “||” 短路原则的应用
layout: post
categories: JavaScript
tags: javascript逻辑运算 短路原则
excerpt: JavaScript 中逻辑运算符的介绍，短路原则的介绍与应用
---
# 逻辑运算符

在Javascript中，有逻辑运算符 `与 &&`, `或 ||`, `非 !`，常在条件句或循环中进行逻辑判断。

例如：

``` js
var a = 1, b = 1, c = 2;
if (a = b && (b = c || a != c)) 
{
	alert("true");
} else 
{
	alert("false");
}
```

括号中表达式值为**真**，最后提示“true”。

# 短路原则

在逻辑运算中，这是一个通用的原则，这是由于表达式从左到右执行的特性，为了减少运算量而给运算器规定的操作。主要针对 `&&` 和 `||` 两种运算。

* `&&` 的判断是**同真为真，一假为假**，则运算如果左边的表达式值为 `false`，那么就不会再执行右边的表达式了，如果左表达式为 `true`，就会继续执行右表达式；

* `||` 的判断是**一真为真，同假为假**，则运算如果坐表达式值为 `true`，那么就不用执行右边的表达式了，如果左表达式为 `false`，就会继续执行右表达式；

举例说明：

``` js
(1 == 1) && alert("msg1");
(1 != 1) && alert("msg2");
(1 == 1) || alert("msg3");
(1 != 1) || alert("msg4");
```

结果是提示**“msg1”**和**“msg4”**。原理如上述。

因此，如果有以下表达式：

``` js 
var a = 9;
if (a > 0) 
{
	alert("true");
} else 
{
	alert("false");
}
```

也许你会使用**三目运算**简化成这样：

``` js
var a = 9;
(a > 0) ? alert("true") : alert("false");
```

其实也可以这样写：

``` js
var a = 9;
(a > 0) && alert("true");
(a > 0) || alert("false");
```

# Javascript中的应用

在javascript中，只有`对象(Object)`和布尔值`true`为真，其它例如 `undefined`, `NaN`, `false` 等，值为 `false`。为被定义的对象或未赋值变量也是 `false`，因为其值都是 `undefined`，这里就可以应用于检查某变量是否**已定义**。

举例说明：

``` js
var a = 1;
var o = new Object();
var b;
a && alert("defined");       //已定义a，提示“defined”
o && alert("defined");       //已定义对象o，提示“defined”
Object && alert("defined");  //Object是一个已知的全局对象，提示“defined”
b || alert("not defined");   //b未赋值，提示“not defined”
p || alert("not defined");   //未定义p，提示“not defined”
```

除了这个也能衍生出其它相同原理的应用，类似于判断赋值 `var  a = (b > 0) && '9'` 或判断定义变量 `var abc = abc || ""` 等。

js中使用这种方法可以减少代码量，提示性能，但同时也降低了代码**可读性**，比如个人觉得还是看以下代码比较舒适：

``` js
var a = 1;
if (a > 1)
{
	alert("true");
}
```

方法的选择就要视情况而权衡了。