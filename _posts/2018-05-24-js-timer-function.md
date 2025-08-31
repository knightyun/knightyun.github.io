---
title:  JavaScript 计时器函数用法
layout: post
categories: JavaScript
excerpt: Javascript 计时函数的详细介绍
tags: Javascript计时器 setTimeout setInterval
---
Javascript中和大多数语言一样，存在计时函数，使某语句或函数不用立即执行，可以延时设定的时间值之后再执行。

# setTimeout()

这个函数表示括号中的代码，延时指定时间后再执行，格式为 `setTimeout("function()", time)`，其中 `time` 的单位是**毫秒**。

例如：

```javascript
function fx()
{
	alert();
}
setTimeout("fx()", 2000);
```

也可以写成：

``` js
setTimoeout(function(){
	alert();
}, 2000);
```

结果就是页面加载完 2 秒后弹出提示框。

# clearTimeout()

clearTimeout() 方法用于结束 setTimeout() 方法的执行，括号中**参数**为 setTimeout() 返回的 **ID 值**。

举例说明：

``` js
var int1 = setTimeout(function(){alert();}, 5000);
clearTimeout(int1);
```

这样就能**终止**代码执行，不会弹出提示框。

# setInterval()

这个函数表示**每隔**指定时间间隔执行一次括号中的代码，格式为：`setInterval("function()", time)`， `time` 单位依然为毫秒。

例如：

``` js
function fx()
{
	document.write("0");
}
setInterval("fx()", 2000);
```

这里就不要用 `alert()` 做实验了，后果你懂的 -_- .

同样也能写成：

``` js
setInterval(function(){
	document.write("0");
}, 1000);
```

效果就是不断输出字符“0”。

# clearInterval()

用法与 clearTimeout() 一样，终止 setInterval() 的执行，括号中填 setInterval() 的返回值。

例如：

``` js
var int2 = setInterval(function()[
	document.write("0");
}, 1000);
clearInterval(int2);
```

这样就能终止输出。

## 注意

有个小问题，用 setTimeout() 举例，假如代码像下面这样写：

``` js 
function fx()
{
	alert();
}
setTimeout(fx(), 3000);
```

相比上面，就是函数第一个参数少了双引号，猜一下后果会怎样……

后果当然是页面加载后立刻弹出提示框，并不会延时 3 秒。下面的写法也是类似的效果：

``` js
setTimeout((function(){
	alert();
})(), 3000);
```

原因都一样，无论是语句块 `fx()` 还是匿名函数 `(function(){})()`，都是会**立刻执行**的语句，而加双引号的 `"fx()"` 和 `function(){}` 就是当成一个**参数**传递给了函数 setTimeout()，然后这个**参数**语句直到 setTimeou() 真正执行时才生效，也就是延时3秒后执行。

函数 setInterval() 的这个性质与 setTimeout() **类似**。

# 拓展

## 回调函数参数

setTimeout 常见的便是使用两个参数，回调函数和时间，但是它还可以接受更多的参数，作为回调函数调用时传入的参数（可以有多个，按顺序填入即可）；

举个例子：
```js
setTimeout(function(a, b){
    console.log(a + b);
}, 3000, 1, 2);
// 3 秒后输出：
// 3
```

## 返回值

setTimeout, setInterval  的返回值都是一个数字，具体值取决于当前环境的分配，每次调用后这个数字会加一，`clearTimeout()`, `clearInterval()` 方法传入的参数便是这个数字，只不过平时都是以变量代替；
```js
let a = setTimeout(function(){}, 1000);
let b = setTimeout(function(){}, 1000);
let c = setTimeout(function(){}, 1000);

console.log(a, b, c);
// 1 （也可能是其他数字）
// 2
// 3
clearTimeout(a); // 相当于 clearTiemout(1);
clearTimeout(b); // clearTimeout(2)
clearTimeout(c); // clearTimeout(3)
```

## 时间精准度

setTimeout 会等到当前任务执行完，即使延迟时间已经到了，所以这也是常说 JavaScript 计时器不一定准确的原因所在，存在所用时间大于指定时间的情况；

```js
console.log('start');
setTimeout('console.log("time")', 2000);

// 该函数执行 5s 左右
function delay() {
    for (i = 0; i < 1000; i++) {
	    for (j = 0; j < 1000; j++) {
	 	    for (k = 0; k < 1000; k++) {
	 	  	    ;
	 	    }
	    }
    }
}
delay();
console.log('end1');
console.log('end2');
// start
// end1
// end2
// time
```

## setInterval 的执行间隔

该函数的作用是每隔一定时间执行一遍代码，但是代码的执行时间，被**包括**在间隔时间内，如果执行时间超过了间隔时间，那么下一次执行会立即执行；
```js
function delay() {
	let m = 3000;
	let t = new Date().getTime();
	while (new Date().getTime() - t <= m) {
	 	; // 使该函数 执行时间为 3s
	}
	console.log(new Date().getSeconds());
}

console.log(new Date().getSeconds());
setInterval(delay, 2000);
```

最后的输出结果将是输出间隔变为 3s，而不是设定的 2s，因为 `delay()` 函数的执行时间超过了 `setInterval()` 的间隔时间，即间隔时间过了也要等到函数执行完毕，然后下一遍执行就紧接着来，不再有间隔时间，所以就使得最后的结果显示为每隔 3s 输出，其实就是整个 `delay` 函数的执行时间，间隔时间可以理解为被**挤**得没有了；