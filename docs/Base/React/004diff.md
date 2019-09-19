<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-19 20:18:42
 * @LastEditTime: 2019-09-19 20:25:47
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


**参考：**
- <https://zhuanlan.zhihu.com/p/20346379>