---
title: requst&response
layout: post
categories: JavaEE
tags: requst,response
excerpt: requst&response的学习
---
###### 请求转发和重定向的区别   
request:      
   1. 我们使用`request.getRequestDispatcher("").forward(request,response);`来调用另外一个servlet。      
   2. request对象是由tomcat创建，我们可以使用map来模拟它。   
   3. 请求转发是一次请求多个资源(servlet)，多个资源可以共享数据。因为调用的是同一个requst对象。     
   4. 请求转发的生命周期是请求开始，响应结束。  
   5. 请求转发只能站内转发，即同一个项目内。   
response:   
   1:重定向的原始方式`response.setStatus(302);response.setHeader("location","另外一个servlet的name")`   
   2:重定向的简写方式`response.setRedirect("另外一个servlet的name")`      
   3:重定向是多个请求多个资源      
   4：重定向会修改地址栏，请求转发不会修改地址栏   
   5：重定向不会携带数据，请求转发会携带数据   
   6：重定向会跳转站外资源，而请求转发只会访问站内     
##### 域对象学习   
	1:servletContext是指上下文对象，或者跟对象，是整个项目的对象，所以他可以获取整个项目的所有资源；   
	2:它的获取方式有`getServletConfig().getServletContext()`获取`getServletContext()`   它的底层就是前面的代码；   
	3:servletConfig对象是servlet的配置对象，每个servle都有各自的配置对象，是web.xml的核心配置；   
	4：web.xml是继承自tomcat的web.xml的。   
	5：获取资源的方式有`class.classLoader().getResourceAsStream()`负责src下面的内容；而`getServletContext().getResourceAsStream()`加载web下的资源文件`getServletContext().getContextPath()`获取项目的根路径      
	

   
如需参考文档请点击下载：[参考文档](/assets/requst&response/day03-request.pdf)     
如需参考文档请点击下载：[参考文档](/assets/requst&response/day04-response.pdf)  
