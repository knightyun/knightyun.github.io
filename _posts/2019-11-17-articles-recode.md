---
title: recode ideas
layout: post
categories: 生活
tags: 生活记录
excerpt: 记录上一周的工作内容
---
#### 使用java自带的keytool工具来生成ssl配置
自签名CA证书
keytool -genkeypair -keystore mycastore.jks -storepass 100863 -alias myca -validity 365 -dname CN=ca,C=cn -ext bc:c

keytool -exportcert -keystore mycastore.jks -storepass 100863 -alias myca -rfc -file myca.cer
服务器证书
keytool -genkeypair -keystore server.keystore.jks -storepass 100863 -alias server -keypass 100863 -validity 365 -dname CN=127.0.0.1,C=cn

keytool -certreq -keystore server.keystore.jks -storepass 100863 -alias server -keypass 100863 -file server.csr



keytool -gencert -keystore mycastore.jks -storepass 100863 -alias myca -keypass 100863 -validity 365 -infile server.csr -outfile server.cer



keytool -importcert -keystore server.truststore.jks -storepass 100863 -alias myca -keypass 100863 -file myca.cer




keytool -importcert -keystore server.keystore.jks -storepass 100863 -alias myca -keypass 100863 -file myca.cer


keytool -importcert -keystore server.keystore.jks -storepass 100863 -alias server -keypass 100863 -file server.cer


keytool -genkeypair -keystore client1.keystore.jks -storepass 021406 -alias client1 -keypass 021406 -validity 365 -dname CN=client1,C=cn


keytool -gencert -keystore mycastore.jks -storepass 100863 -alias myca -keypass 100863 -validity 365 -infile client1.csr -outfile client1.cer



keytool -importcert -keystore client1.truststore.jks -storepass 021406 -alias myca -keypass 021406 -file myca.cer



keytool -importcert -keystore client1.keystore.jks -storepass 021406 -alias myca -keypass 021406 -file myca.cer


keytool -importcert -keystore client1.keystore.jks -storepass 021406 -alias client1 -keypass 021406 -file client1.cer


