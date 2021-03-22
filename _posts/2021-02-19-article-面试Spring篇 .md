---
title: 面试Spring篇
layout: post
categories: 面试
tags: 面试
excerpt: 面试
---
##### JAVA面试大纲-Spring篇
##### 简单的聊一下Spring   
Spring是一个开源框架，由Rod JohnSon发起，是针对bean的生命周期进行管理的轻量级容器。提供了功能强大的IOC和AOP以及Web MVC等功能。   
Spring存在这么久主要是解决了对象的创建以及依赖关系，将对象的管理通过轻量级容器来简单化。


##### 聊一下IOC   
IOC就是控制反转，指的是将对象的控制权交给容器来控制，也叫做DI，即由容器动态的来将某种依赖关系注入到组件之中。
Spring的IOC有三种注入方式 ：构造器注入、setter方法注入、根据注解注入   
##### 聊一下AOP
AOP指的是面向切面编程，它和我们面向对象一样都是一种思想，它也是我们OOP的扩展，它主要是把我们的业务逻辑跟系统服务分开来，使得我们耦合度降低，提高程序的可重用性，同时也提高了开发效率
##### AOP的几个概念点   
1. 连接点(joinpoint)   
指的是所有的方法。   
2. 切点(pointcut)   
指的是需要增强的方法.   
3. 增强(advice)   
指的是你想要增加的功能，类如事务，日志，安全....   
4. 切面(Aspet)   
指的是切入点和通知的结合   
5. 织入(weaving)   
指的是把切面应用到目标对象来创建新的代理对象的过程 
6. 切入点表达式     
访问修饰符          返回值类型（必填）     包和类                    方法（必填）   
常用的写法：   
execution(* com.sunny..*ServiceImpl.*(..))   
表示com.sunny包及其子包下所有的以ServiceImpl结尾的类生成代理对象   
7. BeanFactory和factoryBean的区别   
BeanFactory指的是管理Bean的一个工厂  ，也是IOC容器或对象工厂。在Spring中所有的Bean都是由BeanFactory来进行管理的。它也是一个接口，它有很多实现
DefaultListableBeanFactory、XmlBeanFactory、ApplicationContext的通常实现（FileSystemXmlApplicationContext ；ClassPathXmlApplicationContext；WebXmlApplicationContext）            
factoryBean指的是实现了FactoryBean接口的一个Bean，是一个能生产或者修饰对象生成的工厂Bean。它的实现与设计模式中的工厂模式和修饰器模式类似      
##### Bean的生命周期   
![Bean的生命周期](/assets/Spring的生命周期.jpg)     
##### Bean的作用域   
1. singleton : bean在每个Spring ioc 容器中只有一个实例。
2. prototype：一个bean的定义可以有多个实例。
3. request：每次http请求都会创建一个bean，该作用域仅在基于web的Spring ApplicationContext情形下有效。
4. session：在一个HTTP Session中，一个bean定义对应一个实例。该作用域仅在基于web的Spring ApplicationContext情形下有效。
5. global-session：在一个全局的HTTP Session中，一个bean定义对应一个实例。该作用域仅在基于web的Spring ApplicationContext情形下有效。   

##### Spring4和Spring5的AOP的区别
Spring4中AOP的正常顺序是：环绕前通知-》前置通知-》业务逻辑-》环绕后通知-》后置通知-》返回后通知   
异常情况：环绕前通知-》前置通知-》后置通知-》异常通知
Spring5中AOP的正常顺序是：环绕前通知-》前置通知-》业务逻辑-》返回后通知-》后置通知-》环绕后通知   
异常情况：环绕前通知-》前置通知-》业务逻辑-》异常通知-》后置通知   



##### @Resource和@Autowired的区别   
@Resource是Java提供的，默认是ByName的，只能用在字段上；   
@Autowired是Spring提供的，可以用在字段和set方法上，默认是先ByType再ByName，可以和@Qualified结合使用。   
##### @configuration和@Bean以及@componentScan结合可以实现纯注解开发@import用于多人协同开发  

##### 事务   
 
把一组业务当作一个业务来做，要么全部成功，要么全部失败。    
Spring的事务分为声明式事务和编程式事务   
事务的传播行为：   
1. PROPAGATION_REQUIRED	支持当前事务，假设当前没有事务。就新建一个事务 ---默认
2. PROPAGATION_SUPPORTS	支持当前事务，假设当前没有事务，就以非事务方式运行
3. PROPAGATION_MANDATORY	支持当前事务，假设当前没有事务，就抛出异常
4. PROPAGATION_REQUIRES_NEW	新建事务，假设当前存在事务。把当前事务挂起
5. PROPAGATION_NOT_SUPPORTED	以非事务方式运行操作。假设当前存在事务，就把当前事务挂起
6. PROPAGATION_NEVER	以非事务方式运行，假设当前存在事务，则抛出异常
7. PROPAGATION_NESTED	如果当前存在事务，则在嵌套事务内执行。如果当前没有事务，则执行与PROPAGATION_REQUIRED类似的操作。      

Spring事务隔离级别比数据库事务隔离级别多一个default   

1. DEFAULT （默认）   
这是一个PlatfromTransactionManager默认的隔离级别，使用数据库默认的事务隔离级别。另外四个与JDBC的隔离级别相对应。   
  
在mysql中默认的隔离级别是：mysql默认的事务处理级别是'REPEATABLE-READ',也就是可重复读    


在Oracle中默认的隔离级别是：oracle数据库支持READ COMMITTED 和 SERIALIZABLE这两种事务隔离级别。默认系统事务隔离级别是READ COMMITTED,也就是读已提交               

![事务的隔离级别](/assets/事务的隔离级别.jpg)   

2. READ_UNCOMMITTED （读未提交）   
这是事务最低的隔离级别，它允许另外一个事务可以看到这个事务未提交的数据。这种隔离级别会产生脏读，不可重复读和幻像读。   


3. READ_COMMITTED （读已提交）   
保证一个事务修改的数据提交后才能被另外一个事务读取，另外一个事务不能读取该事务未提交的数据。这种事务隔离级别可以避免脏读出现，但是可能会出现不可重复读和幻像读。   


4. REPEATABLE_READ （可重复读）   
这种事务隔离级别可以防止脏读、不可重复读，但是可能出现幻像读。它除了保证一个事务不能读取另一个事务未提交的数据外，还保证了不可重复读。    

5. SERIALIZABLE（串行化）   
这是花费最高代价但是最可靠的事务隔离级别，事务被处理为顺序执行。除了防止脏读、不可重复读外，还避免了幻像读。

   










 




   

