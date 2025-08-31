---
title: 记一次Windows电脑开机登录后黑屏的问题分析与排查
layout: post
categories: 系统
excerpt: 记录一次Windows笔记本开机登录后黑屏的问题分析与解决的心路过程
tags: windows 登录 黑屏 事件查看 日志
---
<!--
# 起因

一阳光明媚的晌午，本人心情愉悦地摁下了笔记本的开机键后，略过了主板开机动画，熬过了 Windows 登录（win10 系统）的魔力转圈圈，最终却没能等来那昔日熟悉的桌面与亲切的图标们，直接映入眼帘的是下图：

![black.png](https://i.loli.net/2020/05/19/8YkgFhcs3IzlSKb.png)

嗯，就这样盯着它，10s...30s...1min...时间安静的流淌，内心也慢慢掀起了波澜，身经百战的心灵意识到不好的事情要发生了；Nice，人在家中坐，bug 天上来，不过黑屏给了我黑色的眼，我将用它来寻找问题。

# 问题探索

首先，调整好心态，冷静就有希望，慌乱就会败北（或者是像本人一样曾被无数 bug 折磨后的生死看淡？）问题总有会一些办法可以进行解决；然后就是寻找突破口了，这时下意识的晃了晃鼠标，然后熟悉的小光标出现了！但是还是背景一片黑，不过在这无边的黑暗中，这光标也算闪烁着唯一又弱小的希望的光芒；然后又是试探性的按了一下键盘的 `windows` 键，然后画风一变：

![black-win-a.png](https://i.loli.net/2020/05/19/YzheBOKMX6roZLx.png)

按 `win+a`也有反应，打开了侧边栏，证明系统已经加载完毕，按键都有作用，只是无法显示，于是一顿操作打开了个应用（盲开），等待数秒后没有反应，仍是一片黑，再次按下 win 键又确实看见了它已被打开，鼠标挪到任务栏位置看一下：

![black-mouse-to-taskbar-window.png](https://i.loli.net/2020/05/19/qj9izT2xd8XSLJa.png)

再开个应用，尝试使用 `alt+tab` 组合键切换应用：

![black-switch-window.png](https://i.loli.net/2020/05/19/PdB8bTaRM3L4IDf.png)

看来能够正常启动应用，然后尝试点开了任务栏一个应用（资源管理器），把鼠标挪到应用的任务栏缩略图后，出现了下面一幕：

![black-mouse-to-taskbar-window.png](https://i.loli.net/2020/05/19/qj9izT2xd8XSLJa.png)

咦这不是我那亲切的桌面嘛，居然以这种方式出现了，果然有戏，接下来再进一步发掘；**然而** 就在这时，桌面奇迹般的亮了，一切恢复如初，就像风不曾吹过，雨不曾下过，似一切都未曾发生过，难道是这般执著感化了 CPU ？开个玩笑，刚才没有执行特使的操作，应该是某种超时时间过了，桌面出现响应，不过看了看时间，算一下时间差大概有 3 分钟左右，果然这就是神奇的相对论，转瞬的时间有时可以变得很漫长；

不过事情不会这样结束，接下来又是习惯性地重启了电脑，看一下问题是否会再现，一顿操作和等待后，电脑开机...登录...转圈圈...然后果然又是黑屏！无边的黑暗再次席卷覆盖整个显示屏，不过这一次就要想办法将其撕破了；

# 问题分析

根据前面的经历，这里黑屏应该也要持续 3 分钟左右，甚至更多，那么就不能干等着，于是开始盯着深邃的屏幕陷入沉思：问题出在 Windows 系统登录后（该系统设置了开机自动登录 Windows 账户），就是系统的 BOOT 引导已经结束，这样就排除了常见的开机黑屏现象，即按下 电源键后一直黑没多余反应那种，这就通常是硬件方面的问题，比如内存条接触不良等原因，目前就基本排除了这些原因；既然是系统启动后，并且执行完了登录操作，而没能正常显示桌面，那么问题就缩小（好像也不怎么小哈..）到了软件层面，比如系统服务，驱动，启动项等等；

等等，启动项和桌面，好像想到了什么，因为一直在用一款桌面整理软件，从而避免脏乱差的视觉环境，同时就是设置开机启动，最近软件也更新了一下，难道是这个原因造成的桌面显示 bug ？不知不觉间桌面已经恢复显示了，于是按下 `Ctrl+Shift+Esc` 组合键调出任务管理器，点下 **启动** 栏，然后禁用该程序开机启动：

![taskmgr-startup-disable.png](https://i.loli.net/2020/05/19/C6zbQEwVGThtvKM.png)

随后马不停蹄地重启了电脑，然后，事实证明事情似乎没有想象中的简单，依然是熟悉的黑屏，到这里也没有特别的好招了，因为一般给别人解决问题时首先就是问最近干了啥，可能会发现线索，不过本人最近用计算机干的事情似乎有点多，系统到用户层面的各种，服务器、虚拟机、数据库等等，一时也想不出什么线索（甚至觉得盯着屏幕呼吸都是一种错 -_-），所以准备向搜索引擎寻求帮助或者找找启发；

# 问题排查

## 搜索解决方案

一搜还确实有不少小伙伴有类似的经历，排除硬件故障无法开机的，有说更新驱动的，还不少，这种回答就一笑略过吧，这种方案很普遍也是有原因的，排除不愿相信硬件损坏的显示，就可以把大部分问题推到在软硬件之间打交道的驱动程序上了，其在过去确实能解决大部分问题，不过各厂商也都更新了这么多年了，驱动层面的问题现在应该很少了，而且本人电脑里的各个驱动都一直保持在最新状态，这个也排除了；

另外也有提到取消 Windows 的快速启动功能的，也就是下面的步骤：

![control-powercfg.png](https://i.loli.net/2020/05/19/Lk31UDeJMZuKlm5.png)

![control-power-unlock.png](https://i.loli.net/2020/05/19/mi1H5A9jhswLk6Z.png)

![control-power-uncheck.png](https://i.loli.net/2020/05/19/B18AiCrYSo9Elyn.png)

不过经测试无效，所以排除；

继续浏览，不出所料，处理和解决 Windows 大部分故障或问题的场景，几乎都能见到 **注册表** 的身影，不过确实注册表这东西和 Windows 系统关系相当紧密，你在 Windows 中执行的大部分可见甚至不可见的操作，几乎都一项注册表项值与之关联；关于注册表的解决方案中基本都提到修改同一个地方（大部分是让下载或者新建一个注册表文件，然后双击导入系统，其实大可不必这样复杂）：

```
HKEY_LOCAL_MACHINE\SYSTEM\ControlSet001\Control\Class\{4d36e968-e325-11ce-bfc1-08002be10318}\0000

HKEY_LOCAL_MACHINE\SYSTEM\ControlSet001\Control\Class\{4d36e968-e325-11ce-bfc1-08002be10318}\0001
```

即在这两项下都增加（不存在的话）一个名为 `EnableULPS` 的键，值为 `0`，类型为 `REG_DWORD`，就是如下图这样：

![regedit-enableULPS.png](https://i.loli.net/2020/05/19/CQ7hOsKvznlIdHa.png)

不明觉厉，先重启试试……还真**解决**了！！但是由于职业精神，问题被莫名其妙的解决了还是有些不甘心，于是就继续深入分析下，上面的注册表操作其实就是把 `EnableULPS` 这个熟悉赋值为了 `0`，根据字面意思全部翻译过来就是禁用了 **`ULPS`** 这个功能，再搜索得知，其全称 `Ultra Low Power State（超低功率状态）`，这个似乎是 AMD 中的一个功能，下面是引用片段：

>  AMD 显卡为了防止因为频率太高导致系统不稳定。所以在 AMD 显卡上推出了一个 ULPS 功能，就是用户无操作的时候自动降频，休眠，然后用于节电。想法是好的，但是有人用了导致黑屏。所以出了一个关闭此功能的工具，它可以用于检测这个功能的开关状态，并直接关掉。

不过这个问题能在我的 Intel 中出现也是很迷；另外文章还有提到：

> - ULPS是休眠状态 ，降低非主卡的频率和电压的以节省电能，缺点就是可能会导致性能的损失和一些交火不稳定。
> - 经常用电池的不建议关闭ULPS，因为关闭后显卡一直工作在独显状态。

细想以前似乎从未动过这个功能，这么冒然改好像有点简单粗暴，之后还可能会得不偿失，所以这个方案暂时存着，先找找其它方面的问题；

## 自行排查

### 系统服务

就像之前说的，搜索问题有时候并不能得到有效的解决方案，但是某些回复的解决手段或者思路是可以起到一定程度的启发作用的，比如某一条大致说的是排查系统服务的问题，确实，之前分析时把问题定位在系统层面，排查过了启动项，但是 **服务** 这一块还没测试，所以先打开 `msconfig`，`Win+R` 后输入：

![msconfig-open.png](https://i.loli.net/2020/05/20/yec8OnPfowgRaqF.png)

然后进入服务模块：

![msconfig-service.png](https://i.loli.net/2020/05/20/KgP5yZrG4AYoabQ.png)

这里列出的就是系统中的所有服务项，前面打勾代表已启用，否则是禁用，这里的思路就是先都禁用了，然后重启如果正常则挨个启用排查是哪一项服务的问题，当然这样工作量有点大，全部禁用也可能会出现额外的问题，所以可以先试试系统自带的诊断启动，会加载一些基本服务和设备，就是点击上图顶部最左侧的 **常规** 模块，然后选择 **诊断启动**：

![msconfig-diagnose-boot.png](https://i.loli.net/2020/05/20/L3IlZ2dJMxRBubN.png)

点确定或应用后重启系统，这次就愉快又快速的进入系统桌面了（证明禁用不必要的服务确实能提高开机速度），不过也会发现某些模块无法使用，比如喇叭和屏幕亮度，甚至提示某些系统错误，很正常，因为只启用了基本服务，其它的系统服务和模块就没有加载，不过不影响问题排查就行了；

### 系统日志

当然，排查问题怎么少的了日志分析，可以起到一定辅助作用，于是这时就想起了 Windows 自家的法宝 **事件查看器**（由于平时也基本也怎么用过），平时用惯了 Linux 命令行分析日志，突然一切可视化了还不太习惯，先打开熟悉一下操作再说：

![event-win-search.png](https://i.loli.net/2020/05/20/rckZ8LMRA7YO6t9.png)

点开 Windows 日志：

![eventlog-windows-log.png](https://i.loli.net/2020/05/20/VNi7eWsDgdE84GA.png)

再看看包含事件的几项：

![eventlog-app.png](https://i.loli.net/2020/05/20/lYFzVDdJ62CHBvj.png)

![eventlog-security.png](https://i.loli.net/2020/05/20/KWTXPaz51S7picD.png)

这里由于分析问题可能是出在系统层面上，所以先关注 Windows 相关的事件，应用程序的暂且不管（其实也是因为点开它后发现应用数量有些庞大，不好找落脚点 ╮(╯▽╰)╭
），然后就是挨个进到每一项中，点击右侧操作栏的**清除日志**按钮把日志分别清空：

![eventlog-clear.png](https://i.loli.net/2020/05/20/e2TqM3rIoicgZRx.png)

这样如果后续操作时问题复现了，就可以较精确的定位了；

### 服务排查

然后可以把事件查看器关闭，再次打开 `msconfig`，选择诊断启动，再切到服务模块，可以看到大部分服务都没有被勾选了，然后我们点一下“服务”这个表头，让项目按名称顺序排列，方便后续操作：

![msconfig-sort-by-name.png](https://i.loli.net/2020/05/20/HZ8UNyD95i6QRor.png)

然后就是重点的排除环节了，这里大致数了一下，有 400 个左右的服务项，如果挨个勾选再重启检查的话，可能也就写不出这篇文章了，所以需要找一个高效的办法，之前搜索问题时也受到一位小伙伴的启发，可以使用 **二分查找** 法进行排除，这本来是算法中的一种解决方案，没想到被这样给实际应用了(～￣▽￣)～，这里通俗讲就是先勾选一半的服务项目，比如从第一条开始，一直勾选直到右侧滚动条运动到大概中点的位置（好像工作量也不小，看手速咯），前面已经对服务名称进行过排序，所以这里前半部分服务大致是字母开头是 `A - P` 的服务项：

![msconfig-check-a-p.png](https://i.loli.net/2020/05/20/NxIhDsUypc31LbE.png)

重启系统后正常进入桌面，证明问题不在勾选的前半部分服务项中，可以排除掉，接下来我们再把剩下的没有勾选的服务项，勾选它们的前半部分，也就是说现在还有总量的最后四分之一部分没有被勾选，这样排除确实挺快，然后就是清除全部 Windows 日志，重启，再重复这些工作，直到问题复现（登录黑屏）；

于是乎在进行到 `W` 字母开头的服务项排查时，登录终于黑屏了，虽然有些幸灾乐祸，但是却代表定位到问题了；然后就是继续二分，缩小范围，最终定位如下图所示：

![msconfig-uncheck-web-account.png](https://i.loli.net/2020/05/20/mZPgpqOarJB6sWu.png)

也就是说罪魁祸首是这个名为“web 账户管理器”的服务项，看制造商应该是一项系统服务，并且之前搜索时看到有几位小伙伴定位的服务项是“App Readiness”，所以这个会因不同系统环境而不同，不应该一概而论冒然禁用；当然把它禁用后问题就**解决**了，没有像之前一样修改注册表，但是再次本着职业精神（no zuo no die），就继续分析一下问题的具体原因；

### 日志分析

#### 日志概览

每一次统计的系统日志就在这时候发挥作用了，因为每一次重启前都清除了日志，所以每次记录的也就是当前排查项的事件，下面看一下记录的日志情况：

![eventlog-app-apperr.png](https://i.loli.net/2020/05/20/7qgA6YcxHBOaDLZ.png)

![black-sys-errlog.png](https://i.loli.net/2020/05/20/PJanBDdlA4kv5ZE.png)

分别查看不同事件，可以 显示详细信息：

![black-sys-err-dhcp.png](https://i.loli.net/2020/05/20/CoM5NGHnkl8tgTi.png)

![black-sys-err-scm-ops.png](https://i.loli.net/2020/05/20/1tLIeDmEuXxSrbW.png)

#### 日志筛选

可以看到即使单次记录的日志量也是很庞大的，所以现在可以使用事件查看器的**日志筛选**功能了，即点击右侧操作栏的**筛选当前日志**按钮，会弹出筛选设置窗口：

![eventlog-filter.png](https://i.loli.net/2020/05/20/Whd6uxaFLikn57f.png)

首先是记录时间，即指定事件的起始和结束时间点，可以在开机和桌面显示后分别记录一个时间，然后选择这个时间区间就能进一步缩小范围；

![eventlog-filter-time.png](https://i.loli.net/2020/05/20/DLo1dfYI8UyHezx.png)

然后是时间组别，浏览也会发现事件主要分为信息、警告和错误，这里我们只用关心**错误**类型的事件，勾上后下面的项目暂时不用关，点确定；

![eventlog-filter-config.png](https://i.loli.net/2020/05/20/NkmrXzZR5lKGdpe.png)

下面就是筛选结果，可以看到错误信息还挺多，

![eventlog-filter-done.png](https://i.loli.net/2020/05/20/vqGgIDwxbWpL6lT.png)

对比黑屏时产生的错误日志，可以发现“应用程序”项的错误在正常进入桌面时也有发生，所以可以暂时排除这一项，而“安全”这一项，都是信息类，并没有错误类事件，所以也排除，最后就只剩“系统”这一项中的错误日志存在差异，存在差异的事件包括名为 `Service Control Manager` 和 `DistributedCOM`  的事件“来源”中；

![eventlog-app-err-of-black.png](https://i.loli.net/2020/05/20/41OykxKat78FhLi.png)

![eventlog-sys-err-of-black.png](https://i.loli.net/2020/05/20/1Lkr5Uwgcjodvl3.png)

#### 对比分析

那么我们就来对比一下“系统”中产生的错误日志的差异，只是事件查看器似乎没有内置日志对比的功能，所以只能使用较为原始的办法，先选中想要分析的事件：

![eventlog-select-event.png](https://i.loli.net/2020/05/20/oBW3fsAN7KrJZO4.png)

再点击右侧的**保存选择的事件**按钮，保存事件日志文件到任意位置：

![eventlog-save-selected-log.png](https://i.loli.net/2020/05/20/7kif9mCnGgQD2NX.png)

像这样分别记录和保存发生黑屏问题和未发生问题时的事件，然后点击“打开保存的日志”，就能导入两个日志文件就行下一步分析了：

![eventlog-open-saved-log.png](https://i.loli.net/2020/05/20/NzOyr49GwTdnQvg.png)

另外发现每个事件似乎都对应着一个唯一的 **事件 ID** 值，可以通过这个把两个日志文件重复的地方剔除，这就要使用筛选功能里的事件 ID 排除选项了：

![Inkedeventlog-filter-exclude-id.png](https://i.loli.net/2020/05/20/e7Crcf4RqUGz6i1.jpg)

填入重复的事件 ID，用逗号隔开，前面加负号 `-` 表示排除该 ID 的事件，不加表示包括，筛选结果如下：

![eventlog-filter-compare-result.png](https://i.loli.net/2020/05/20/s4mTkPF37lWdDEL.png)

两个错误事件相同，从下方信息栏中没有发现特别有用的信息，只有一行主要信息：

```
服务器 {784E29F4-5EBE-4279-9948-1E8FE941646D} 没有在要求的超时时间内向 DCOM 注册。
```

那么接下来分析一下这串注册值，`Win+R` 输入 `wmic` 运行，进入 **wmic** 管理界面，然后运行：
```sh
dcomapp where "appid<='{79' and appid>='{74'" get appid,name
```

以上命令是查询开头类似 `{784E29F4-5EBE-4279-9948-1E8FE941646D}` 的 DCOM 服务，得到结果如下：

![wmic-dcomapp-query.png](https://i.loli.net/2020/05/20/3IOJitc1AXCrnRk.png)

浏览后发现里面没有和上面相同的 ID 值，所以这条线索断了，试试其它的；

#### 进程追踪

点一下“详细信息”，再向下浏览，发现了触发该事件的进程信息，其中比较重要的就是进程 ID（ProcessID），也就是常说的 PID，这里为 `1140`，先记下来；

![eventlog-sys-compared-err-pid.png](https://i.loli.net/2020/05/20/Ek7Or2Ui3MwvhNL.png)

然后 `Ctrl+Shift+Esc` 打开任务管理器，点一下 **PID** 栏（没有就在表头右键单击，然后勾选上），让它按数字升序排列，找到之前记录的 pid 值（1140）：

![eventlog-err-pid-with-tasklist.png](https://i.loli.net/2020/05/20/mCSs7kdBhu2xXOD.png)

这时就能看到运行该进程的命令行信息了（同样要是没有这一列就右键点击勾选），发现运行的程序是 `C:\Windows\system32\svchost.exe`，这是一个系统程序，很多服务都会调用它，需要关注的是后面的参数，出现了 `RPCSS` 这个关键字，看着很熟悉，好像是和远程相关的，搜索后网上说这是一个与 `135` 端口相关的服务，那么我们就 `Win+R` 输入 `cmd` 打开命令提示符，查看一下这个端口信息：

![cmd-netstat-rpcss.png](https://i.loli.net/2020/05/20/a4Fj1Jzonr3c5fN.png)

果然存在关联，那么这个 `RPCSS` 应该是一个服务，所以接下来用 `sc` 命令查询一下这个服务：

![cmd-sc-rpcss.png](https://i.loli.net/2020/05/20/kPT8q6sgMxtSjwC.png)

确实是一个服务，这里主要是获取 `DISPLAY_NAME` 这个值，即 `Remote Procedure Call`，然后打开服务管理工具（`Win+R` 后输入 `services.msc`），找到这个服务项：

![service-rpcss.png](https://i.loli.net/2020/05/20/ZdMJRHNU1QyuG38.png)

双击进去，看一下依赖关系，确实是一项系统基础服务，许多重要的服务和模块都依赖于它，还不能直接冒然禁用：

![service-rpcss-depend.png](https://i.loli.net/2020/05/20/fgk4eRA3tKdjvZp.png)

到这里所有分析工作就结束了。

# 后记

下面是之后重新收集的黑屏时的错误事件（启用全部服务），这次就只剩一处错误日志了，也与上面分析筛选结果一致：

![eventlog-in-black-less-err-warn.png](https://i.loli.net/2020/05/20/uTV34l8KHfGkJOc.png)

然而，当再次禁用之前的问题服务项时，信息量就剧增了：

![eventlog-no-black-more-err-warn.png](https://i.loli.net/2020/05/20/qPZIgbeGtcEQnay.png)

原因也很明显，禁用一项比较关键的服务项，并且其依赖项还比较多时，就难免发生连环事故，虽然暂时解决了目前的问题，但是对于轻微强迫症的作者来说，多少看着还是有些不安（饮鸩止渴？）但是后面有趣的事情又发生了，在某一次启用全部服务（包括之前确定为问题源的“web 账户管理器”服务）重启进入系统后，竟然意外地**没有黑屏**，而是和平时一样正常进入桌面，后面又试了几次都正常……难道是这一天的 n 顿操作猛如虎和无数次重启再次感化 CPU？看来 Windows 系统永远是个谜，bug 轻轻走了又正如它轻轻的来，不带走一片云彩，算了不玩了，收工。 
-->


# 起因

一阳光明媚的晌午，本人心情愉悦地翻开笔记本，一如既往地摁下开机键后，略过了主板开机动画，熬过了 Windows 登录（win10 系统）的魔力转圈圈，最终却没能等来那昔日熟悉的桌面与亲切的图标们，直接映入眼帘的是下图：

![black.png](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pLmxvbGkubmV0LzIwMjAvMDUvMTkvOFlrZ0ZoY3MzSXpsU0tiLnBuZw?x-oss-process=image/format,png)

嗯，就这样盯着它，10s...30s...1min...时间安静的流淌，内心也慢慢掀起了波澜，身经百战的心灵意识到不好的事情要发生了；Nice，人在家中坐，bug 天上来，不过黑屏给了我黑色的眼，我将用它来寻找问题。

# 问题探索

首先，调整好心态，冷静就有希望，慌乱就会败北（或者是像本人一样曾被无数 bug 折磨后的生死看淡？）问题总有会一些办法可以进行解决；然后就是寻找突破口了，这时下意识的晃了晃鼠标，然后熟悉的小光标出现了！但是还是背景一片黑，不过在这无边的黑暗中，这光标也算闪烁着唯一又弱小的希望的光芒；然后又是试探性的按了一下键盘的 `windows` 键，然后画风一变：

![black-win-a.png](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pLmxvbGkubmV0LzIwMjAvMDUvMTkvWXpoZUJPS01YNnJvWkx4LnBuZw?x-oss-process=image/format,png)

按 `win+a`也有反应，打开了侧边栏，证明系统已经加载完毕，按键都有作用，只是无法显示，于是一顿操作打开了个应用（盲开），等待数秒后没有反应，仍是一片黑，再次按下 win 键又确实看见了它已被打开，鼠标挪到任务栏位置看一下：

![black-mouse-to-taskbar-window.png](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pLmxvbGkubmV0LzIwMjAvMDUvMTkvcWo5aXpUMnhkOFhTTEphLnBuZw?x-oss-process=image/format,png)

再开个应用，尝试使用 `alt+tab` 组合键切换应用：

![black-switch-window.png](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pLmxvbGkubmV0LzIwMjAvMDUvMTkvUGRCOGJUYVJNM0w0SURmLnBuZw?x-oss-process=image/format,png)

看来能够正常启动应用，然后尝试点开了任务栏一个应用（资源管理器），把鼠标挪到应用的任务栏缩略图后，出现了下面一幕：

![black-mouse-to-taskbar-window.png](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pLmxvbGkubmV0LzIwMjAvMDUvMTkvcWo5aXpUMnhkOFhTTEphLnBuZw?x-oss-process=image/format,png)

咦这不是我那亲切的桌面嘛，居然以这种方式出现了，果然有戏，接下来再进一步发掘；**然而** 就在这时，桌面奇迹般的亮了，一切恢复如初，就像风不曾吹过，雨不曾下过，似一切都未曾发生过，难道是这般执著感化了 CPU ？开个玩笑，刚才没有执行特使的操作，应该是某种超时时间过了，桌面出现响应，不过看了看时间，算一下时间差大概有 3 分钟左右，果然这就是神奇的相对论，转瞬的时间有时可以变得很漫长；

不过事情不会这样结束，接下来又是习惯性地重启了电脑，看一下问题是否会再现，一顿操作和等待后，电脑开机...登录...转圈圈...然后果然又是黑屏！无边的黑暗再次席卷覆盖整个显示屏，不过这一次就要想办法将其撕破了；

# 问题分析

根据前面的经历，这里黑屏应该也要持续 3 分钟左右，甚至更多，那么就不能干等着，于是开始盯着深邃的屏幕陷入沉思：问题出在 Windows 系统登录后（该系统设置了开机自动登录 Windows 账户），就是系统的 BOOT 引导已经结束，这样就排除了常见的开机黑屏现象，即按下 电源键后一直黑没多余反应那种，这就通常是硬件方面的问题，比如内存条接触不良等原因，目前就基本排除了这些原因；既然是系统启动后，并且执行完了登录操作，而没能正常显示桌面，那么问题就缩小（好像也不怎么小哈..）到了软件层面，比如系统服务，驱动，启动项等等；

等等，启动项和桌面，好像想到了什么，因为一直在用一款桌面整理软件，从而避免脏乱差的视觉环境，同时就是设置开机启动，最近软件也更新了一下，难道是这个原因造成的桌面显示 bug ？不知不觉间桌面已经恢复显示了，于是按下 `Ctrl+Shift+Esc` 组合键调出任务管理器，点下 **启动** 栏，然后禁用该程序开机启动：

![taskmgr-startup-disable.png](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pLmxvbGkubmV0LzIwMjAvMDUvMTkvQzZ6YlFFd1ZHVGh0dktNLnBuZw?x-oss-process=image/format,png)

随后马不停蹄地重启了电脑，然后，事实证明事情似乎没有想象中的简单，依然是熟悉的黑屏，到这里也没有特别的好招了，因为一般给别人解决问题时首先就是问最近干了啥，可能会发现线索，不过本人最近用计算机干的事情似乎有点多，系统到用户层面的各种，服务器、虚拟机、数据库等等，一时也想不出什么线索（甚至觉得盯着屏幕呼吸都是一种错 -_-），所以准备向搜索引擎寻求帮助或者找找启发；

# 问题排查

## 搜索解决方案

一搜还确实有不少小伙伴有类似的经历，排除硬件故障无法开机的，有说更新驱动的，还不少，这种回答就一笑略过吧，这种方案很普遍也是有原因的，排除不愿相信硬件损坏的显示，就可以把大部分问题推到在软硬件之间打交道的驱动程序上了，其在过去确实能解决大部分问题，不过各厂商也都更新了这么多年了，驱动层面的问题现在应该很少了，而且本人电脑里的各个驱动都一直保持在最新状态，这个也排除了；

另外也有提到取消 Windows 的快速启动功能的，也就是下面的步骤：

![control-powercfg.png](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pLmxvbGkubmV0LzIwMjAvMDUvMTkvTGszMVVEZUpNWnVLbG01LnBuZw?x-oss-process=image/format,png)

![control-power-unlock.png](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pLmxvbGkubmV0LzIwMjAvMDUvMTkvbWkxSDVBOWpoc3dMazZaLnBuZw?x-oss-process=image/format,png)

![control-power-uncheck.png](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pLmxvbGkubmV0LzIwMjAvMDUvMTkvQjE4QWlDcllTbzlFbHluLnBuZw?x-oss-process=image/format,png)

不过经测试无效，所以排除；

继续浏览，不出所料，处理和解决 Windows 大部分故障或问题的场景，几乎都能见到 **注册表** 的身影，不过确实注册表这东西和 Windows 系统关系相当紧密，你在 Windows 中执行的大部分可见甚至不可见的操作，几乎都一项注册表项值与之关联；关于注册表的解决方案中基本都提到修改同一个地方（大部分是让下载或者新建一个注册表文件，然后双击导入系统，其实大可不必这样复杂）：

```
HKEY_LOCAL_MACHINE\SYSTEM\ControlSet001\Control\Class\{4d36e968-e325-11ce-bfc1-08002be10318}\0000

HKEY_LOCAL_MACHINE\SYSTEM\ControlSet001\Control\Class\{4d36e968-e325-11ce-bfc1-08002be10318}\0001
```

即在这两项下都增加（不存在的话）一个名为 `EnableULPS` 的键，值为 `0`，类型为 `REG_DWORD`，就是如下图这样：

![regedit-enableULPS.png](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pLmxvbGkubmV0LzIwMjAvMDUvMTkvQ1E3aE9zS3Z6bmxJZEhhLnBuZw?x-oss-process=image/format,png)

不明觉厉，先重启试试……还真**解决**了！！但是由于职业精神，问题被莫名其妙的解决了还是有些不甘心，于是就继续深入分析下，上面的注册表操作其实就是把 `EnableULPS` 这个熟悉赋值为了 `0`，根据字面意思全部翻译过来就是禁用了 `ULPS` 这个功能，再搜索得知，其全称 `Ultra Low Power State（超低功率状态）`，这个似乎是 AMD 中的一个功能，下面是引用片段：

>  AMD 显卡为了防止因为频率太高导致系统不稳定。所以在 AMD 显卡上推出了一个 ULPS 功能，就是用户无操作的时候自动降频，休眠，然后用于节电。想法是好的，但是有人用了导致黑屏。所以出了一个关闭此功能的工具，它可以用于检测这个功能的开关状态，并直接关掉。

不过这个问题能在我的 Intel 中出现也是很迷；另外文章还有提到：

> - ULPS是休眠状态 ，降低非主卡的频率和电压的以节省电能，缺点就是可能会导致性能的损失和一些交火不稳定。
> - 经常用电池的不建议关闭ULPS，因为关闭后显卡一直工作在独显状态。

细想以前似乎从未动过这个功能，这么冒然改好像有点简单粗暴，之后还可能会得不偿失，所以这个方案暂时存着，先找找其它方面的问题；

## 自行排查

### 系统服务

就像之前说的，搜索问题有时候并不能得到有效的解决方案，但是某些回复的解决手段或者思路是可以起到一定程度的启发作用的，比如某一条大致说的是排查系统服务的问题，确实，之前分析时把问题定位在系统层面，排查过了启动项，但是 **服务** 这一块还没测试，所以先打开 `msconfig`，`Win+R` 后输入：

![msconfig-open.png](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pLmxvbGkubmV0LzIwMjAvMDUvMjAveWVjOE9uUGZvd2dSYXFGLnBuZw?x-oss-process=image/format,png)

然后进入服务模块：

![msconfig-service.png](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pLmxvbGkubmV0LzIwMjAvMDUvMjAvS2dQNXlackc0QVlvYWJRLnBuZw?x-oss-process=image/format,png)

这里列出的就是系统中的所有服务项，前面打勾代表已启用，否则是禁用，这里的思路就是先都禁用了，然后重启如果正常则挨个启用排查是哪一项服务的问题，当然这样工作量有点大，全部禁用也可能会出现额外的问题，所以可以先试试系统自带的诊断启动，会加载一些基本服务和设备，就是点击上图顶部最左侧的 **常规** 模块，然后选择 **诊断启动**：

![msconfig-diagnose-boot.png](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pLmxvbGkubmV0LzIwMjAvMDUvMjAvTDNJbFoyZEpNeFJCdWJOLnBuZw?x-oss-process=image/format,png)

点确定或应用后重启系统，这次就愉快又快速的进入系统桌面了（证明禁用不必要的服务确实能提高开机速度），不过也会发现某些模块无法使用，比如喇叭和屏幕亮度，甚至提示某些系统错误，很正常，因为只启用了基本服务，其它的系统服务和模块就没有加载，不过不影响问题排查就行了；

### 系统日志

当然，排查问题怎么少的了日志分析，可以起到一定辅助作用，于是这时就想起了 Windows 自家的法宝 **事件查看器**（由于平时也基本也怎么用过），平时用惯了 Linux 命令行分析日志，突然一切可视化了还不太习惯，先打开熟悉一下操作再说：

![event-win-search.png](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pLmxvbGkubmV0LzIwMjAvMDUvMjAvcmNrWjhMTVJBN1lPNnQ5LnBuZw?x-oss-process=image/format,png)

点开 Windows 日志：

![eventlog-windows-log.png](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pLmxvbGkubmV0LzIwMjAvMDUvMjAvVk5pN2VXc0RnZEU4NEdBLnBuZw?x-oss-process=image/format,png)

再看看包含事件的几项：

![eventlog-app.png](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pLmxvbGkubmV0LzIwMjAvMDUvMjAvbFlGelZEZEo2MkNIQnZqLnBuZw?x-oss-process=image/format,png)

![eventlog-security.png](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pLmxvbGkubmV0LzIwMjAvMDUvMjAvS1dUWFBhejUxUzdwaWNELnBuZw?x-oss-process=image/format,png)

这里由于分析问题可能是出在系统层面上，所以先关注 Windows 相关的事件，应用程序的暂且不管（其实也是因为点开它后发现应用数量有些庞大，不好找落脚点 ╮(╯▽╰)╭
），然后就是挨个进到每一项中，点击右侧操作栏的**清除日志**按钮把日志分别清空：

![eventlog-clear.png](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pLmxvbGkubmV0LzIwMjAvMDUvMjAvZTJUcU0zcklvaWNnWlJ4LnBuZw?x-oss-process=image/format,png)

这样如果后续操作时问题复现了，就可以较精确的定位了；

### 服务排查

然后可以把事件查看器关闭，再次打开 `msconfig`，选择诊断启动，再切到服务模块，可以看到大部分服务都没有被勾选了，然后我们点一下“服务”这个表头，让项目按名称顺序排列，方便后续操作：

![msconfig-sort-by-name.png](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pLmxvbGkubmV0LzIwMjAvMDUvMjAvSFo4VU55RDk1aTZRUm9yLnBuZw?x-oss-process=image/format,png)

然后就是重点的排除环节了，这里大致数了一下，有 400 个左右的服务项，如果挨个勾选再重启检查的话，可能也就写不出这篇文章了，所以需要找一个高效的办法，之前搜索问题时也受到一位小伙伴的启发，可以使用 **二分查找** 法进行排除，这本来是算法中的一种解决方案，没想到被这样给实际应用了(～￣▽￣)～，这里通俗讲就是先勾选一半的服务项目，比如从第一条开始，一直勾选直到右侧滚动条运动到大概中点的位置（好像工作量也不小，看手速咯），前面已经对服务名称进行过排序，所以这里前半部分服务大致是字母开头是 `A - P` 的服务项：

![msconfig-check-a-p.png](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pLmxvbGkubmV0LzIwMjAvMDUvMjAvTnhJaERzVXlwYzMxTGJFLnBuZw?x-oss-process=image/format,png)

重启系统后正常进入桌面，证明问题不在勾选的前半部分服务项中，可以排除掉，接下来我们再把剩下的没有勾选的服务项，勾选它们的前半部分，也就是说现在还有总量的最后四分之一部分没有被勾选，这样排除确实挺快，然后就是清除全部 Windows 日志，重启，再重复这些工作，直到问题复现（登录黑屏）；

于是乎在进行到 `W` 字母开头的服务项排查时，登录终于黑屏了，虽然有些幸灾乐祸，但是却代表定位到问题了；然后就是继续二分，缩小范围，最终定位如下图所示：

![msconfig-uncheck-web-account.png](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pLmxvbGkubmV0LzIwMjAvMDUvMjAvbVpQZ3BxT2FySkI2c1d1LnBuZw?x-oss-process=image/format,png)

也就是说罪魁祸首是这个名为“web 账户管理器”的服务项，看制造商应该是一项系统服务，并且之前搜索时看到有几位小伙伴定位的服务项是“App Readiness”，所以这个会因不同系统环境而不同，不应该一概而论冒然禁用；当然把它禁用后问题就**解决**了，没有像之前一样修改注册表，但是再次本着职业精神（no zuo no die），就继续分析一下问题的具体原因；

### 日志分析

#### 日志概览

每一次统计的系统日志就在这时候发挥作用了，因为每一次重启前都清除了日志，所以每次记录的也就是当前排查项的事件，下面看一下记录的日志情况：

![eventlog-app-apperr.png](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pLmxvbGkubmV0LzIwMjAvMDUvMjAvN3FnQTZZY3hIQk9hRExaLnBuZw?x-oss-process=image/format,png)

![black-sys-errlog.png](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pLmxvbGkubmV0LzIwMjAvMDUvMjAvUEphbkJEZGxBNGt2NVpFLnBuZw?x-oss-process=image/format,png)

分别查看不同事件，可以 显示详细信息：

![black-sys-err-dhcp.png](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pLmxvbGkubmV0LzIwMjAvMDUvMjAvQ29NNU5HSG5rbDh0Z1RpLnBuZw?x-oss-process=image/format,png)

![black-sys-err-scm-ops.png](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pLmxvbGkubmV0LzIwMjAvMDUvMjAvMXRMSWVEbUV1WHhTcmJXLnBuZw?x-oss-process=image/format,png)

#### 日志筛选

可以看到即使单次记录的日志量也是很庞大的，所以现在可以使用事件查看器的**日志筛选**功能了，即点击右侧操作栏的**筛选当前日志**按钮，会弹出筛选设置窗口：

![eventlog-filter.png](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pLmxvbGkubmV0LzIwMjAvMDUvMjAvV2hkNnV4YUZMaWtuNTdmLnBuZw?x-oss-process=image/format,png)

首先是记录时间，即指定事件的起始和结束时间点，可以在开机和桌面显示后分别记录一个时间，然后选择这个时间区间就能进一步缩小范围；

![eventlog-filter-time.png](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pLmxvbGkubmV0LzIwMjAvMDUvMjAvRExvMWRmWUk4VXlIZXp4LnBuZw?x-oss-process=image/format,png)

然后是时间组别，浏览也会发现事件主要分为信息、警告和错误，这里我们只用关心**错误**类型的事件，勾上后下面的项目暂时不用关，点确定；

![eventlog-filter-config.png](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pLmxvbGkubmV0LzIwMjAvMDUvMjAvTmttclh6WlI1bEtHZHBlLnBuZw?x-oss-process=image/format,png)

下面就是筛选结果，可以看到错误信息还挺多，

![eventlog-filter-done.png](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pLmxvbGkubmV0LzIwMjAvMDUvMjAvdnFHZ0lEd3hiV3BMNmxULnBuZw?x-oss-process=image/format,png)

对比黑屏时产生的错误日志，可以发现“应用程序”项的错误在正常进入桌面时也有发生，所以可以暂时排除这一项，而“安全”这一项，都是信息类，并没有错误类事件，所以也排除，最后就只剩“系统”这一项中的错误日志存在差异，存在差异的事件包括名为 `Service Control Manager` 和 `DistributedCOM`  的事件“来源”中；

![eventlog-app-err-of-black.png](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pLmxvbGkubmV0LzIwMjAvMDUvMjAvNDFPeWt4S2F0NzhGaExpLnBuZw?x-oss-process=image/format,png)

![eventlog-sys-err-of-black.png](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pLmxvbGkubmV0LzIwMjAvMDUvMjAvMUxrcjVVd2djam9kdmwzLnBuZw?x-oss-process=image/format,png)

#### 对比分析

那么我们就来对比一下“系统”中产生的错误日志的差异，只是事件查看器似乎没有内置日志对比的功能，所以只能使用较为原始的办法，先选中想要分析的事件：

![eventlog-select-event.png](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pLmxvbGkubmV0LzIwMjAvMDUvMjAvb0JXM2ZzQU43S3JKWk80LnBuZw?x-oss-process=image/format,png)

再点击右侧的**保存选择的事件**按钮，保存事件日志文件到任意位置：

![eventlog-save-selected-log.png](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pLmxvbGkubmV0LzIwMjAvMDUvMjAvN2tpZjltQ25HZ1FEMk5YLnBuZw?x-oss-process=image/format,png)

像这样分别记录和保存发生黑屏问题和未发生问题时的事件，然后点击“打开保存的日志”，就能导入两个日志文件就行下一步分析了：

![eventlog-open-saved-log.png](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pLmxvbGkubmV0LzIwMjAvMDUvMjAvTnpPeXI0OUd3VGRuUXZnLnBuZw?x-oss-process=image/format,png)

另外发现每个事件似乎都对应着一个唯一的 **事件 ID** 值，可以通过这个把两个日志文件重复的地方剔除，这就要使用筛选功能里的事件 ID 排除选项了：

![Inkedeventlog-filter-exclude-id.png](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pLmxvbGkubmV0LzIwMjAvMDUvMjAvZTdDcmNmNFJxVUd6NmkxLmpwZw?x-oss-process=image/format,png)

填入重复的事件 ID，用逗号隔开，前面加负号 `-` 表示排除该 ID 的事件，不加表示包括，筛选结果如下：

![eventlog-filter-compare-result.png](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pLmxvbGkubmV0LzIwMjAvMDUvMjAvczRtVGtQRjM3bFdkREVMLnBuZw?x-oss-process=image/format,png)

两个错误事件相同，从下方信息栏中没有发现特别有用的信息，只有一行主要信息：

```
服务器 {784E29F4-5EBE-4279-9948-1E8FE941646D} 没有在要求的超时时间内向 DCOM 注册。
```

那么接下来分析一下这串注册值，`Win+R` 输入 `wmic` 运行，进入 **wmic** 管理界面，然后运行：
```sh
dcomapp where "appid<='{79' and appid>='{74'" get appid,name
```

以上命令是查询开头类似 `{784E29F4-5EBE-4279-9948-1E8FE941646D}` 的 DCOM 服务，得到结果如下：

![wmic-dcomapp-query.png](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pLmxvbGkubmV0LzIwMjAvMDUvMjAvM0lPSml0YzFBWENyblJrLnBuZw?x-oss-process=image/format,png)

浏览后发现里面没有和上面相同的 ID 值，所以这条线索断了，试试其它的；

#### 进程追踪

点一下“详细信息”，再向下浏览，发现了触发该事件的进程信息，其中比较重要的就是进程 ID（ProcessID），也就是常说的 PID，这里为 `1140`，先记下来；

![eventlog-sys-compared-err-pid.png](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pLmxvbGkubmV0LzIwMjAvMDUvMjAvRWs3T3IyVWkzTXd2aE5MLnBuZw?x-oss-process=image/format,png)

然后 `Ctrl+Shift+Esc` 打开任务管理器，点一下 **PID** 栏（没有就在表头右键单击，然后勾选上），让它按数字升序排列，找到之前记录的 pid 值（1140）：

![eventlog-err-pid-with-tasklist.png](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pLmxvbGkubmV0LzIwMjAvMDUvMjAvbUNTczdrZEJodTJ4WE9ELnBuZw?x-oss-process=image/format,png)

这时就能看到运行该进程的命令行信息了（同样要是没有这一列就右键点击勾选），发现运行的程序是 `C:\Windows\system32\svchost.exe`，这是一个系统程序，很多服务都会调用它，需要关注的是后面的参数，出现了 `RPCSS` 这个关键字，看着很熟悉，好像是和远程相关的，搜索后网上说这是一个与 `135` 端口相关的服务，那么我们就 `Win+R` 输入 `cmd` 打开命令提示符，查看一下这个端口信息：

![cmd-netstat-rpcss.png](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pLmxvbGkubmV0LzIwMjAvMDUvMjAvYTRGajFKem9ucjNjNWZOLnBuZw?x-oss-process=image/format,png)

果然存在关联，那么这个 `RPCSS` 应该是一个服务，所以接下来用 `sc` 命令查询一下这个服务：

![cmd-sc-rpcss.png](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pLmxvbGkubmV0LzIwMjAvMDUvMjAva1BUOHE2c2dNeHRTandDLnBuZw?x-oss-process=image/format,png)

确实是一个服务，这里主要是获取 `DISPLAY_NAME` 这个值，即 `Remote Procedure Call`，然后打开服务管理工具（`Win+R` 后输入 `services.msc`），找到这个服务项：

![service-rpcss.png](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pLmxvbGkubmV0LzIwMjAvMDUvMjAvWmRNSlJITlUxUXl1RzM4LnBuZw?x-oss-process=image/format,png)

双击进去，看一下依赖关系，确实是一项系统基础服务，许多重要的服务和模块都依赖于它，还不能直接冒然禁用：

![service-rpcss-depend.png](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pLmxvbGkubmV0LzIwMjAvMDUvMjAvZmdrNGVSQTN0S2RqdlpwLnBuZw?x-oss-process=image/format,png)

到这里所有分析工作就结束了。

# 后记

下面是之后重新收集的黑屏时的错误事件（启用全部服务），这次就只剩一处错误日志了，也与上面分析筛选结果一致：

![eventlog-in-black-less-err-warn.png](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pLmxvbGkubmV0LzIwMjAvMDUvMjAvdVRWMzRsOEtIZkdrSk9jLnBuZw?x-oss-process=image/format,png)

然而，当再次禁用之前的问题服务项时，信息量就剧增了：

![eventlog-no-black-more-err-warn.png](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pLmxvbGkubmV0LzIwMjAvMDUvMjAvcVBaSWdiZUd0Y0VRbmF5LnBuZw?x-oss-process=image/format,png)

原因也很明显，禁用一项比较关键的服务项，并且其依赖项还比较多时，就难免发生连环事故，虽然暂时解决了目前的问题，但是对于轻微强迫症的作者来说，多少看着还是有些不安（饮鸩止渴？）但是后面有趣的事情又发生了，在某一次启用全部服务（包括之前确定为问题源的“web 账户管理器”服务）重启进入系统后，竟然意外地**没有黑屏**，而是和平时一样正常进入桌面，后面又试了几次都正常……难道是这一天的 n 顿操作猛如虎和无数次重启再次感化 CPU？看来 Windows 系统永远是个谜，bug 轻轻走了又正如它轻轻的来，不带走一片云彩，算了不玩了，收工。