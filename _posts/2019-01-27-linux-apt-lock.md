---
title: Linux 中 apt install 的 lock 问题
layout: post
categories: Linux
tags: apt-install-lock
excerpt: apt install 过程遇到 lock 问题的解决方法
---

Linux系统中有时执行 apt install 时，可能会显示以下问题：
```sh
E: 无法获得锁 /var/lib/dpkg/lock - open (11: 资源暂时不可用)
E: 无法锁定管理目录(/var/lib/dpkg/)，是否有其他进程正占用它？
```

根据提示分别找到对应的两个lock文件，移除即可；

解决方法：
```sh
sudo rm /var/cache/apt/archives/lock
sudo rm /var/lib/dpkg/lock
```

再次运行就成功了。