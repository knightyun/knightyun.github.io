---
title: SpringMVC
layout: post
categories: SpringMVC
tags: SpringMVC
excerpt: SpringMVC
---
##### SpringMVC学习与总结
###### springmvc原理:   
####### springmvc是利用listener来实现的，通过监听服务器启动来加载spring的配置文件从而得到spring容器并从中取出service相关Bean再调用其中的方法来实现mvc模式(三层架构)。其中通过dispatchservlet来加载公用的组件，通过controller来定制特有的模块。所以dispatchservlet需要配置并拦截所有的请求。
##### springmvc执行流程   
1. 用户发送请求到达dispatcherServlet。   
2. dispatcherServelet收到请求调用处理器映射器handlerMapping。   
3. 处理器映射器找到具体的处理器(可以根据xml配置或者注解进行查找),生成 处理器对象及处理器拦截器(如果有则生成)一并返回给dispatcherServlet。      
4. dispatcherServlet调用处理器适配器.   
5. 处理器适配器经过适配调用具体的处理器(controller，也叫后端处理器)。   
6. controller执行完成返回moderAndView。   
7. 处理器适配器将moderAndView返回给dispatcherServlet。       
8. dispatcherServlet将moderAndView传给视图解析器   
9. 视图解析器解析后返回具体的view。   
10. dispatcherServlet根据view进行视图渲染(即将 模型数据填充到视图中).DispatcherServlet将视图响应给用户。   
###### Springmvc注解   
1. @responseBody 用来指定返回的是一个字符串   
2. 如果想要返回一个对象或者集合 需要在springmvc配置文件中加<mvc: annotaion driver/>表示通知默认框架底层jackson来做转化并返回json串。   
   

