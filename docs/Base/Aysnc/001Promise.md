# promise 实现原理（怎么实现取消?)

## 如何停止一个Promise链？
在一些场景下，我们可能会遇到一个较长的Promise链式调用，在某一步中出现的错误让我们完全没有必要去运行链式调用后面所有的代码，类似下面这样（此处略去了then/catch里的函数）：
```javascript
new Promise(function(resolve, reject) {
  resolve(42)
})
.then(function(value) {
  // "Big ERROR!!!"
})
.catch()
.then()
.then()
.catch()
.then()
```
**解决：**

```javascript
.then(function(value) {
  // "Big ERROR!!!"
  return new Promise(function(){})
})
```


从实现者角度去看,在big Error后面返回一个什么也不干的Promise,使得他的状态一直处于pending,然后他的then的状态就直接取这个永远处于pending 的状态。于是返回的promise也一直处于pending.

但这个方法存在问题：  
	- 内存得不到回收，在new Promise后面的catch,then这些回调函数都无法被垃圾回收器回收。


**通过封装性，语义化来做这件事:**  
	将什么都不做的promise 封装成一个语义化的函数，增加可读性。
```javascript
Promise.cancel  = Promise.stop = function() {
	return new Promise(function() {});
}
```
调用的时候只需要 return Promise.stop()就可以。

## Promise链上返回的最后一个Promise出错了怎么办？

在所有的Promise链后面都加上.catch，确实是可行的。但这样又违反了DRY原则。  
另外，在catch中同样返回了一个Promise，你需要保证在整个Promise里面不再出错，否则又出现之前一样的问题。  


在Q中有一个.done的方法。
```javascript
Promise.prototype.done = function(){
  return this.catch(function(e) { // 此处一定要确保这个函数不能再出错
    console.error(e)
  })
}
```

在不加done的情况下也能解决整个问题，就是通过 reject出现时，检查reject的onRejectCallBack数组。

```javascript
function reject(reason) {
  setTimeout(function() {
    if (self.status === 'pending') {
      self.status = 'rejected'
      self.data = reason
      if (self.onRejectedCallback.length === 0) {
        console.error(reason)
      }
      for (var i = 0; i < self.rejectedFn.length; i++) {
        self.rejectedFn[i](reason)
      }
    }
  })
}
```

## 出错时，是用throw new Error()还是用return Promise.reject(new Error())呢？


我觉得在Promise里发现显式的错误后，用throw抛出错误会比较好，而不是显式的构造一个被reject的Promise对象。

Throw 进入try-catch 代码块
Return Promise.reject(new Error)会创造一个新的Promise对象。花费时间和内存。  



**参考：**  
- <https://github.com/xieranmaya/blog/issues/3>

