---
title: char的回顾与总结
layout: post
categories: Java
tags: char
excerpt: char的字节数
---
###关于字节数的总结
一个字节（byte）是8位，位即是bite。而bite指的是计算机能够识别的二进制，即0，1代码。所以1个bite就会有存储2种类型，0或者1
###char到底表示几个字节呢？可以存储一个汉字吗？
其实char所占的字节数是与所选择的编码方式有关系的。
在uft8编码下占三个字节； 
在GBK编码下占2个字节； 
但是如果 char表示英文字母： 
在uft8编码下占一个字节； 
在GBK编码下还是占2个字节； 
所以char类型的值不管是英文还是中文都是统一两个字节！ 
可能这样做的原因是因为采用Unicode（两个字节）可以表示所有的字符，这样一个char类型就可以表示所有的单个“字符”，也就是所说的char。而对于utf8编码下字节数是进行转换的。
这里我们有提到了Unicode、GBK、UTF-8关于他们之间的关系请参考<a href="https://blog.csdn.net/qq_34888036/article/details/81296068" target="blank_">UNICODE,GBK,UTF-8区别</a> 
所以一般说的byte范围是-128到127,char范围是0到65535.

