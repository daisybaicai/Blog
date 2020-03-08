# Event Loop

## event loop它的执行顺序：

- 一开始整个脚本作为一个宏任务执行
- 执行过程中同步代码直接执行，宏任务进入宏任务队列，微任务进入微任务队列
- 当前宏任务执行完出队，检查微任务列表，有则依次执行，直到全部执行完
- 执行浏览器UI线程的渲染工作
- 检查是否有Web Worker任务，有则执行
- 执行完本轮的宏任务，回到2，依此循环，直到宏任务和微任务队列都为空

微任务包括：MutationObserver、Promise.then()或reject()、Promise为基础开发的其它技术，比如fetch API、V8的垃圾回收过程、Node独有的process.nextTick。

宏任务包括：script、script 、setTimeout、setInterval 、setImmediate 、I/O 、UI rendering。

______________


- 所有会进入的异步都是指的事件回调中的那部分代码，也就是说new Promise在实例化的过程中所执行的代码都是同步进行的，而then中注册的回调才是异步执行的

- promise.then并不会执行，它只有在被改变了状态之后才会执行。（必须在之前的先进行resolve或者reject才会在promise.then的回调中得到）

___________

## Promise状态相关总结

- Promise的状态一经改变就不能再改变。(见3.1)
- .then和.catch都会返回一个新的Promise。(上面的👆1.4证明了)
- catch不管被连接到哪里，都能捕获上层的错误。(见3.2)
- 在Promise中，返回任意一个非 promise 的值都会被包裹成 promise 对象，例如return 2会被包装为return Promise.resolve(2)。
- Promise 的 .then 或者 .catch 可以被调用多次, 当如果Promise内部的状态一经改变，并且有了一个值，那么后续每次调用.then或者.catch的时候都会直接拿到该值。(见3.5)
- .then 或者 .catch 中 return 一个 error 对象并不会抛出错误，所以不会被后续的 .catch 捕获。(见3.6)
- .then 或 .catch 返回的值不能是 promise 本身，否则会造成死循环。(见3.7)
- .then 或者 .catch 的参数期望是函数，传入非函数则会发生值穿透。(见3.8)
- .then方法是能接收两个参数的，第一个是处理成功的函数，第二个是处理失败的函数，再某些时候你可以认为catch是.then第二个参数的简便写法。(见3.9)
- .finally方法也是返回一个Promise，他在Promise结束的时候，无论结果为resolved还是rejected，都会执行里面的回调函数。

______________

## finally总结:

- .finally()方法不管Promise对象最后的状态如何都会执行
- .finally()方法的回调函数不接受任何的参数，也就是说你在.finally()函数中是没法知道Promise最终的状态是resolved还是rejected的
- 它最终返回的默认会是一个原来的Promise对象值，不过如果抛出的是一个异常则返回异常的Promise对象。

## Promise 题目
- https://mp.weixin.qq.com/s/LiN7tJ6RSUYg1JZWd_xaCQ