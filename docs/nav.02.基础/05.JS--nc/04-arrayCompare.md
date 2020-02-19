# 判断类型是否为数组

## Object.prototype.toString == '[object Array]'
  每一个继承Object的对象身上都有一个toString的方法。

  基本类型都可以判断，包括null,undefined

```javascript
Object.prototype.toString.call('An') // "[object String]"
Object.prototype.toString.call(1) // "[object Number]"
Object.prototype.toString.call(Symbol(1)) // "[object Symbol]"
Object.prototype.toString.call(null) // "[object Null]"
Object.prototype.toString.call(undefined) // "[object Undefined]"
Object.prototype.toString.call(function(){}) // "[object Function]"
Object.prototype.toString.call({name: 'An'}) // "[object Object]"
```

## instanceof
  原型链上能不能找到对应类型的prototype
```javascript
  [] instanceof Array
```

## Array.isArray()

  ES5新增，优于instanceof,可以检测处iframes.

```javascript
var iframe = document.createElement('iframe');
document.body.appendChild(iframe);
xArray = window.frames[window.frames.length-1].Array;
var arr = new xArray(1,2,3); // [1,2,3]

// Correctly checking for Array
Array.isArray(arr);  // true
Object.prototype.toString.call(arr); // true
// Considered harmful, because doesn't work though iframes
arr instanceof Array; // false
```

**参考**：
- <https://muyiy.vip/question/js/21.html>