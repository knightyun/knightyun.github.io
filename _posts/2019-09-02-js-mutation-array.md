---
title:  JavaScript 变异与非变异数组方法
layout: post
categories: JavaScript
tags: 变异数组
excerpt: 关于 JavaScript 中数组方法的区分
---
在 JavaScript 中，存在大量对数组进行操作的方法，它们都有一个特点，就是关于此操作是否会修改原数组，并以此将数组方法分为**变异数组方法**与**非变异数组方法**，例如 `.pop()` 方法便是删除数组的最后一个元素，而 `.slice()` 方法则是返回一个指定特征的新数组，并不会对原数组进行修改；能有效的区分这两类方法，有助于开发过程中方法选用，避免出现不必要的错误；

下面对一些常见的数组方法进行了整理分类：

| 非变异数组方法   | 变异数组方法
|------------------|-------------
| .join()          | .push()
| .concat()        | .pop()
| .slice()         | .shift()
| .from()          | .reverse()
| .map()           | .sort()
| .filter()        | .splice()
| .every()         | .fill()
| .find()          |
| .findIndex()     |
| .flat()          |
| .flatMap()       |
| .forEach()       |
| .includes()      |
| .indexOf()       |
| .lastIndexOf()   |
| .reduce()        |
| .reduceRight()   |
| .some()          |
| .toString()      |
| .toLocalString() |

可以看出改变原数组的变异数组方法只有少数几个，非变异的过多可能记不住，因此可以选择记少不记多的原则，记住那几个特殊的变异方法的，其余的便可归类于非变异的了；