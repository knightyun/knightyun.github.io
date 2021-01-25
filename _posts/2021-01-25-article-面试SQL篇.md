---
title: 面试SQL篇
layout: post
categories: 面试
tags: 面试
excerpt: 面试
---
##### JAVA面试大纲-SQL篇
##### 聚合函数：   
1. 定义：SQL基本函数，聚合函数对一组值执行计算，并返回单个值，也被称为组函数。 聚合函数经常与 SELECT 语句的 GROUP BY 子句的HAVING一同使用。聚合函数对一组值执行计算并返回单一的值。除 COUNT 以外，聚合函数忽略空值，如果COUNT函数的应用对象是一个确定列名，并且该列存在空值，此时COUNT仍会忽略空值。      
2. 性质：所有聚合函数都具有确定性。任何时候用一组给定的输入值调用它们时，都返回相同的值。聚合函数可以应用于查询语句的SELECT中，或者HAVING子句中，但不可用于WHERE语句中，因为WHERE是对逐条的行记录进行筛选。   
>> [csdn参考](https://blog.csdn.net/qq_40456829/article/details/83657396)   
3. 注意：需要注意说明：当同时含有where子句、group by 子句 、having子句及聚集函数时，执行顺序如下：    
   3.1 执行where子句查找符合条件的数据；   
   3.2 使用group by 子句对数据进行分组；   
   3.3 对group by 子句形成的组运行聚集函数计算每一组的值；    
   3.4 最后用having 子句去掉不符合条件的组。   
　　* having 子句中的每一个元素也必须出现在select列表中。有些数据库例外，如oracle.   
　　* having子句和where子句都可以用来设定限制条件以使查询结果满足一定的条件限制。   
　　* having子句限制的是组，而不是行。聚合函数计算的结果可以当条件来使用，where子句中不能使用聚集函数，而having子句中可以。
4. 基本共识:进行groupby时,groupby中的字段可以不出现在select中,但是select中只能有groupby中的字段和函数.
```
ex:SELECT id, aname FROM apparatus GROUP BY astate HAVING astate BETWEEN 0 AND 1   
```
5.  >> [常见SQL面试](https://wenku.baidu.com/view/c47e585812661ed9ad51f01dc281e53a580251ef.html);[常见SQL面试2](https://www.cnblogs.com/diffrent/p/8854995.html)
6. [SQL优化](https://blog.csdn.net/qq_38789941/article/details/83744271)
7. [SQL索引](https://www.cnblogs.com/hyd1213126/p/5828937.html)


 









 




   

