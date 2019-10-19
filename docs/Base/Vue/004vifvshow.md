<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-18 15:45:05
 * @LastEditTime: 2019-09-18 15:48:32
 * @LastEditors: Please set LastEditors
 -->
# v-if,v-show

## 区别
- v-if 是“真正”的条件渲染，因为它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建。

- v-if 也是惰性的：如果在初始渲染时条件为假，则什么也不做——直到条件第一次变为真时，才会开始渲染条件块。

- 相比之下，v-show 就简单得多——不管初始条件是什么，元素总是会被渲染，并且只是简单地基于 CSS 进行切换。

- 一般来说，v-if 有更高的切换开销，而 v-show 有更高的初始渲染开销。因此，如果需要非常**频繁地切换，则使用 v-show 较好；如果在运行时条件很少改变，则使用 v-if 较好。**

## v-if ，v-for 注意点

  - 永远不要把 v-if 和 v-for 同时用在同一个元素上。

  一般我们在两种常见的情况下会倾向于这样做：

- 为了过滤一个列表中的项目 (比如 v-for="user in users" v-if="user.isActive")。在这种情形下，请将 users 替换为一个计算属性 (比如 activeUsers)，让其返回过滤后的列表。

- 为了避免渲染本应该被隐藏的列表 (比如 v-for="user in users" v-if="shouldShowUsers")。这种情形下，请将 v-if 移动至容器元素上 (比如 ul, ol)。
 
**参考：**  
- <https://cn.vuejs.org/v2/guide/conditional.html#v-if-vs-v-show>
- <https://cn.vuejs.org/v2/style-guide/#%E9%81%BF%E5%85%8D-v-if-%E5%92%8C-v-for-%E7%94%A8%E5%9C%A8%E4%B8%80%E8%B5%B7-%E5%BF%85%E8%A6%81>
