---
title: workIssue
layout: post
categories: work
tags: work
excerpt: 工作中的问题记录
---
### 工作中的问题记录

1. 在使用k8s的过程中发现部署容器的时候通过yaml文件设置的环境变量获取不到，最终发现是因为环境配置的环境变量是小写所导致，更改为大写之后测试正常。
2. 当数据库密码中含有特殊字符串类如;的时候，我们无法使用连接字符串即通过datasource.setUrl(connString)来创建连接，最终通过使用password={value}的方式来解决。
3. 可以通过使用java -Djava.ext.dirs= -jar 的方式在启动jar文件的时候动态加载其他的jar包。注意dirs可以包含多个目录，在windows环境下使用;来分隔，在Linux下使用:来分隔，通过这个命令启动jar文件时会弃用我们java的ext目录的jar文件，所以需要我们再次配置ext目录。类如:   
java -Djava.ext.dirs=./;${JAVA_HOME}/jre/lib/ext/ -jar app.jar      
java -Djava.ext.dirs=./plugins:${JAVA_HOME}/lib/ext/ -jar app.jar   
4. sqlsever中的触发器:分为2种。　
`instead of 触发器:在数据更新到数据库之前执行的操作
`after(for)触发器：在数据更新到数据后再执行的操作
5:\t表示缩进一个tab;\n表示换行(enter)
6:	SET @sql = N'...'这里的N表示使用unicode编码。
7：	EXEC sp_executesql @sql;执行sql语句的命令。这里的@sql必须以N开头否则报错.


