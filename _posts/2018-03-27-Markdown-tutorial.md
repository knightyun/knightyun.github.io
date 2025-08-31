---
title:  Markdown 简明教程
layout: post
categories: 编程
tags: markdown
excerpt: 简要 markdown 语法
---

## Markdown 及扩展

> Markdown 是一种轻量级标记语言，它允许人们使用易读易写的纯文本格式编写文档，然后转换成格式丰富的HTML页面。    —— <a href="https://zh.wikipedia.org/wiki/Markdown" target="_blank"> [ 维基百科 ]

使用简单的符号标识不同的标题，将某些文字标记为**粗体**或者*斜体*，创建一个[链接](http://www.csdn.net)等，详细语法参考帮助？。

本编辑器支持 **Markdown Extra** , 　扩展了很多好用的功能。具体请参考[Github][2].  

### 表格

**Markdown　Extra**　表格语法：

项目     | 价格
---------|------
Computer | $1600
Phone    | $12
Pipe     | $1

写法：
```markdown
项目     | 价格
---------|------
Computer | $1600
Phone    | $12
Pipe     | $1
```

可以使用冒号来定义对齐方式：

| 项目      |   价格  |  数量 |
|:--------- |--------:|:----:|
| Computer  | 1600 元 |  5   |
| Phone     |   12 元 |  12  |
| Pipe      |    1 元 | 234  |

写法：
```markdown
| 项目      |   价格  |  数量 |
|:--------- |--------:|:----:|
| Computer  | 1600 元 |  5   |
| Phone     |   12 元 |  12  |
| Pipe      |    1 元 | 234  |
```

### 插入图片
 > 格式一：
 
``` markdown
 ![picture-name](http://xxx.com/xxx.png)
```

> 格式二：(方便设置图片尺寸)

``` html
<img src="http://xxx.com/xxx.png" alt="download-failed" width="XXXpx"  height="XXXpx">
```

### 定义列表

**Markdown Extra** 定义列表语法：
- 项目１
- 项目２
  - 定义 A
    - 定义 a
  - 定义 B

项目３
:   定义 C

:   定义 D

	> 定义 E

写法：
```markdown
- 项目１
- 项目２
  - 定义 A
    - 定义 a
  - 定义 B

项目３
:   定义 C

:   定义 D

	> 定义 E
```

### 代码块
代码块语法遵循标准markdown代码，例如：
> python:

```python
@requires_authorization
def somefunc(param1='', param2=0):
    '''A docstring'''
    if param1 > param2: # interesting
        print 'Greater'
    return (param2 - param1 + 1) or None
class SomeClass:
    pass
>>> message = '''interpreter
... prompt'''
```

> c语言:

```c
#include <stdio.h>
int main()
{
	printf("Hello world!");
}
```

### 脚注

生成一个脚注[^footnote].
  [^footnote]: 这里是 **脚注** 的 *内容*.

写法：
```markdown
生成一个脚注[^footnote].
  [^footnote]: 这里是 **脚注** 的 *内容*.
```

### 数学公式

使用 MathJax 渲染 *LaTex* 数学公式，详见 [math.stackexchange.com][1].

#### 行内公式

数学公式为：$ \Gamma(n) = (n-1)!\quad\forall n\in\mathbb N $。

写法：
```markdown
数学公式为：$ \Gamma(n) = (n-1)!\quad\forall n\in\mathbb N $。
```

#### 块级公式：

$$ x = \dfrac{-b \pm \sqrt{b^2 - 4ac}}{2a} $$

写法：
```markdown
$$ x = \dfrac{-b \pm \sqrt{b^2 - 4ac}}{2a} $$
```

更多LaTex语法请参考 [这里][3].

## 浏览器兼容

 1. 目前，本编辑器对 **Chrome** 浏览器支持最为完整。建议大家使用较新版本的 Chrome。
 3. **IE9** 以下不支持
 4. **IE9，10，11** 存在以下问题
    1. 不支持离线功能
    1. IE9 不支持文件导入导出
    1. IE10 不支持拖拽文件导入

## 常用 Markdown 编辑器推荐

1. **Markdownpad**： 详情请点击 [官网](http://markdownpad.com/)。
（貌似专业版需要收取一定dollars$，需要序列号自行baidu。）
2. **Markpad**：详情前往 [官网](http://markpad.fluid.impa.br/)。
（推荐使用，Microsoft Store也有，完全免费，支持及时效果浏览。）
3. **CSDN博客编辑器**：CSDN网站内置编辑器。（这篇文件就是这样写出来的-_-)

4. **Harropad**: [官网](http://pad.haroopress.com/user.html)

5. **Retext**: 简单强大的文本编辑器，可控制输出格式：pdf, html等，仅支持Linux（推荐）.[下载](https://github.com/retext-project/retext)

[1]: http://math.stackexchange.com/
[2]: https://github.com/jmcmanus/pagedown-extra "Pagedown Extra"
[3]: http://meta.math.stackexchange.com/questions/5020/mathjax-basic-tutorial-and-quick-reference
[4]: http://bramp.github.io/js-sequence-diagrams/
[5]: http://adrai.github.io/flowchart.js/
[6]: https://github.com/benweet/stackedit