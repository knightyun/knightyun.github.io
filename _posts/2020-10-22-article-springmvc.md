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
3. @requstBody,加在方法的参数前，用于接收前端页面传递的json格式的数据，如果传递的是集合，则可以直接在方法的参数处使用集合来接收   
4. 开启静态资源加载的两种2方式<mvc:resource mapping="" location=""/>//mapping表示映射地址，location表示资源目录或者<mvc:default-servlet-handler/>表示交给原始容器也就是tomcat来寻找路径   
4. @pathvariable使用它来进行占位符的匹配获取工作，ex:@requestmapping(/quick/{name}) 方法参数上(@pathvariable(value="name" required=true) string name)用于获得restful风格参数：   
* Get获得   
* post更新    
* put新增   
* delete删除    
5. 可以自定义转换器，例如日期转换器，自定义完后需要在配置文件中声明并在  <mvc: annotaion driver/>中引用转换器   
6. @requestHeader用于获取请求头    
7. @CookieValue 用于获取cookie的值	
##### 文件上传
1. 文件上传三要素：      
* post提交   
* input type=file   
* type=multipart/form-data 	
2. 文件上传的步骤：   
* 导入坐标   
* 在springmvc的配置文件中配置文件上传解析器     
* 文件保存或处理   
3. filter和interceptor的区别   
* filter是servlet的三大组件之一，只要是web工程都可以使用，interceptor是属于springmvc的。   
* filter如果配置/*则对所有的资源都可以拦截，interceptor只能对controller的方法进行拦截。    



   

