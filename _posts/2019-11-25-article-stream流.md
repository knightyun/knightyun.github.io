---
title: stream流
layout: post
categories: Java
tags: stream流
excerpt: stream流的学习
---
#### 什么是stream流？
##### stream流是一种对集合操作的工具类  

首先先了解下stream的类结构关系：![stream的类结构图](/assets/stream流/stream类结构图.PNG)

如需参考文档请点击下载：[参考文档](/assets/stream流/笔记.rtf)  
单列集合获取stream的方式:
```java
Stream<E> stream = list.stream()
Stream<E> stream = set.stream()
Stream<E> stream = list.stream()
//List获取Stream的方式
List<String> list = new ArrayList<>();
Stream<String> stream = list.stream();
//Set获取Stream的方式
Set<String> set = new HashSet<>();
Stream<String> stream1 = set.stream();
//Map获取Stream的方式
Map<String,String> map = new HashMap<String,String>();
Set<String> set1 = map.keySet();
Stream<String> stream2 = set1.stream();
//数组获取stream的方式
Stream<Integer> stream3 = Stream.of(1,2,3,3,4,5);
Integer[] integers = {1,2,2,2,3,3};
Stream<Integer> stream4 = Stream.of(integers);
```
  
---------------------------------------------------------------------
  
Stream的过滤的方法：Stream<T> filter(Predicate<? super T> predicate); 

Predicate函数式接口的抽象方法是：  boolean test(T t);

使用：stream.filter((s)->s.startsWith("张"));
---------------------------------------------------------------------

Stream的foreach的方法：void forEach(Consumer<? super T> action);

Consumer函数式接口的抽象方法是：    void accept(T t);

使用：stream.forEach(System.out::println);
---------------------------------------------------------------------

Stream的统计个数的方法：long count();

使用：long count = stream.count();
---------------------------------------------------------------------

Stream的取用前几个的方法：Stream<T> limit(long maxSize);
  
使用：stream.limit(2);
---------------------------------------------------------------------
  
Stream跳过前几个的方法：Stream<T> skip(long n);
  
使用：Stream<String> skip = stream.skip(2);
---------------------------------------------------------------------
  
Stream的转换方法：    <R> Stream<R> map(Function<? super T, ? extends R> mapper);

Function的函数式接口的抽象方法是：	R apply(T t);

使用：Stream<Integer> integerStream = stream.map(Integer::parseInt);
---------------------------------------------------------------------

Strema的合并方法：public static <T> Stream<T> concat(Stream<? extends T> a, Stream<? extends T> b)

使用：Stream<Integer> concat = Stream.concat(stream3, stream4);
---------------------------------------------------------------------

将Stream中的数据转换为集合、数组的方法：
`Stream<String> s1 = Stream.of("a","b","c","d")`
`List<String> list = s1.collect(Collectors.toList)`
`Set<String> set = s1.collect(Collectors.toSet)`
`Object[] obj = s1.toArray()`


