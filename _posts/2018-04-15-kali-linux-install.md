---
title: Linux 初识之 Kali Linux 系统安装详细教程（虚拟机）
layout: post
categories: Exploit
tags: kali系统安装 linux 虚拟机安装 VMware
excerpt: Kali Linux系统在虚拟机上的详细图文安装教程
---
# 目录 <span id="home">
* [一、Kali Linux 介绍](#1)
	* [1、Linux](#1.1)
	* [2、Kali](#1.2)
* [二、虚拟机安装与配置](#2)
	* [1、下载](#2.1)
	* [2、安装配置](#2.2)
* [三、Kali系统安装与配置](#3)

-------------

# 一、Kali Linux 介绍 <span id="1">

## 1、Linux <span id="1.1">

![timg2.jpg](https://i.loli.net/2018/04/15/5ad333eb8df19.jpg)

引用一下[百度百科][linux]：

Linux是一套免费使用和自由传播的类Unix操作系统，是一个基于POSIX和UNIX的多用户、多任务、支持多线程和多CPU的操作系统。它能运行主要的UNIX工具软件、应用程序和网络协议。它支持32位和64位硬件。Linux继承了Unix以网络为核心的设计思想，是一个性能稳定的多用户网络操作系统。

Linux有多个发行版本，以下是[官网][linux.org]提供下载的一些版本：

----------------------------
![20180415140406753.jpg](https://i.loli.net/2018/04/15/5ad33ed9a2cb8.jpg)

---------------------

## 2、Kali <span id="1.2">

![timg.jpg](https://i.loli.net/2018/04/15/5ad3332fef322.jpg)

kali是linux其中一个发行版，基于Debian，前身是BackTrack（简称BT系统）。kali系统内置大量渗透测试软件，黑客工具箱已不足以形容它，可以说是巨大的渗透系统，涵盖了多个领域，如无线网络、数字取证、服务器、密码、系统漏洞等等，知名软件有：wireshark、aircrack-ng、nmap、hashcat、metasploit-framework(msf)。

# 二、虚拟机软安装与配置 <span id="2">

## 1、下载 <span id="2.1">

这里将详细介绍在Windows虚拟机中安装kali linux，使用的虚拟机软件是 **VMware**，可以去[官网下载][vmware]最新版本，**注意：** VMware 10.0版本之后只支持**64位**系统，如果是32位系统用户需要下载10.0及之前的版本。
然后下载发型版的kali linux，[官网下载][kali-download]，根据自己情况选择下载32位或64位，完整版或者轻便版，这里我下载的64位完整版。

##  1、安装配置 <span id="2.2">

接下来一步步安装：

![20180415144118372.jpg](https://i.loli.net/2018/04/15/5ad33ed9b4f7a.jpg)

选择安装位置，注意保证空间充足：

![20180415144303213.jpg](https://i.loli.net/2018/04/15/5ad33ed9b13c4.jpg)

![20180415144404353.jpg](https://i.loli.net/2018/04/15/5ad33ed9afe91.jpg)

等待安装完成：

![20180415144453641.jpg](https://i.loli.net/2018/04/15/5ad33ed9b279d.jpg)

![20180415144527264.jpg](https://i.loli.net/2018/04/15/5ad33ed9b7ebf.jpg)

这是试用版本，需要购买密钥，鼓励购买正版，蛮穷的可以使用以下任一密钥：

>FF31K-AHZD1-H8ETZ-8WWEZ-WUUVA
>>CV7T2-6WY5Q-48EWP-ZXY7X-QGUWD

![20180415144552593.jpg](https://i.loli.net/2018/04/15/5ad33ed9ae9ca.jpg)

安装完成，然后新建虚拟机：

![20180415144927247.jpg](https://i.loli.net/2018/04/15/5ad33ed9b66b3.jpg)

选择推荐的即可：

![20180415145002833.jpg](https://i.loli.net/2018/04/15/5ad33ed9b3abd.jpg)

这里选择安装程序映像文件，浏览选择刚才下载的kali linux文件，后缀是 `.iso`：

![20180415145126392.jpg](https://i.loli.net/2018/04/15/5ad33ed9b9401.jpg)

选择操作系统“linux”，版本是“Debian”：

![20180415145812273.jpg](https://i.loli.net/2018/04/15/5ad33f949f756.jpg)

名称随便取，然后选择虚拟机文件存放位置：

>**注意选择合适位置，这里需要存放几十G的虚拟磁盘文件**

![20180415145936586.jpg](https://i.loli.net/2018/04/15/5ad33f94a5c83.jpg)

设置虚拟磁盘的大小，一般不能低于默认值，下面一般选择单个文件，方便：

![20180415150112131.jpg](https://i.loli.net/2018/04/15/5ad33f94b523f.jpg)

新建完成，硬件可以之后自定义：

![20180415150311408.jpg](https://i.loli.net/2018/04/15/5ad33f94b3b28.jpg)

![20180415150339668.jpg](https://i.loli.net/2018/04/15/5ad33f94e3f6e.jpg)

觉得默认配置不合适可以自定义调整，例如修改内存大小，增加磁盘：

![20180415150430194.jpg](https://i.loli.net/2018/04/15/5ad33f9503b03.jpg)

设置网络适配器模式，可以桥接物理网络（例如电脑连接wifi，虚拟机就和电脑连接同一个wifi），或者NAT模式（类似于电脑成为一个路由器，虚拟机连接电脑的热点），如果不想联网，只用于物理机和虚拟机之间的交流，可以选择主机模式：

![20180415150747931.jpg](https://i.loli.net/2018/04/15/5ad33f94f1e46.jpg)

虚拟机配置完成，接下来开始安装 kali 系统。

# 三、Kali系统安装与配置 <span id="3">

点击启动虚拟机：

![20180415152337260.jpg](https://i.loli.net/2018/04/15/5ad33f94edca2.jpg)

鼠标点击安装界面，之后用键盘方向键和Enter键操作：
>`Live` 开头的不是系统安装，类似于Windows PE，用于恢复系统，其他选项可以不用管，也暂时用不着。
>**这里我们选择简单的图形化安装** `Graphical install` 
>此时鼠标无法操作，退出虚拟机操作界面使用 `ctrl + alt` 键。

![2018041515321839.jpg](https://i.loli.net/2018/04/15/5ad33f94d2cb9.jpg)

选择简体中文：

![20180415153852638.jpg](https://i.loli.net/2018/04/15/5ad33f94eae89.jpg)

![20180415153941517.jpg](https://i.loli.net/2018/04/15/5ad3403ff0501.jpg)

![20180415154023144.jpg](https://i.loli.net/2018/04/15/5ad340400b3b8.jpg)

等待配置一会：

![20180415154326948.jpg](https://i.loli.net/2018/04/15/5ad3404025f68.jpg)

设置主机名称，和Windows的主机名一样：

![20180415154445426.jpg](https://i.loli.net/2018/04/15/5ad3404034393.jpg)

可以暂时不用输入：

![2018041515470772.jpg](https://i.loli.net/2018/04/15/5ad34040359fa.jpg)

设置用户密码登录：

![20180415154826476.jpg](https://i.loli.net/2018/04/15/5ad340404446a.jpg)

等待配置：

![20180415154926766.jpg](https://i.loli.net/2018/04/15/5ad34040310fe.jpg)

可以选择使用整个磁盘：

![20180415155254743.jpg](https://i.loli.net/2018/04/15/5ad3404040f96.jpg)

----------------------
**注：**

这里简单介绍一下里面的 `LVM` 选项：
详见[百度百科][lvm]，LVM是 Logical Volume Manager（逻辑卷管理）的简写，它是Linux环境下对磁盘分区进行管理的一种机制。安装Linux时常出现的一个问题就是合理分区，根据使用情况设置 `/boot`, `/var`,  `/home` 等区块的大小，设置好之后再想要改变就很麻烦，要用分区工具压缩一部分的空闲区出去，然后合并到空间不足的区域。

个人对LVM的理解是，它类似于使用一种**文件夹**的机制，直接使用整块磁盘，把每个分区设置成一种类似文件夹的存在，因为文件夹不会限制大小，因此就能动态调整各区的大小，方便管理。

------------------

继续：

![20180415160939891.jpg](https://i.loli.net/2018/04/15/5ad340403f668.jpg)

可以使用推荐的：

![201804151610212.jpg](https://i.loli.net/2018/04/15/5ad34040429bb.jpg)

确定分配，或者更改区块大小和新增区块：

![20180415161246873.jpg](https://i.loli.net/2018/04/15/5ad3432baa37c.jpg)

确认写入：

![20180415161357309.jpg](https://i.loli.net/2018/04/15/5ad3432b9fe9b.jpg)

接下来安装时间有点长，喝杯茶休息一下 -_- 

![20180415161452740.jpg](https://i.loli.net/2018/04/15/5ad3432b8d7ed.jpg)

终于安装完成，半小时安静的过去了……
这里选择不使用网络镜像：

![20180415164804954.jpg](https://i.loli.net/2018/04/15/5ad3432b91756.jpg)

配置GRUB：

![20180415165316774.jpg](https://i.loli.net/2018/04/15/5ad3432ba8703.jpg)

![20180415165336903.jpg](https://i.loli.net/2018/04/15/5ad3432ba4ff0.jpg)

安装完成：

![20180415165446531.jpg](https://i.loli.net/2018/04/15/5ad343e7d33a7.jpg)

![20180415165502624.jpg](https://i.loli.net/2018/04/15/5ad343e7cbddf.jpg)

选择启动，第二个选项是恢复模式：

![20180415175203402.jpg](https://i.loli.net/2018/04/15/5ad343e7d9d87.jpg)

初始用户名是 **root**：

![2018041517561331.jpg](https://i.loli.net/2018/04/15/5ad343e7d0471.jpg)

之前设置的密码：

![20180415185003860.jpg](https://i.loli.net/2018/04/15/5ad343e7d1c6b.jpg)

到此kali系统就安装完毕了：

![20180415185053453.jpg](https://i.loli.net/2018/04/15/5ad343e7e0f5c.jpg)

内置大量软件，更多功能可以自行发掘：

![20180415185744699.jpg](https://i.loli.net/2018/04/15/5ad343e7f2511.jpg)

![20180415185813698.jpg](https://i.loli.net/2018/04/15/5ad343e7ef4bf.jpg)

-----------------------
[linux]:https://baike.baidu.com/item/linux/27050?fr=aladdin
[linux.org]:https://www.linux.org/
[vmware]:https://www.vmware.com/products/workstation-pro/workstation-pro-evaluation.html
[kali-download]:https://www.kali.org/downloads/
[lvm]:https://baike.baidu.com/item/LVM/6571177?fr=aladdin