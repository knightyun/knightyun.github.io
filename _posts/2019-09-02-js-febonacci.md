---
title: JavaScript 实现斐波那契数列（Febonacci Array）
layout: post
categories: JavaScript
tags: 斐波那契 febonacci
excerpt: 斐波那契数列的 JavaScript 实现
---
斐波那契（Febonacci）数列是一个神奇的数列，在很多地方都有应用，可以自行搜索相关图片体会其魅力，这里不赘述，直接来分析一下如何通过 JavaScript 来实现；

# 概念

斐波那契数列形式如下：
```
1 1 2 3 5 8 13 21 34...
```

规律应该很容易看出来，即从第三项开始，每一项的值等于前两项之和，以此类推下去，至于第一项和第二项的值嘛，不要纠结，就是这样规定的...


# 斐波那契数

首先来实现一下获取指定项的斐波那契数，即获取该数组中第 n 项的值；

方法一：
```js
function getFebNum(n) {
    if (n == 1 || n == 2) {
        return 1;
    } else {
        return getFebNum(n - 1) + getFebNum(n - 2);
    }
}
```

方法一使用递归的思路，便于理解代码量也少，但是其算法复杂度较大，当 n 相当大的时候，程序运行也无比复杂；

方法二：
```js
function _getFebNum(n) {
    if (n < 1) return 0;
    let one = 1, // 初始为第 -2 项
        two = 0, // 初始为第 -1 项
        three = 0; // 初始为第 1 项
    for (let i = 1; i <= n; i++) {
        three = one + two; 
        one = two;
        two = three;
    }
    return three;
}
```

这种方法算法复杂度就比较小了，只是换了个获取思路，代码量增加也不太容易理解，其中为了缩减代码量，便于递推的进行，把斐波那契数列向后模拟扩展了两项:

项 | -2 | -1 | 1 | 2 | 3 | 4 | 5 | ...
---|----|----|---|---|---|---|---|----
值 |  1 |  0 | 1 | 1 | 2 | 3 | 5 | ...

# 斐波那契数列

接下来通过代码实现获取指定长度的斐波那契数列： 

方法一：
```js
function getFebArr(n) {
    let arr = [];
    for (let i = 1; i <= n; i++) {
        arr.push(getFebNum(i));
    }
    return arr;
}
```

这个方法通过挨个获取斐波那契数，最后组成一个斐波那契数列，需要用到前面的 `getFebNum` 函数；

方法二：
```js
function _getFebArr(n) {
    let arr = [];
    if (n < 1) return arr;
    let one = 1,
        two = 0,
        three = 0;
    for (let i = 1; i <= n; i++) {
        three = one + two;
        arr.push(three);
        one = two;
        two = three;
    }
    return arr;
}
```

方法二利用之前 `_getFebNum` 方法的思路，递推地填充斐波那契数列，降低了算法复杂度；