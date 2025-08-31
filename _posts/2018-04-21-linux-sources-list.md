---
title: Kali Linux 之软件安装、卸载、更新和修改更新源
layout: post
categories: Exploit
tags: Linux安装软件 Linux更新源
excerpt: Linux 系统软件安装、卸载、更新与修改更新源
---
使用Linux系统，与Windows系统一样，也需要及时进行软件与系统的更新。

## 软件

这里以 [Kali Linux][kali] 系统为例，介绍常用的软件安装、卸载与更新命令：

## 软件安装

安装前先搜索一下更新源中是否有该软件，这里使用 `apt` 命令，貌似比另外一个类似的命令 `apt-get` 友好一些。

例如安装 `leafpad` 这个软件：

	apt search leafpad

然后安装这个软件：

	apt install leafpad

然后确定安装就行了。

> 有时会出现一些 `failed` 可以按照提示使用命令 `apt install --fix-missing` 修复。

## 软件卸载

简单卸载软件：

	apt remove leafpad

卸载软件并移除配置文件：

	apt-get purge leafpad

卸载自动安装并且未使用的软件

	apt autoremove
	
## 软件更新

先更新一下源：

	apt update

> 这个操作并没有开始更新软件，类似于将远程源中的最新版本信息更新到本地

接下来才开始更新软件：

	apt upgrade

更新系统：

	apt full-upgrade

或者：
	
	apt-get dist-upgrade

清理安装包：

	apt-get clean
	apt-get autoclean

## 更新源

Linux 更新源文件位于 `/etc/apt/sources.list` ，系统就是从这个文件中读取一些网址参数下载安装软件，默认的是 kali 官方源，我们可以修改为国内一些较快的源，例如阿里、中科大、网易等，加快下载速度。

找到并编辑上述 `sources.list` 源文件，替换为以下内容：
```sh
#aliyun 阿里云
deb http://mirrors.aliyun.com/kali kali-rolling main non-free contrib
deb-src http://mirrors.aliyun.com/kali kali-rolling main non-free contrib

# ustc 中科大
deb http://mirrors.ustc.edu.cn/kali kali-rolling main non-free contrib
deb-src http://mirrors.ustc.edu.cn/kali kali-rolling main non-free contrib
#deb http://mirrors.ustc.edu.cn/kali-security kali-current/updates main contrib non-free
#deb-src http://mirrors.ustc.edu.cn/kali-security kali-current/updates main contrib non-free

# kali 官方源
deb http://http.kali.org/kali kali-rolling main non-free contrib 
deb-src http://http.kali.org/kali kali-rolling main non-free contrib 

# 默认的，可以注释掉不用管
#deb http://security.kali.org/kali-security kali-rolling/updates main contrib non-free
#deb-src http://security.kali.org/kali-security kali-rolling/updates main contrib non-free
```

以上是目前加快的，也可以百度一下增加其它源

--------------
[kali]: https://blog.csdn.net/knigh_yun/article/details/79949512