# await

  await必须在async内。
  那么await等待的是什么呢？它会确保一个 promise 的内容都解决( resolve )或出错( reject )后才会进行下一步。
  其实就是等待

## 以下代码输出是什么？(一)

```javascript
function wait() {
  return new Promise(resolve =>
    setTimeout(resolve, 10 * 1000)
  )
}

async function main() {
  console.time();
  const x = wait();
  const y = wait();
  const z = wait();
  await x;
  await y;
  await z;
  console.timeEnd();
}

main();
```
  - //default: 10000.55517578125ms 
  - 三个任务发起的时候没有await，可以认为是同时发起了三个异步。
  - 之后各自await任务的结果。结果按最高耗时计算，由于三个耗时一样。所以结果是 10 * 1000ms。
  - Promise中new Promise(xx)相当于同步任务, 会立即执行, .then后面的是微任务。

```javascript
function wait() {
  return new Promise(resolve =>
    setTimeout(resolve, 10 * 1000)
  )
}

async function main() {
  const x = wait();
  const y = wait();
  const z = wait();
  const arrs = [
    x, y, z
  ]
  return Promise.all(arrs);
}

async function maintip() {
  console.time();
  await main();
  console.timeEnd();
}

maintip();
```
也可以配合Promise.all来做.
## 以下代码输出是什么？(二)

```javascript
function wait() {
  return new Promise(resolve =>
    setTimeout(resolve, 10 * 1000)
  )
}

async function main() {
  console.time();
  await wait();
  await wait();
  await wait();
  console.timeEnd();
}
main();
```

- //default: 32439.156982421875ms
- wait前面加上了await，意味着主流程执行必须等到wait执行完了才会继续执行后续的函数
- wait里面又是一个Promise,Promise必须等到setTimeout,resolve了以后才会继续执行
- 就是外部的Prmoise必须等到内部的Promise resolve了以后才会继续执行。
- main -> wait -> promise -> (promise -> setTimeout(resolve))(resolve)
- 写入微任务队列，微任务队列里再写入任务队列，都是需要额外的时间，所以会超出30s多。


## await写法的选择
- 在业务中，考虑到异步的事件是否有相互的依赖，如果没有，我们应该选择第一种，让他们按顺序发起请求，最后await等待的其实在耗时最长的那个请求。
- 如果请求之间是有依赖的，我们可以选择第二种可以保证前一个请求完成后再执行下一个。

**参考：**
- <https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/251>
- <https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/253>