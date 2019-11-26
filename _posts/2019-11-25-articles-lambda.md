---
title: 再识lambda表达式
layout: post
categories: Java
tags: lambda
excerpt: lambda表达式总结
---
### 这是第n次学习lambda，所以已经不得不作笔记了
首先我们得知道lambda表达式不属于Java，Java只是实现了它。
其次我们得知道lambda表达式只是一种替代方案，它编译之后不会生成class文件，而匿名内部类是会生成class文件的。
### 使用lambda的前提
只有使用接口且接口中只有一个抽象方法的时候才可以使用，抽象类不行。注意如果还有其他同Object类声明相同的抽象方法也是可以的。
### lambda的标准形式
(形参)->{方法体};
### 有参有返回值的lambad的写法：
(int a, int b)->{return a+b;};
### lambda的省略形式
* 如下
   * 第一种lambda中形参的数据类型都可以省略：(a,b)->{return a+b;};
   * 如果形参只有一个，则数据类型和小括号都可以省略a->{return a;}或者(a)->{return a;};
   * 如果方法体中只有一句话，则有以下两个方式：
      * 有返回值： (a,b)->a+b;可以同时省略return关键字、{}、以及语句后的~;~
	  * 没有返回值：(a,b)->System.out.println("...");可以同时省略{}、以及语句后的~;~
### 其实lambda的使用前提条件事实上就是***函数式接口***
关于函数时接口请点击<a href="https://edgorange.github.io/2019/11/25/article-函数式接口">函数式接口</a>