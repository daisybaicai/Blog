<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-18 12:52:19
 * @LastEditTime: 2019-09-18 12:59:20
 * @LastEditors: Please set LastEditors
 -->
# 运算符的优先级 

- .优先级高于赋值=
- 赋值从右到左

```javascript
var a = {n: 1};
var b = a;
a.x = a = {n: 2};

a.x 	// --> undefined
b.x 	// --> {n: 2}
```

- 优先级。.的优先级高于=，所以先执行a.x，堆内存中的{n: 1}就会变成{n: 1, x: undefined}，改变之后相应的b.x也变化了，因为指向的是同一个对象。
- 赋值操作是从右到左，所以先执行a = {n: 2}，a的引用就被改变了，然后这个返回值又赋值给了a.x，需要注意的是这时候a.x是第一步中的{n: 1, x: undefined}那个对象，其实就是b.x，相当于b.x = {n: 2}