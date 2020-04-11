---
title: kafka学习
layout: post
categories: kafka
tags: kafka
excerpt: kafka学习与总结
---
#### kafka的特点  
1. 高性能
2. 高吞吐量
#### kafka架构组件  
* producer
* consumer(每个consumer都会有一个consumerGroup)
* broker（每个broker都是一个服务结点）和zookeeper
consumer会从broker上面pull数据，producer会push数据到broker。  
produer会发消息到topic中，topic中会有多个partition。    
topic是一个逻辑概念，具体的消息是存储在partition上面的。  
partition是由一连串顺序的数据组成的。offset就是顺序从o增加的。分区数和broker没有关系，我们可以创建上百个分区     
#### kafka高吞吐量的因素  
1. 顺序写的方式存储数据  
2. 批量发送  
3. 零拷贝（直接从磁盘上面拷贝到内核空间 拷贝到网络，中间省去了传统方式的几个步骤）  
#### 日志策略
1. 日志保留策略(时间、大小)
2. 日志压缩策略
#### kafka的可靠性
生产者发送消息到broker，有三种确认方式：   (request,required,acks)
1. acks=0；  producer不会等待broker(leader)发送ack，既有可能丢失也有可能重发。  
2. acks=1；  leader接收消息后发送ack，丢会重发，丢的概率很小。
3. acks=-1； 当所有的follow节点同步消息成功后发送ack，丢失的可能性比较低。  
#### 副本机制(高可靠性副本)
replication-factor表示的是副本数，副本机制保证了消息的可靠性   
#### leader选举
ISR(副本同步队列)维护的是有资格的follower节点
1. 副本的所有节点都必须要和zookeeper保持连接   
2. 副本的最后一条消息的offset和leader副本的最后一条 消息的offset之间的差值不能超过一个阀值，这个阀值是可以设置的(replica.lag.max.messages)。  
HW&LEO   
hw:high water mark   
leo:log end offset   





  

     
       
    
 
