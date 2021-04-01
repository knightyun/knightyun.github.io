---
title: 面试Springboot篇
layout: post
categories: 面试
tags: 面试
excerpt: 面试
---
##### SpringBoot
Springboot是基于spring的，它使得我们可以快速构建并开发一个生产级别的应用。他的理念是约定大于配置。Springboot是整合spring技术栈的一站式框架，Springboot是简化Spring技术栈的快速开发脚手架。   
##### 微服务
微服务是一种架构风格，一个应用拆分为一组小应用，每个服务都运行在自己的进程内，也就是可独立部署和开发，服务是围绕业务开发的，每个服务可以用不同的语言，不同的技术存储技术。    
##### 分布式 
微服务的拆分让分布式应运而生，分布式解决是springboot+SpringCloud
##### Springboot要点  
springboot的所有自动配置都在spring-boot-autoconfigure的包里面
springboot的特性：
1. 按需加载       

	1. @Conditaional      
	条件装配：满足Conditional指定的条件，则进行注入   
	2. @importSource(classpath:xxx.xml)
	导入bean.xml
2. 配置绑定   
	1. @component+@configurationProperties(prefix="xxx")
	2. @enableconfigurationproperties(xxx.class)+@configurationProperties[必须在配置类中使用]   
3. 自动配置原理   
	1. @springbootApplication等价于@springbootConfiguration+@EnableAutoconfiguration+@ComponentScan
	2. @SpringbootConfiguration里面包含@configuration 代表当前是一个配置类
	3. @ComponentSca组件扫描
	4. @EnableAutoconfiguration里面包含@AutoConfigurationPackage和@Import( AutoConfigurationImportSelector.class)
		1. @AutoConfigurationPackage 自动配置包，他里面是@import(AutoConfigurationPackage.Register.class)给容器中导入一系列组件。将指定的主类mainApplication所在的包导入
		2. @Import (AutoConfigurationImportSelector.class)有127个组件
			* 这里就会从META-INF/spring.factories位置来加载一个文件，也就是会默认扫描我们当前系统里面所有META-INF/spring.factories位置的文件在spring-boot-autoconfigure-2.3.4RELESE.jar下有META-INF/Spring.factories文件，所有的127个组件就是在这个文件下，springboot一启动就要加载的所有配置类 。   
			
总结：xxxxAutoConfiguration---->组件----->xxxxxProperties拿值------>application.properties

>>>> [参考文档](https://www.yuque.com/atguigu/springboot/qb7hy2)	


		
			
 







   










 




   

