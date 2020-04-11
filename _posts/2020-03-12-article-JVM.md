---
title: JVM学习与总结
layout: post
categories: JVM
tags: JVM
excerpt: JVM
---
##### JVM学习与总结
本次总结基于jdk1.8,引用官网对于JVM的文档进行摘录，这里给出官方文档的访问路径以供参考：<a href="https://docs.oracle.com/javase/specs/jvms/se8/html/jvms-2.html#jvms-2.5">jdk1.8 jvm参考文档</a>  
##### Run-Time Data Areas
1. The pc Register  
线程私有:Each Java Virtual Machine thread has its own pc (program counter) register.    
2. Java Virtual Machine Stacks     
线程私有Each Java Virtual Machine thread has a private Java Virtual Machine stack, created at the same time as the thread.   
A Java Virtual Machine stack stores frames (§2.6). A Java Virtual Machine stack is analogous to the stack of a conventional language such as C: it holds **local variables** and **partial results**, and plays a part in method invocation and return. Because the Java Virtual Machine stack is never manipulated directly except to push and pop frames, frames may be heap allocated. The memory for a Java Virtual Machine stack does not need to be contiguous.
3. Heap    
所有线程共享The Java Virtual Machine has a heap that is shared among all Java Virtual Machine threads. The heap is the run-time data area from which memory for all class instances and arrays is allocated.
4. Method Area  
所有线程共享The Java Virtual Machine has a method area that is shared among all Java Virtual Machine threads. The method area is analogous to the storage area for compiled code of a conventional language or analogous to the "text" segment in an operating system process. It stores per-class structures such as **the run-time constant pool**, **field** and **method data**, and **the code for methods and constructors, including the special methods (§2.9) used in class and instance initialization and interface initialization**  
5. Run-Time Constant Pool   
A run-time constant pool is a per-class or per-interface run-time representation of the constant_pool table in a class file (§4.4). It contains several kinds of constants, ranging from **numeric literals** known at compile-time to **method** and **field references** that must be resolved at run-time. The run-time constant pool serves a function similar to that of a symbol table for a conventional programming language, although it contains a wider range of data than a typical symbol table. 
6. Native Method Stacks     
An implementation of the Java Virtual Machine may use conventional stacks, colloquially called "C stacks," to support native methods 
##### 类加载的过程
* 加载：会生成每个类的Class的对象
* 链接：将JAVA类的二进制代码合并到JVM的运行状态的过程
	1. 验证：确保加载的类信息符合JVM规范，没有安全方面的问题
	2. 准备：正是为类变量(static)分配内存并设置类变量默认初始值阶段，这些内存都将在方法区中进行分配
	3. 解析：虚拟机常量池中的符号引用(常量名)替换为直接引用(地址)的过程
* 初始化：执行<clinit>方法。赋值动作，静态代码中的语句合并。
##### 类加载的作用
>将class文件字节码内容加载到内存中，并将这些静态数据转换成方法区的运行时数据结构，然后在堆中生成一个代表这个类的java.lang.Class对象，作为方法区中类数据的访问入口。

     
       
    
 
