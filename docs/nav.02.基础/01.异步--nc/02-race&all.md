# Promise.race & Promise.all
## Promise.race  
### 是什么？
返回一个promise，传入的iterable对象，一旦有一个处于fufilled/rejected.就返回那个状态。  
```javascript
const p1 = new Promise(function (resolve) { setTimeout(resolve, 200, 1) })
const p2 = new Promise(function (resolve) { setTimeout(resolve, 100, 2) })
race([p1, p2]).then(function (res) { console.log(res) }) // 2
```

### 几个注意点：   
- 传入为空的iterable对象，那么就一直处于pending状态
- 传入参数不包含任何的promise,结果会返回一个pending的 promise
- iterable包含多个promise值，返回第一个找到的值
- iterable用for of进行遍历，然后其实是进行一个Promise的链式回调。  

### 实现Promise.race
```javascript
Promise.race2 = function (iterable) {
  return new Promise(function (resolve, reject) {
    if (!(Array.isArray(iterable))) {
      return reject('must be array')
    } else if (iterable.length == 0) {
      // 空的不处理 处于pending态
    } else {
      for (const iterator of iterable) {
        Promise.resolve(iterator).then(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        })
      }
    }
  })
}
var p1 = new Promise(function (resolve, reject) {
  setTimeout(resolve, 500, "one");
});
var p2 = new Promise(function (resolve, reject) {
  setTimeout(resolve, 100, "two");
});
Promise.race2([p1, p2]).then(function (value) {
  console.log(value); // "two"
  // 两个都完成，但 p2 更快
});
```

## Promise.all

### 是什么？
- 返回一个新实例promise。
- 传入的iterable对象,如果所有的iterable对象的promise状态都变为fufilled或者参数中不再含有Promise了，那么返回fufilled状态。如果有一个状态变为rejected,那么就返回rejected.返回第一个失败的实例的结果。
	
	
### 特点：
- 传入为空，可迭代对象，返回一个同步的Promise已完成的对象。(resolve([])) 返回一个空数组。
- 传入的不为Promise对象，异步的返回一个Promise已完成的对象。
- 其他情况下返回一个处理中的pending状态。

### 返回状态：
- 所有的都fufilled，异步的返回一个fufilled的状态。
- 有一个rejected,异步的返回一个rejected的状态。
- Promise.all返回都是一个数组

### 实现Promise.all
```javascript
	var promise1 = Promise.resolve(3);
	var promise2 = 42;
	var promise3 = new Promise(function(resolve, reject) {
	  setTimeout(resolve, 100, 'foo');
	});
	
	Promise.all = function (promises) {
	    return new Promise((resolve, reject) => {
	        if (promises.length === 0) {
	            resolve([]);
	        } else {
	            let result = [];
	            let index = 0;
	            for (let i = 0;  i < promises.length; i++ ) {
	                //考虑到 i 可能是 thenable 对象也可能是普通值
	                Promise.resolve(promises[i]).then(data => {
	                    result[i] = data;
	                    if (++index === promises.length) {
	                        //所有的 promises 状态都是 fulfilled，promise.all返回的实例才变成 fulfilled 态
	                        resolve(result);
	                    }
	                }, err => {
	                    reject(err);
	                    return;
	                });
	            }
	        }
	    });
	}
	
	Promise.all([promise1, promise2, promise3]).then(function(values) {
	  console.log(values);
	});
	// expected output: Array [3, 42, "foo"]
```
	
**参考：**
- <https://github.com/YvetteLau/Step-By-Step/issues/29> 

	
