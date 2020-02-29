---
title: filter&listener
layout: post
categories: JavaEE
tags: filter,listener
excerpt: filter&listener的学习
---
##### filter&listener   
   web阶段三大组件：filter、listener、servlet   
###### filter和listener      
filter:      
   1.filter是用来过滤客户端的请求的        
   2.filter有doFilter()是用来放行的      
   3.filter和servlet的配置相似，它的底层也是反射      
   4.有xml和注解两种配置方式   
   5.urlpattern设置为/*表示全部拦截，chain.doFilter表示放行   
   6.生命周期：init()方法服务器启动执行。doFilter()每次访问都执行。destroy()服务器正常关闭执行。        
   7.用来处理乱码问题。(在servlet之前 对数据进行乱码处理)   
filter chain：     
   服务器中允许存在多个过滤器，一组过滤器组合的效果我们称之为过滤器链；每一个过滤器具有自己的功能。   
   顺序：如果是xml则按照自上而下的顺序；如果是注解，则按照名称字母顺序。      
   
   
    
listener:   
   1:监视域对象的一些操作   监听域对象的创建和销毁相关(3个)ServletContextListener、HttpSessionListener、ServletRequestListener   
   2:监听域对象操作域中的相关 增加、替换、删除。。。(3个)
   ServletRequstAttributeListener、ServletContextAttributeListener、HttpSessionAttributeListener   
   3:监听特殊javaBean在 session中的过程(2个)
   HttpSessionBindingListener、Http'S'es'si'o'nActiv'a'ti'o'nListener   
   4:生命周期：由域对象的生命周期决定。比如servletContext服务器启动初始化，服务器正常关闭销毁
   
   
#####servlet的urlPattern配置：   
   1.完全匹配 /名称 /a/b/c/名称   
   2.不完全匹配(目录匹配)/* /a/b/c/*
   3.后缀名匹配 *.jsp *.html *.do *.action   
   4.缺省匹配 /以上三种都没有匹配上，执行默认匹配(我们不匹配，底层使用)
   
 
   

	

   
如需参考文档请点击下载：[参考文档](/assets/filter&listener/day08-filter.pdf)        
    
 
