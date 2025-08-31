---
title: Kali Linux系统设置中文语言环境
layout: post
categories: Exploit
tags: linux 汉化 中文 乱码
excerpt: 介绍Kali Linux系统如何设置中文以及修复乱码的问题
---
主流 Linux 系统安装之后，默认使用的语言环境基本都是英语，所以不管时图形桌面的菜单标题，还是终端的一些输出提示，都是展示的英文，对于觉得阅读英语不太友好的同胞们，第一件事可能就是设置一个友好的汉化环境，下面以 **Kali Linux** 这个发行版的系统为例，介绍一些设置中文语言环境的方法；

## 图形界面

如果安装的系统有图形界面，那么操作就简单了；一般系统在安装时就会提供语言选项，不过安装好后也能进行修改，一般可以在系统设置的**区域与语言**模块中找到相关的设置，例如下图：

![language.jpg](https://i.loli.net/2020/04/15/sOjHYfuMplZ9E6b.jpg)

至于其他 Linux 系统，路径应该类似，或者可以在设置里面搜索一下；修改成功需要重新登录生效，这个修改是永久性的；

## 终端命令

没有图形界面或者在设置里面没有找到的情况下，可以尝试使用终端命令进行修改；

### 安装中文环境包

切换中文环境之前，需要安装中文语言环境包，直接运行以下命令：
```sh
sudo dpkg-reconfigure locales

# 上面的运行不成功可以尝试下面这条命令：
sudo dpkg-reconfigure --force locales
```

如果提示类似 `locales` 未找到这样的信息，那么就先运行 `apt install locales` 执行安装，然后再运行上面的命令，顺利的话会弹出一个对话框，选择需要安装的语言，因为中文包是 `z` 开头的，列表又是按字母顺序排列，所以使用方向箭头向下浏览到靠近底端位置，应该能看见这样一个选项：
```sh
[ ] zh_CN.UTF-8 UTF-8
```

然后把焦点移动到它上面，按下空格键选择，选中的话方括号中会出现星号，再按回车进入下一步，新的对话框会提示选择系统默认的语言设置，这时依然把焦点移动到和上面一样的选项上，最后按回车确认，代码运行完毕后如果没有报错，就安装完成了；

### 切换中文环境

接下来开始切换语言环境，先运行一下 `locale` 命令查看当前的语言环境，应该会得到以下输出（目前还是英语环境）：
```sh
LANG=en_US.UTF-8
LANGUAGE=
LC_CTYPE="en_US.UTF-8"
LC_NUMERIC="en_US.UTF-8"
LC_TIME="en_US.UTF-8"
LC_COLLATE="en_US.UTF-8"
LC_MONETARY="en_US.UTF-8"
LC_MESSAGES="en_US.UTF-8"
LC_PAPER="en_US.UTF-8"
LC_NAME="en_US.UTF-8"
LC_ADDRESS="en_US.UTF-8"
LC_TELEPHONE="en_US.UTF-8"
LC_MEASUREMENT="en_US.UTF-8"
LC_IDENTIFICATION="en_US.UTF-8"
LC_ALL=
```

其实这些也都代表这当前系统的对应环境变量值，例如再运行 `echo $LANG` 就会得到输出 `en_US.UTF-8`，其他类似，所以我们修改的重点也是围绕其中的几个变量展开的；由于环境变量的特性，也可以再细分为两种方法；

#### 临时性修改

直接在终端里输入以下命令的话，就能对当前语言的环境变量进行修改：
```sh
export LANG=zh_CN.UTF-8
```

> 注：这里只用修改 `LANG` 这个变量就行了，后面的其它以 `LC` 开头的变量值会自动改变；

然后再运行 `locale` 看一下效果：
```sh
LANG=zh_CN.UTF-8
LANGUAGE=
LC_CTYPE="zh_CN.UTF-8"
LC_NUMERIC="zh_CN.UTF-8"
LC_TIME="zh_CN.UTF-8"
LC_COLLATE="zh_CN.UTF-8"
LC_MONETARY="zh_CN.UTF-8"
LC_MESSAGES="zh_CN.UTF-8"
LC_PAPER="zh_CN.UTF-8"
LC_NAME="zh_CN.UTF-8"
LC_ADDRESS="zh_CN.UTF-8"
LC_TELEPHONE="zh_CN.UTF-8"
LC_MEASUREMENT="zh_CN.UTF-8"
LC_IDENTIFICATION="zh_CN.UTF-8"
LC_ALL=
```

确实修改成功了，不过这条命令是临时性的，关闭当前终端或重启后就失效了，而且也仅限于当前终端内输出指定的语言，只适用于临时查看某个语言的输出内容的场景；

#### 永久性修改

要永久性的修改语言环境，其实也就是永久性的修改 `LANG` 这个环境变量的值，要实现它就直接在 `~/.bashrc` 这个文件中末尾追加下面一行内容：
```sh
export LANG=zh_CN.UTF-8
```

这样就对当前用户设置了中文语言环境，如果需要应用到系统所有用户的话，就追加到 **`/etc/profile`** 这个文件中；最后重启一下就设置成功了；

#### 其它修改方法

一些教程中会提到修改 `/etc/default/locale` 这个文件的内容，其实上面的安装中文环境这一节中，最后一步其实就是向这个文件中写入以下内容：
```sh
LANG=zh_CN.UTF-8
```

不过经测试，这样修改后重启并没有改变当前语言环境，不过要是替换成下面的内容就能修改成功：
```sh
LANGUAGE=zh_CN.UTF-8
```

另外下面任意一条命令都能实现设置 `/etc/default/loale` 这个文件的内容：
```sh
sudo localectl set-locale LANGUAGE=zh_CN.UTF-8
sudo update-lcoale LANGUAGE=zh_CN.UTF-8
```

修改后重启运行 `locale` 得到的输出是这样的：
```sh
LANG=en_US.UTF-8
LANGUAGE=zh_CN.UTF-8
LC_CTYPE="en_US.UTF-8"
LC_NUMERIC="en_US.UTF-8"
LC_TIME="en_US.UTF-8"
LC_COLLATE="en_US.UTF-8"
LC_MONETARY="en_US.UTF-8"
LC_MESSAGES="en_US.UTF-8"
LC_PAPER="en_US.UTF-8"
LC_NAME="en_US.UTF-8"
LC_ADDRESS="en_US.UTF-8"
LC_TELEPHONE="en_US.UTF-8"
LC_MEASUREMENT="en_US.UTF-8"
LC_IDENTIFICATION="en_US.UTF-8"
LC_ALL=
```

即最终只修改了 `LANGUAGE` 这一处的变量值，所以这个方法不怎么推荐；另外也有一些教程提到修改 **`/etc/sysconfig/i18n`** 或 **`/etc/local.conf`** 这两个文件的内容，这应该是其它 Linux 发型版本中的，至少我在 Kali 系统里面没有找到这两个文件；

### 安装中文字体包

修改好中文环境重启后，还有可能出现的一种常见情况就是，终端或者菜单标题之类的地方出现**乱码**，也有可能出现先刚安装完系统后；其实原因也很简单，就是虽然环境被设置成了中文，但是当前系统中缺乏相应的中文字体，所以识别错误就用一些乱码来占位了；

解决方法就是安装一些中文字体包，比如可以运行：
```sh
sudo apt install fonts-wqy-microhei
```

安装完成后，按需重启，应该就能看见友好又熟悉的内容了 `^_^`；