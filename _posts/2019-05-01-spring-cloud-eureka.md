---
title: Eureka&服务中断
layout: post
categories: Eureka AP机制与服务中断问题
tags: SpringCloud Eureka 服务中断 CSC重构 Spider
excerpt: Eureka AP机制与服务中断问题
---

# 现象描述

当通过spider重启项目时，对应服务会出现中断情况。

# 实际影响

- 影响开发&测试效率：每次重启服务，开发都需要在测试群里提前通知，影响工作效率；
- 生产要求：服务支持不中断重启，是服务上线前的基本要求，上线后，完全有可能由于某些不可控因素需要白天重启服务，此时如果出现几分钟的服务不可用，一级故障肯定跑不了了；

## 问题分析

1. 为什么现在生产环境上不存在服务中断问题呢？

目前，房贷小微都已经接入了服务适配服务，服务适配服务重启，房贷小微是不受影响的。

原因：房贷小微是通过计算节点访问服务适配服务，spider提供了服务重启不中断的相关支持。具体支持原理也很简单，步骤如下

- 第一步，spider会启动一个新的docker容器，并在新容器上部署被启动服务的镜像，然后启动服务；
- 第二步，spider会定期通过健康检查url（需要提前配置）去检测新服务是否已经启动完毕，在这一时期，旧服务一直存活，所有请求还是分发到旧服务上；
- 第三步，当spider发现新服务已经启动完毕后，会把所有请求分发到新服务上，然后关闭旧服务所在容器，释放相关资源，整个重启服务流程结束；

> 特别注意：如果你的服务没有健康检查支持，第二步是会跳过的，spider发现新服务已经开始启动，就会关闭旧服务，此时就会出现中断情况。所以，申请部署新服务时，记得一定要配置健康检查！

2. 为什么CSC重构后的相关服务会出现服务中断问题呢？

原因：CSC重构后的系统是由众多微服务组成的，服务实例会动态变化，比如重启、缩容、扩容等会导致服务实例地址的变化。
而这一过程，我们期望是自动完成，无需人工介入，服务注册和发现技术就是解决此问题的。
目前，我们采用了EUREKA注册中心。EUREKA的是AP机制（保证可用性和分区容错性），不保证强一致性。目前的服务中断问题正是由此导致的。

> 发散性问题：如果我们服务间采用计算节点访问，是不是也可以保证服务不中断呢？
  答案：是的。但是，如果放弃了EUREKA，SpringCloud现有的很多功能相当于放弃了，比如ribbon、网关的蓝绿部署等都是基于EUREKA去实现的。
  此外，如果考虑到使用其他容器，比如VM或者Zstack，每次增加或删除服务器，都需要手动更改NGINX配置，当服务特别多的时候，将会增加大量额外的运维工作。

具体是如何出现服务中断的，可以通过重启服务的完整过程来进行说明

![eureka工作机制](pictures/eureka.png)

- 第一步，spider会启动一个新的docker容器，并在新容器上部署被启动服务的镜像，然后启动服务；
    - 如果采用的是SpringCloud框架，新起的服务会马上把信息注册到EUREKA上；
    - 如果是非SpringCloud，周期性（默认30s，可通过eureka.client.instance-info-replication-interval-seconds调整）的将信息注册到EUREKA上；
- 第二步，EUREKA收到客户端上报的注册信息后，将新注册服务信息放到readWriteCacheMap中，同时周期性（默认30s，可通过eureka.server.response-cache-update-interval-ms调整）的将信息刷新到缓存中（readOnlyCacheMap）中
    - 客户端拉取信息是从缓存（readOnlyCacheMap）中拉取的【readOnlyCacheMap这个可通过eureka.server.use-read-only-response-cache=false关闭的，由于目前EUREKA是公用的，基础研发部反馈，默认配置是不能动的】；
    - 如果你通过web页面去查看eureka上客户端的注册信息，看到的数据是readWriteCacheMap中的，也就是说，你即便在页面上看到了新启动服务的信息，也不代表调用方已经获取到了最新的实例信息；
- 第三步，客户端会定期（默认30s,可通过eureka.client.registry-fetch-interval-seconds调整）从EUREKA上拉取最新的注册信息
- 第四步，如果客户端采用了ribbon进行负载均衡，ribbon使用ribbon缓存进行负载均衡，客户端会定期（默认30s,可通过ribbon.ServerListRefreshInterval进行调整）最新拉取到的信息同步到ribbon缓存

理解了以上四步，我们思考一个问题，新服务上线，客户端最大可能多久可以拿到最新的服务信息

- SpringCloud下=0(首次注册 init registe) + 30(readOnlyCacheMap)+30(client fetch interval)+30(ribbon)=90
- 非SpringCloud下=30(首次注册 init registe) + 30(readOnlyCacheMap)+30(client fetch interval)+30(ribbon)=120

结论：90s的延迟，完全可能存在这样的场景：新服务已经起来了，老服务已经关闭，但是客户端由于没有拿到最新的地址信息，导致服务出现中断问题。

上面只分析了服务上线的情况，还有服务下线的情况，如果没有做特殊配置的话，EUREKA连续3个心跳周期没有检测到客户端心跳的话，会将这一节点剔除，客户端获取到服务不可用的信息会更晚。

# 解决方案
- EUREKA配合改造：提供EUREKA服务线下接口；
- Spider配合改造：当发现新服务已经启动完毕后，主动调用eureka下线接口，节省90s延迟；

为了让服务尽快的切换到新服务上，需要调整默认配置

- 消除首次注册的30s延迟：采用SpringCloud框架（现状已经满足）；
- 调整客户端拉取注册中心配置的周期：目前改为5s;
- 关闭EUREKA缓存（基础研发部不同意，网上查了下，小规模集群（几千个节点）可以关闭，超大规模（几万甚至更高的）建议开启）；
- 调整本地ribbon缓存刷新时间：目前改为3s;


# 后续问题

1. 问题一：这个解决方案升级到测试后，服务中断问题得到了极大的缓解，从原先的1-2分钟不可用，变更为了3-5s服务不可用。

经过反复测试和排查，问题定位到了是由于SpringCloud下首次注册太“迅速”，服务还没有完全启动，就已经把新服务的信息注册到EUREKA上了。而此时调用端恰好拉取到最新的地址信息后，会出现调用失败情况。

- 解决思路1：SpringCloud下首次注册能不能在服务启动完毕后再注册，查了一波资料，没有找到线索。
- 解决思路2：ribbon支持重试机制，如果某个服务节点访问不通，换另到另外一个节点重试。

ribbon配置如下

~~~
ribbon:
  #Ribbon缓存更新周期默认30s,改为3s
  ServerListRefreshInterval: 3
  # 请求处理的超时时间
  ReadTimeout: 10000
  # 请求连接的超时时间
  ConnectTimeout: 3000
  #同一台实例最大重试次数,不包括首次调用
  MaxAutoRetries: 1
  #重试负载均衡其他的实例最大重试次数,不包括首次调用
  MaxAutoRetriesNextServer: 2
  # 对所有操作请求都进行重试
  OkToRetryOnAllOperations: true
  retryableStatusCodes: 404,408,502,500
~~~
实际上，我们已经加上了ribbon的相关配置，但是似乎没有起作用，经过调研发现原来是ribbon生效必须引入这个jar，否则不会生效。

~~~
<dependency>
    <groupId>org.springframework.retry</groupId>
    <artifactId>spring-retry</artifactId>
</dependency>
~~~

2. 问题二：特殊场景下服务出现不可用情况

### 现象描述

有一天，测试人员反馈组合服务不可用，但是登录spider平台，发现组合服务是正常的，但是流程服务缺一致感知不到。【非必现问题】

登录eureka平台查看后，发现组合服务一直是失效状态。

失效状态目前只有两个途径可以做到，一个是人为的在eureka plus上手动失效（排除），
另外一种可能就是跟spider调用eureka下线接口有关（重点怀疑）。

### 问题复现

我在本地进行了测试（启动一个eureka，一个服务A，然后让服务A失效，关闭服务A并且重启，服务A一直失效），很容易复现了，于是将这一问题反馈到基础研发部相关人员。

基础研发部同事反馈不可能存在这种情况，如果ip相同，新起的服务一定会覆盖现在失效的ip服务的，他们之前做过这种测试。

特别神奇，在他本地启动相同的服务，执行相同的操作，确实没有出现我这边的测试结果。

百思不得其解，尝试了很多不同的思路，最后，是通过对比他的本地日志和我的本地服务日志，才发现关闭服务时的日志不一样。

对方的本地日志会多打印如下信息

~~~
2019-04-22 11:56:45.243  INFO 5788 --- [       Thread-6] o.s.c.support.DefaultLifecycleProcessor  : Stopping beans in phase 0
2019-04-22 11:56:45.244  INFO 5788 --- [       Thread-6] o.s.j.e.a.AnnotationMBeanExporter        : Unregistering JMX-exposed beans on shutdown
2019-04-22 11:56:45.245  INFO 5788 --- [       Thread-6] o.s.j.e.a.AnnotationMBeanExporter        : Unregistering JMX-exposed beans
2019-04-22 11:56:45.246  INFO 5788 --- [       Thread-6] com.netflix.discovery.DiscoveryClient    : Shutting down DiscoveryClient ...
2019-04-22 11:56:45.247  INFO 5788 --- [       Thread-6] com.netflix.discovery.DiscoveryClient    : Unregistering ...
2019-04-22 11:56:45.269  INFO 5788 --- [nfoReplicator-0] com.netflix.discovery.DiscoveryClient    : DiscoveryClient_CHANNEL-HELLO-SERVICE/10.10.173.191:8888 - registration status: 204
2019-04-22 11:56:45.275  INFO 5788 --- [       Thread-6] com.netflix.discovery.DiscoveryClient    :DiscoveryClient_CHANNEL-HELLO-SERVICE/10.10.173.191:8888 - Deregister  status: 200
2019-04-22 11:56:45.284  INFO 5788 --- [       Thread-6] com.netflix.discovery.DiscoveryClient    : Completed shutdown of DiscoveryClient
~~~

### 问题分析

通过调研这段日志，获取到了一个关键的知识点：eureka服务正常关闭时，会执行一些清理工作（主动删掉eureka上整条注册信息）。

> eureka上提供的下线接口，注册信息还在，只不过状态是OUT_OF_SERVICE【整条信息的删除是靠连续三个周期未收到客户端心跳来删除的】，
  整条注册信息还在，所以，如果90s内再相同ip上启动新服务的话，这条注册信息的状态还是OUT_OF_SERVICE，而不是UP，进而导致调用端感知不到新服务。

还有一个知识点应该是我们提前具备的：kill -9强制关闭，kill -15是正常关闭。

于是很自然的联想到是不是关闭服务的方式不同，然后才注意到了我使用的windows电脑，他使用的是mac电脑。

网上查了下，windows的idea关闭按钮相当于kill -9，mac的idea点击关闭按钮，相当于kill -15.

于是找spider的人沟通，目前关闭服务是不是用的kill -9.得到的反馈是,spider其实不会关闭服务，而是直接关闭docker容器，其实也相当于kill -15。

### 解决方案

问题原因调研清楚了，解决问题的方案就比较简单了。

- spider配合改造：docker容器关闭前，先正常关闭应用。

spider预关闭脚本如下

~~~
curl "http://10.143.135.138:19002/gantry/setOfflineService?ip=$MY_POD_IP" -o /viewlogs/applog/curl.log ; 
sleep 40 ; 
killall -15 java > /viewlogs/applog/kill.log 2>&1
~~~

> 脚本中40的来源【0(首次注册 init registe) + 30(readOnlyCacheMap)+5(client fetch interval)+3(ribbon)=38】
  这个预关闭脚本还是不太稳定，上周已经测通了，这周又不起作用了，已经让spider的同事继续排查下。
