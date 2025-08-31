---
title: addEventListener 方法与 on 事件的区别
layout: post
categories: JavaScript
tags: addeventlistener onclick 事件监听 冒泡捕获
excerpt: Javascript 中事件监听 addEventListener 与 on 事件的区别与举例分析
---
# on事件

Javascript中可以对一些页面的事件设定触发值，例如常用的点击 `onclick`，鼠标移动 `onmousemove`，或者移动端屏幕点击 `ontouchstart`，其它类似的还有 `onmousedown`, `onmouseup`, `onchange`, `onfocus`, `onmouseenter`, `ontouchmove`, `ontouchend` 等等，可以对其设定值来实现事件触发后执行的操作，例如：

``` html
<h1 onclick="alert('hello');">Click me</h1>
```

点击后就会弹出提示框，也可以这样写：

``` html
<h1 onclick=(function(){alert("hello");})()>Click me</h1>
```

这样也能实现同样效果，只是它的值变成了一个匿名函数。

# addEventListener()方法

这个方法设定一个事件监听器，当某一事件发生通过设定的参数执行操作。语法是：

`addEventListener(event, function, useCapture)`

* 参数 `event` 是必须的，表示监听的事件，例如 `click`, `touchstart` 等，就是之前**不加前缀** `on` 的事件。
* 参数 `function` 也是必须的，表示事件触发后调用的函数，可以是外部定义函数，也可以是匿名函数。
* 参数 `useCapture` 是选填的，填`true`或者`false`，用于描述事件是**冒泡**还是**捕获，`true`表示捕获，默认的`false`表示冒泡。

## 移除事件监听

如果要移除 addEventListener() 添加的事件监听，就要使用**removeEventListener()**，语法是：

`removeEventListener(event, function)`

参数与addEventListener()一致。

## 兼容性

**IE 8**及更早的版本，和**Opera 7.0**及更早的版本，不支持 addEventListener() 和 removeEventListener() 方法，他们使用的是一下方法代替：

添加事件：
`attachEvent(event, function)`

移除事件：
`detachEvent(event, function)`

可以用以下方法解决兼容性问题：

``` html
<div id="div1">Click me</div>
<script>
	var div1 = document.getElementById("div1");
	if (div1.addEventListener) {
		div1.addEventListener('click', function(){
			this.innerHTML = "your browser is compatible with addEventListener!";
		});
	} else if (div1.attachEvent) {
		div1.attachEvent('click', function(){
			this.innerHTML = "your browser is not compatible with addEventListener!"
		});
	}
</script>
```

## 冒泡与捕获

这个参数设置的是元素事件的**触发顺序**，即页面中某元素设置了事件监听，其内部元素也设置有事件监听，**冒泡**是先触发最内部元素的事件，再依次触发外一层元素的事件，**捕获**刚好相反，由外到内依次触发。

综合举例：

``` html
<div id="parent1">
	<div id="child1" style="height:200px;background:#0cc">
	冒泡
	</div>
</div>
<div id="parent2">
	<div id="child2" style="height:200px;background:#0cc">
	捕获
	</div>
</div>

<script>
	var parent1 = document.getElementById("parent1");
	var child2 = document.getElementById("child1");
	var parent2 = document.getElementById("parent2");
	var child2 = document.getElementById("child2");
	parent1.addEventListener('click', function(){
		alert("this is parent element");
	});
	child1.addEventListener('click', function(){
		alert("this is child element");
	});
	parent2.addEventListener('click', function(){
		alert("this is parent element");
	}, true);
	child2.addEventListener('click', function(){
		alert("this is child element");
	}, true);
</script>
```

点击“冒泡”模块，先提示子元素后提示父元素；点击“捕获”模块，由于同时设置为 `true`，先提示父元素后提示子元素。

# 区别

为某元素设定事件触发函数时，可能会觉得addEventListener和on事件的功能差不多，但是，addEventListener除了可以设置元素**触发顺序**外，还能**多次绑定事件**，因为 on 事件多次绑定的话会出现**覆盖**。

举例说明：

``` html
<div id="div1" style="height:200px;background:#0cc">
Click me
</div>

<script>
	var dib1 = document.getElementById("div1");
	div1.addEventListener('click', function(){
		alert("message1");
	});
	div1.addEventListener('click', function(){
		alert("message2");
	});
</script>
```

结果会依次提示“message1”，“message2“。

但是js这么写的话：

``` js
div1.onclick = function(){
	alert("message1");
};
div1.onclick = function(){
	alert("message2");
}
```

这里就只会提示最后一个“message2”，因为onclick作为对象div1的一个属性，第二次对其进行赋值就会**覆盖**之前的函数值，这样on事件在某些场合就不适用了。