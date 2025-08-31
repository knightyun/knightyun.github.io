---
title: Linux 中 sudo 免密码
layout: post
categories: Linux
tags: sudoers sudo
excerpt: Linux 中执行 sudo 不用输入密码的方法
---
平时在 Linux 中执行一些命令时，可能会遇到 `Permission denied` 这样的提示，即该用户没有权限；

所以一般会想到在命令最前面加上 `sudo` 后再执行，然后有可能会提示输入当前用户的密码；

再接下来，如果命令没有正常执行，一般又会提示：`user is not in the sudoers file. This incident will be reported.`，即当前用户没有出现在这个叫 `sudoers` 的文件里面，那么这个文件在哪里呢？

一般在这个位置：

    /etc/sudoers

所以只需要把当前用户添加到这个文件就行了，执行 `su` 后根据提示输入 `root` 账户密码，切换到 root 用户，然后用 `vi /etc/sudoers` 或者 `visudo` 命令编辑该文件；

在里面可以找到这一行：

    root ALL=(ALL:ALL) ALL

大致意思是 root 用户具有所有权限，所以可以在下面加入这么一行：

    user ALL=(ALL:ALL) NOPASSWD:ALL
    
其中 `user` 是当前登录的用户名，这样以后使用该账户执行 `sudo` 就不用输入密码了；

如果存在多个账户，要让这些账户执行 `sudo` 时都不用输入密码的话，可以添加下面这行：

    %sudo ALL=(ALL:ALL) NOPASSWD:ALL
    
保存退出就 OK 了。