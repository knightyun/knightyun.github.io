---
title:  CSS 样式之内容居中方法
layout: post
categories: CSS
tags: css水平居中 css垂直居中
excerpt: CSS 样式设置使 HTML 内容水平居中和垂直居中的方法
---
# 水平居中

HTML中要实现某一内容水平居中显示，要通过设置css样式来实现，主要分为**行内元素**和**块状元素**两种情况，**块状元素**又可分为**块状定宽**与**块状不定宽**两种情况，接下来依次介绍分析。

## 行内元素

像 a、span、i 这类元素叫做行内元素，**文本**和**图片**也是行内元素。行内元素水平居中方法简单，只需要给行内元素的**父元素**设置 `text-align: center;` css样式就内实现内容水平居中，例如：
html:

``` html
<div class = "txt">居中内容</div>
```

css:

``` css
.txt {
	text-align: center;
}
```

文本内容的**父元素**就是 `div` ，这样就内实现水平居中，效果如下：

<div align="center"><b>居中内容</b></div>

## 块状定宽元素

常见块状元素有 div, p, h 等，定宽即为其设置固定宽度值 `width`，这时我们可以为元素设置 `margin-left` 和 `margin-right` 来实现水平居中，也可以简写为 `margin: 0 auto;`，例如：
html:

``` html
<div class = "txt">居中内容</div>
```

css:

``` css
.txt {
	width: 100px;
	margin: 10px auto;
}
```

实现效果如下：

<div align="center"><b>居中内容</b></div>

## 块状不定宽

有时候我们不能限制块状元素的宽度，就是块状不定宽元素，主要有三种方法，接下来一次介绍。

##### 1、加入 table 标签

利用 table 标签的**长度自适应性**，长度根据内容自动调整，然后通过设置 `margin: auto;` 实现水平居中，例如：
html:

``` html
<table>
	<tbody>
		<tr>
			<td>
			<div class = "txt">居中内容</div>
			</td>
		</tr>
	</tbody>
</table>
```

css:

``` css
.txt {
	margin: auto;
}
```

效果如下：

<div align="center"><b>居中内容</b></div>

##### 2、设置为行内元素

就是通过设置 `display: inline;` 将块状元素设置为**行内元素**，然后就是像行内元素一样设置 `text-align: center;` 来是内容水平居中，例如：
html:

``` html
<div class = "txt">居中内容</div>
```

css:

``` css
.txt {
	display: inline;
	text-align: center;
}
```

效果为：

<div align="center"><b>居中内容</b></div>

**注：**

>**使用这种方法虽然可以不用像table增加无语义标签，但是改变了display，所以会少了一些功能，例如不能设置宽度。**

##### 3、设置浮动和相对定位

这种方法设置就相对复杂，同时设置**浮动**和**相对定位**来实现元素的水平居中。
首先设置**父元素**：

``` css
float: left; 
position: relative; 
left: 50%;
```

然后设置**子元素**：

``` css
position: relative;
left: -50%;
```

通过代码应该好理解，就是通过**50%**那个关键位置来实现水平居中效果，因为**50%**是界面的中央位置，将父元素右移，直到左边框移到中线位置，在将子元素向左移，这样子元素不就居中了吗。

这里要**注意**的是分别设置**父元素**的 `50%` 和**子元素**的 `-50%`。
实现效果如下：

<div align="center"><b>居中内容</b></div>

# 垂直居中

说完水平居中接着说垂直居中，这里主要又分为两种情况：**父元素高度确定的单行文本** 和**父元素高度确定的多行文本**。

## 单行文本

对于**父元素**高度确定的单行文本，可以通过设置**父元素**的 `height` 和 `line-height` 高度一致来实现。

这里可以这样理解，`height` 是元素的高度，例如文本字体的高度，`line-height` 是行高，例如文本的行间距，一行文本中，行间距被**分为两部分**，分别位于这行文本的**顶部**和**底部**（因为行间距是两行之间的距离），所以设置 `height` 和 `line-height` **一样大**的话，`line-height` 就被均分为两部分，分别位于元素顶部和底部，这样中间设置为 `height` 的元素不就实现**垂直居中**了吗 ^_^ .

例如：
html:

``` html
<div class = "txt">居中内容</div>
```

css:

``` css 
.txt {
	height: 200px;
	line-height: 200px;
}
```

效果如下：

<pre>



居中内容



</pre>

>**这里需要注意的是关键词“单行文本”，如果使用这种方法但是一行文本超过宽度限制的话，某些内容就会脱离元素块，子元素有多行的话，这几行就会并排居中，并保持设置的行高。**

## 多行文本

对于父元素高度确定的**文本**和**图片**等内容设置垂直居中，主要有两种方法。

##### 1、使用 table 标签

对元素使用**table**标签，包括 tbody，tr，td，然后对父元素设置 `vertical-align: middle;` 样式，就能使 `inline-block` 类型的子元素垂直居中显示。

因为 td 标签**默认**设置了 `vertical-align: middle`，所以也可以不用单独设置 `vertical-align`。
例如：
html:

``` html
<table>
	<tbody>
		<tr>
			<td class="txt">
				<p>居中内容</p>
				<p>居中内容</p>
				<p>居中内容</p>
			</td>
		</tr>
	</tbody>
</table>
```

css:

``` css
.txt {
        height: 300px;
	background-color: #ccc;
}
```

>**这里的父元素就是 td，父元素的高度必须确定，就要为其设置 height。**

**注意**这里的 p 元素是 **inline** 类型的，所以设置 `vertical-align: middle` 的话会出现错误，若果是图片元素 img 的话，就可以设置 `vertical-align: middle`，但是由于 td 标签默认，所以都可以不写。

效果如下：

<pre>



居中内容



</pre>

##### 2、设置 table-cell

第二种方法是把要垂直居中显示的元素的父元素设置为**table-cell (表格单元)**类型：`display: table-cell;`，然后设置 `vertical-align: middle`就能实现元素垂直居中。

但是这个方法存在兼容性问题，**chrome, firefox, IE8以上**才支持这个操作。

例如：
html:

``` html
<div class="txt">
	<p>居中内容</p>
	<p>居中内容</p>
	<p>居中内容</p>
</div>
```

css:

``` css
.txt {
        height: 300px;
	background-color: #ccc;
	display: table-cell;
	vertical-align: middle;
}
```

>**同样，要为父元素 div 设置高度 height**

效果如下：

<pre>



居中内容



</pre>

这种方法除了兼容性问题外，同时也改变了 **display**类型，会在某些方面带来不便。