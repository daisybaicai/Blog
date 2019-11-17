<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-18 15:54:04
 * @LastEditTime: 2019-09-18 20:27:40
 * @LastEditors: Please set LastEditors
 -->
# data 必须是一个函数

- 一个组件的 data 选项必须是一个函数，因此每个实例可以维护一份被返回对象的独立的拷贝：

```javascript
data: function () {
  return {
    count: 0
  }
}
```

因为组件是用来复用的，且 JS 里对象是引用关系，如果组件中 data 是一个对象，那么这样作用域没有隔离，子组件中的 data 属性值会相互影响，如果组件中 data 选项是一个函数，那么每个实例可以维护一份被返回对象的独立的拷贝，组件实例之间的 data 属性值不会互相影响；而 new Vue 的实例，是不会被复用的，因此不存在引用对象的问题。

**参考：**
- <https://juejin.im/post/5d59f2a451882549be53b170>