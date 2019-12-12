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
#####
测试代码：用完即删 
`package com.aia.dao.impl;

import com.aia.dao.UserDao;
import com.aia.pojo.Properties;
import com.aia.pojo.User;
import com.alibaba.druid.pool.DruidDataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;


import javax.sql.DataSource;
import java.sql.ResultSet;

@Repository
public class UserDaoImpl implements UserDao {
    @Autowired
    private JdbcTemplate jdbctemplate;


    @Override
    public User selectUser() {
        User user = new User();
        return jdbctemplate.queryForObject("select * from user", (ResultSet resultSet, int i) -> {
            user.setUsername(resultSet.getString("username"));
            user.setPassword(resultSet.getString("password"));
            return user;
        });
    }

    public Properties getProperties(int key){
        Properties properties = new Properties();
        return jdbctemplate.queryForObject("select * from properties",(ResultSet resultSet, int i) -> {
            properties.setUrl(resultSet.getString("url"));
            properties.setDriverClassName(resultSet.getString("driverClassName"));
            properties.setUsername(resultSet.getString("username"));
            properties.setPassword(resultSet.getString("password"));
            return properties;

    });

    }
    public DataSource getDataSource(Properties properties){
        DruidDataSource druidDataSource = new DruidDataSource();
        druidDataSource.setUrl(properties.getUrl());
        druidDataSource.setDriverClassName(properties.getDriverClassName());
        druidDataSource.setUsername(properties.getUsername());
        druidDataSource.setPassword(properties.getPassword());
        return druidDataSource;
    }
    public void test(){

        jdbctemplate.setDataSource(getDataSource(getProperties(1)));
    }
    @Override
    public User getUserBySecondDataSource(){

        test();
        User user = new User();
        return jdbctemplate.queryForObject("select * from user", (ResultSet resultSet, int i) -> {
            user.setUsername(resultSet.getString("username"));
            user.setPassword(resultSet.getString("password"));
            return user;
        });
    }

}
`
`      <dependency>

          <groupId>com.alibaba</groupId>

          <artifactId>druid</artifactId>

          <version>1.1.6</version>

      </dependency>
`   
	

   
如需参考文档请点击下载：[参考文档](/assets/cookie&session/day05-cookie&session.pdf)        
如需参考文档请点击下载：[参考文档](/assets/cookie&session/day05扩-session实现关闭浏览器继续可以访问数据.pdf)     
 
