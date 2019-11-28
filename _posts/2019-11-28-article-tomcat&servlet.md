---
title: tomcat&servlet
layout: post
categories: JavaEE
tags: tomcat,servlet
excerpt: tomcat&servlet的学习
---
##### web程序开发需要知道的知识点：  
首先了解下什么是静态资源 什么是动态资源    
**静态资源**指的是在不修改源码的情况下任何人任何时间看到的资源都是一样的（html、css、js）  
**动态资源**指的是在不修改源码的情况下任何人任何时间看到的资源都是变化的（jsp）  
##### 项目发布的三种方式：  
1. 将项目放在webapps目录下  
2. 在server.xml中配置，配置方式<Context path="/访问路径名称" docBase="被发布的目录"/>缺点：写错路径则Tomcat无法启动会一闪而过访问方式为/访问路径名称/资源文件  
3. 在tomcat\conf\Catalina\localhost下面配置name.xml文件，访问方式为/name/资源文件  

如需参考文档请点击下载：[参考文档](/assets/tomcat&servlet/day02-tomcat&servlet.pdf)  