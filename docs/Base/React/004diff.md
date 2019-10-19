<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-19 20:18:42
 * @LastEditTime: 2019-09-20 14:57:56
 * @LastEditors: Please set LastEditors
 -->
# diff

## 传统 diff 算法  
  计算一棵树形结构转换成另一棵树形结构的最少操作，是一个复杂且值得研究的问题。传统 diff 算法通过循环递归对节点进行依次对比，效率低下，算法复杂度达到 O(n^3)，其中 n 是树中节点的总数。

## 详解 React diff
  React 通过制定大胆的策略，将 O(n^3) 复杂度的问题转换成 O(n) 复杂度的问题。

  
### diff 策略
- Web UI 中 DOM 节点跨层级的移动操作特别少，可以忽略不计。

- 拥有相同类的两个组件将会生成相似的树形结构，拥有不同类的两个组件将会生成不同的树形结构。

- 对于同一层级的一组子节点，它们可以通过唯一 id 进行区分。

- 基于以上三个前提策略，React 分别对 tree diff、component diff 以及 element diff 进行算法优化，事实也证明这三个前提策略是合理且准确的，它保证了整体界面构建的性能。


tree diff

component diff

element diff



---qita
15 diff算法?
把树形结构按照层级分解，只比较同级元素。
给列表结构的每个单元添加唯一的key属性，方便比较。
React 只会匹配相同 class 的 component（这里面的class指的是组件的名字）
合并操作，调用 component 的 setState 方法的时候, React 将其标记为 - dirty.到每一个事件循环结束, React 检查所有标记 dirty的 component重新绘制.
选择性子树渲染。开发人员可以重写shouldComponentUpdate提高diff的性能


19 react 的虚拟dom是怎么实现的
首先说说为什么要使用Virturl DOM，因为操作真实DOM的耗费的性能代价太高，所以react内部使用js实现了一套dom结构，在每次操作在和真实dom之前，使用实现好的diff算法，对虚拟dom进行比较，递归找出有变化的dom节点，然后对其进行更新操作。为了实现虚拟DOM，我们需要把每一种节点类型抽象成对象，每一种节点类型有自己的属性，也就是prop，每次进行diff的时候，react会先比较该节点类型，假如节点类型不一样，那么react会直接删除该节点，然后直接创建新的节点插入到其中，假如节点类型一样，那么会比较prop是否有更新，假如有prop不一样，那么react会判定该节点有更新，那么重渲染该节点，然后在对其子节点进行比较，一层一层往下，直到没有子节点

#20 react 的渲染过程中，兄弟节点之间是怎么处理的？也就是key值不一样的时候
通常我们输出节点的时候都是map一个数组然后返回一个ReactNode，为了方便react内部进行优化，我们必须给每一个reactNode添加key，这个key prop在设计值处不是给开发者用的，而是给react用的，大概的作用就是给每一个reactNode添加一个身份标识，方便react进行识别，在重渲染过程中，如果key一样，若组件属性有所变化，则react只更新组件对应的属性；没有变化则不更新，如果key不一样，则react先销毁该组件，然后重新创建该组件
**参考：**
- <https://zhuanlan.zhihu.com/p/20346379>