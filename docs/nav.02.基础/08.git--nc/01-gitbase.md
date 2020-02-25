# git

## 修改最近的一次commit

```
git log -1 // 查看最近的commit
git commit --amend // 修改最近一次的commit
键盘 i ，变成修改状态
esc
修改以后:wq
git push --force // 提交修改
```

## 修改之前的commit

```
最近的几次
git rebase -i 对应的版本号的前一条
键盘i 变成修改状态
对需要修改的commit前面改成r
r xxxx
修改完以后
:Wq!

```

## 合并几次连续的commit

```
git rebase -i 对应的commit的之前的一条
i 进入修改状态
对应的commit 
pick xxx
s xx
s xx
将下面几条需要合并的前面加上s
:wq!
然后会进入到一个详情的让你查看
可以在最上面加上描述的
再:Wq!
```

## 移除之前的几条commit

```
有几条确定都不想要了
git reset --hard xxx版本号id (慎用hard)
```

