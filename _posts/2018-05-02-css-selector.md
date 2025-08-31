---
title:  CSS 选择器详细介绍
layout: post
categories: CSS
tags: css选择器 内联嵌入外部式 ID类选择器区别 伪元素
excerpt: css选择器详细介绍与举例
---
--------------------
文章出自个人博客<https://knightyun.github.io/2018/05/02/css-selector>，转载请申明

------------------
# 目录 <span id="home">
* [基础](#1)
* [选择器](#2)
	* [元素选择器](#2.1)
	* [类选择器](#2.2)
	* [ID选择器](#2.3)
		* [ID选择器与类选择器的区别](#2.3.1)
	* [子选择器](#2.4)
	* [后代选择器](#2.5)
	* [通用选择器](#2.6)
	* [属性选择器](#2.7)
		* [简单属性选择器](#2.7.1)
		* [属性和值选择器](#2.7.2)
	* [伪元素选择器](#2.8)
		* [:active](#2.8.1)
		* [:hover](#2.8.2)
		* [:focus](#2.8.3)
		* [::selection](#2.8.4)
		* [:first-child](#2.8.5)
		* [:nth-child()](#2.8.6)
	* [组选择器](#2.9)
	* [相邻同级选择器](#2.10)

----------------------------
# 基础 <span id="1">
CSS（层叠样式表Cascading Style Sheets）,用于修饰HTML网页内容，根据使用位置不同可分为三种样式：**内联式，嵌入式，外部式。**

* **内联式：**标签 `<>`内部使用，例如：

>`<p style = "color: red; font-size: 20px"></p>`。

* **嵌入式：**写在 `<style></style>` 之中，并放在 `<head></head>` 内，例如：

``` html
<head>
<!--这里放其它标签，例如 meta，link，script之类-->
<style>
p {
	color: red;
	font-size: 20px;
}
</style>
</head>
```

* **外部式：**写在外部 `.css` 文件中，使用如下方式引用：

>`<link rel = "stylesheet" type="text/css" href="css/index.css">`
> `href` 写 `.css` 文件路径，可以是绝对路径或相对路径，相对路径类似于：`../../css/index.css`，绝对路径类似于：`/css/index.css`。

# 选择器（Selector）<span id="2">

三种样式中，**嵌入式**和**外部式**需要使用到**选择器**，也是组成 css 样式的主体例如上例中的 `p { }`，主要分为：
元素选择器、类选择器、ID选择器、子选择器、后代选择器、通用选择器、属性选择器、伪元素选择器、组选择器、相邻同级选择器。

## 元素选择器（Type selector）<span id="2.1">
也叫类型选择器，可以理解为**标签选择器**，最基本的选择器，就是使用常见的HTML元素，例如：`body { }`, `h { }`, `p { }`, `div { }`, `span { }`, `a { }` 等。

## 类选择器（Class selector）<span id="2.2">
**前提**需要在标签内使用**类**标记某处文档，类似：`class = "myClass"`，然后它的选择器的格式就为：`.myClass { }`，就是在类名前面加个小数点。

## ID选择器（ID selecctor）<span id="2.3">
和类选择器类似，**前提**需要在标签内使用**ID**标记某处文档，类似：`id = "myId"`，格式为：`#myId { }`，就是在 ID 前加个符号 `#`。

>**ID选择器与类选择器的区别：** <span id="2.3.1">
>类选择器可以使用多次，ID选择器只能使用一次，例如：
>`<p class = "one">This is a test content, </p>`
>`<p class = "one">hello world !</p>`，但是ID不能这样。
>并且能同时使用多个类分别标记不同样式，例如：`<p class = "one two"></p>`，ID也不能这样。

## 子选择器（Child selector） <span id="2.4">
用于指定标签元素的**子元素**，使用符号 `>` 隔开父元素与子元素，例如：
HTML：

	<p1>
	Hello World !!!
	<p2>This is a test content</p2>
	</p1>

CSS:

	p1>p2 {
	color: green;
	font-size: 20px;
	}

这里就指定了父元素 `p1` 的子元素 `p2` 的样式，但是**只作用于子元素，不作用于父元素**。

## 后代选择器（Descendant selector） <span id="2.5">
用于指定标签元素的**后代元素**，使用空格符号隔开，例如：
html:

	<p1>
	Hello world !!!
	<p2>
	This is a <a>test</a> content
	</p2>
	</p1>

css:

	p1 a {
	color: green;
	font-size: 20px;
	}

这里指定了元素 `p1` 的后代元素 `a` 的样式，注意这里不是**子代元素** `p2`，就是作用于**所有指明的后代元素**。

>**子代选择器与后代选择器的区别：** <span id="2.5.1">
>顾名思义的理解，后代就是包含子代在内的所有下代的元素，可以跨越子代直接作用于孙代；而子代只包含父级的**第一代子代**元素。
>子代选择器使用符号 `>` 隔开，后代选择器使用`空格` 隔开。

## 通用选择器 <span id="2.6">
顾名思义，使用通配符 `*` 设置 html 中**所有标签**的样式，例如：

``` css
* {
color: red;
font-size: 20px;
}
```

这样就设置了HTML中所有的标签的样式了。

## 属性选择器（Attribute selector） <span id="2.7">
对**具有指定的属性**(attribute)设置样式，使用方括号符号 `[ ]`。

### 简单属性选择器 <span id="2.7.1">
不用管属性值，例如：

``` css
[href] {color: red}
a [href] {color: red}
a [href] [title] {color: red}
```

>以上格式都能实现相同效果，即具有该属性的 `a` 标签。

### 属性和值选择器 <span id="2.7.2">
具有指定属性与其**指定值**的标签，格式为：

	a [title = "link"] {color: red}

## 伪元素选择器 <span id="2.8">
HTML中存在一类与元素控制内容相同的**抽象元素**，但是并不实际存在于HTML文档，给标签的**某种状态**设置样式，例如单击某内容或鼠标滑过某内容，然后设置改变的样式。伪元素种类较多，只列举几个常用例子。

### :active <span id="2.8.1">
为**激活**的元素设置样式，就是用户单击该标签时的样式，例如：

	a:active {color: red}

则用户点击这个链接文本时颜色变为红色。

### :hover <span id="2.8.2">
悬停状态伪元素，为用户鼠标所**停靠**的标签设置样式，例如：

	p:hover {color: red}

则鼠标停留在该段落时，段落内容变为红色。

### :focus <span id="2.8.3">
用于具有**焦点**的元素，常用就是输入框，用户点击输入框准备输入时则该输入框就具有了焦点，例如：

	input:focus {background-color: green}
则点击输入框时背景颜色变为绿色。

### ::selection <span id="2.8.4">
为选中的元素设置样式，例如：

	::selection {color: red}

为文档中鼠标选定的内容设置为红色字体。注意可以追加应用范围：`p::selection` 表示段落中选中的字体才应用该样式，不追加直接使用 `::selection` 表示应用于所有内容。
**火狐浏览器**支持需要使用 `-moz-selection`。

### :first-child <span id="2.8.5">
为元素的第一子代应用样式，例如：

	p:first-child {color: red}

这个比较好理解。

###  :nth-child() <span id="2.8.6">
为元素的**父元素**的第 n 个子代设置样式，只是括号内需要输入数字表示第几代，例如：

	p:nth-child(2) {color: red}

假如p标签父元素是body，就表示为body的第二个子元素设置样式。

## 组选择器 <span id="2.9">
为多个元素设置相同样式时，可以使用**逗号**分隔元素，达到同时设置的效果。例如：

	p1,p1 {color: red}

表示为p1和p2 **同时**设置**相同**的样式。

## 相邻同级选择器 <span id="2.10">
选择与指定元素同级的相邻的第一个某元素，设置样式，例如：

	div+p {color: red}

表示为 p 设置样式，并且这个 p 与 div 同级，并且是与 div **相邻的第一个** p，div **内部**的 p 并不包含在内。

------------------------
# 返回[顶部](#home)