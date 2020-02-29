---
title: docker的学习
layout: post
categories: 工具
tags: docker
excerpt: docker的学习
---
##### docker       			
### docker is the world's leading software containerzation platform	    			    			   
docker的优势:   
	1.快速的持续集成
	2.服务的弹性伸缩
	3.部署简单
	4.解放运维
	5.为企业节省了机器资源   
docker的核心部分：      
	1.build(镜像)----集装箱-----镜像的本质就是文件系统是一层一层的。除了最上面一层其他层都是只读的。
	2.ship(仓库)----超级码头
	3.run(容器)----容器的本质就是一个进程。最上面一层是可写的
docker仓库   
	1.hub.docker.com
	2.c.163.com(网易蜂巢)
docker常用的命令：   
	1.docker ps	查看正在运行的容器
	2.docker ps -a	查看所有容器
	3.docker exec -it d27bd3008ad9 /bin/bash	进入容器
	4.docker stop $(docker ps -q) 停用全部运行中的容器
	5.docker rm $(docker ps -aq)	删除全部容器
	6.docker stop $(docker ps -q) & docker rm $(docker ps -aq)	停用并删除容器
	7.docker search java	搜索可以使用的容器
	8.docker pull node:latest	下载安装镜像
	9.# 正常启动一个node容器   
	docker run -it node:latest /bin/bash   

	# 加参数 --name 表示启动一个名为node的容器   
	docker run --name node -it node /bin/bash   

	# -p 80:80：将容器的80端口映射到主机的80端口   
	docker run -p 80:80 --name mynginx  -it node /bin/bash   将主机的80端口映射到容器的80端口
docker的网络类型：      （linux使用namespace进行资源隔离 networknamespace用来隔离网络）
	1.briger 有独立的networknamespace桥接模式将主机上的网卡与docker的网桥连接，容器虚拟的网卡会与网桥相连。通过这种方式我们便可以使用端口映射的方式来访问docker上面的应用。   
	2.host 不会获得独立的networknamespace，使用宿主机上的网络   
	3.none 没有网络，无法和外界通讯   

	更多请参考<a href="https://cloud.tencent.com/developer/article/1419063">docker常用命令</a>
Dockerfile
	1.dockerFile就是告诉docker要怎么样制作镜像，每一步是什么。
	2.dockerfile制作好之后就是，就使用docker build构建我们自己的镜像。
	3.更多请参考：<a href="https://www.runoob.com/docker/docker-dockerfile.html">Dockerfile详解</a>
	

	
	

###### 
 
   

	

   
如需参考文档请点击下载：[参考文档](/assets/mybatis/Mybatis第一天讲义.pdf)        
       
    
 
