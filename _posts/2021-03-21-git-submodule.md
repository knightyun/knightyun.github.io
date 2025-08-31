---
title: Git submodule 知识总结
layout: post
categories: Git
tags: git submodule 子模块
excerpt: 总结 Git 子模块（submodule）的相关概念及用法
---
## 概念

先引用 `git` 的官方定义描述：
> A submodule is a repository embedded inside another repository. The submodule has its own history; the repository it is embedded in is called a superproject.

子模块（`submodule`）是一个内嵌在其他 git 仓库（父工程）中的 git 仓库，子模块有自己的 git 记录。

通常，如果一个仓库存在子模块，父工程目录下的 `.git/modules/` 目录中会存在一个 `git` 目录，子模块的仓库目录会存在于父工程的仓库目录中，并且子模块的仓库目录中也会存在一个 `.git` 目录；

使用场景：
- 想要在一个工程中使用另一个工程，但是那个工程包含了单独的提交记录，`submodule` 就可以实现在一个工程中引入另一个工程，同时保留二者的提交记录并且区分开来；目前 `submodule` 还能实现单独开发子工程，并且不会影响父工程，父工程可以在需要的时候更新子模块的版本；
- 想要把一个工程拆分成多个仓库并进行集中管理，这可以用来实现 `git` 当前的限制，实现更细粒度的访问，解决当仓库过于庞大时所出现的传输量大、提交记录冗杂、权限分设等问题；


## 使用

### 新增子模块

向一个项目中添加子模块：

    git submodule add https://github.com/yyy/xxx.git


之后会 `clone` 该子模块对应的远程项目文件到本地父项目目录下的同名文件夹中（`./xxx/`），父项目下也会多一个叫 `.gitmodules` 的文件，内容大致为：
```
[submodule "xxx"]
	path = xxx
	url = git@github.com:yyy/xxx.git
```

如果存在多个子模块，则会继续向该文件中追加与上面相同格式的内容；

同时父项目下的 `.git` 目录中也会新增 `/modules/xxx/` 目录，里面的内容对应子模块仓库中原有的 `.git` 目录中的文件，此时虽然子模块目录下的 `.git` 依然存在，但是已经由一个文件夹变成了文件，内容为：
```
gitdir: ../.git/modules/xxx
```

即指向了父项目的 `.git/modules/xxx` 目录；如果运行 `git config --list` 查看项目的配置，也会发现多了类似下面两行的内容：
```
submodule.xxx.url=git@github.com:yyy/xxx.git
submodule.xxx.active=true
```

如果修改 `submodule.xxx.url` 的值，则会覆盖 `.gitmodules` 文件中对应的 `url` 值；


### 查看子模块

查看当前项目下的子模块：
> `git submodule`

 或者
> `git submodule status`

输出：
```
70c316ecb7c41a5bdf8a37ff93bf866d3b903388 xxx (heads/master)
```

如果将父项目推送到远程仓库（如 Github），在网页浏览该项目时子模块所在的目录会多一个类似 **`@70c316e`** 的后缀，即上面查看子模块命令输出内容的 hash 值的前面部分，点击这个目录会跳转到这个子模块对应的仓库地址（另一个 url）；

如果执行：

    git submodule deinit

删除了子模块，则再次查看时输出会是这样的：
```
-70c316ecb7c41a5bdf8a37ff93bf866d3b903388 xxx
```


### 拉取子模块

如果要 `clone` 一个项目，并且包含其子模块的文件，则需要给 `git clone` 命令最后加上 `--recurse-submodules` 或者 `--recursive` 参数（**否则**只会下载一个空的子模块文件）：

    git clone https://github.com/yyy/xxx.git --recursive

当然，克隆时忘记了加这个参数，后续也有办法去拉取子模块的文件，首先执行：

    git submodule init

这会初始化子模块相关配置，比如自动在 `config` 中加入下面两行内容：
```
submodule.xxx.url=git@github.com:yyy/xxx.git
submodule.xxx.active=true
```

然后执行：

    git submodule update

就可以拉取到子模块仓库中的文件了，也可以将这两步命令合并为一步：

    git submodule update --init

要拉取所有层层嵌套的子模块，则执行：

    git submodule update --init --recursive

之前 `clone` 时加参数不过是自动执行初始化配置并拉取子模块（甚至嵌套的子模块）中的文件罢了；

命令默认拉取**主分支**（`master`），想要修改这个默认拉取分支可以修改 `.gitmodules` 文件中子模块对应的 `branch` 值，或者执行：

    git config submodule.xxx.branch dev

或者执行同时将配置写入文件，这样其他人拉取父项目也会获取该配置：

    git config -f .gitmodules submodule.xxx.branch dev


### 更新子模块

#### 拉取更新

获取子模块仓库的最新提交，同步远程分支的变更，可以直接在子模块目录下执行：

    git pull

或者在父目录下执行：

    git submodule update --remote

这里给 `git submodule update` 加上 **`--remote`** 是为了直接从子模块的当前分支的远程追踪分支获取最新变更，不加则是默认从父项目的 `SHA-1` 记录中获取变更；当有多个子模块时，该命令默认拉取**所有**子模块的变更，指定更新子模块 `xxx` 需要执行：

    git submodule update --remote xxx

如果将修改子模块的相关变更推送到父项目的远程，其他人拉取代码时，只用 `git pull` 的话只会把子模块的相关修改拉取到父项目，具体变更并**不会更新**到子模块中，在父项目里执行：
> `git diff --submodule`

```
Submodule xxx a6e2962..70c316e (rewind):
  < add file
```

注意子模块提交记录中前的 **`<`** 符号，表示变更未更新到子模块文件夹里，所以更新子模块变更需要执行：

    git submodule update --init --recursive

或者直接在父项目拉取时同时更新子模块（需要子模块已经 `init`，否则仍然拉取不到文件）：

    git pull --recurse-submodules

#### 分支切换

更新完子模块（`git submodule update`）后，虽然会将文件变更同步到子模块目录下，但是此时子模块并没有处于任何已有分支下，去子模块目录下检查一下分支就会发现：
> `git branch -vv`

```
* (HEAD detached at 16d1b6b) 16d1b6b mod file
  master                     16d1b6b [origin/master] mod file
```

当前分支并不是 `master`，而是一个 `detached` 状态的编号分支，官方文档称为“游离的 HEAD”，虽然可以提交，但是并没有本地分支跟踪这些更改，意味着下次更新子模块就会**丢失**这些更改；

所以在子模块下开始开发前，需要先**切换**到某个已有分支或者创建新的分支，比如进入主分支：

    git checkout master

#### 分支合并

除了默认的分支同步更新操作，也可以执行其他类型的分支更新行为，比如 `merge`，`rebase` 等；如将父项目中记录的子模块最新变更（分支是 `submodule.xxx.branch` 中配置的，默认主分支 `master`）`merge` 到子模块的当前分支中，则执行：

    git submodule update --remote --merge

`rebase` 到子模块当前分支则执行：

    git submodule update --remote --rebase

#### 注意事项

如果其他人修改了子模块的内容并提交了记录，父项目也提交并推送了远程仓库，但是子模块**没有**推送其对应的远程仓库，
那么其他人拉取父项目代码变更时没有问题，但是**更新**子模块时就会遇到下面的问题：
```
fatal: remote error: upload-pack: not our ref 16d1b6b94e3245f3a7fb4f43e5b6f44b14027fbb
Fetched in submodule path 'xxx', but it did not contain 16d1b6b94e3245f3a7fb4f43e5b6f44b14027fbb.
Direct fetching of that commit failed.
```

即由于其他人没有及时将子模块的提交 `push` 的子模块的远程仓库，我们本地父项目有了关于子模块最新的变更，但是在子模块的仓库中却找不到，就报错了，让对方在子模块下 `push` 一下这边再重新更新就行了；

为了避免制造这一不必要的麻烦，可以把在父项目中推送远程的命令替换为：

    git push --recurse-submodules=check

这样如果子模块（与父项目记录的对应分支）存在未 `push` 的提交，就会报错，并且子模块有推送失败的，父项目也会推送失败；需要在推送父项目时自动推送未推送的子模块，则执行：

    git push --recurse-submodules=on-demand

觉得每次手输太麻烦，就直接将其写入配置：

    git config push.recurseSubmodules check


如果父项目中子模块的仓库地址（`submodule.xxx.url`）被其他协作者修改了，那么我们再更新子模块时就可能遇到问题，需要执行：

    git submodule sync --recursive
    
同步完 `url`，然后再重新初始化更新：

    git submodule update --int --recursive


### 删除子模块

在确认移除子模块前，需要先将其取消注册（`unregister`），即删除该子模块相关的配置文件（`git config`），比如要移除子模块 `xxx`，则执行：

    git submodule deinit xxx

然后子模块的相关配置会被删除（`.gitmodules` 和 `.git/modules/xxx` 中的配置会保留），子模块对应的目录也会被清空（子模块目录本身会保留），再运行 `git submodule status` 查看子模块则会输出：
```
-70c316ecb7c41a5bdf8a37ff93bf866d3b903388 xxx
```

前缀 **`-`** 表示该子模块已经被取消注册，可理解为暂时移除，想必官方这样做也是给我们提供反悔的余地，因为想要**恢复**刚才删除的子模块，重新执行 `git submodule update --init xxx` 就能重新初始子模块并拉取文件；

由于还有一些配置文件仍然被保留，所以想要**彻底删除**的话，需要继续手动删除这里配置文件，即：

- 删除子模块对应的目录 `xxx`；
- 删除 `.gitmoduls` 中子模块 `xxx` 对应的区块配置；
- 删除 `.git/modules/` 目录下的子模块目录 `xxx`；
- 删除子模块的缓存：`git rm --cached xxx`；

然后再执行 `git submodule` 就没有任何输出了，清除完毕；


### 子模块与父项目的联系

父项目和子模块有着分开的 `git` 仓库，所以可以分别在父项目和子模块的目录下使用 `git` 命令，操作的也是**各自**的仓库，比如分别在父项目和子模块中执行 `git branch -a` 或者 `git remote -v` 的输出结果是不同的；

虽然二者有个分开的仓库与提交记录，但是又是关联起来的（这正是 `submodule` 所做的工作），举个例子，在子模块目录 `xxx/` 下新增一个文件 `test.txt`，然后在子模块目录中执行 `git satus` 会输出：
```
Untracked files:
  (use "git add <file>..." to include in what will be committed)
        xxx/test.txt
```

此时在父项目下执行 `git status` 输出的是：
```
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
  (commit or discard the untracked or modified content in submodules)
        modified:   xxx (untracked content)
```

即提示需要先在子模块下提交修改记录；

然后子模块下提交记录，执行：

    git add .
    git commit -m "add file"

这时再分别运行 `git status`，子模块的输出是：
```
Your branch is ahead of 'origin/master' by 1 commit.
  (use "git push" to publish your local commits)

nothing to commit, working tree clean
```

而父项目的输出是：
```
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   xxx (new commits)
```

提示子模块中有了新的提交（`new commits`）；

假如再把子模块下的这个 `test.txt` 文件删除，则子模块的状态是：
```
Changes not staged for commit:
  (use "git add/rm <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        deleted:    xxx/test.txt
```

但是父项目的状态依然是：
```
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   xxx (new commits)
```

子模块撤销刚才的删除操作，将新增文件的记录 `git push` 到远程（这会推送到子模块**自己**的远程仓库），此时子模块的工作区状态是清空状态，但是父项目的依旧是：
```
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   xxx (new commits)
```

所以，父项目与子模块的关联便是，父模块只是单纯的识别子模块的**总体变化**，而不会在意具体是新增、修改还是删除，甚至修改已经提交推送到子模块所属的远程仓库，只是将这些调整统一识别为 `modified` 状态，然后需要提交并推送到自己（父项目）所属的远程仓库；

在父项目中使用 `git diff` 可以查看当前的变更，会输出：
```
diff --git a/xxx b/xxx
index 70c316e..a6e2962 160000
--- a/xxx
+++ b/xxx
@@ -1 +1 @@
-Subproject commit 70c316ecb7c41a5bdf8a37ff93bf866d3b903388
+Subproject commit a6e29629904538e8f70694df607617084d2659ca
```

如果想要查看具体子模块的变动，可以执行：
> `git diff --submodule`

```
Submodule xxx 70c316e..a6e2962:
  > add file
```

输出会列出当前子模块的所有变动的提交日志；也可以直接日志中关联的子模块提交记录，执行：
> `git log -p --submodule`

```
commit 909a721e3755affb7620316b44df8fbc1b3488f2 (HEAD -> master)
Author: ******
Date:   ******

    mod submodule

Submodule xxx 70c316e..a6e2962:
  > add file
```


### 其他

父项目从含有子模块的分支切换到没有子模块的分支时，默认会**保留**子模块对应的目录，所以这使得切换过去时本地会保留关于子模块的修改记录，显然这不太合理，所以从包含子模块的分支切换到 `xxx` 时，需要这样执行：

    git checkout xxx --recurse-submodules

当父项目存在许多子模块时，有时需要对多个子模块执行相同的操作，这时就可以使用 **`foreach`** 功能，比如批量存储：

    git submodule foreach 'git stash'

或者在每个子模块中新建切换分支：

    git submodule foreach 'git checkout -b new'