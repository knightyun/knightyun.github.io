---
title:  Linux 强行取消挂载
layout: post
categories: Linux
tags: linux挂载
excerpt: linux 中遇到目录无法强行取消挂载情况的解决方法
---

Linux系统有时需要取消挂载一些设备或者目录，

例如：
```sh
# /dev/sdb挂载到了 /mnt/usb
umount /mnt/usb
```

但是多半会提示：
```sh
umount: /mnt/usb: target is busy
```

如果已 **备份** 了数据需要强行卸载，并且尝试 `umount -f /mnt/usb` 还是失败的情况

可以使用命令：
```sh
fuser -cu /mnt/usb  #查看挂载文件进程
fuser -mv /dev/sdb  #或者查看挂载点进程
fuser -ck /mnt/usb  #结束进程
fuser -mk /dev/sdb  #使用挂载点结束进程
```

或者使用 **懒卸载** 方式，命令执行后系统会自动关闭相关进程后再卸载：
```sh
umount -l /mnt/usb
```