---
title: cookie&session
layout: post
categories: JavaEE
tags: cookie,session
excerpt: cookie&session的学习
---
##### cookie和session被称作会话技术   
   1.会话：就是浏览器和服务器之间的交互。
   2.会话开始：浏览器访问服务器。
   3.会话结束：浏览器关闭。
###### cookie和session的区别   
cookie:      
   1.cookie是用来在浏览器端存储数据的技术     
   2.一个cookie最多存储4kb   
   3.一个网站最多支持20个cookie   
   4.一个浏览器最多支持300个cookie   
session:   
   1:session是用来在服务器端存储数据的技术   
   2：session是的底层是cookie，所以可以持久化    3：session的是requst.getSession()创建，销毁有三种：第一种Tomcat默认30分钟；第二种手动调用invalidate()销毁；第三种浏览器非正常关闭。   
   
#####域对象：在一定范围内可以共享数据   
   1.requst：一次请求，多个资源，共享数据；   
   2.session：默认一次会话，多个请求，多个资源，共享数据；   
   3.sevletContext：一个项目，多个会话，多个请求，共享同一份数据；   
   

	

   
如需参考文档请点击下载：[参考文档](/assets/cookie&session/day05-cookie&session.pdf)        
如需参考文档请点击下载：[参考文档](/assets/cookie&session/day05扩-session实现关闭浏览器继续可以访问数据.pdf)     
 
