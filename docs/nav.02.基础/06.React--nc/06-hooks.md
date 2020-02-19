# React Hooks(基础概念)

## Hook简介

### 好处

简单来说：在非class的情况下可以使用更多的react特性，以及更好地解决了组件逻辑复用等问题。

#### 解决了以下问题

- 组件复用状态逻辑很难
- 复杂组件难以理解
  - 大多数时候，我们使用class来编写时，不能将组件拆分成更小的颗粒，因为逻辑无处不在
  - **Hook 将组件中相互关联的部分拆分成更小的函数（比如设置订阅或请求数据）**，而并非强制按照生命周期划分。你还可以使用 reducer 来管理组件的内部状态，使其更加可预测。

- class
  - class中this的绑定，以及一些经验开发者对于class组件与函数组件的分歧

## Hook概念

Hook 是一些可以让你在函数组件里“钩入” React state 及生命周期等特性的函数。Hook 不能在 class 组件中使用 —— 这使得你不使用 class 也能使用 React。

### State Hook

`useState` 会返回一对值：**当前**状态和一个让你更新它的函数，你可以在事件处理函数中或其他一些地方调用这个函数。它类似 class 组件的 `this.setState`，但是它不会把新的 state 和旧的 state 进行合并。

```react
import React, { useState } from 'react';

function Example() {
  // 声明一个叫 “count” 的 state 变量。
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

### Effect Hook

#### 副作用：

你之前可能已经在 React 组件中执行过数据获取、订阅或者手动修改过 DOM。我们统一把这些操作称为“副作用”，或者简称为“作用”。

#### 类比class组件

`useEffect` 就是一个 Effect Hook，给函数组件增加了操作副作用的能力。它跟 class 组件中的 `componentDidMount`、`componentDidUpdate` 和 `componentWillUnmount` 具有相同的用途，只不过被合并成了一个 API。

### Hook使用规则

- 只能在最外层调用Hook
- 只能在React函数组件中调用

### 自定义Hook

有时候我们会想要在组件之间重用一些状态逻辑。目前为止，有两种主流方案来解决这个问题：[高阶组件](https://zh-hans.reactjs.org/docs/higher-order-components.html)和 [render props](https://zh-hans.reactjs.org/docs/render-props.html)。自定义 Hook 可以让你在不增加组件的情况下达到同样的目的。



将需要重用的逻辑状态，抽象在一个自定义Hooks中，其他需要用到该逻辑的只需要调用即可，同时另外调用的组件的state是完全独立的。



Hook 是一种复用*状态逻辑*的方式，它不复用 state 本身。事实上 Hook 的每次*调用*都有一个完全独立的 state —— 因此你可以在单个组件中多次调用同一个自定义 Hook。



自定义 Hook 更像是一种约定而不是功能。如果函数的名字以 “`use`” 开头并调用其他 Hook，我们就说这是一个自定义 Hook。 `useSomething` 的命名约定可以让我们的 linter 插件在使用 Hook 的代码中找到 bug。



### 其他Hook

useContent：让你不使用组件嵌套就可以订阅 React 的 Context

```react
function Example() {
  const locale = useContext(LocaleContext);
  const theme = useContext(ThemeContext);
  // ...
}
```



useReducer：让你通过 reducer 来管理组件本地的复杂 state。

```react
function Todos() {
  const [todos, dispatch] = useReducer(todosReducer);
  // ...
```

