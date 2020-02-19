# Set、Map、WeakSet 和 WeakMap 区别

## Set
- 成员唯一、无序且不重复,("5",5不同，NaN唯一)
- [value, value]，键值与键名是一致的（或者说只有键值，没有键名）
- 可以遍历，方法有：add、delete、has
- 遍历 keys,values,entries,forEach
- Set 很容易实现交集（Intersect）、并集（Union）、差集（Difference）
```javascript
let set1 = new Set([1, 2, 3])
let set2 = new Set([4, 3, 2])

let intersect = new Set([...set1].filter(value => set2.has(value)))
let union = new Set([...set1, ...set2])
let difference = new Set([...set1].filter(value => !set2.has(value)))
```
## WeakSet
- 成员都是对象
- 成员都是弱引用，可以被垃圾回收机制回收，可以用来保存DOM节点，不容易造成内存泄漏
- 不能遍历，方法有add、delete、has
## Map
- 本质上是键值对的集合，类似集合
- 可以遍历，方法很多可以跟各种数据格式转换
- 遍历 keys,values,entries,forEach
## WeakMap
- 只接受对象作为键名（null除外），不接受其他类型的值作为键名
- 键名是弱引用，键值可以是任意的，键名所指向的对象可以被垃圾回收，此时键名是无效的
- 不能遍历，方法有get、set、has、delete

**参考**
- <https://muyiy.vip/question/js/4.html>
