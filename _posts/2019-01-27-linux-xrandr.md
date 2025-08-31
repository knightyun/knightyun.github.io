---
title: Kali Linux 自定义分辨率
layout: post
categories: Exploit
tags: Linux分辨率 cvt xrandr
excerpt: Linux 系统中自定义分辨率的方法
---
Kali中无分辨率1920 x 1080，自定义的步骤：

# 方法一

控制台输入：
```sh
cvt 1920 1080
```

会得到以下内容：
```
# 1920x1080 59.96 Hz (CVT 2.07M9) hsync: 67.16 kHz; pclk: 173.00 MHz
Modeline "1920x1080_60.00"  173.00  1920 2048 2248 2576  1080 1083 1088 1120 -hsync +vsync
```

复制后面的内容，然后在新控制台输入：
```
sudo xrandr --newmode "1920x1080_60.00" 173.00 1920 2048 2248 2576 1080 1083 1088 1120 -hsync +vsync
```

然后再输入：
```sh
sudo xrandr --addmode Virtual1 "1920x1080_60.00" 
```

最后系统设置选择分辨率或者：
```sh
sudo xrandr --output Virtual1 --mode "1920x1080_60.00"
```

但是此方法**重启会失效**，因此可以使用方法二；

# 方法二

在 `/etc/profile` 文件末尾假如以下代码：
```sh
xrandr --newmode "1920x1080_60.00" 173.00 1920 2048 2248 2576 1080 1083 1088 1120 -hsync +vsync
xrandr --addmode Virtual1 "1920x1080_60.00"
```

重启完成。