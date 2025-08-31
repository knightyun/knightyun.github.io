---
title:  JavaScript 中语句与函数的执行辨析
layout: post
categories: JavaScript
tags: javascript函数 匿名函数 javascript语句
exccerpt: Javascript 中函数与匿名函数及语句的使用辨析
---
Javascript代码中，语句和函数以及匿名函数的执行存在一些区别，所以在编写过程中也存在一些“坑“。

# script 中的语句

html文档中的javascript语句是写在 `<script></script>` 中的，每条语句末尾需要添加分号 `;`，表示此条语句执行结束。例如下面的代码：

``` html
<script>
	var x = 9;
	alert(x);
</script>
```

文档加载到这块代码区域时，就会立刻**执行**这两条语句，即弹出提示框为x的值，但是如果把语句换成函数定义，代码如下：

``` html
<script>
	var x = 9;
	function fx()
	{
		alert(x);
	}
	fx();
</script>
```

这时第一行语句会被**执行**，第二至五行是**函数定义**，并不会执行这个函数，直到最后一行语句才会真正**执行**这个定义过的函数。

如果需要立刻执行函数的话，就需要使用**匿名函数**了。所谓匿名函数，顾名思义，即不会给这个执行的函数定义“函数名”，而且是一个立即执行的语句。格式如下：

``` html
<script>
	var x = 9;
	(function(){
		alert(x);
	})();
</script>
```

**注意**代码中的三个**括号**的位置，以及最后跟的那个**分号**，表示这是一个立即执行的语句。

当然匿名函数也能**传递参数**，例如：

``` html
<script>
	(function(var x){
		alert(x);
	})(9);
</script>
```

效果和上面一样。

但有时又需要不立即执行的函数，例如：

``` html
<script>
	setTimeout(function(){
		var x = 9;
		alert(x);
	}, 2000);
</script>
```

效果与下面代码一样：

``` html
<script>
	var x = 9;
	setTimeout("alert(x)", 2000);
</script>
```

这是Javascript中的延时函数，表示2秒后弹出提示。`setTimeout()` 自身就是一个**函数**，里面的 `“alert(x)”` 是这个函数的一个**参数**，即一个**加引号的语句**。便于理解，可以写成这样：

	setTimeout("alert();", 2000);

这样写并不会出错。

所以这个函数 `setTimeout()` 的参数是一个**不用立即执行**的匿名函数 `function(){}`，也可以是一个语句块，从而进行**参数传递**。

通俗讲，这里加引号的语句块相当于不加引号的匿名函数。

# 标签属性中的语句

在 html 标签中也能使用语句，通常用于设置元素的属性。

先对比区分以下代码：

```html
<script>
	function fx()
	{
		alert();
	}
</script>

<button onclick="alert()">Button1</button>

<button onclick="fx()">Button2</button>

<button onclick=fx()>Button3</button>

<button onclick=(function(){alert();})()>Button4</button>

<button onclick="(function(){alert();})()">Button5</button>

<button onclick=function(){alert();}>Button6</button>

<button onclick="function(){alert();}">Button7</button>
```

猜一下哪个按钮点击无效……

答案是最后的**“Button6”**和**"Button7"**，然后就能发现规律了，**属性**所设置的**值**必须是能**立即执行**的<u>语句块</u>、<u>函数</u>或<u>匿名函数</u>，最后那两种情况是行不通的。