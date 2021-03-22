
---
title: 面试Docker篇
layout: post
categories: 面试
tags: 面试
excerpt: 面试
---
##### Docker
Docker 是一个开源的应用容器引擎，基于 Go 语言 并遵从 Apache2.0 协议开源。   

Docker 可以让开发者打包他们的应用以及依赖包到一个轻量级、可移植的容器中，然后发布到任何流行的 Linux 机器上，也可以实现虚拟化。   

容器是完全使用沙箱机制，相互之间不会有任何接口（类似 iPhone 的 app）,更重要的是容器性能开销极低。     
##### Docker架构
Docker 包括三个基本概念:   

Docker的思想来源与集装箱   
1. 镜像（Image）：Docker 镜像（Image），就相当于是一个 root 文件系统。比如官方镜像 ubuntu:16.04 就包含了完整的一套 Ubuntu16.04 最小系统的 root 文件系统。
2. 容器（Container）：镜像（Image）和容器（Container）的关系，就像是面向对象程序设计中的类和实例一样，镜像是静态的定义，容器是镜像运行时的实体。容器可以被创建、启动、停止、删除、暂停等。
3. 仓库（Repository）：仓库可看成一个代码控制中心，用来保存镜像。   
##### DockerFile
Dockerfile 是一个用来构建镜像的文本文件，文本内容包含了一条条构建镜像所需的指令和说明。   
##### FROM 和 RUN 指令的作用

FROM：定制的镜像都是基于 FROM 的镜像   


RUN：用于执行后面跟着的命令行命令   
##### CMD和RUN的区别   
CMD 在docker run 时运行。   

RUN 是在 docker build。    
###### ENTRYPOINT指令
类似于 CMD 指令，但其不会被 docker run 的命令行参数指定的指令所覆盖，而且这些命令行参数会被当作参数送给 ENTRYPOINT 指令指定的程序。







   










 




   

