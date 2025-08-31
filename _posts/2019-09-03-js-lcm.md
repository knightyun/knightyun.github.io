---
title:  JavaScript 求最小公倍数
layout: post
categories: JavaScript
tags: 公倍数 公约数
excerpt: JavaScript 实现求最小公倍数的算法
---
# 最小公倍数(Least Common Multiple)

**最小公倍数**是中学数学知识中的一个概念，具体定义可以 自行了解，这里只大致解释一下，通常几个正整数会存在许多个倍数，每个倍数除以这几个正整数后都没有余数，而这些倍数之中最小的一个则称为最小公倍数；

一般直接计算最小公倍数较为困难，因此需要用到一个计算公式，即两个数的乘积等于这两个数的最大公约数与最小公倍数的乘积，所以知道两个数的最大公约数或者求最小公倍数，就可以求得另外一个，接下来先来实现**最大公约数**的求法；

# 最大公约数(Greatest Common Divisor)

这也是与最小公倍数相似的另一个概念，几个正整数之间一般存在多个约数，即这几个正整数除以这个约数后都没有余数，这些约数中最大的一个称为**最大公约数**；下面来实现求最大公约数的函数；

## 最大质因数法

思路很简单，即将两个数分别递减，获取能同时被二者除尽的最大的一个数，即最大公约数：
```js
function getGcd(a, b) {
    for (let i = a; i > 0; i--) {
        for (let j = b; j > 0; j--) {
            if (a % i === 0 && b % j === 0 && i === j) {
                return j;
            }
        }
    }
}
```

## 辗转相除法

思路是用两个数中的最大项除以最小项，如果能除尽，那么最小项便是这两个数的最大公约数；不能除尽则用最大项除以最小项所得余数，与最小项再进行同样的递归操作，最后得到最大的约数，也就是所谓的**辗转相除**；
```js
function getGcd(a, b) {
    let max = Math.max(a, b);
    let min = Math.min(a, b);
    if (max % min === 0) {
        return min;
    } else {
        return getGcd(max % min, min);
    }
}
```

# 求最小公倍数

有了求最大公约数的函数后，再来求最小公倍数就简单了：
```js
function getLcm(a, b) {
    return a * b / getGcd(a, b);
}
```