---
title: Git 仓库中文件名大小写问题
layout: post
categories: Git
tags: git 大小写 ignorecase
excerpt: 关于 git 中的文件名大小写识别问题与解决方法
---
首先，Windows 下 git 默认配置是对文件/文件夹名称的大小写不敏感：
```shell
git config --get core.ignorecase

# true
```

这就导致了一些时候的难以预料问题的产生，针对这个配置，先引用一下官方帮助文档的原话：
> The default is `false`, except `git-clone` or `git-init` will probe and set core.ignoreCase `true` if appropriate when the repository is created.

即 git 默认对大小写敏感，但是会在仓库克隆或初始化时，根据当前系统来设置是否忽略大小写，比如 Windows 下会设置为 `true`，即不敏感，而 Linux 中不会忽略；相信有不少开发者的项目开发与协同工作都是在 **Windows** 系统下进行的，下面就列出 git 的这种机制会导致的问题与解决思路；


### 规范重命名

如果分支上直接在编辑器或资源管理器上修改项目中的文件名（只变更大小写），本地虽然可以调试通过，但是 git 并不会识别和记录这个修改，所以下一次提交推送时并不会带上这个重命名修改，远程仓库中这个文件名还是保持不变；

因此，如果检出其他分支或者其他协作者拉取代码，项目就会报错，因为一个本地文件的名称如果由小写变成了大写，使用这个文件的代码部分也改成了大写，推送到远程后，远程的这个文件依然是小写，但远程上使用该文件的代码却成功变成了大写，那边启动项目就多半会提示文件不存在了；

对于这种情况 git 提供了一种规范的做法，使用 `git mv` 命令：
```shell
git mv test.txt TEST.txt
```

以此来实现对文件的重命名，同时 git 也会将其识别为 `Rename` 的变更类型，然后正常提交推送就能同步到远程仓库了；如果是重命名文件夹，由于 Windows 下对文件夹的大小写也不敏感（-_-），所以直接使用上面的方法会失败：
```shell
git mv test-dir TEST-DIR

# Rename from 'test-dir' to 'Test-dir/test-dir' failed.
```

这里就只有迂回一下，先把文件夹命名成其他名称，然后再命名为大写就行了：
```shell
git mv test-dir tmp
git mv tmp TEST-DIR
```


### 修改配置

可以选择直接修改 git 配置为不忽略大小写：
```shell
git config core.ignorecase false
```

然后直接在资源管理器或编辑器中修改文件名大小写，git 就会识别到了，而且是被识别为 `untracked` 类型的变更，这依然是 Windows 下对文件名大小写不敏感导致的（=_=），如果直接推送到远程的话，那么远程仓库就会同时存在大小写**两个版本**的文件（github/gitlab 服务器通常都是 Linux 系统），为后期维护添加隐患，本地在分支间切换时也可能出现以下报错：
```
error: The following untracked working tree files would be overwritten by checkout:
        test.txt
Please move or remove them before you switch branches.
Aborting
```

这种情况下依然需要使用一些迂回的办法，就是先把要重命名的文件改成其他临时名称，提交一次（`git commit`），然后再把临时名称改成想要的名称，再提交一次，最后推送到远程，这样本地和远程都只保留下一个文件了；
```shell
# rename test.txt --> tmp
git add .
git commit -m "..."

# rename tmp --> TEST.TXT
git add .
git commit -m "..."

git push
```

所以不管是 Windows 还是其他系统下，还是不要轻易修改 git 默认的 `core.ignorecase` 配置，使用规范的 `git mv` 做法就好；