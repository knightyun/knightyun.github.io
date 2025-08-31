---
title: JavaScript与二进制数据的恩怨情仇
layout: post
categories: JavaScript
tags: TypedArray Arraybuffer 缓冲区 类型数组 endian 字节序 视图 DataView blob file 上传 下载
excerpt: 展开介绍关于 JavaScript 和二进制数据的千丝万缕...
---
编程江湖，终日血雨腥风，论及二进制数据，又有多少豪杰谈笑风生，风生水起，水起船高，高深莫测......

不扯远了，想必谈到二进制数据，大家联想到的就会是 `1010110110001` 或者 `00000000 11111111 00000101` 这样的数据流；而这武林之中，号称三剑客之一的 **JavaScript**，在其行走江湖之际（日常开发），可能厮杀（处理）最多的类型就是直观的数字、字符串或者对象等；那么与极少露面的隐士（二进制）狭路相逢之时，它又将作何应对（描述与处理二进制数据）呢？是波澜壮阔，还是全身而退，抑或是力挽狂澜，且听本文中分解。

# ArrayBuffer

未曾识得英雄面，只缘身在此山中；先来了解第一个概念，`ArrayBuffer` 表示的是一个原始二进制数据缓冲区（buffer），长度固定，并且内容是只读的；如果需要执行写操作，那么需要使用 **类型化数组**（`TypedArray`）或者 **数据视图**（`DataView`） 来实现；

知己知彼，方可百战百胜；在 JavaScript 中与二进制数据接触最紧密的可能就是 `ArrayBuffer` 了，之前讲目的是要描述和操作二进制数据，那么就要把这些数据先存放到某个地方，然后才能对其进行操作，这里的 ArrayBuffer 缓冲区就可以被看成这么一种地方；当然，可能最直观的方式就是将其保存到字符串中，如 `"101011011"`，又或者存入数组，如 `[1,0,1,0,1,1,0,1]`，这样确实是方便人类了，但是机器执行的效率也降低了，因为毕竟字符和数组是另外两种基本类型，并且也不是专门为此设计的；所以，就出现了专门为缓冲数据设计的 `ArrayBuffer`，并通过结合视图来提供一个访问和操作数据的接口；

## 语法

实例化 `ArrayBuffer` 构造函数时，只接受一个参数，就是要创建的 Arraybuffer 的大小，单位是字节，不指定的话默认为 **0**；同时它也提供了一个实例属性 `byteLength`（只读），实现对当前 ArrayBuffer 字节值的访问；

举例：
```js
var buffer = new ArrayBuffer(3);

console.log(buffer.byteLength); // 3
```

另外，由于 ArrayBuffer 只是负责创建这么一段数据区域，并没有提供初始化赋值的接口，所以这 n 字节的数据都为空，即都置 0；

## 方法

由于 ArrayBuffer 构造函数本身是用于创建数据缓冲区，并且数据只读，所以提供的属性和方法也只有少数几个；

### .slice()

用于返回一个新的缓冲区，语法为 `.slice(start, end)`，即以当前缓冲区为母本，从索引为 **start** 的位置开始，到 **end** 位置结束（end 位置不包含在内），然后复制并返回这一区段的数据；其用法大致与 `Array.prototype.slice()` 类似，举例说明：
```js
var buffer1 = new ArrayBuffer(5);
var buffer2 = buffer1.slice(0, 3);
var buffer3 = buffer1.slice(2);
var buffer4 = buffer1.slice(1, -1);

console.log(buffer2.byteLength); // 3
console.log(buffer3.byteLength); // 3
console.log(buffer4.byteLength); // 3
```

### ArrayBuffer.isView()

该方法用来判断所提供的参数值是否是一种 `ArrayBuffer` **视图**，比如类型化数组（TypedArray）和数据视图（DataView），例如：
```js
console.log(ArrayBuffer.isView());                   // false
console.log(ArrayBuffer.isView([1, 2, 3]));          // false
console.log(ArrayBuffer.isView(new ArrayBuffer(3))); // false

console.log(ArrayBuffer.isView(new Int8Array()));                 // true
console.log(ArrayBuffer.isView(new Uint32Array(3)));              // true
console.log(ArrayBuffer.isView(new DataView(new ArrayBuffer()))); // true
```

# 类型化数组（TypedArray）

## 概述

工欲善其事必先利其器；前面提到操作 `ArrayBuffer` 创建的数据缓冲区需要使用视图（view）实现，类型化数组就是这么一个描述二进制数据缓冲区（buffer）的视图（view），这个视图是一个 **类数组**。另外，不存在 `TypedArray()` 这个构造函数，它指的是一类数组，因此它有多种实现，即多个类型化数组构造器函数；可以姑且理解为 *水果* 之于 *苹果* 和 *香蕉*，水果指的是一类食物，都知道并不存在名为 *水果* 的一种具体食物，但是 *苹果* 和 *香蕉* 是具体存在的；

有效的类型如下：
```js
Int8Array(); // 8 位二进制有符号整数
Uint8Array(); // 8 位无符号整数（超出范围后从另一边界循环）
Uint8ClampedArray(); // 8 位无符号整数（超出范围后为边界值）
Int16Array(); // 16 位二进制有符号整数
Uint16Array(); // 16 位无符号整数signed
Int32Array(); // 32 位二进制有符号整数
Uint32Array(); // 32 位无符号整数
Float32Array(); // 32 位 IEEE 浮点数（7 位有效数字，如 1.1234567）
Float64Array(); // 64 位 IEEE 浮点数（16 有效数字，如 1.123...15)
BigInt64Array(); // 64 位二进制有符号整数
BigUint64Array(); // 64 位无符号整数
```

## 语法：

万法不离其宗，一招一式都有迹可循；后面就都以 `Int8Array()` 为例进行说明，以下代码展示了可以传入的参数类型：
```js
new Int8Array(); // ES2017 中新增
new Int8Array(length); 
new Int8Array(typedArray); 
new Int8Array(object); 
new Int8Array(buffer [, byteOffset [, length]]); 
```

### 无参数

最好的招式是没有招式；实例化构造函数时不传入任何参数，则返回一个空的类型化数组：
```js
var i8 = new Int8Array();

console.log(i8); // Int8Array []
console.log(i8.length); // 0
console.log(i8.byteLength); // 0
console.log(i8.byteOffset); // 0
```

### length

一寸长一寸强；传入一个数字类型的参数，表示申明类型化数组中元素的个数：
```js
var i8 = new Int8Array(3);
var _i8 = new Int8Array('3'); // 字符串会先被转换成数字

console.log(i8); // Int8Array(3) [0, 0, 0]
console.log(_i8); // Int8Array(3) [0, 0, 0]
console.log(i8.length); // 3
console.log(i8.byteLength); // 3
console.log(i8.byteOffset); // 0
```

### typedArray

好招不怕效仿；当传入的一个参数同样是一个类型化数组时，则返回一个原类型数组的拷贝（不是引用）：
```js
var i8 = new Int8Array(3);
var _i8 = new Int8Array(i8);

console.log(i8 == _i8); // false
console.log(i8 === _i8); // false
console.log(_i8); // Int8Array(3) [0, 0, 0]
```

### object

海纳百川有容乃大；使用该参数时类似于用 `TypedArray.prototype.from()` 方法创建的类型数组，同时该方法也和 `Array.from()` 方法类似，即这个 `object` 参数是一个类数组的对象，或者是可迭代的对象；举例：
```js
// 数组
var i81 = new Int8Array([1, 2, 3]);
console.log(i81);
// Int8Array(3) [1, 2, 3]

// 等价的操作
var i81 = Int8Array.from([1, 2, 3]);
// Int8Array(3) [1, 2, 3]

// 类数组
var i82 = new Int8Array({
    0: 1,
    1: 2,
    2: 3,
    length: 3
});
console.log(i82);
// Int8Array(3) [1, 2, 3]

// 可迭代对象
var i83 = new Int8Array(new Set([1, 2, 3]));
console.log(i83);
// Int8Array(3) [1, 2, 3]
```

### buffer, byteOffset, length

众人拾柴火焰高；该构造函数也支持同时提供三个参数，第一个 `buffer` 指的是数组缓冲区，是 `ArrayBuffer` 的实例，同时也是 `Int8Array.prototype.buffer` 这个属性的值；`butyOffset` 指的是元素的偏移值，表示从数组中第几个元素开始读取，默认是 0，也就是数组的第一个元素；`length` 指的是在设置了偏移值后，要读取的元素长度，默认是整个数组的长度；举例说明：
```js
var buf = new Int8Array([1,2,3,4,5]).buffer;
var i8 = new Int8Array(buf, 1, 2);

console.log(i8);
// Int8Array(2) [2, 3]
```

也就是让申明的类型化数组在提供的 `buffer` 的基础上，从它的索引为 **1** 的元素（第二个元素）开始读取，然后向后读取 **2** 个元素；该操作一般用于对缓冲区数据的截取；

## 类型差异

存在即合理；根据前面的介绍，`TypedArray` 定义了多种类型，如 `Int8Array`, `Uint8Array`, `Int16Array` 等，这样做也是为了适应不同的应用场景，接下来大致了解一下几个典型的类型化数组之间的区别；

### 有无符号

以 `Int8Array` 和 `Uint8Array` 为例，其实 **有符号** 的意思是数组中的元素可以存在符号，即可以是负数；因此 **无符号** 的意思就是元素只能是非负数，举例：
```js
var i8 = new Int8Array([1, 2, 3]);
var _i8 = new Int8Array([-1, -2, -3]);
var ui8 = new Uint8Array([1, 2, 3]);
var _ui8 = new Uint8Array([-1, -2, -3]);

console.log(i8);  // Int8Array(3) [1, 2, 3]
console.log(_i8); // Int8Array(3) [-1, -2, -3]
console.log(ui8); // Uint8Array(3) [1, 2, 3]
console.log(_ui8);// Uint8Array(3) [255, 254, 253]
```

可以发现有符号类型之处初始化负数元素，而无符号则会对负数进行转换，具体转换方式后面会提到；

### 元素范围

有无符号的类型数组，除了元素的值的正负区别外，元素的取值范围也有所不同；下面是一份具体的清单：

|Type               | Range                    |
|-------------------|--------------------------|
| Int8Array         | -128 ~ 127               |
| Uint8Array        | 0 ~ 255                  |
| Uint8ClampedArray | 0 ~ 255                  |
| Int16Array        | -32768 ~ 32767           |
| Uint16Array       | 0 ~ 65535                |
| Int32Array        | -2147483648 ~ 2147483647 |
| Uint32Array       | 0 ~ 4294967295           |
| Float32Array      | 1.2×10-38 ~ 3.4×1038     |
| Float64Array      | 5.0×10-324 ~ 1.8×10308   |
| BigInt64Array     | -263 ~ 263-1             |
| BigUint64Array    | 0 ~ 264-1                |

可以看出，为了顾及有无符号类型的单个元素取值范围区间一样，所以就调整了它们的取值上下限；

### 字节位数

以有符号类型为例，可以发现有 `Int8Array`, `Int16Array` 等几个不同的类型数组，唯一的区别就是他们构造函数名字中间的数字不同，其实这个数字指的是实例化后的类型化数组的单个元素的大小，即多少位，**8** 就是 8 位，即一字节，**16** 就是 2 字节，类推；其实，这个数字也反应了类型数组中 `BYTES_PER_ELEMENT` 这个属性的值，从名字也可以看出代表的是每个元素的字节数；举例说明：
```js
var i8 = new Int8Array(3);
var i16 = new Int16Array(3);
var i32 = new Int32Array(3);

console.log(i8.BYTES_PER_ELEMENT); // 1
console.log(i16.BYTES_PER_ELEMENT); // 2
console.log(i32.BYTES_PER_ELEMENT); // 4

console.log(i8.length); // 3
console.log(i16.length); // 3
console.log(i32.length); // 3

console.log(i8.byteLength); // 3
console.log(i16.byteLength); // 6
console.log(i32.byteLength); // 12
```

另外 `byteLength` 这个属性其实指的是类型数组总的字节大小，其值等于单个元素字节值乘以元素个数（`byteLength = BYTES_PER_ELEMENT x length`）;

### Clamped

鹤难隐于鸡群；从前面的清单中可以找到 `Uint8ClampedArray` 这个独特的类型数组，区别就是中间多了 `clamped` 这个单词，词典解释的意思是“夹紧，箝位”，具体功能是什么，下面通过代码来解释：
```js
var i8 = new Uint8Array([1, 2, 3]);
var _i8 = new Uint8Array([-1, -2, -3]);
var _i8_ = new Uint8Array([255, 256, 257]);

var uic8 = new Uint8ClampedArray([1, 2, 3])
var _uic8 = new Uint8ClampedArray([-1, -2, -3])
var _uic8_ = new Uint8ClampedArray([255, 256, 257])

console.log(i8);    // Int8Array(3) [1, 2, 3]
console.log(_i8);   // Int8Array(3) [255, 254, 253]
console.log(_i8_);  // Uint8Array(3) [255, 0, 1]

console.log(uic8);  // Uint8ClampedArray(3) [1, 2, 3]
console.log(_uic8); // Uint8ClampedArray(3) [0, 0, 0]
console.log(_uic8_);// Uint8Array(3) [255, 255, 255]
```

不知诸位可否查探出端倪，这里也能解释之前说的无符号类型数组实例化时转换负值的问题；通过分析不难发现，转换方式类似于素组循环取值，就是如果传入的值超过了元素的取值范围的上限或下限之一时，那么超过的部分就会，从范围的另一个界限开始依次向后计数；所以上例中 **-1** 会被转换为 **255**，**257** 会被转换成 **1**；

而对于 `Uint8ClampedArray` 这个类型数组，其实差不多也是字面的意思，类似于一个 “夹住” 的操作：超出范围不会发生循环转换，无论超出多少都只会被置为对应的边界值，所以上例中 `-1, -2, -3` 都被转换为 `0`，`256, 257` 则都被转换成了 `255`；

### 浮点数

论世间谁主浮沉；仅有的两个浮点类型的类型数组，`Float32Array` 和 `Float64Array`，浮点的意思就是元素值可以是小数，因为之前介绍过的都是 `int`(整数) 类型的；依然来举例说明：
```js
var f32 = new Float32Array([1.11, 2.12345678911, -3.33333333333333333333333333])
var f64 = new Float64Array([1.11, 2.12345678911, -3.33333333333333333333333333])

console.log(f32);
// Float32Array(3) [1.1100000143051147, 2.1234567165374756, -3.3333332538604736]
console.log(f64);
// Float64Array(3) [1.11, 2.12345678911, -3.3333333333333335]
```

从结果来看 32 位浮点类型数组每个元素都保留到小数点后 16 位，而 64 位是最多保留到 16 位，具体的细节就不深究了；

## 操作元素

欲与二进制数据一决高低，首先肯定是选几样趁手兵器；虽然类型化数组拥有普通数组的大部分方法，比如 `every`, `forEach`, `slice` 等等，但也有自己特有的方法值得说一下，比如 **.set()** 这个方法；

`.set()` 方法用于把指定数组的（所有）元素添加到当前数组的指定位置，接受的参数为 `.set(array[, ofset])`，这里的 array 可以是普通数组或类型化数组，offset 指的是偏移值，即从哪个位置开始写入指定数组元素；举例说明：
```js
var i8 = new Int8Array(6);
var i81 = new Int8Array(6);
var i82 = new Int8Array(6);
var arr = [1, 2, 3];
var arr1 = [1, 2, 3, 4, 5, 6];

i8.set(arr, 2);
console.log(i8);
// Int8Array(6) [0, 0, 1, 2, 3, 0]

i81.set(arr1, 2);
console.log(i81);
// Uncaught RangeError: offset is out of bounds

i82.set(arr, 6);
console.log(i82);
// Uncaught RangeError: offset is out of bounds
```

证明无论是拷贝的数组大小超过原数组，还是偏移值过大使得拷贝结果超过原数组，都会报错提示偏移超过边界，因此使用时需计算准确；

## 操作缓冲区

箭在弦上，东风将至；前面将 TypedArray 描述为操作 ArrayBuffer 中数据的视图，下面就来看一下具体的操作方法；

### 数据读取

#### 数据转换

敌不动我不动；使用类型化数组操作 ArrayBuffer 的数据前，需要先获取其中的数据，也就是把 ArrayBuffer 转换为 TypedArray 类型；先来看一下这两种类型互相转换的方法：

**ArrayBuffer** 转换为 **TypedArray**：
```js
var buffer = new ArrayBuffer(5); // 先初始化 5 字节长的区域
var i8 = new Int8Array(buffer); // 再把数据传递进 TypedArray

console.log(i8); // Int8Array(5) [0, 0, 0, 0, 0]
```

这里也可以验证，ArrayBuffer 新创建的区域数据都被置 0 了；

**TypedArray** 转化为 **ArrayBuffer**：
```js
var i8 = new Int8Array(5);
var buffer = i8.buffer;

console.log(buffer); // ArrayBuffer(5) {}
```

#### 读取方式

前面讲道，类型化数组有多种不同的实现，比如 1 字节有符号元素的 `Int8Array`，2 字节的 `Int16Array` 等；根据 `ArrayBuffer` 的定义，缓冲区是以 **1 字节** 为单位进行创建的，所以我们通常读取文本类数据使用 `Uint8Array`，因为它也正好每个元素的大小为 1 字节，当然，也可以选择用 `Uint16Array` 来 2 字节地挨个读，其他类型类推；

通过代码来观察一下具体的读取方式：
```js
var data = new Uint8Array([1, 2, 3, 4])
var buffer = data.buffer;

var ui8 = new Uint8Array(buffer);
var ui16 = new Uint16Array(buffer);

console.log(ui8);  // Uint8Array(4) [1, 2, 3, 4]
console.log(ui16); // Uint16Array(2) [513, 1027]
```

原始数据 `data` 是 4 字节大小，通过 `Uint8Array` 就是以 1 字节为单位，所以得到的也是原始的数据 `[1, 2, 3, 4]`，这里由于数据小所以有无符号无影响；而通过 `Uint16Array` 则是以 2 字节为单位进行读取，所以总的元素长度为 2（2 = 4 / 2），但是其中的单个元素 `513`, `1027` 又分别是如何得到的呢？我们可以通过计算来探究一下:

首先看 `1, 2` 这两个元素，根据结果它们被读取成为了 `513`，那么就把这几个元素的二进制数表示出来（缓冲区就是存储的二进制数据）：
```sh
"1":   00000001
"2":   00000010
"12":  00000001 00000010

"513": 00000010 00000001
"21":  00000010 00000001
```

规律显而易见了，`513` 这个 2 字节的数据，其实是把 `1` 和 `2` 这两个挨着的 1 字节的数据，以 **倒序** 方式拼接在一起的；

再来看一下 `3` 和 `4` 这两个是否也是以同样的方法得出 `1027` 这个数据的：
```sh
"3":    00000011
"4":    00000100
"34":   00000011 00000100

"1027": 00000100 00000011
"43":   00000100 00000011
```

结果不出所料，所以像 `Uint32Array` 等以多个字节读取数据的类型数组，方法也可以类推；

#### 字节序

另外值得一提的是，上面所说的 **倒序** 拼接方式，其实有个专业术语，叫做 **字节序（Endian）**，对应这个英文单词应该会感觉似曾相识，例如 Linux 中执行 `lscpu` 得到的结果中，就会发现它的存在：
```sh
Architecture:        x86_64
CPU op-mode(s):      32-bit, 64-bit
Byte Order:          Little Endian
Address sizes:       36 bits physical, 48 bits virtual
```

> 字节序，或字节顺序（"Endian"、"endianness" 或 "byte-order"），描述了计算机如何组织字节，组成对应的数字。

这个字节序可以分为：

**Little Endia（低字节序）**：低位数据放入存储地址的低位，高位数据放入高位地址；

这种顺序就显得和内存上的存储地址顺序（阅读模式下低位在右，高位在左）保持一致，并且也是一种常见的方式，比如上面的英特尔处理器；只不过对于这种顺序人类阅读时就要反着读了（从右至左），比如上面例子中的数据 `12` 就是以 `21` 的顺序读取的，也可以类比这种日期格式：`"Sat 07 Mar 2020"`;

**Big Endian（高字节序）**：低位数据存入高位地址，高位数据放入低位；

这种顺序可能更符合人类的阅读习惯（从左至右），它一般应用在互联网标准的数据结构中，可以类比 `"2020-03-07"` 这种日期格式；

### 数据修改

下面通过类型化数组视图来尝试修改一下 ArrayBuffer 缓冲区中的内容：
```js
var buffer = new ArrayBuffer(3);
var i8 = new Int8Array(buffer);

console.log(i8); // Int8Array(3) [0, 0, 0]

for (let i = 0; i < i8.length; i++) {
    i8[i] = 1;
}

var _i8 = new Int8Array(buffer); // 新建个视图验证是否修改成功

console.log(_i8); // Int8Array(3) [1, 1, 1]
```

### 数据拼接

用之前讲过的 `.set()` 方法来尝试将数据拼接进缓冲区：
```js
var buffer = new ArrayBuffer(6);
var i80 = new Int8Array(buffer);

console.log(i80); // Int8Array(6) [0, 0, 0, 0, 0, 0]

var i81 = new Int8Array([1, 2, 3]);
var i82 = new Int8Array([4, 5, 6]);

i80.set(i81);
i80.set(i82, 3);

var _i80 = new Int8Array(buffer); // 验证是否修改成功

console.log(_i80); // Int8Array(6) [1, 2, 3, 4, 5, 6]
```

**注意**：这里不能使用数组的 `.concat()` 这个方法来进行元素拼接，因为类型化数组中并没有内置这个方法，不然会报错，如下：
```js
var arr1 = [1, 2, 3];
var arr2 = arr1.concat(4, 5, 6);

console.log(arr2); // [1, 2, 3, 4, 5, 6]

var i81 = new Int8Array([1, 2, 3]);
var i82 = i81.concat(4, 5, 6);

console.log(i82);
// Uncaught TypeError: i81.concat is not a function
```

同样地，`.splice()` 这个可以替换元素的方法也不存在于类型化数组中；

# 数据视图（DataView）

## 概述

一个好汉三个帮；`DataView` 是另外一个用于从 `ArrayBuffer` 缓冲区中读写数据的视图接口，其特点就是考虑了 *字节序* 的问题，后面会讲；

语法为：
```js
new DataView(buffer [, byteOffset [, byteLength]]);
```

其中 `buffer` 指传入的数据缓冲区，如 ArrayBuffer；`byteOffset` 指偏移的字节量，默认第一个字节，`byteLength` 指要传入的数据的字节长度，默认整个 buffer 的长度；并且这三个参数都可以在实例化后通过相应属性（只读）访问到；
```js
var buffer = new Int8Array([1, 2, 3, 4]).buffer;
var dv = new DataView(buffer, 1, 2);

console.log(dv); // DataView(2) {}
console.log(dv.buffer); // ArrayBuffer(4) {}
console.log(dv.byteOffset); // 1
console.log(dv.byteLength); // 2
```

## 操作数据

DataView 提供了一系列的方法用于操作缓冲区的数据，先简单预览一下：

|     Read     |     Write     |
|--------------|---------------|
| getInt8()    |  setInt8()    |
| getUint8()   |  setUint8()   |
| getInt16()   |  setInt16()   |
| getUint16()  |  setUint16()  |
| getInt32()   |  setInt32()   |
| getUint32()  |  setUint32()  |
| getFloat32() |  setFloat32() |
| getFloat64() |  setFloat64() |

### Read

以 `getInt8()` 方法为例，可提供一个参数 `byteOffset`，表示偏移指定字节数，然后读取 1 字节（8 位）数据，默认 为 0（第一字节）；而如果是 `getInt16()` 等用于获取大于 1 字节值以及浮点值的方法，还接受第二个可选参数 `littleEndian`，就是是否使用 little endian（低字节序，上文有讲）格式来读取数据，传入 `true` 就表示使用 little endian 格式，传入 `false` 或者不填，就使用 big endian（高字节序） 格式；
```js
var buffer = new Int8Array([1, 2, 3, 4]).buffer;
var dv = new DataView(buffer);

console.log(dv.getInt8(1)); // 2
console.log(dv.getInt16(0, true)); // 513
console.log(dv.getInt16(0, false)); // 258
console.log(dv.getInt16(0)); // 258
```

结果为 `513` 的这一行代码，使用的是 little endian 格式，并且 513 这个值也与之前 `TypedArray` 中关于 `Int16Array` 例子的结果一致，证明 `TypedArray` 默认使用的是 **little endian** 格式在操作数据缓冲区；

### Write

以 `setInt8()` 为例，接受两个参数：`setInt8(byteOffset, value)`，第一个表示偏移字节量，用于定位，第二个则是要设置的具体值，非数字类型会报错；类似地，`setInt16` 等用于设置超过 1 字节的方法，也提供第三个可选参数 `littleEndian`，表示是否以 little endian 格式设置；
```js
var buffer1 = new ArrayBuffer(2);
var buffer2 = new ArrayBuffer(4);
var dv1 = new DataView(buffer1);
var dv2 = new DataView(buffer2);

dv1.setInt8(0, 1);
dv1.setInt8(1, 2);
var i8 = new Int8Array(dv1.buffer);
console.log(i8); // Int8Array(2) [1, 2]

dv2.setUint16(0, 513, true);
dv2.setUint16(2, 513);
var i16 = new Uint16Array(dv2.buffer);
console.log(i16); // Int16Array(2) [513, 258]
```

需要注意的就是，因为 `byteOffset` 这个参数的单位始终是 **1 字节**，所以当写入超过一字节的数据时，相应的偏移值也需要增加，就像上例所以展示的一样；

### 对比

与前文所讲的 `TyptedArray` 视图接口相比，`DataView` 视图虽然兼容了不同平台的字节序问题，但是也没有了一些对整段数据进行修改拼接的功能，只能修改单个元素值；另外也不能用构造函数初始赋值，比如下面的情况：
```js
console.log(new Int8Array([1, 2, 3]));
// Int8Array(3) [1, 2, 3]

console.log(new DataView([1, 2, 3]));
// Uncaught TypeError: First argument to DataView constructor must be an ArrayBuffer
```

所以，需要灵活地结合二者使用，以应对复杂的场景；兄弟齐心，其力断金；

# Blob

`Blob` 构造函数用于描述一个 blob（Binary Large OBject，二进制大对象），即保存原始数据的类文件对象，支持保存 **多种类型** 的数据（不像 `TypedArray`，只能使用数字类型），并且数据是只读的，不可修改；另一个基于 Blob 的构造函数 `File`，就是用来处理用户上传文件的（`<input type="file">`）数据。

语法：
```js
new Blob(array, options);
```

`array` 指的是一系列类型的数据构成的数组或者类数组，这些数据可以是字符串、ArrayBuffer、DataView、TypedArray、Blob、DOMString 等等；`options` 则是一个对象，可以包含以下两个属性：
```js
{
    type: "", // 传入的数据的 MIMS 类型，比如 text/plain，默认为空
    endings: "" // 如何处理数据中的换行符，比如 \n 和  \r\n，因操作系统而异
                // 值为 transparent 或者 native，默认为 transparent
                // native 表示替换为当前系统的换行符
                // transparent 则表示不替换，保持数据内容
}
```

## 写入数据

通过几个例子来说明：
```js
var blob1 = new Blob([1, 2, 3]);
var blob2 = new Blob(['a', 'bc', 'd e']);
var blob3 = new Blob(['hello'], {type: 'text/plain'});
var blob4 = new Blob(new Int8Array([4, 5, 6]));
var blob5 = new Blob([blob2]);

console.log(blob1); // Blob {size: 3, type: ""}
console.log(blob2); // Blob {size: 6, type: ""}
console.log(blob3); // Blob {size: 5, type: "text/plain"}
console.log(blob4); // Blob {size: 3, type: ""}
console.log(blob5); // Blob {size: 6, type: ""}
```

如果参入的参数不是类数组的类型，则会报错：
```js
var blob1 = new Blob(123);
var blob2 = new Blob('123');
var blob3 = new Blob({foo: 'bar'});
var blob4 = new Blob(true);
var blob5 = new Blob(blob1);

console.log(blob1);
// VM3497:1 Uncaught TypeError: Failed to construct 'Blob': 
// The provided value cannot be converted to a sequence.
console.log(blob2);
// VM3497:1 Uncaught TypeError: Failed to construct 'Blob': 
// The provided value cannot be converted to a sequence.
console.log(blob3);
// VM3497:1 Uncaught TypeError: Failed to construct 'Blob': 
// The provided value cannot be converted to a sequence.
console.log(blob4);
// VM3497:1 Uncaught TypeError: Failed to construct 'Blob': 
// The provided value cannot be converted to a sequence.
console.log(blob5);
// VM3497:1 Uncaught TypeError: Failed to construct 'Blob': 
// The provided value cannot be converted to a sequence.
```

## 读取数据

写入 Blob 实例中的数据虽然不能修改，但是还是可以读取的，首先可以获取数据总的大小和类型（只读）：
```js
var blob = new Blob(['a', 'b', 'c'], {type: 'text/plain'});

console.log(blob.size); // 3
console.log(blob.type); // text/plain
```

**.text()** 方法用于获取 Blob 中的文本数据，返回值是一个 promise 对象，包含一个 resolved 状态的文本数据，无提供的参数；
```js
var blob = new Blob([1, 2, 3]);

blob.text().then(data => {
    console.log(data, typeof data);
});
// 123 string
```

**.arrayBuffer()** 方法也用于获取 Blob 中的数据，并且返回一个 promise，无参数提供，只不过返回的是数据的 `ArrayBuffer`，即二进制数据缓冲区；
```js
var blob1 = new Blob([1, 2, 3]);
var blob2 = new Blob(['a', 'b', 'c']);

blob1.arrayBuffer().then(data => {
    console.log(new Uint8Array(data));
});
// Uint8Array(3) [49, 50, 51]

blob2.arrayBuffer().then(data => {
    console.log(new Uint8Array(data));
});
// Uint8Array(3) [97, 98, 99]
```

计算以下也可以验证，类型数组中的数值确实是对应的原始数据的二进制值。

# TextEncoder

临阵磨枪，不快也光；这还是一个处于 **实验阶段** 的接口，当前的接口将来可能发生改变，并且目前 IE 系列浏览器都还不支持，这里只作简单介绍；

顾名思义，这个构造函数的作用就是负责编码文本，其实就是以指定的编码格式，将传入的文本转换成该数据对应的 **类型化数组**；实例化时可以提供一个参数，用于编码格式，不过目前默认并且只使用 UTF-8 格式编码，所以可以省略；
```js
var encoder = new TextEncoder();
var arr = encoder.encode('abc');

console.log(encoder.encoding); // utf-8
console.log(arr); // Uint8Array(3) [97, 98, 99]
```

有编码就自然有解码，`TextDecode` 这个构造函数就与之对应，即将 `ArrayBuffer` 或者 `ArrayBuffer View` 类型的数据解码为相应的文本；
```js
var ui8 = new Uint8Array([97, 98, 99]);
var buffer = ui8.buffer;
var decoder = new TextDecoder();

var text1 = decoder.decode(ui8);
var text2 = decoder.decode(buffer);

console.log(text1); // abc
console.log(text2); // abc
```

这样，除了上面的 `Blob`，这里的 `TextEncoder` 也可以用于将文本数据保存为 JavaScript 中的二进制缓冲数据；

# 处理文件数据

人外有人，天外有天，跨过了这二进制，便是更广阔的天地；说了一系列的关于二进制数据的保存和读写方法，也该谈谈其用武之地了；

要知道 JavaScript 中保存文本字符串什么的用变量就行了，缓冲区、类型数组、Blob 这些接口其实多数是用于处理文件数据相关的，因为它们有着不同的 MIME 类型，比如 `.jpg .mp4 .bin` 这些后缀的文件，JavaScript 并没有内置一些直接处理这些数据类型的接口（例如 .txt 文档就能可以处理），所以就需要以原生二进制数据的方式来保存或处理，方便用户上传、下载或预览；下面就将介绍一些文件处理相关的接口；

## File

前面讲到，`File` 是基于 `Blob` 的，所以也就继承了它的一些方法；`File` 用于提供有关文件的信息和内容，语法如下：
```js
new File(content, name[, options]);
```

`content` 指要创建的文件内容，是 `ArrayBuffer, View, Blob, DOMString` 等类型构成的 **数组** 或者类数组；`name` 则是文件的名称或者路径；`options` 参数可选，包含 `type` 和 `lastModified` 两个属性；

举例：
```js
var content = new TextEncoder().encode('hello world!');
var file = new File(content, 'test.txt', {
    type: 'text/plain', // 可选，默认为空
    lastModified: Date.now() // 可选，后面是默认值
});

console.log(file.name); // test.txt
console.log(file.size); // 12
console.log(file.type); // text/plain
console.log(file.lastModified); // 1583638485180
```

`File` 构造函数自身并没有自带一些方法，而是继承了 `Blob` 的方法，例如：
```js
var file = new File(['hello world!'], 'text.txt'); 
// 初始化内容可以直接是字符串，只是需要放在数组中

file.text().then(data => {
    console.log(data); // hello world!
});

file.arrayBuffer().then(data => {
    var text = new TextDecoder().decode(data);
    console.log(text); // hello world!
});
```

其实，一般很少像这样用 `File` 接口来直接创建一个文件对象，多数是用在用户上传文件等情况，比如在网页中用 `<input type="file" />` 标签来上传文档，而用户点击上传后，与文件相关的信息就被包含在了这个 `input` 标签的节点引用的 `files` 属性中，这个 `files` 属性值是一个 `FileList` 接口的实例，就是包含所有上传文件的数组，其中每个元素都是一个 `File` 接口的实例；

通过一个简单的 demo 进行说明：
```html
<!DOCTYPE HTML>
<html>
    <head></head>
    <body>
        <input type="file" class="upload" />
        <!--
        如果要上传多个文件，则使用：
        <input type="file" class="upload" multiple />
        -->
        <input type="submit" value="Upload" onclick="doUpload()" />
        
        <script>
            var upload = document.querySelector('.upload');
            
            // 用户点击 Upload 按钮后执行
            function doUpload() {
                var file = upload.files[0];
                
                console.log(file);
                // File {name: "test.txt", lastModified: 1583634142542, lastModifiedDate: 
                // Sun Mar 08 2020 10:22:22 GMT+0800 (中国标准时间), webkitRelativePath: "", size: 12, …}
            }
            
            // 也可以用这种方法获取文件对象，
            // 这个函数中的代码会在用户完成上传操作就执行，即使没点上传按钮
            upload.onchange = function(el) {
                var file = el.files[0];
                // 执行的操作...
            }
        </script>
    </body>
</html>
```

## FileReader

`FileReader` 是另一个用于读取文件数据的接口，其实例化后的一些方法与 `Blob` 中的 `.text()` 和 `.arrayBuffer` 方法类似，只不过返回的不再是一个 promise 对象，而是一个基于 **事件** 的接口；`FileReader` 一般也用于读取用户上传文件的数据；

语法：
```js
new FileReader(); // 实例化无须提供任何参数
```

### 事件处理

既然是以基于事件，那么就需要一系列处理不同事件的方法，列出如下：

- `.onabort()`：该事件在读取操作被中断时触发。
- `.onerror()`：该事件在读取操作发生错误时触发。
- `.onload()`：该事件在读取操作完成时触发。
- `.onloadstart()`：该事件在读取操作开始时触发。
- `.onloadend()`：该事件在读取操作结束时（要么成功，要么失败）触发。
- `.onprogress()`：该事件在读取Blob时触发。

以上事件也可以使用 `addEventListener()` 方法的相应格式来设置回调函数；

### 加载状态

因为是基于事件的接口，所以 `FileReader` 提供了 `readyState` 这个属性，以不同值代表不同的数据加载状态：
- **0**：数据尚未加载；
- **1**：数据正在加载中；
- **2**：数据加载完成；

数据加载完成后，可以使用 `result` 这个属性来获取文件内容；

### 数据加载

#### readAsText()

`.readAsText(file[, encoding])` 以文本字符串的形式读取 `file` （文件对象或者 Blob）中的数据，以 `encoding` 格式进行编码（默认 utf-8）；
```js
var file = new File(['abc'], 'test.txt');
var reader = new FileReader();

reader.onloadstart = event => {
    console.log('loadstart state:', event.target.readyState);
}
reader.onload = event => {
    console.log('load state:', event.target.readyState);
    console.log('result:', event.target.result);
}
reader.onloadend = event => {
    console.log('loadend state:', event.target.readyState);
}

reader.readAsText(file);
// loadstart state: 1
// load state: 2
// result: abc
// loadend state: 2
```

#### readAsArrayBuffer()

`readAsArrayBuffer(file)` 以 `ArrayBuffer` 的形式读取 `file` 中（文件或 Blob）的数据；
```js
var blob = new Blob(['a', 'b', 'c']);
var reader = new FileReader();

// 使用监听器触发效果相同
reader.addEventListener('load', event => {
    console.log(event.target.result);
    console.log(new Uint8Array(event.target.result));
})

reader.readAsArrayBuffer(blob);
// ArrayBuffer(3) {}
// Uint8Array(3) [97, 98, 99]
```

#### readAsDataURL()

`readAsDataURL(file)` 同样是读取 `file` 中的数据，只是将文件中的内容以 **base64** 编码后，放进一个 `DataURL` 中（内容可以通过 URL 链接直接访问）；
```js
var file = new File(['abc'], 'test.txt', {
    type: 'text/plain'
})
var reader = new FileReader();

reader.onload = event => {
    console.log(event.target.result);
}

reader.readAsDataURL(file);
// data:text/plain;base64,YWJj
```

如果将最后的输出内容粘贴复制进浏览器的地址栏，回车后就能直接看见文本内容；

## 呈现数据

### DataURL

**Data URL** 指的是一种 `URL` 协议，语法格式为：
```
data:[<mediatype>][;base64],<data>
```

可以类比常见的 `http:` 协议，例如上例中的返回值：
```sh
data:text/plain;base64,YWJj
```

具体用法如之前所述，输入到浏览器地址栏回车后会直接呈现出原内容，比如上例就是一串文本（文件类型被指定为 `text/plain`），如果类型 `image/png` 等图片格式的，则会直接显示该图片；

Data URL 除了可以通过浏览器地址栏访问，也可以在 HTML 文档中展示，例如使 `<img>` 的 `src` 属性值等于这个 Data URL，这个标签就会展示为相应的图片，同样地，数据指定给 `<iframe>` 的 `src` 属性，也可以展示图片或者文本数据，指定给 `<video>` 标签的 `src` 则可以展示视频；

### ObjectURL

**ObjectURL** 使用 `URL.createObjectURL()` 方法创建，返回结果也是一种类型的 URL，类似于上面的 Data URL，区别在于 ObjectURL 的生命周期与当前网站页面相关，例如 **刷新页面** 页面后不无法继续访问了；

例如在本地网页控制台中运行下面的代码：
```js
var blob = new Blob(['abc']);

console.log(URL.createObjectURL(blob));
```

则会输出类似下面的内容：
```sh
blob:http://127.0.0.1:8080/4064e759-231f-466e-a6ef-778505e56d2b
```

链接临时有效，会展示数据内容刷新页面失效，不过格式基本一致；同样，ObjectURL 也可以用于设置为 `<img>` 或 `<iframe>` 的 `src` 属性，进行单独展示；

需要 **注意**，`createObjectURL()` 方法每次调用都会返回一个新的 ObjectURL 对象，即使数据源相同，所以如果调用量较多，可能就会内存剧增，这时需要手动回收，使用的是 `revokeObjectURL()` 这个方法，示例：
```js
var url = URL.createObjectURL(new Blob(['test']));

URL.revokeObjectURL(url); // 完成回收
```

### 文件下载

除了使用 `<img`, `<iframe>` 等标签对数据进行展示，也可以将文件提供给用户下载，使用的是 `<a>` 标签，把 DataURL 或者 ObjectURL 指定给它的 `href` 属性即可，另外还要指定 `download` 属性值，不然有可能会是跳转到相关页面而不是下载；

一个下载组件的示例：
```html
<a href="data:text/plain;base64,YWJj" download="test.txt" type="text/plain">Download</a>
```

`download` 属性指代下载到用户本地的文件名称，不加后缀则系统自动识别类型，同样 `type` 属性也是可选的，可用于固定下载文件类型；

## 上传数据

让用户通过网页上传文件，最重要的当然就是最后的上传阶段了，即把用户选择的文件上传到服务器；下面的例子使用 `XMLHttpRequest()` 接口来实现数据的上传；
```js
var file = new File(['hello world!'], 'hello.txt', {
    type: 'text/plain'
}); // 此处用于模拟用户上传的文件，即有具体的文件名、类型和内容
var xhr = new XMLHttpRequest();
var reader = new FileReader();

// 查看上传进度
xhr.upload.onprogress = event => {
    if (event.lengthComputable) {
        console.log('进度：'， event.loaded + '/' + event.total);
    }
}
// 上传完成的回调
xhr.upload.onload = event => {
    console.log('upload success.');
}
// 上传地址，参数换成实际地址
xhr.open('POST', 'http://localhost/upload/upload.php');
// 服务器没有指定文件类型则自行指定
xhr.overrideMimeType('text/plain');

reader.onload = event => {
    // 数据读取完毕就开始上传
    xhr.send(event.target.result);
}
reader.readAsText(file);
```

另外也可以使用 form 表格来上传文件，更加直接：
```html
<form action="upload/upload.php" method="post" enctype="multipart/form-data">
    <input type="file" name="upload" >
    <input type="submit" value="Upload">
</form>
```

需要 **注意** 的是，上传文件时 **必须** 加上 `enctype="multipart/form-data"`，不然上传上去的只是一个文件名；


## 接收数据

投我以木瓜，报之以琼琚；有时也会接收来着服务端的数据，通常就是使用 `XMLHttpRequest` 来异步获取文本或 JSON 数据，但是它也能用于获取其他类型的数据，只不过需要手动设置 `responseType` 这个属性进行申明，该属性支持以下几个值：

- `""`：默认值，与 text 类型相同；
- `"text"`：以文本类型响应；
- `"arraybuffer"`：以 `ArrayBuffer` 二进制数据响应；
- `"blob"`：以 `Blob` 类型数据响应；
- `"json"`：响应解析为 JSON 对象；
- `"document"`：解析为 HTML 或 XML 内容；

一个接收数据的实例：
```js
var xhr = new XMLHttpRequest();

xhr.responseType = 'arraybuffer';
xhr.onload = () => {
    var buffer = xhr.response;
    // 可以转换为类型化数组进行数据修改
    console.log(new Uint8Array(buffer));
}
xhr.open('GET', 'test.png');
xhr.send();
```

-----------------------
至此，历经几番交战，刀光剑影，战况激烈空前，难分难解，不下几十回合，能阅读至此处的诸位也都是真正的勇士，敢于面对惨淡的生活，正视淋漓的鲜血......又扯远了，俗话说，物以稀为贵，人以和为贵，JavaScript 剑客与二进制隐士此番交战，不求胜负，若这过程中的原理能被大家理解参透得透彻，也算是名留青史了；

恩怨自了结，情仇终消散，天下没有不散的宴席，暂且就此别过，江湖再见！