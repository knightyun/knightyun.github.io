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
##### web应用服务器Tomcat
[Tomcat工作原理图](https://gss0.baidu.com/-vo3dSag_xI4khGko9WTAnF6hhy/zhidao/wh%3D600%2C800/sign=4ee023f865600c33f02cd6ce2a7c7d37/f703738da97739129698658df6198618377ae2a4.jpg Tomcat工作原理图)  
Tomcat的总体结构：Server –> Service –> Connector & Container( Engine –> Host –> Context( Wrapper( Servlet ) ) )    
具体结构请参考:<a href="https://blog.csdn.net/sunyunjie361/article/details/58588033">原理解析</a>  
##### Tomcat加载web应用时的加载顺序是：  
  1：首先是context-param节点

  2：接着配置和调用listeners 并开始监听

  3：然后配置和调用filters filters开始起作用

  4：最后加载和初始化配置在load on startup的servlets  
这个顺序来自于tomcat的架构，具体可以在源码中找到，请参考：<a href="https://blog.csdn.net/chengzhezhijian/article/details/42292195">tomcat的web.xml的加载顺序</a>  
##### servlet的实现类没有main方法，是如何执行的？  
servlet是sever和applet这两个单词掐头去尾得到的，servlet就是服务器端的小应用程序。所以，servlet的实现类事实上是通过服务器执行的，说到底servlet就是Java代码，而Tomcat执行它就是通过web.xml中的<servlet-class>标签所包含的全限定类名通过反射得到类的实例从而调用servlet的service方法来执行的。因为service方法是默认被执行的方法，类似于我们的main()函数。    

servlet3.0可以不用配置web.xml，使用@webServlet注解来实现，使用方法为：@webServlet(urlPatterns={"/myServlet1","myServlet2"})  

servlet的类结构图请参考：[servlet的类结构图](/assets/servlet&tomcat/servlet类结构图.PNG)  

servlet是单例模式，采用懒汉模式，它是单实例，多线程的。init()只初始化一次(默认第一次被访问的时候执行)，service()访问的时候执行(每一次访问都执行)，destry()正常关闭服务器的时候(只销毁一次)。  
  




如需参考文档请点击下载：[参考文档](/assets/servlet&tomcat/day02-tomcat&servlet.pdf)  