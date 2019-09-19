<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-18 13:14:21
 * @LastEditTime: 2019-09-18 13:18:03
 * @LastEditors: Please set LastEditors
 -->
## Reacts中存在的keys的作用

- key的作用就是更新组件时判断两个节点是否相同。相同就复用，不相同就删除旧的创建新的。

- 正是因为带唯一key时每次更新都不能找到可复用的节点，不但要销毁和创建vnode，在DOM里添加移除节点对性能的影响更大。所以会才说“不带key可能性能更好”。