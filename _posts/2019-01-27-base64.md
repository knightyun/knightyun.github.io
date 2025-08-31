---
title:  Base64 码简介
layout: post
categories: 编程
tags: base64
excerpt: Base64 码的介绍与使用
---
# 简介

base64是一个保存二进制数据的工具，将多种形式的二进制数据或其构成的文件以ASCII的形式保存，因为很多地方不支持直接的二进制文件保存或呈现，比如可以将图片直接转换成base64码嵌入HTML文档中，而避免使用网络http加载图片。另外，将数据编码为 base64 进行传输，然后解码获得数据，可以一定程度上保证数据的完整并且不用在传输过程中修改这些数据，避免在传输过程中可能出现的问题；

# 组成

`A-Z a-z 0-9 + /` 共64个字符(不信自己数一下);

# 格式

假设一个 .png 图片转换得到的base64码为 `abcdefg`，标准格式为：
```
data:image/png;base64,abcdefg
```

在浏览器地址栏输入以上字符串回车就能看见图片了，一般浏览器都支持解析base64码(里面的base64码换成自己的)；

或者用在html的 `img` 标签中：
```html
<img alt="" src="data:image/png;base64,abcdefg" />
```

再或者用在markdown格式文本中：
```markdown
![base64](data:image/png;base64,abcdefg)
```

可以把 `data:` 看成像 `http:` 一样的一种协议，下面是其他格式，根据格式应该就能猜到其用途：
```
data:,文本数据
data:text/plain,文本数据
data:text/html,HTML代码
data:text/html;base64,base64编码的HTML代码
data:text/css,CSS代码
data:text/css;base64,base64编码的CSS代码
data:text/javascript,Javascript代码
data:text/javascript;base64,base64编码的Javascript代码
data:image/gif;base64,base64编码的gif图片数据
data:image/png;base64,base64编码的png图片数据
data:image/jpeg;base64,base64编码的jpeg图片数据
data:image/x-icon;base64,base64编码的icon图片数据
```

例如下面的星星图标：

 ![base64_img][star]
 
 其实它的base64码是这样的：
 
 ```
 iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAQAAAD8x0bcAA
 AA2UlEQVR4AZWSAQZCQRCGv05QgXpQqCggukAgQeSpEwRE
 oO4Qqg5RoYA6T6GqIIACvKqMMdZK9C1r5t+dmbE7/E+SKj
 26nz3BV9IseTlrSQqPHGc9jIjUOlPAIeBiGdZszD4SYCyc
 MjXqjjdHifM0cUuMGAfzn8QRQnGGdAgpAlAipMNQgtsIfY
 nZkcUly070PsJAU18pg1LmquoAoWUdjEAZm9byG28AFSpA
 028cZioFTHkQMSGjysx/zBsnK3Li/tkvpHDI2wVb7MnjEb
 D6+cFGQkalZ6PyD2/u1Ikpara+FgAAAABJRU5ErkJggg==
 ```
 
  为了显示方便所以进行了换行，理论上是很长的**一行**连续文本，中间不能有空格或者换行，这个图片仅有274字节(Byte)大，所以base64码还算短，几十上百K的图片就很长了，**100K**图片就有**13万**多个字符；

# 转换原理

base64 码的基本转换步骤如下：
1. 如果是图片直接转换成二进制文件，字符先转换成ASCII字符码，再转换成二进制；（网上直接搜“base64转换工具”就会出来很多在线转换网站，上传图片或者输入文本，一键转换）

2. 将 base64 的64个字符按上面**组成**部分里讲到的顺序排列得到64个索引，索引从**0**开始，**63**结束；

3. 因为 64 = 2^6，所以要使二进制包含64种不同情况，需要取6比特位，即`000000`这种，把之前文件转换得到的二进制数据按每**6比特位**取一次，然后得到一个6位二进制数再转换成相应十进制数，这个数就是索引，然后按照索引取相应的64字符中的某一个，最后把所有取得的字符连接就是base64码；

4. 编码需要原文本总字节数(字符数)能**被3整除**(字节数除以3无余数)，因此取到最后的字符时如果凑不够，缺位全部用 `0` 补齐，最后的只要是**全为0的6比特位**，全部转换成字符 **`=`**，所以最多会出现**2个 =**；

以字符串 `Hello ` 举例，后面类推，先将每个字符转换成ASCII码，再转换成二进制：
<style>
table th, table td {
    border: 1px solid black;
    text-align: center;
}
</style>
|    字符  |    H  |   e     |    l   |     l  |      o |   空格  |
|:--------:|:-----:|:-------:|:------:|:------:|:------:|:------:|
|**ASCII** |  72   |   101   |  108   |  108   |   111  |   32   |
|**二进制**|01001000|01100101|01101100|01101100|01101111|01000000|


再以字符串 `Hel` 为例，将二进制转化成base64码：
<style>
table th, table td {
    border: 1px solid;
    text-align: center;
}
</style>
<table style="text-align: center">
    <tr>
        <th>字符</th>
        <th colspan="8">H</th>
        <th colspan="8">e</th>
        <th colspan="8">l</th>
    </tr>
    <tr>
        <th>二进制</th>
        <td>0</td><td>1</td><td>0</td><td>0</td>
        <td>1</td><td>0</td><td>0</td><td>0</td>
		<td>0</td><td>1</td><td>1</td><td>0</td>
		<td>0</td><td>1</td><td>0</td><td>1</td>
		<td>0</td><td>1</td><td>1</td><td>0</td>
		<td>1</td><td>1</td><td>0</td><td>0</td>
    </tr>
    <tr>
        <th>Base64补0</th>
        <td>0</td><td>1</td><td>0</td><td>0</td>
        <td>1</td><td>0</td><td>0</td><td>0</td>
		<td>0</td><td>1</td><td>1</td><td>0</td>
		<td>0</td><td>1</td><td>0</td><td>1</td>
		<td>0</td><td>1</td><td>1</td><td>0</td>
		<td>1</td><td>1</td><td>0</td><td>0</td>
    </tr>
    <tr>
        <th>Base64结果</th>
        <td colspan="6">S</td>
        <td colspan="6">G</td>
        <td colspan="6">V</td>
        <td colspan="6">s</td>
    </tr>
</table>

上面是不用补码的情况，即字符总数是3的倍数；下面是最后剩两个字符需要补码的情况：
<table style="text-align: center">
    <tr>
        <th>字符</th>
        <th colspan="8">H</th>
        <th colspan="8">e</th>
        <th colspan="8"></th>
    </tr>
    <tr>
        <th>二进制</th>
        <td>0</td><td>1</td><td>0</td><td>0</td>
        <td>1</td><td>0</td><td>0</td><td>0</td>
		<td>0</td><td>1</td><td>1</td><td>0</td>
		<td>0</td><td>1</td><td>0</td><td>1</td>
		<td> </td><td> </td><td> </td><td> </td>
		<td> </td><td> </td><td> </td><td> </td>
    </tr>
    <tr>
        <th>Base64补0</th>
        <td>0</td><td>1</td><td>0</td><td>0</td>
        <td>1</td><td>0</td><td>0</td><td>0</td>
		<td>0</td><td>1</td><td>1</td><td>0</td>
		<td>0</td><td>1</td><td>0</td><td>1</td>
		<th>0</th><th>0</th><th>0</th><th>0</th>
		<th>0</th><th>0</th><th>0</th><th>0</th>
    </tr>
    <tr>
        <th>Base64结果</th>
        <td colspan="6">S</td>
        <td colspan="6">G</td>
        <td colspan="6">T</td>
        <th colspan="6">=</th>
    </tr>
</table>

然后是最后只剩一个字符的例子：
<table style="text-align: center">
    <tr>
        <th>字符</th>
        <th colspan="8">H</th>
        <th colspan="8"> </th>
        <th colspan="8"> </th>
    </tr>
    <tr>
        <th>二进制</th>
        <td>0</td><td>1</td><td>0</td><td>0</td>
        <td>1</td><td>0</td><td>0</td><td>0</td>
		<td> </td><td> </td><td> </td><td> </td>
		<td> </td><td> </td><td> </td><td> </td>
		<td> </td><td> </td><td> </td><td> </td>
		<td> </td><td> </td><td> </td><td> </td>
    </tr>
    <tr>
        <th>Base64补0</th>
        <td>0</td><td>1</td><td>0</td><td>0</td>
        <td>0</td><td>0</td><td>0</td><td>0</td>
		<th>0</th><th>0</th><th>0</th><th>0</th>
		<th>0</th><th>0</th><th>0</th><th>0</th>
		<th>0</th><th>0</th><th>0</th><th>0</th>
		<th>0</th><th>0</th><th>0</th><th>0</th>
    </tr>
    <tr>
        <th>Base64结果</th>
        <td colspan="6">S</td>
        <th colspan="6">A</th>
        <th colspan="6">=</th>
        <th colspan="6">=</th>
    </tr>
</table>

**值得注意**的是 base64 码 `A` 的二进制也是 `000000`，上面例子中 `A` 的二进制码是部分补全后全为0，只有6个0全是补全的时候才都转换为字符 `=`；

对于图片文件，原理一样，因为图片文件也是一堆二进制数组成，只不过需要用特殊的编辑器查看，然后以同样的道理即可转换为 base64 码，这里就不赘述了；

# JavaScript实现转换

在 JavaScript 中，正好有这么两个函数可以实现对 base64 码的编码与解码，它们分别是 `atob()` 和 `btoa()`，可能光从名字上看会觉得它们的名字取有些随意，像 **"a to b"** 和 **"b to a"**，不要误会，其实这是缩写，全称应该是 **"ascii to binary"**（即进行 base64 解码） 和 **"binary to ascii"**（即进行 base64 编码），其中 **ascii** 指代数据经 base64 编码后的字符，而 **binary** 指代未经编码的原始数据，其实这里全称的含义其实就是 base64 码的功能所在，下面分别举例说明。

## btoa()

该函数实现的是将数据编码为 base64 码，使用方法：
```js
var a = btoa('Hello');
console.log(a); // "SGVsbG8="
```

会发现这里的输出结果与上面的转换原理部分所得到的结果一致；

## atob()

该函数实现的是将经过 base64 编码后的字符解码为原始数据，使用方法：
```js
var a = btoa('Hello'); // 先将数据编码
var b = atob(a); // 将编码后的字符解码
console.log(b); // "Hello"
```

另外，如果尝试对非正常编码的字符执行解码操作的话，则会报错：
```js
var b = atob('Hello');
console.log(b);
// Uncaught DOMException: Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.
```

[star]:data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAQAAAD8x0bcAAAA2UlEQVR4AZWSAQZCQRCGv05QgXpQqCggukAgQeSpEwREoO4Qqg5RoYA6T6GqIIACvKqMMdZK9C1r5t+dmbE7/E+SKj26nz3BV9IseTlrSQqPHGc9jIjUOlPAIeBiGdZszD4SYCycMjXqjjdHifM0cUuMGAfzn8QRQnGGdAgpAlAipMNQgtsIfYnZkcUly070PsJAU18pg1LmquoAoWUdjEAZm9byG28AFSpA028cZioFTHkQMSGjysx/zBsnK3Li/tkvpHDI2wVb7MnjEbD6+cFGQkalZ6PyD2/u1Ikpara+FgAAAABJRU5ErkJggg==
