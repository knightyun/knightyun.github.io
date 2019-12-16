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
   
    
listener:   
   1:   
   
#####servlet的urlPattern配置：   
   1.完全匹配 /名称 /a/b/c/名称   
   2.不完全匹配(目录匹配)/* /a/b/c/*
   3.后缀名匹配 *.jsp *.html *.do *.action   
   4.缺省匹配 /以上三种都没有匹配上，执行默认匹配(我们不匹配，底层使用)
   
 
   

	

   
如需参考文档请点击下载：[参考文档](/assets/filter&listener/day08-filter.pdf)        
    
 
