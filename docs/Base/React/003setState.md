<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-18 13:24:31
 * @LastEditTime: 2019-09-18 13:35:27
 * @LastEditors: Please set LastEditors
 -->
# setState

调用 setState 其实是异步的 —— 不要指望在调用 setState 之后，this.state 会立即映射为新的值。如果你需要基于当前的 state 来计算出新的值，那你应该传递一个函数，而不是一个对象（详情见下文）。


## 给 setState 传递一个对象与传递一个函数的区别是什么？
传递一个函数可以让你在函数内访问到当前的 state 的值。因为 setState 的调用是分批的，所以你可以链式地进行更新，并确保它们是一个建立在另一个之上的，这样才不会发生冲突：

```javascript
incrementCount() {
  this.setState((state) => {
    // 重要：在更新的时候读取 `state`，而不是 `this.state`。
    return {count: state.count + 1}
  });
}

handleSomething() {
  // 假设 `this.state.count` 从 0 开始。
  this.incrementCount();
  this.incrementCount();
  this.incrementCount();

  // 如果你现在在这里读取 `this.state.count`，它还是会为 0。
  // 但是，当 React 重新渲染该组件时，它会变为 3。
}
```
## setState 什么时候是异步的？
目前，在事件处理函数内部的 setState 是异步的。  

例如，如果 Parent 和 Child 在同一个 click 事件中都调用了 setState ，这样就可以确保 Child 不会被重新渲染两次。取而代之的是，React 会将该 state “冲洗” 到浏览器事件结束的时候，再统一地进行更新。这种机制可以在大型应用中得到很好的性能提升。  

这只是一个实现的细节，所以请不要直接依赖于这种机制。在以后的版本当中，React 会在更多的情况下静默地使用 state 的批更新机制。

## setState混用

```javascript
function increment(state, props) {
  return {count: state.count + 1};
}
 
// 对于多次调用函数式 setState 的情况，React 会保证调用每次 increment 时，state 都已经合并了之前的状态修改结果。
function incrementMultiple() {
  this.setState(increment);
  this.setState(increment);
  this.setState(increment);
}
 
// 加入当前 this.state.count 的值是0，第一次调用 this.setState(increment)，传给 increment 的state参数是0，第二调用时，state 参数是1，第三次调用是，参数是2，最终 incrementMultiple 的效果，真的就是让 this.state.count 变成了3，这个函数 incrementMultiple 终于实至名归。
 
// 在 increment 函数被调用时，this.state 并没有被改变，依然，要等到 render 函数被重新执行时（或者 shouldComponentUpdate 函数返回 false 之后）才被改变
```

```javascript
function incrementMultiple() {
  this.setState(increment);
  this.setState(increment);
  this.setState({count: this.state.count + 1});
  this.setState(increment);
}
 
// 最后得到的结果是让this.state.count增加了2，而不是增加4。
```
原因： 因为 React 会依次合并所有 setState 产生的效果，虽然前两个函数式 setState 调用产生的效果是 count 加 2，但是半路杀出一个传统式 setState 调用，一下子强行把积攒的效果清空，用 count 加1取代。

## setState队列更新机制
setState 通过一个队列机制实现 state 更新。setState 调用时，将需要更新的 state 合并后放入状态队列，而不会立刻更新 this.state 的（队列机制可以高效的批量更新 state）。  

当直接修改 this.state 的值，该 state 不会被放在状态队列里面，下次调用 setState 并对状态队列进行合并，就会忽略之前直接被修改的 state，造成无法预知的错误。避免频繁地重复更新 state。  

**总结：**
在 React 的 setState 函数实现中，会根据一个变量 isBatchingUpdates 判断是直接更新 this.state 还是放到队列中回头再说，而 isBatchingUpdates 默认是 false，也就表示 setState 会同步更新 this.state，但是，有一个函数 batchedUpdates，这个函数会把 isBatchingUpdates 修改为 true，而当 React 在调用事件处理函数之前就会调用这个 batchedUpdates，造成的后果。  

就是由 React 控制的事件处理过程 setState 不会同步更新 this.state；  

在 React 控制之外的情况， setState 会同步更新 this.state！  

**参考**:
- <https://zh-hans.reactjs.org/docs/faq-state.html>
- <https://blog.csdn.net/weixin_34123613/article/details/91375118>