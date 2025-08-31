---
title: 手机端（安卓）安装 Kali Linux 系统详细教程
layout: post
categories: Exploit
tags: Kali Linux 手机
excerpt: 关于安卓端安装 Kali Linux 的详细教程
---
<!--
# 前言
 
之前写有[文章](https://knightyun.github.io/2018/04/15/kali-linux-install)介绍过关于 Kali Linux 系统安装的详细教程，不过是在电脑端真机或虚拟机中的安装步骤，那么作为平时使用最多并且能方便携带的智能手机端，是否有方法或技术来实现安装呢？还确实有，这也是该文章的主旨。我们都知道安卓系统本身就是 Linux 系统的一个发行版本，所以在技术理论上是有可行性的，并且目前还确实有人实现了，至于苹果手机（iOS系统）端，笔者没做研究，就不做阐述了，有兴趣可以自行了解。那么现在就来介绍一下如何在手机端（安卓系统）进行 Linux 系统（包括但不限于 Kali）的安装。
 
# 原理概述
 
其实实现该技术的原理并不复杂，由于安卓是 Linux 系统的一个分支，所以和其他主流 Linux 操作系统之间有着很大的共同性，比如很多 shell 指令代码都能使用。另外，Linux 命令中有一个叫 `chroot` 的，大概的作用就是在指定的根目录下运行命令，通俗讲，类似于 Windows 系统中的安全沙箱的概念，即一个安全的隔离环境，这也是该命令的目的所在。因此，既然能在该指定目录下运行一些命令，那么要是把整个操作系统的命令、目录以及文件都装进去，那它不就成了一个嵌入的系统了吗，这里又有些类似虚拟机的概念。
 
当然，要在手机中执行这些命令就免不了要手机获得 **root 权限**，即对手机进行 ROOT；不用担心，这只是其中一个办法，本文也会介绍另一种不需要 ROOT 手机的方法。总结一下二者的原理：ROOT 操作相当于直接在手机安卓系统中挂载一个 Linux 系统（例如 Kali），而非 ROOT 方法就有些绕，类似于在安卓系统中通过软件挂载一个能执行一些命令的环境（当然这样会有很多权限限制，毕竟没有 ROOT），然后在这个环境中就可以再挂载想要的 Linux 操作系统了，由于这个系统在一个虚拟的环境中，所以就不存在权限的问题了（得不到真实的权限，给与虚拟的权限还是做得到的→_→，哈哈哈）。通俗讲就是，ROOT 使用的是真机中的虚拟机，而非 ROOT 使用的是真机中的虚拟机中的虚拟机（感觉绕可以再读几遍）。
 
下面是安装系统的两种方法：
 
# ROOT 环境

## 主要软件

### Linux Deploy

有 root 权限的话，安装就比较简单，并且安装的系统使用也比较流畅，毕竟是直接与真机硬件交互的，然后就先介绍一下该方法的主角：**Linux Deploy**，它是一个安卓软件，图标是一个小企鹅，在各大应用市场应该都能搜得到，找不到的话可以在这里下载：
```
链接: https://pan.baidu.com/s/16OKQc2ru5E7yOTliDzNuUw
提取码: vi7w
```

### VNC Viewer

另外需要一款远程连接软件（这里使用 VNC Viewer）来显示系统界面，因为系统安装到手机中后，一般不会直接把桌面和窗口输出到手机的主屏幕，所以需要远程桌面软件连接到该系统来进行显示，否者就是使用终端连接（如 SSH）的纯命令行操作，VNC Viewer 软件也能在各大市场搜到，或者从下面的链接下载：
```
链接:https://pan.baidu.com/s/1cjBii8MWSAqsM-9urW658Q
提取码:h7si
```

### Terminal

一款安卓的终端软件（非必需），可以在手机上执行一些 Linux 命令，也可以使用它提供的 SSH 连接到之后安装的系统，依然，市场搜不到可以在下面的链接下载：
```
链接: https://pan.baidu.com/s/1ZOUjbmW0MLjbMunAGecGfA
提取码: 5jhj
```
 
下面是 Deploy 软件主界面的截图：

![Screen-20191211-132447.png](https://i.loli.net/2019/12/11/7imZxLfOoWlKQ9U.jpg)
 
![Screen-20191211-132433.png](https://i.loli.net/2019/12/11/vheSDoyjMqwIfz5.jpg)

## 配置

在安装系统前，需要进行一些配置，顺便解释一下各个配置选项，先点击软件主页的配置按钮（上图右下角）进入配置页面：

![Screen-20191211-142939.png](https://i.loli.net/2019/12/15/wHhuIdSUeTmJErL.jpg)


**发行版本**，点进去选择想要的 Linux 发行版，这里以 Kali 为例：

![Screen-20191211-142948.png](https://i.loli.net/2019/12/15/R7g9OHcXkKydQFM.jpg)

**架构**，点进去会出来这么几个选项：

![Screen-20191211-143014.png](https://i.loli.net/2019/12/15/niRIMCPGuhf9LyE.jpg)

这里简单解释一下选项中的五种架构，前三个 **armel, armhf, arm64** 都是 ARM 处理器（常见的手机处理器品牌，类似于电脑的 Intel）的几个版本，区别如下：
- armel：（arm eabi little endian）也即softfp，用fpu计算，但是传参数用普通寄存器传，这样中断的时候，只需要保存普通寄存器，中断负荷小，但是参数需要转换成浮点的再计算；
- armhf：（arm hard float）也即hard，用fpu计算，传参数用fpu中的浮点寄存器传，省去了转换性能最好，但是中断负荷高；
- arm64：64位的arm默认就是hard float的，因此不需要hf的后缀；
 
至于第四个 **i386** 是 Intel 的 32 位处理器架构，最后一个 **amd64** 则是 AMD（一家类似 Intel 的处理器公司）的 64 位处理器架构；

那么要如何判断自己的手机是哪种架构呢？方法很多，可以使用上面提到的 Terminal 软件，通过 `cat /proc/cpuinfo` 命令查看手机的 CPU 架构信息，如图所示：

![Screen-20191211-142738.png](https://i.loli.net/2019/12/15/rZ4mtgvXukenMwT.jpg)

![Screen-20191211-142830.png](https://i.loli.net/2019/12/15/EpgqDJGSTkZBd5y.jpg)

这一步查询可能会看到诸如 **ARMv8, ARMv7, Cortex-A, AArch64, AArch32** 等字眼，简单解释一下，ARMv7 和 ARMv8 是两个 ARM 的版本，v7 版本是 **32位** 的，v8 是 ARM 公司的第一款 **64位** 处理器架构，并且从 v7 版本后开始变成了 Cortex 架构，包括 Cortex-A、Cortex-R、C ortex-M 系列，其中的 Cortex-A 系列就是常见的只能手机处理器，另外两个多应用于车载系统，嵌入式微控制器等领域；ARMv8-A 有两种执行状态： **AArch64** 和 **AArch32**（后者是为了兼容以前的32bit的程序），AArch64执行A64指令，使用 64bit 的通用寄存器；AArch32 执行 A32/T32 指令，使用 32bit 的通用寄存器；

所以可以简单的理解为 ARMv7 是 32位，ARMv8 是 64位的；如果不想用终端和命令查看，也可以使用软件直接查看，比如著名的 **AIDA64**，可以在市场搜索下载，或者使用链接：
```
链接: https://pan.baidu.com/s/1wvUc0VhWyhb-QGbkd9LylQ
提取码: mqby
```

打开后点击中央处理器模块，内核架构信息里就是要找的架构类型，这里的是 ARMv8 的，如下图：

![Screenshot_20191212_101530_com_finalwire_aida64.jpg](https://i.loli.net/2019/12/15/I5DPn1RvTsKFk8j.jpg)

![Screenshot_20191212_101534_com.finalwire.aida64.jpg](https://i.loli.net/2019/12/15/uLlC49VpKSAbQsz.jpg)

因此我们在配置里选择 **ARM64**；

**发行版的版本**，之前选择 Kali 的话就默认只有一个 **kali-rolling** 版本，其它系统的话自行决定：

![Screen-20191211-143025.png](https://i.loli.net/2019/12/15/aX48MePZDvWrAcK.jpg)

**源地址**，就是软件从哪里去获取系统镜像等相关文件，这里用默认的就行：

![Screen-20191211-143151.png](https://i.loli.net/2019/12/15/NyfMQlYdnj8DkWK.jpg)

当然官方源的是网站是国外的，速度可能有点慢，可以选择使用国内的源，比如阿里云和中科大等，详细介绍可以参考这篇 [文章](https://knightyun.github.io/2018/04/21/linux-sources-list)，比如使用阿里云的就把地址改为以下内容：
```
http://mirrors.aliyun.com/kali/
```

**安装类型**，一般就选择默认的**镜像文件**类型，方便安全，至于其它类型就是它们字面上的意思，所以可能会和系统出现冲突：

![Screen-20191211-143213.png](https://i.loli.net/2019/12/15/WABObciFoQkE9pN.jpg)

**安装路径**，就是决定把镜像文件安装到哪，并且以什么名字命名，默认的值使用了环境变量，测试似乎存在问题，所以改一下，比如我们安装到内置存储的根目录，以 **kali.img** 命名，就是 `/sdcard/kali.img`，注意镜像文件的后缀 `.img` 是固定不变的：

![Screen-20191211-143322.png](https://i.loli.net/2019/12/15/Pf85MyzNtirVTd2.jpg)

**镜像大小**，默认是 0，即自动分配大小，不过经测试，它似乎没有想象中那么**自动** -_-，所以我们就自己设一个值，注意单位是 MB，并且这个值就是安装的系统能用的总存储空间，因此可以稍微设置大一点，具体值随便填，这里的 8096 就是 8GB 左右（1024MB = 1GB）：

![Screen-20191211-143431.png](https://i.loli.net/2019/12/15/we1Y9lLFamPNh2j.jpg)

**文件系统**，现在最新的是 **ext4**，是 Linux 下常用的文件系统，类似于 Windows 里的 **NTFS** 文件系统，或者 U盘使用的 **FAT32** 文件系统，所以这里选择默认的就好：

![Screenshot_20200110-220704.png](https://i.loli.net/2020/01/10/CvLSfMuI7Kac4Vw.png)

**用户名**，即登录系统的账户名（以 test 为例）：

![Screen-20191211-143500.png](https://i.loli.net/2019/12/15/agiJk27AYXZ9q5S.jpg)

**用户密码**，上面的账户对应的密码（也以 test 为例）：

![Screen-20191211-143549.png](https://i.loli.net/2019/12/15/Gvkebs2unK3fqWR.jpg)
 
**特权用户**，这里填写超级用户 **root**：

![Screen-20191211-143512.png](https://i.loli.net/2019/12/15/pYKtgBqiFZoP1le.jpg)

**本地化**，即系统使用的语言，先使用默认的 **C**（英语），想要中文可以后期改：

![Screen-20191211-143530.png](https://i.loli.net/2019/12/15/9Mj4iq7ta1HNYvr.jpg)

**DNS、Network trigger、Power trigger** 这三项可以不用管，让它们空着；

**初始化**，启用选项可以不用勾上；

![Screenshot_20200110-220725.png](https://i.loli.net/2020/01/10/ArdNxO8UuRzCXSq.png)

**挂载**，即挂载 Android 上的资源，类似于一个文件中转站，设置为手机系统中的一个文件夹，这样这个文件夹中的内容 Linux 系统和手机系统都可以访问，也就实现了互传文件的功能，我们可以勾上：

![Screenshot_20200110-220746.png](https://i.loli.net/2020/01/10/YHO3hZWA4GvzsLI.png)

点击 **挂载点列表** 后进去，点右上角的加号，添加一个挂载点；第一行填写你设置为文件中转站的目录（该文件夹自己事先创建好）的绝对路径，比如该文件夹创建在 SD 卡根目录，名为 share，那就写 `/sdcard/share`：

![Screen-20191211-143642.png](https://i.loli.net/2019/12/15/GuNeoYL4nh1bMSH.jpg)

点确定后完成创建，返回：

![Screen-20191211-143654.png](https://i.loli.net/2019/12/15/SB5Pve8zW4DjnLE.jpg)

**SSH**，即是否开启 Linux 系统的 ssh 服务，勾上后就可以在手机终端用 ssh 命令连接 Linux 系统，这里我们勾上，然后下面的 **SSH 设置** 使用默认的不用改：

![Screen-20191211-143722.png](https://i.loli.net/2019/12/15/xUeCwfRXQKkq56B.jpg)

**声音服务**，即 Linux 系统的声音在手机上播放，这里我们也勾上，设置用默认的不改：

![Screen-20191211-143742.png](https://i.loli.net/2019/12/15/WBUXNKobYkJzLah.jpg)

**图形界面**，这就是一个比较重要的设置了，因为一旦 Linux 系统在手机上安装好后，不安装图形桌面（类似于 Windows 的桌面）的话，就只能通过 ssh 进行命令行操作系统；勾选启用后，点击下面的 **图形子系统** 选项，会弹出以下选项：

一般选 VNC，另外两个选项后面介绍：

![Screen-20191211-143922.png](https://i.loli.net/2019/12/25/Bp8Ehm1Uj5HIrAb.jpg)

**图形界面设置**，对应上面的 VNC 结果，一般也是使用默认的不用改，了解选项含义的可以自行修改：

![Screen-20191211-143932.png](https://i.loli.net/2019/12/25/Zr2IXWQR48jaeTE.jpg)

**桌面环境**，即图形桌面环境的外观，这里我们选 **Xfce**：
![Screen-20191211-144032.png](https://i.loli.net/2019/12/25/EFUOQX8ropuVgL1.jpg)

下面也贴出几个选项对应的桌面外观截图，以供参考：

**Xterm**（无图形桌面，只有 shell）:

![Screenshot_20191219-142733.png](https://i.loli.net/2020/01/10/qOxFWGkQAj1KtYy.png)

**LXDE**:

![Screenshot_20191219-143142.png](https://i.loli.net/2020/01/10/MU7LJfmBtT2YF4s.png)

**Xfce**:

![Screenshot_20191219-144642.png](https://i.loli.net/2020/01/10/OEijXJ1sfHq8z6m.png)

**MATE**:

![Screenshot_20191219-144052.png](https://i.loli.net/2020/01/10/FrPQCwteOlbcX7f.png)

配置结束，这里再提一下上面说过的 **图形子系统** 的另外两个选项，仅供参考；首先是 X11，熟悉 Linux 的应该了解这个选项，物理机（或虚拟机）安装的 Linux 桌面系统一般都是使用的 X11 的图形服务，选上后进入 **图形界面设置** 后是以下选项：

![Screen-20191211-143946.png](https://i.loli.net/2019/12/25/2LqmBMkVwlF1KRd.jpg)

不了解的可以按上图配置，另外，使用改选项需要安装图中所说的 **Xserver XSDL** 这个软件，可以去市场下载，或者使用下面的链接：
```
链接: https://pan.baidu.com/s/1AuC09-HzT9ZWEwBzV7dRxg
提取码: swx5
```

安装好后不用特意打开它，Linux 系统启动时它会被自动打开，运行（需等待一段时间，不要点屏幕）截图如下：

![Screenshot_20191219-144618.png](https://i.loli.net/2020/01/10/wkNlY5VLPhMIQyZ.png)

![Screenshot_20191219-144622.png](https://i.loli.net/2020/01/10/1ojkCrZ6fUTcHLW.png)

![Screenshot_20191219-144625.png](https://i.loli.net/2020/01/10/g42DyO57vkTiEtB.png)

如果 **图形子系统** 选择 framebuffer 的话，**图形界面设置** 选项如下：

![Screen-20191211-144016.png](https://i.loli.net/2019/12/25/QUnOXAF5TzGf2MC.jpg)

设置也是默认不变，只不过由于这种图形显示技术比较特殊（古老），笔者尝试并未成功，手机还多次卡死 -_-，所以保守派就不要轻易尝试了，自担风险；

## 配置文件

上面进行的配置会被保存到一个配置文件中，点击 Deploy 软件主界面左上角的菜单按钮，选择第一 **配置文件** 选项即可对配置文件经行修改，这是默认的配置：

![Screenshot_20191217-221200.png](https://i.loli.net/2020/01/10/M3HxFY5fhbDuSLK.png)

右上角的三个按钮分别是**新建、重命名、删除**，例如对当前配置文件重命名：

![Screenshot_20191217-221220.png](https://i.loli.net/2020/01/10/zaS1QvMytCKNiEP.png)

或者新建一个：

![Screenshot_20191217-221301.png](https://i.loli.net/2020/01/10/GIVLhMUurbTXCWo.png)

使用不同的配置来选择不同的系统，就可以实现一机安装多 linux 系统（手机存储足够前提下）；

## 安装系统

配置完毕，接下来就是安装系统了；首先回到软件主界面，点击右上角的菜单按钮：

![Screenshot_20191219-135609.png](https://i.loli.net/2020/01/10/mEPJrihunyjl4Bv.png)

然后点击第一个 **安装** 按钮，然后弹出窗口中点 OK 确定：

![Screenshot_20191219-135646.png](https://i.loli.net/2020/01/10/vjk4wfpFsbhrltU.png)

随后软件就开始 Linux 系统的安装了，主界面会不断输出一些信息：

![Screenshot_20191219-135653.png](https://i.loli.net/2020/01/10/uk61aFgYjhwyAZp.png)

![Screenshot_20191219-140612.png](https://i.loli.net/2020/01/10/Zmi9bSj7UK4rDGz.png)

操作系统较大，下载安装时间较长，一般用时在半小时左右，网速好的话会快一点；当输出信息如下图的最后一行时，则表示安装完成：

![Screenshot_20191219-141624.png](https://i.loli.net/2020/01/10/ypKt6Uj4ZQsfzF9.png)

然后下一步本应是点击右上角菜单的配置按钮，但是这样会出现像下面这个的 **问题**：

![Screenshot_20191219-141816.png](https://i.loli.net/2020/01/10/uxMU8B2Gidqyta3.png)

也就是输出一堆 `skip`，这是因为在没有关闭系统的情况下进行配置，会使得系统不能正常配置，所以需要先点击底部菜单的停止按钮（以后出现 skip 输出数量较多时也这样操作）：

![Screenshot_20191219-141821.png](https://i.loli.net/2020/01/10/XsbreM7zivPBC5u.png)

然后点击确认，最后输出 `<<< stop` 则表示停止成功：

![Screenshot_20191219-141827.png](https://i.loli.net/2020/01/10/dAUGXBy3qizwSkY.png)

这里再点击右上角菜单的配置选项，也需要等待一段时间：

![Screenshot_20191219-141718.png](https://i.loli.net/2020/01/10/pUOhLMAno4IfGx3.png)

配置结束后，点击启动按钮启动系统：

![Screenshot_20191219-141724.png](https://i.loli.net/2020/01/10/w9ob3VgdjfUpen4.png)

启动成功，都是 `done` 则表示正常启动，若 `skip` 较多则尝试停止后再启动（下图的 /dev/shm skip 可以不用管）：

![Screenshot_20191219-141837.png](https://i.loli.net/2020/01/10/21oFdBKwIvzcY6G.png)

## 进入系统

Linux 系统启动完毕，接下来就是进入图形桌面环境，当然，由于之前开启了 SSH 服务，所以也可以使用之前下载的 Terminal 终端软件进入 shell 环境，这里由于之前选择 VNC 作为图形子系统来配置的，所以这里就用 **VNC Viewer** 这个软件来进入图形桌面；

打开 `VNC Viewer` 这个软件，进入主界面：

![Screenshot_20191219-142011.png](https://i.loli.net/2020/01/10/oTf7nhzrs2AUtd3.png)

点击右下角的加号添加要连接的对象，这个软件本来是用于连接所有开有 VNC 服务的服务器的，由于我们把 Linux 系统安装在手机（即本地），所以地址填写本地地址：`127.0.0.1`，也可以写 `localhost`，一个意思，下面一行的名字随便写一个：

![Screenshot_20191219-142342.png](https://i.loli.net/2020/01/10/L74fsb38WMKGpnv.png)

然后点击 `create` 创建连接，进入如下界面：

![Screenshot_20200110-180055.png](https://i.loli.net/2020/01/10/DynFJSlz1OisZ2p.png)

需要注意的只有 `view only` 这个不要选上，就是字面意思，只读模式；点击 `CONNECT` 进行连接，会提示输入密码：

![Screenshot_20191219-142059.png](https://i.loli.net/2020/01/10/D1IsqdgmpH9MeEl.png)

密码就是之前在配置里面设置的用户密码，当时设置的是 `test`（之后记得自己修改密码），填上去，然后把记住密码勾上，再点击右上角的 `CONTINUE`：

![Screenshot_20191219-142048.png](https://i.loli.net/2020/01/10/BwMF9H6pqNWRACK.png)

后面出现的安全提示不用管，取消勾选 `warn me every time`，再点击右上角的 `OK` 就可以进入系统了：

![Screenshot_20191219-142109.png](https://i.loli.net/2020/01/10/KB3ZvfekwPJytSL.png)

初次使用软件进入有个教程，跟着做完就行了，忘记了按钮的意思就点右数第二个问号按钮查看就行了，下面再给出几张横屏的特写：

![Screenshot_20191219-142136.png](https://i.loli.net/2020/01/10/olkIJuR4PdpQFUN.png)

![Screenshot_20191219-142224.png](https://i.loli.net/2020/01/10/Da96phJmbvLtsSR.png)

![Screenshot_20191219-142237.png](https://i.loli.net/2020/01/10/qVK8mrpiF2vOQwa.png)

这里再提供一款输入法软件：**Hacker's Keyboard**，翻译过来是黑客键盘，听着霸气，其实就是增加了计算机键盘中的 **Ctrl, Shift, Tab, Alt** 等键，因为常见手机输入法中不存在这几个键，在使用 Kali 系统时可以提供一些便利，自行搜索下载或使用以下链接：
```
链接: https://pan.baidu.com/s/1iPgSBmNYy9xzHfJg2aoaEg
提取码: ydah
```

也附上两张特写：

![Screenshot_20200110-214651.png](https://i.loli.net/2020/01/10/1sBCbZJdctWaVSm.png)

默认是横屏才出现特殊按键，可以自行在设置中修改：

![Screenshot_20200110-214733.png](https://i.loli.net/2020/01/10/ung17xLOseVFR4J.png)

## 关闭系统

不再使用系统后点右上角的叉号断开连接：

![Screenshot_20191219-142251.png](https://i.loli.net/2020/01/10/Cr6v53zJu7acj1O.png)

回到主界面也会保存系统的快照，下次直接点击就能进去了：

![Screenshot_20191219-142352.png](https://i.loli.net/2020/01/10/CbUSh82DgBOwois.png)

断开连接不代表系统关闭了，还要回到 Deploy 这个软件，点击底部的停止按钮：

![Screenshot_20191219-142407.png](https://i.loli.net/2020/01/10/NHc1pLEYAsCq5tG.png)

如下图，则表示系统成功关闭了：

![Screenshot_20191219-142416.png](https://i.loli.net/2020/01/10/Sx5uXqYNnzKWCbv.png)

下次要启动系统，就点击启动按钮，再用 VNC Viewer 连接就行了，切换不同的 Linux 系统，只需要切换到对应的配置文件就行了，**注意** 每次切换或修改配置，都需要点击右上角的 **配置** 按钮进行重新配置，只有在安装新系统时才需要点击 **安装** 按钮；

至此关于 root 环境下使用 Deploy 安装 Kali 系统的教程就结束了，关于 Deploy 中未提到的其他菜单功能，可以自行探索；

# 非 ROOT 环境
 
当然，除去 root 玩家，总会存在那么一些手机厂商，让自家产品百试不得其 ROOT，让技术用户们又爱又恨-_-，所以这里也准备了非 ROOT 环境下的备选方案，当然，比起 ROOT 来说，确实会阉割部分功能，但主要功能都能用，所以建议能 ROOT 就不要退而求其次；

## 主要软件

### Termux

这是该方法的主角，这个软件类似于在手机中搭建一个 Linux 虚拟机，可以执行一些常用的 Linux 命令，与之前说的 `Terminal` 这个终端软件主要的区别就是该软件可以安装第三方软件包，就是熟悉的 `apt` 系列命令，很方便，因此功能也较为强大；可以在应用市场搜索下载，或者使用下面的链接：
```
链接: https://pan.baidu.com/s/1z1blrlhPxUcsbRlmGTkAYw
取码: stye
```

### AndroNix

这个软件用于提供常见 Linux 发行版本系统的下载，其实用过后发现就是提供系统的下载链接，然后跳转到 Termux 进行下载和安装，搜索下载或使用链接：
```
链接: https://pan.baidu.com/s/177VOddzfaCXVoHb_duK5bA
提取码: 7k65
```

## 安装系统

首先安装 **Termux** 软件然后打开，会进入以下界面：

![Screenshot_20191211_184512_com.termux.jpg](https://i.loli.net/2020/01/10/votJUF5ald23g7s.jpg)

它是一个简单的 shell，可以运行一些常用命令，自行探究；

然后安装并打开 **AndroNix** 软件，主界面如下：

![Screenshot_20191211_184532_studio.com.techriz.andronix.jpg](https://i.loli.net/2020/01/10/PYlSerdC79btJkQ.jpg)

这里还是以安装 Kali 系统为例，那么我们点击右上那个熟悉的 Kali 系统图标，进入以下界面，点击安装按钮：

![Screenshot_20191211_184539_studio.com.techriz.andronix.jpg](https://i.loli.net/2020/01/10/sM2C6wr4OnXA5zW.jpg)

按照指示的步骤进行，先点击复制，命令会被复制到系统粘贴板：

![Screenshot_20191211_184556_studio.com.techriz.andronix.jpg](https://i.loli.net/2020/01/10/v6rFTyuk4iDEMCG.jpg)

然后我们切换到 **Termux** 这个软件，长按粘贴刚才复制的代码，内容如下：

![Screenshot_20191211_184637_com.termux.jpg](https://i.loli.net/2020/01/10/fBbxKvSH6VunLcl.jpg)

然后按下回车后进行系统的下载和安装，同样需要一段时间；完成后，会在当前目录下生成几个新文件，如下图：

![Screenshot_20191211_184702_com.termux.jpg](https://i.loli.net/2020/01/10/qtN2SjwQWEGyBeK.jpg)

目录下的 `start-kali.sh` 文件就是我们安装的 Kali 系统的启动文件，所以我们输入命令 `./start-kali.sh` 启动系统：

![Screenshot_20191211_184724_com.termux.jpg](https://i.loli.net/2020/01/10/qOC3iPbZTDv8UAu.jpg)

到这里我们的系统算是安装成功了；

## 安装图形桌面

目前安装的 Kali 系统只能 shell 进行访问，接下来安装我们熟悉的图形桌面环境，所以我们手机切换回 **AndroNix** 这个软件，执行第二步，即择桌面系统，和之前一样，我们点击 **XFCE**：

![Screenshot_20191211_184611_studio.com.techriz.andronix.jpg](https://i.loli.net/2020/01/10/TZfQtgSDGAqc8nk.jpg)

这里同样是把代码复制到了系统粘贴板，需要切换到 Termux 并粘贴代码；需要 **注意** 的是，官方文件似乎没有描述清楚，这里是要再启动后的 Kali 系统环境下粘贴代码以安装图形桌面，也就是运行 `./start-kali.sh` 后再粘贴运行代码，而不是在 Termux 的默认环境下粘贴运行，如下图：

![Screenshot_20191211_184838_com.termux.jpg](https://i.loli.net/2020/01/10/3ZGmaAPQJqF5YDr.jpg)

安装完后会提示设置连接密码，为了之后使用 **VNC Viewer** 进行连接：

![Screenshot_20191211_190028_com.termux.jpg](https://i.loli.net/2020/01/10/HTbMKen9raltiUo.jpg)

再次输入以确定：

![Screenshot_20191211_190036_com.termux.jpg](https://i.loli.net/2020/01/10/9tHcKDs6FzkSw7n.jpg)

然后会提示是否设置一个 view-only（只读模式）密码，这里我们不设置，输入 **n**：

![Screenshot_20191211_190046_com.termux.jpg](https://i.loli.net/2020/01/10/4W3IBVOPYpgmblE.jpg)

然后就配置完成，要访问 Kali 图形桌面就需要先启动 VNC 服务，启动服务的命令为 `vncserver-start`，停止的命令为 `vncserver-stop`，如下图；

![Screenshot_20191211_190113_com.termux.jpg](https://i.loli.net/2020/01/10/RX1yuBlsUMCh73Y.jpg)

会发现这两个命令类似 Deploy 中的启动和停止按钮，只不过它是同时启动系统和 vnc 服务罢了；接下来就输入命令启动 Kali 系统的 VNC 服务，会输出以下信息：

![Screenshot_20191211_190123_com.termux.jpg](https://i.loli.net/2020/01/10/LGIbZfCMX1gy6Nz.jpg)

到这里服务就启动成功了，接下来就是和之前一样，使用  **VNC Viewer** 这个软件来连接图形桌面环境，新建一个连接：

![Screenshot_20191211_191617_com.realvnc.viewer.android.jpg](https://i.loli.net/2020/01/10/5fL4Dvj9qzm7GOJ.jpg)

这里也是和之前唯一 **不同** 之处，即 Deploy 默认开启的 vnc 服务端口是 **5900**，同时 VNC Viewer 的默认端口也是 **5900**，所以之前只需要输入 `127.0.0.1` 就行了，但是 `vncserver-start` 开启服务的端口是 **5901** 起步，随开启数量而递增，所以在配置地址时需要指定端口，即地址设为：`127.0.0.1:5901`；

后面的步骤就和之前大致相同了：

![Screenshot_20191211_191625_com.realvnc.viewer.android.jpg](https://i.loli.net/2020/01/10/5OGVJlPAbZDNL1z.jpg)

连接密码就是之前设置的密码：

![Screenshot_20191211_191630_com.realvnc.viewer.android.jpg](https://i.loli.net/2020/01/10/9Yw6NTiFbIyjpk2.jpg)

来几张特写：

![Screenshot_20191211_191646_com.realvnc.viewer.android.jpg](https://i.loli.net/2020/01/10/RGpEbdFz7lwAqUM.jpg)

![Screenshot_20191211_191707_com.realvnc.viewer.android.jpg](https://i.loli.net/2020/01/10/jC1ymP9ObQBAJhD.jpg)

![Screenshot_20191211_191726_com.realvnc.viewer.android.jpg](https://i.loli.net/2020/01/10/iyLmzphVIFYOZQu.jpg)

## 关闭系统

停止使用系统后，先断开连接：

![Screenshot_20191211_191747_com.realvnc.viewer.android.jpg](https://i.loli.net/2020/01/10/VcgAauCM5p8yFin.jpg)

然后回到 **Termux** 软件，输入 `vncserver-stop` 命令停止 vnc 服务，输入 `exit` 注销登录 Kali系统，再按 CTRL + z 返回 Termux 环境（CTRL 在软件底部菜单栏）：

![Screenshot_20191211_191856_com.termux.jpg](https://i.loli.net/2020/01/10/rsDoOkc2Yn6u3SQ.jpg)

到这里非 ROOT 条件下的 Kali 系统安装教程也结束了，想要安装其它发行版本的 linux 系统可以用类似的方法自行摸索，不做赘述；另外，从上面安装 Kali 系统的命令中也能发现，系统镜像并不是官方源，而是为了适应在非 ROOT 手机中运行的“定制版本”，当然常用功能健在，只是某些部分有所限制，可以之后自行体会；
-->


# 前言
 
之前写有[文章](https://knightyun.github.io/2018/04/15/kali-linux-install)介绍过关于 Kali Linux 系统安装的详细教程，不过是在电脑端真机或虚拟机中的安装步骤，那么作为平时使用最多并且能方便携带的智能手机端，是否有方法或技术来实现安装呢？还确实有，这也是该文章的主旨。我们都知道安卓系统本身就是 Linux 系统的一个发行版本，所以在技术理论上是有可行性的，并且目前还确实有人实现了，至于苹果手机（iOS系统）端，笔者没做研究，就不做阐述了，有兴趣可以自行了解。那么现在就来介绍一下如何在手机端（安卓系统）进行 Linux 系统（包括但不限于 Kali）的安装。
 
# 原理概述
 
其实实现该技术的原理并不复杂，由于安卓是 Linux 系统的一个分支，所以和其他主流 Linux 操作系统之间有着很大的共同性，比如很多 shell 指令代码都能使用。另外，Linux 命令中有一个叫 `chroot` 的，大概的作用就是在指定的根目录下运行命令，通俗讲，类似于 Windows 系统中的安全沙箱的概念，即一个安全的隔离环境，这也是该命令的目的所在。因此，既然能在该指定目录下运行一些命令，那么要是把整个操作系统的命令、目录以及文件都装进去，那它不就成了一个嵌入的系统了吗，这里又有些类似虚拟机的概念。
 
当然，要在手机中执行这些命令就免不了要手机获得 **root 权限**，即对手机进行 ROOT；不用担心，这只是其中一个办法，本文也会介绍另一种不需要 ROOT 手机的方法。总结一下二者的原理：ROOT 操作相当于直接在手机安卓系统中挂载一个 Linux 系统（例如 Kali），而非 ROOT 方法就有些绕，类似于在安卓系统中通过软件挂载一个能执行一些命令的环境（当然这样会有很多权限限制，毕竟没有 ROOT），然后在这个环境中就可以再挂载想要的 Linux 操作系统了，由于这个系统在一个虚拟的环境中，所以就不存在权限的问题了（得不到真实的权限，给与虚拟的权限还是做得到的→_→，哈哈哈）。通俗讲就是，ROOT 使用的是真机中的虚拟机，而非 ROOT 使用的是真机中的虚拟机中的虚拟机（感觉绕可以再读几遍）。
 
下面是安装系统的两种方法：
 
# ROOT 环境

## 主要软件

### Linux Deploy

有 root 权限的话，安装就比较简单，并且安装的系统使用也比较流畅，毕竟是直接与真机硬件交互的，然后就先介绍一下该方法的主角：**Linux Deploy**，它是一个安卓软件，图标是一个小企鹅，在各大应用市场应该都能搜得到，找不到的话可以在这里下载：
```
链接: https://pan.baidu.com/s/16OKQc2ru5E7yOTliDzNuUw
提取码: vi7w
```

### VNC Viewer

另外需要一款远程连接软件（这里使用 VNC Viewer）来显示系统界面，因为系统安装到手机中后，一般不会直接把桌面和窗口输出到手机的主屏幕，所以需要远程桌面软件连接到该系统来进行显示，否者就是使用终端连接（如 SSH）的纯命令行操作，VNC Viewer 软件也能在各大市场搜到，或者从下面的链接下载：
```
链接:https://pan.baidu.com/s/1cjBii8MWSAqsM-9urW658Q
提取码:h7si
```

### Terminal

一款安卓的终端软件（非必需），可以在手机上执行一些 Linux 命令，也可以使用它提供的 SSH 连接到之后安装的系统，依然，市场搜不到可以在下面的链接下载：
```
链接: https://pan.baidu.com/s/1ZOUjbmW0MLjbMunAGecGfA
提取码: 5jhj
```
 
下面是 Deploy 软件主界面的截图：

![Screen-20191211-132447.png](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pLmxvbGkubmV0LzIwMTkvMTIvMTEvN2ltWnhMZk9vV2xLUTlVLmpwZw?x-oss-process=image/format,png)
 
![Screen-20191211-132433.png](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pLmxvbGkubmV0LzIwMTkvMTIvMTEvdmhlU0RveWpNcXdJZno1LmpwZw?x-oss-process=image/format,png)

## 配置

在安装系统前，需要进行一些配置，顺便解释一下各个配置选项，先点击软件主页的配置按钮（上图右下角）进入配置页面：

![Screen-20191211-142939.png](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pLmxvbGkubmV0LzIwMTkvMTIvMTUvd0hodUlkU1VlVG1KRXJMLmpwZw?x-oss-process=image/format,png)


**发行版本**，点进去选择想要的 Linux 发行版，这里以 Kali 为例：

![Screen-20191211-142948.png](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pLmxvbGkubmV0LzIwMTkvMTIvMTUvUjdnOU9IY1hrS3lkUUZNLmpwZw?x-oss-process=image/format,png)

**架构**，点进去会出来这么几个选项：

![Screen-20191211-143014.png](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pLmxvbGkubmV0LzIwMTkvMTIvMTUvbmlSSU1DUEd1aGY5THlFLmpwZw?x-oss-process=image/format,png)

这里简单解释一下选项中的五种架构，前三个 **armel, armhf, arm64** 都是 ARM 处理器（常见的手机处理器品牌，类似于电脑的 Intel）的几个版本，区别如下：
- armel：（arm eabi little endian）也即softfp，用fpu计算，但是传参数用普通寄存器传，这样中断的时候，只需要保存普通寄存器，中断负荷小，但是参数需要转换成浮点的再计算；
- armhf：（arm hard float）也即hard，用fpu计算，传参数用fpu中的浮点寄存器传，省去了转换性能最好，但是中断负荷高；
- arm64：64位的arm默认就是hard float的，因此不需要hf的后缀；
 
至于第四个 **i386** 是 Intel 的 32 位处理器架构，最后一个 **amd64** 则是 AMD（一家类似 Intel 的处理器公司）的 64 位处理器架构；

那么要如何判断自己的手机是哪种架构呢？方法很多，可以使用上面提到的 Terminal 软件，通过 `cat /proc/cpuinfo` 命令查看手机的 CPU 架构信息，如图所示：

![Screen-20191211-142738.png](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pLmxvbGkubmV0LzIwMTkvMTIvMTUvclo0bXRndlh1a2VuTXdULmpwZw?x-oss-process=image/format,png)

![Screen-20191211-142830.png](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pLmxvbGkubmV0LzIwMTkvMTIvMTUvRXBncURKR1NUa1pCZDV5LmpwZw?x-oss-process=image/format,png)

这一步查询可能会看到诸如 **ARMv8, ARMv7, Cortex-A, AArch64, AArch32** 等字眼，简单解释一下，ARMv7 和 ARMv8 是两个 ARM 的版本，v7 版本是 **32位** 的，v8 是 ARM 公司的第一款 **64位** 处理器架构，并且从 v7 版本后开始变成了 Cortex 架构，包括 Cortex-A、Cortex-R、C ortex-M 系列，其中的 Cortex-A 系列就是常见的只能手机处理器，另外两个多应用于车载系统，嵌入式微控制器等领域；ARMv8-A 有两种执行状态： **AArch64** 和 **AArch32**（后者是为了兼容以前的32bit的程序），AArch64执行A64指令，使用 64bit 的通用寄存器；AArch32 执行 A32/T32 指令，使用 32bit 的通用寄存器；

所以可以简单的理解为 ARMv7 是 32位，ARMv8 是 64位的；如果不想用终端和命令查看，也可以使用软件直接查看，比如著名的 **AIDA64**，可以在市场搜索下载，或者使用链接：
```
链接: https://pan.baidu.com/s/1wvUc0VhWyhb-QGbkd9LylQ
提取码: mqby
```

打开后点击中央处理器模块，内核架构信息里就是要找的架构类型，这里的是 ARMv8 的，如下图：

![Screenshot_20191212_101530_com_finalwire_aida64.jpg](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pLmxvbGkubmV0LzIwMTkvMTIvMTUvSTVEUG4xUnZUc0tGazhqLmpwZw?x-oss-process=image/format,png)

![Screenshot_20191212_101534_com.finalwire.aida64.jpg](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pLmxvbGkubmV0LzIwMTkvMTIvMTUvdUxsQzQ5VnBLU0FiUXN6LmpwZw?x-oss-process=image/format,png)

因此我们在配置里选择 **ARM64**；

**发行版的版本**，之前选择 Kali 的话就默认只有一个 **kali-rolling** 版本，其它系统的话自行决定：

![Screen-20191211-143025.png](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pLmxvbGkubmV0LzIwMTkvMTIvMTUvYVg0OE1lUFpEdldyQWNLLmpwZw?x-oss-process=image/format,png)

**源地址**，就是软件从哪里去获取系统镜像等相关文件，这里用默认的就行：

![Screen-20191211-143151.png](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pLmxvbGkubmV0LzIwMTkvMTIvMTUvTnlmTVFsWWRuajhEa1dLLmpwZw?x-oss-process=image/format,png)

当然官方源的是网站是国外的，速度可能有点慢，可以选择使用国内的源，比如阿里云和中科大等，详细介绍可以参考这篇 [文章](https://knightyun.github.io/2018/04/21/linux-sources-list)，比如使用阿里云的就把地址改为以下内容：
```
http://mirrors.aliyun.com/kali/
```

**安装类型**，一般就选择默认的**镜像文件**类型，方便安全，至于其它类型就是它们字面上的意思，所以可能会和系统出现冲突：

![Screen-20191211-143213.png](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pLmxvbGkubmV0LzIwMTkvMTIvMTUvV0FCT2JjaUZvUWtFOXBOLmpwZw?x-oss-process=image/format,png)

**安装路径**，就是决定把镜像文件安装到哪，并且以什么名字命名，默认的值使用了环境变量，测试似乎存在问题，所以改一下，比如我们安装到内置存储的根目录，以 **kali.img** 命名，就是 `/sdcard/kali.img`，注意镜像文件的后缀 `.img` 是固定不变的：

![Screen-20191211-143322.png](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pLmxvbGkubmV0LzIwMTkvMTIvMTUvUGY4NU15ek50aXJWVGQyLmpwZw?x-oss-process=image/format,png)

**镜像大小**，默认是 0，即自动分配大小，不过经测试，它似乎没有想象中那么**自动** -_-，所以我们就自己设一个值，注意单位是 MB，并且这个值就是安装的系统能用的总存储空间，因此可以稍微设置大一点，具体值随便填，这里的 8096 就是 8GB 左右（1024MB = 1GB）：

![Screen-20191211-143431.png](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pLmxvbGkubmV0LzIwMTkvMTIvMTUvd2UxWTlsTEZhbVBOaDJqLmpwZw?x-oss-process=image/format,png)

**文件系统**，现在最新的是 **ext4**，是 Linux 下常用的文件系统，类似于 Windows 里的 **NTFS** 文件系统，或者 U盘使用的 **FAT32** 文件系统，所以这里选择默认的就好：

![Screenshot_20200110-220704.png](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pLmxvbGkubmV0LzIwMjAvMDEvMTAvQ3ZMU2ZNdUk3S2FjNFZ3LnBuZw?x-oss-process=image/format,png)

**用户名**，即登录系统的账户名（以 test 为例）：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200111172759682.png)

**用户密码**，上面的账户对应的密码（也以 test 为例）：

![Screen-20191211-143549.png](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pLmxvbGkubmV0LzIwMTkvMTIvMTUvR3ZrZWJzMnVuSzNmcVdSLmpwZw?x-oss-process=image/format,png)
 
**特权用户**，这里填写超级用户 **root**：

![Screen-20191211-143512.png](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pLmxvbGkubmV0LzIwMTkvMTIvMTUvcFlLdGdCcWlGWm9QMWxlLmpwZw?x-oss-process=image/format,png)

**本地化**，即系统使用的语言，先使用默认的 **C**（英语），想要中文可以后期改：

![Screen-20191211-143530.png](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pLmxvbGkubmV0LzIwMTkvMTIvMTUvOU1qNGlxN3RhMUhOWXZyLmpwZw?x-oss-process=image/format,png)

**DNS、Network trigger、Power trigger** 这三项可以不用管，让它们空着；

**初始化**，启用选项可以不用勾上；

![Screenshot_20200110-220725.png](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pLmxvbGkubmV0LzIwMjAvMDEvMTAvQXJkTnhPOFV1UnpDWFNxLnBuZw?x-oss-process=image/format,png)

**挂载**，即挂载 Android 上的资源，类似于一个文件中转站，设置为手机系统中的一个文件夹，这样这个文件夹中的内容 Linux 系统和手机系统都可以访问，也就实现了互传文件的功能，我们可以勾上：

![Screenshot_20200110-220746.png](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pLmxvbGkubmV0LzIwMjAvMDEvMTAvWUhPM2haV0E0R3Z6c0xJLnBuZw?x-oss-process=image/format,png)

点击 **挂载点列表** 后进去，点右上角的加号，添加一个挂载点；第一行填写你设置为文件中转站的目录（该文件夹自己事先创建好）的绝对路径，比如该文件夹创建在 SD 卡根目录，名为 share，那就写 `/sdcard/share`：

![Screen-20191211-143642.png](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pLmxvbGkubmV0LzIwMTkvMTIvMTUvR3VOZW9ZTDRuaDFiTVNILmpwZw?x-oss-process=image/format,png)

点确定后完成创建，返回：

![Screen-20191211-143654.png](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pLmxvbGkubmV0LzIwMTkvMTIvMTUvU0I1UHZlOHpXNERqbkxFLmpwZw?x-oss-process=image/format,png)

**SSH**，即是否开启 Linux 系统的 ssh 服务，勾上后就可以在手机终端用 ssh 命令连接 Linux 系统，这里我们勾上，然后下面的 **SSH 设置** 使用默认的不用改：

![Screen-20191211-143722.png](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pLmxvbGkubmV0LzIwMTkvMTIvMTUveFVlQ3dmUlhRS2txNTZCLmpwZw?x-oss-process=image/format,png)

**声音服务**，即 Linux 系统的声音在手机上播放，这里我们也勾上，设置用默认的不改：

![Screen-20191211-143742.png](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pLmxvbGkubmV0LzIwMTkvMTIvMTUvV0JVWE5Lb2JZa0p6TGFoLmpwZw?x-oss-process=image/format,png)

**图形界面**，这就是一个比较重要的设置了，因为一旦 Linux 系统在手机上安装好后，不安装图形桌面（类似于 Windows 的桌面）的话，就只能通过 ssh 进行命令行操作系统；勾选启用后，点击下面的 **图形子系统** 选项，会弹出以下选项：

一般选 VNC，另外两个选项后面介绍：

![Screen-20191211-143922.png](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pLmxvbGkubmV0LzIwMTkvMTIvMjUvQnA4RWhtMVVqNUhJckFiLmpwZw?x-oss-process=image/format,png)

**图形界面设置**，对应上面的 VNC 结果，一般也是使用默认的不用改，了解选项含义的可以自行修改：

![Screen-20191211-143932.png](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pLmxvbGkubmV0LzIwMTkvMTIvMjUvWnIySVhXUVI0OGphZVRFLmpwZw?x-oss-process=image/format,png)

**桌面环境**，即图形桌面环境的外观，这里我们选 **Xfce**：
![Screen-20191211-144032.png](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pLmxvbGkubmV0LzIwMTkvMTIvMjUvRUZVT1FYOHJvcHVWZ0wxLmpwZw?x-oss-process=image/format,png)

下面也贴出几个选项对应的桌面外观截图，以供参考：

**Xterm**（无图形桌面，只有 shell）:

![Screenshot_20191219-142733.png](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pLmxvbGkubmV0LzIwMjAvMDEvMTAvcU94RldHa1FBajFLdFl5LnBuZw?x-oss-process=image/format,png)

**LXDE**:

![Screenshot_20191219-143142.png](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pLmxvbGkubmV0LzIwMjAvMDEvMTAvTVU3TEpmbUJ0VDJZRjRzLnBuZw?x-oss-process=image/format,png)

**Xfce**:

![Screenshot_20191219-144642.png](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pLmxvbGkubmV0LzIwMjAvMDEvMTAvT0VpalhKMXNmSHE4ejZtLnBuZw?x-oss-process=image/format,png)

**MATE**:

![Screenshot_20191219-144052.png](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pLmxvbGkubmV0LzIwMjAvMDEvMTAvRnJQUUN3dGVPbGJjWDdmLnBuZw?x-oss-process=image/format,png)

配置结束，这里再提一下上面说过的 **图形子系统** 的另外两个选项，仅供参考；首先是 X11，熟悉 Linux 的应该了解这个选项，物理机（或虚拟机）安装的 Linux 桌面系统一般都是使用的 X11 的图形服务，选上后进入 **图形界面设置** 后是以下选项：

![Screen-20191211-143946.png](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pLmxvbGkubmV0LzIwMTkvMTIvMjUvMkxxbUJNa1Z3bEYxS1JkLmpwZw?x-oss-process=image/format,png)

不了解的可以按上图配置，另外，使用改选项需要安装图中所说的 **Xserver XSDL** 这个软件，可以去市场下载，或者使用下面的链接：
```
链接: https://pan.baidu.com/s/1AuC09-HzT9ZWEwBzV7dRxg
提取码: swx5
```

安装好后不用特意打开它，Linux 系统启动时它会被自动打开，运行（需等待一段时间，不要点屏幕）截图如下：

![Screenshot_20191219-144618.png](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pLmxvbGkubmV0LzIwMjAvMDEvMTAvd2tObFk1VkxQaE1JUXlaLnBuZw?x-oss-process=image/format,png)

![Screenshot_20191219-144622.png](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pLmxvbGkubmV0LzIwMjAvMDEvMTAvMW9qa0NyWjZmVVRjSExXLnBuZw?x-oss-process=image/format,png)

![Screenshot_20191219-144625.png](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pLmxvbGkubmV0LzIwMjAvMDEvMTAvZzQyRHlPNTd2a1RpRXRCLnBuZw?x-oss-process=image/format,png)

如果 **图形子系统** 选择 framebuffer 的话，**图形界面设置** 选项如下：

![Screen-20191211-144016.png](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pLmxvbGkubmV0LzIwMTkvMTIvMjUvUVVuT1hBRjVUekdmMk1DLmpwZw?x-oss-process=image/format,png)

设置也是默认不变，只不过由于这种图形显示技术比较特殊（古老），笔者尝试并未成功，手机还多次卡死 -_-，所以保守派就不要轻易尝试了，自担风险；

## 配置文件

上面进行的配置会被保存到一个配置文件中，点击 Deploy 软件主界面左上角的菜单按钮，选择第一 **配置文件** 选项即可对配置文件经行修改，这是默认的配置：

![Screenshot_20191217-221200.png](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pLmxvbGkubmV0LzIwMjAvMDEvMTAvTTNIeEZZNWZoYkR1U0xLLnBuZw?x-oss-process=image/format,png)

右上角的三个按钮分别是**新建、重命名、删除**，例如对当前配置文件重命名：

![Screenshot_20191217-221220.png](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pLmxvbGkubmV0LzIwMjAvMDEvMTAvemFTMVF2TXl0Q0tOaUVQLnBuZw?x-oss-process=image/format,png)

或者新建一个：

![Screenshot_20191217-221301.png](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pLmxvbGkubmV0LzIwMjAvMDEvMTAvR0lWTGhNVXVyYlRYQ1dvLnBuZw?x-oss-process=image/format,png)

使用不同的配置来选择不同的系统，就可以实现一机安装多 linux 系统（手机存储足够前提下）；

## 安装系统

配置完毕，接下来就是安装系统了；首先回到软件主界面，点击右上角的菜单按钮：

![Screenshot_20191219-135609.png](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pLmxvbGkubmV0LzIwMjAvMDEvMTAvbUVQSnJpaHVueWpsNEJ2LnBuZw?x-oss-process=image/format,png)

然后点击第一个 **安装** 按钮，然后弹出窗口中点 OK 确定：

![Screenshot_20191219-135646.png](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pLmxvbGkubmV0LzIwMjAvMDEvMTAvdmprNHdmcEZzYmhybHRVLnBuZw?x-oss-process=image/format,png)

随后软件就开始 Linux 系统的安装了，主界面会不断输出一些信息：

![Screenshot_20191219-135653.png](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pLmxvbGkubmV0LzIwMjAvMDEvMTAvdWs2MWFGZ1lqaHd5QVpwLnBuZw?x-oss-process=image/format,png)

![Screenshot_20191219-140612.png](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pLmxvbGkubmV0LzIwMjAvMDEvMTAvWm1pOWJTajdVSzRyREd6LnBuZw?x-oss-process=image/format,png)

操作系统较大，下载安装时间较长，一般用时在半小时左右，网速好的话会快一点；当输出信息如下图的最后一行时，则表示安装完成：

![Screenshot_20191219-141624.png](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pLmxvbGkubmV0LzIwMjAvMDEvMTAveXBLdDZVajRaUXNmekY5LnBuZw?x-oss-process=image/format,png)

然后下一步本应是点击右上角菜单的配置按钮，但是这样会出现像下面这个的 **问题**：

![Screenshot_20191219-141816.png](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pLmxvbGkubmV0LzIwMjAvMDEvMTAvdXhNVThCMkdpZHF5dGEzLnBuZw?x-oss-process=image/format,png)

也就是输出一堆 `skip`，这是因为在没有关闭系统的情况下进行配置，会使得系统不能正常配置，所以需要先点击底部菜单的停止按钮（以后出现 skip 输出数量较多时也这样操作）：

![Screenshot_20191219-141821.png](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pLmxvbGkubmV0LzIwMjAvMDEvMTAvWHNicmVNN3ppdlBCQzV1LnBuZw?x-oss-process=image/format,png)

然后点击确认，最后输出 `<<< stop` 则表示停止成功：

![Screenshot_20191219-141827.png](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pLmxvbGkubmV0LzIwMjAvMDEvMTAvZEFVR1hCeTNxaXp3U2tZLnBuZw?x-oss-process=image/format,png)

这里再点击右上角菜单的配置选项，也需要等待一段时间：

![Screenshot_20191219-141718.png](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pLmxvbGkubmV0LzIwMjAvMDEvMTAvcFVPaExNQW5vNElmR3gzLnBuZw?x-oss-process=image/format,png)

配置结束后，点击启动按钮启动系统：

![Screenshot_20191219-141724.png](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pLmxvbGkubmV0LzIwMjAvMDEvMTAvdzlvYjNWZ2RqZlVwZW40LnBuZw?x-oss-process=image/format,png)

启动成功，都是 `done` 则表示正常启动，若 `skip` 较多则尝试停止后再启动（下图的 /dev/shm skip 可以不用管）：

![Screenshot_20191219-141837.png](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pLmxvbGkubmV0LzIwMjAvMDEvMTAvMjFvRmRCS3dJdnpjWTZHLnBuZw?x-oss-process=image/format,png)

## 进入系统

Linux 系统启动完毕，接下来就是进入图形桌面环境，当然，由于之前开启了 SSH 服务，所以也可以使用之前下载的 Terminal 终端软件进入 shell 环境，这里由于之前选择 VNC 作为图形子系统来配置的，所以这里就用 **VNC Viewer** 这个软件来进入图形桌面；

打开 `VNC Viewer` 这个软件，进入主界面：

![Screenshot_20191219-142011.png](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pLmxvbGkubmV0LzIwMjAvMDEvMTAvb1RmN25oenJzMkFVdGQzLnBuZw?x-oss-process=image/format,png)

点击右下角的加号添加要连接的对象，这个软件本来是用于连接所有开有 VNC 服务的服务器的，由于我们把 Linux 系统安装在手机（即本地），所以地址填写本地地址：`127.0.0.1`，也可以写 `localhost`，一个意思，下面一行的名字随便写一个：

![Screenshot_20191219-142342.png](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pLmxvbGkubmV0LzIwMjAvMDEvMTAvTDc0ZnNiMzhXTUtHcG52LnBuZw?x-oss-process=image/format,png)

然后点击 `create` 创建连接，进入如下界面：

![Screenshot_20200110-180055.png](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pLmxvbGkubmV0LzIwMjAvMDEvMTAvRHluRkpTbHoxT2lzWjJwLnBuZw?x-oss-process=image/format,png)

需要注意的只有 `view only` 这个不要选上，就是字面意思，只读模式；点击 `CONNECT` 进行连接，会提示输入密码：

![Screenshot_20191219-142059.png](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pLmxvbGkubmV0LzIwMjAvMDEvMTAvRDFJc3FkZ21wSDlNZUVsLnBuZw?x-oss-process=image/format,png)

密码就是之前在配置里面设置的用户密码，当时设置的是 `test`（之后记得自己修改密码），填上去，然后把记住密码勾上，再点击右上角的 `CONTINUE`：

![Screenshot_20191219-142048.png](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pLmxvbGkubmV0LzIwMjAvMDEvMTAvQndNRjlINnBxTldSQUNLLnBuZw?x-oss-process=image/format,png)

后面出现的安全提示不用管，取消勾选 `warn me every time`，再点击右上角的 `OK` 就可以进入系统了：

![Screenshot_20191219-142109.png](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pLmxvbGkubmV0LzIwMjAvMDEvMTAvS0IzWnZmZWt3UEp5dFNMLnBuZw?x-oss-process=image/format,png)

初次使用软件进入有个教程，跟着做完就行了，忘记了按钮的意思就点右数第二个问号按钮查看就行了，下面再给出几张横屏的特写：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200111172929126.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0tOSUdIX1lVTg==,size_16,color_FFFFFF,t_70)

![Screenshot_20191219-142224.png](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pLmxvbGkubmV0LzIwMjAvMDEvMTAvRGE5NnBoSm1idkx0c1NSLnBuZw?x-oss-process=image/format,png)

![Screenshot_20191219-142237.png](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pLmxvbGkubmV0LzIwMjAvMDEvMTAvcVZLOG1ycGlGMnZPUXdhLnBuZw?x-oss-process=image/format,png)

这里再提供一款输入法软件：**Hacker's Keyboard**，翻译过来是黑客键盘，听着霸气，其实就是增加了计算机键盘中的 **Ctrl, Shift, Tab, Alt** 等键，因为常见手机输入法中不存在这几个键，在使用 Kali 系统时可以提供一些便利，自行搜索下载或使用以下链接：
```
链接: https://pan.baidu.com/s/1iPgSBmNYy9xzHfJg2aoaEg
提取码: ydah
```

也附上两张特写：

![Screenshot_20200110-214651.png](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pLmxvbGkubmV0LzIwMjAvMDEvMTAvMXNCQ2JaSmRjdFdhVlNtLnBuZw?x-oss-process=image/format,png)

默认是横屏才出现特殊按键，可以自行在设置中修改：

![Screenshot_20200110-214733.png](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pLmxvbGkubmV0LzIwMjAvMDEvMTAvdW5nMTd4TE9zZVZGUjRKLnBuZw?x-oss-process=image/format,png)

## 关闭系统

不再使用系统后点右上角的叉号断开连接：

![Screenshot_20191219-142251.png](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pLmxvbGkubmV0LzIwMjAvMDEvMTAvQ3I2djUzekp1N2FjajFPLnBuZw?x-oss-process=image/format,png)

回到主界面也会保存系统的快照，下次直接点击就能进去了：

![Screenshot_20191219-142352.png](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pLmxvbGkubmV0LzIwMjAvMDEvMTAvQ2JVU2g4MkRnQk93b2lzLnBuZw?x-oss-process=image/format,png)

断开连接不代表系统关闭了，还要回到 Deploy 这个软件，点击底部的停止按钮：

![Screenshot_20191219-142407.png](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pLmxvbGkubmV0LzIwMjAvMDEvMTAvTkhjMXBMRVlBc0NxNXRHLnBuZw?x-oss-process=image/format,png)

如下图，则表示系统成功关闭了：

![Screenshot_20191219-142416.png](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pLmxvbGkubmV0LzIwMjAvMDEvMTAvU3g1dVhxWU5uektXQ2J2LnBuZw?x-oss-process=image/format,png)

下次要启动系统，就点击启动按钮，再用 VNC Viewer 连接就行了，切换不同的 Linux 系统，只需要切换到对应的配置文件就行了，**注意** 每次切换或修改配置，都需要点击右上角的 **配置** 按钮进行重新配置，只有在安装新系统时才需要点击 **安装** 按钮；

至此关于 root 环境下使用 Deploy 安装 Kali 系统的教程就结束了，关于 Deploy 中未提到的其他菜单功能，可以自行探索；

# 非 ROOT 环境
 
当然，除去 root 玩家，总会存在那么一些手机厂商，让自家产品百试不得其 ROOT，让技术用户们又爱又恨-_-，所以这里也准备了非 ROOT 环境下的备选方案，当然，比起 ROOT 来说，确实会阉割部分功能，但主要功能都能用，所以建议能 ROOT 就不要退而求其次；

## 主要软件

### Termux

这是该方法的主角，这个软件类似于在手机中搭建一个 Linux 虚拟机，可以执行一些常用的 Linux 命令，与之前说的 `Terminal` 这个终端软件主要的区别就是该软件可以安装第三方软件包，就是熟悉的 `apt` 系列命令，很方便，因此功能也较为强大；可以在应用市场搜索下载，或者使用下面的链接：
```
链接: https://pan.baidu.com/s/1z1blrlhPxUcsbRlmGTkAYw
取码: stye
```

### AndroNix

这个软件用于提供常见 Linux 发行版本系统的下载，其实用过后发现就是提供系统的下载链接，然后跳转到 Termux 进行下载和安装，搜索下载或使用链接：
```
链接: https://pan.baidu.com/s/177VOddzfaCXVoHb_duK5bA
提取码: 7k65
```

## 安装系统

首先安装 **Termux** 软件然后打开，会进入以下界面：

![Screenshot_20191211_184512_com.termux.jpg](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pLmxvbGkubmV0LzIwMjAvMDEvMTAvdm90SlVGNWFsZDIzZzdzLmpwZw?x-oss-process=image/format,png)

它是一个简单的 shell，可以运行一些常用命令，自行探究；

然后安装并打开 **AndroNix** 软件，主界面如下：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200111173001909.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0tOSUdIX1lVTg==,size_16,color_FFFFFF,t_70)

这里还是以安装 Kali 系统为例，那么我们点击右上那个熟悉的 Kali 系统图标，进入以下界面，点击安装按钮：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200111173031189.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0tOSUdIX1lVTg==,size_16,color_FFFFFF,t_70)

按照指示的步骤进行，先点击复制，命令会被复制到系统粘贴板：

![Screenshot_20191211_184556_studio.com.techriz.andronix.jpg](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pLmxvbGkubmV0LzIwMjAvMDEvMTAvdjZyRlR5dWs0aURFTUNHLmpwZw?x-oss-process=image/format,png)

> AndroNix 可能部分机型存在**不兼容**的情况，这里直接贴出这个软件复制到剪切板的内容，下一个步骤粘贴即可：
>
> echo "deb https://termux.mentality.rip/termux-main stable main" > $PREFIX/etc/apt/sources.list && cat $PREFIX/etc/apt/sources.list && pkg update -y && pkg install wget curl proot tar -y && wget https://raw.githubusercontent.com/AndronixApp/AndronixOrigin/master/Installer/Kali/kali-xfce.sh -O kali-xfce.sh && chmod +x kali-xfce.sh && bash kali-xfce.sh

然后我们切换到 **Termux** 这个软件，长按粘贴刚才复制的代码，内容如下：

![Screenshot_20191211_184637_com.termux.jpg](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pLmxvbGkubmV0LzIwMjAvMDEvMTAvZkJieEt2U0g2VnVuTGNsLmpwZw?x-oss-process=image/format,png)

然后按下回车后进行系统的下载和安装，同样需要一段时间；完成后，会在当前目录下生成几个新文件，如下图：

![Screenshot_20191211_184702_com.termux.jpg](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pLmxvbGkubmV0LzIwMjAvMDEvMTAvcXROMlNqd1FXRUd5QmVLLmpwZw?x-oss-process=image/format,png)

目录下的 `start-kali.sh` 文件就是我们安装的 Kali 系统的启动文件，所以我们输入命令 `./start-kali.sh` 启动系统：

![Screenshot_20191211_184724_com.termux.jpg](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pLmxvbGkubmV0LzIwMjAvMDEvMTAvcU9DM2lQYlpURHY4VUF1LmpwZw?x-oss-process=image/format,png)

到这里我们的系统算是安装成功了；

## 安装图形桌面

目前安装的 Kali 系统只能 shell 进行访问，接下来安装我们熟悉的图形桌面环境，所以我们手机切换回 **AndroNix** 这个软件，执行第二步，即择桌面系统，和之前一样，我们点击 **XFCE**：

![Screenshot_20191211_184611_studio.com.techriz.andronix.jpg](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pLmxvbGkubmV0LzIwMjAvMDEvMTAvVFpmUXRnU0RHQXFjOG5rLmpwZw?x-oss-process=image/format,png)

这里同样是把代码复制到了系统粘贴板，需要切换到 Termux 并粘贴代码；需要 **注意** 的是，官方文件似乎没有描述清楚，这里是要再启动后的 Kali 系统环境下粘贴代码以安装图形桌面，也就是运行 `./start-kali.sh` 后再粘贴运行代码，而不是在 Termux 的默认环境下粘贴运行，如下图：

![Screenshot_20191211_184838_com.termux.jpg](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pLmxvbGkubmV0LzIwMjAvMDEvMTAvM1pHbWFBUFFKcUY1WURyLmpwZw?x-oss-process=image/format,png)

安装完后会提示设置连接密码，为了之后使用 **VNC Viewer** 进行连接：

![Screenshot_20191211_190028_com.termux.jpg](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pLmxvbGkubmV0LzIwMjAvMDEvMTAvSFRiTUtlbjlyYWx0aVVvLmpwZw?x-oss-process=image/format,png)

再次输入以确定：

![Screenshot_20191211_190036_com.termux.jpg](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pLmxvbGkubmV0LzIwMjAvMDEvMTAvOXRIY0tEczZGemtTdzduLmpwZw?x-oss-process=image/format,png)

然后会提示是否设置一个 view-only（只读模式）密码，这里我们不设置，输入 **n**：

![Screenshot_20191211_190046_com.termux.jpg](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pLmxvbGkubmV0LzIwMjAvMDEvMTAvNFczSUJWT1BZcGdtYmxFLmpwZw?x-oss-process=image/format,png)

然后就配置完成，要访问 Kali 图形桌面就需要先启动 VNC 服务，启动服务的命令为 `vncserver-start`，停止的命令为 `vncserver-stop`，如下图；

![Screenshot_20191211_190113_com.termux.jpg](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pLmxvbGkubmV0LzIwMjAvMDEvMTAvUlgxeXVCbHNVTUNoNzNZLmpwZw?x-oss-process=image/format,png)

会发现这两个命令类似 Deploy 中的启动和停止按钮，只不过它是同时启动系统和 vnc 服务罢了；接下来就输入命令启动 Kali 系统的 VNC 服务，会输出以下信息：

![Screenshot_20191211_190123_com.termux.jpg](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pLmxvbGkubmV0LzIwMjAvMDEvMTAvTEdJYlpmQ01YMWd5Nk56LmpwZw?x-oss-process=image/format,png)

到这里服务就启动成功了，接下来就是和之前一样，使用  **VNC Viewer** 这个软件来连接图形桌面环境，新建一个连接：

![Screenshot_20191211_191617_com.realvnc.viewer.android.jpg](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pLmxvbGkubmV0LzIwMjAvMDEvMTAvNWZMNER2ajlxem03R09KLmpwZw?x-oss-process=image/format,png)

这里也是和之前唯一 **不同** 之处，即 Deploy 默认开启的 vnc 服务端口是 **5900**，同时 VNC Viewer 的默认端口也是 **5900**，所以之前只需要输入 `127.0.0.1` 就行了，但是 `vncserver-start` 开启服务的端口是 **5901** 起步，随开启数量而递增，所以在配置地址时需要指定端口，即地址设为：`127.0.0.1:5901`；

后面的步骤就和之前大致相同了：

![Screenshot_20191211_191625_com.realvnc.viewer.android.jpg](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pLmxvbGkubmV0LzIwMjAvMDEvMTAvNU9HVkpsUEFiWkROTDF6LmpwZw?x-oss-process=image/format,png)

连接密码就是之前设置的密码：

![Screenshot_20191211_191630_com.realvnc.viewer.android.jpg](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pLmxvbGkubmV0LzIwMjAvMDEvMTAvOVl3Nk5UaUZiSXlqcGsyLmpwZw?x-oss-process=image/format,png)

来几张特写：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200111173131751.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0tOSUdIX1lVTg==,size_16,color_FFFFFF,t_70)
![Screenshot_20191211_191707_com.realvnc.viewer.android.jpg](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pLmxvbGkubmV0LzIwMjAvMDEvMTAvakMxeW1QOU9iUUJBSmhELmpwZw?x-oss-process=image/format,png)

![Screenshot_20191211_191726_com.realvnc.viewer.android.jpg](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pLmxvbGkubmV0LzIwMjAvMDEvMTAvaXlMbXpwaFZJRllPWlF1LmpwZw?x-oss-process=image/format,png)

## 关闭系统

停止使用系统后，先断开连接：

![Screenshot_20191211_191747_com.realvnc.viewer.android.jpg](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pLmxvbGkubmV0LzIwMjAvMDEvMTAvVmNnQWF1Q001cDh5RmluLmpwZw?x-oss-process=image/format,png)

然后回到 **Termux** 软件，输入 `vncserver-stop` 命令停止 vnc 服务，输入 `exit` 注销登录 Kali系统，再按 CTRL + z 返回 Termux 环境（CTRL 在软件底部菜单栏）：

![Screenshot_20191211_191856_com.termux.jpg](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pLmxvbGkubmV0LzIwMjAvMDEvMTAvcnNEb09rYzJZbjZ1M1NRLmpwZw?x-oss-process=image/format,png)

到这里非 ROOT 条件下的 Kali 系统安装教程也结束了，想要安装其它发行版本的 linux 系统可以用类似的方法自行摸索，不做赘述；另外，从上面安装 Kali 系统的命令中也能发现，系统镜像并不是官方源，而是为了适应在非 ROOT 手机中运行的“定制版本”，当然常用功能健在，只是某些部分有所限制，可以之后自行体会；