# 变量提升
  -  函数声明高于变量声明

```javascript
var b = 10;
(function b() {
   // 内部作用域，会先去查找是有已有变量b的声明，有就直接赋值20，确实有了呀。发现了具名函数 function b(){}，拿此b做赋值；
   // IIFE的函数无法进行赋值（内部机制，类似const定义的常量），所以无效。
  // （这里说的“内部机制”，想搞清楚，需要去查阅一些资料，弄明白IIFE在JS引擎的工作方式，堆栈存储IIFE的方式等）
    b = 20;
    console.log(b); // [Function b]
    console.log(window.b); // 10，不是20
})();
```

## IIFE
  IIFE（ 立即调用函数表达式）是一个在定义时就会立即执行的  JavaScript 函数。
```Javascript
  (function () {
    statements
  })();
```
  这是一个被称为 自执行匿名函数 的设计模式，主要包含两部分。第一部分是包围在 圆括号运算符 () 里的一个匿名函数，这个匿名函数拥有独立的词法作用域。这不仅避免了外界访问此 IIFE 中的变量，而且又不会污染全局作用域。

  第二部分再一次使用 () 创建了一个立即执行函数表达式，JavaScript 引擎到此将直接执行函数。

## 访问内部值/外部值

```javascript
var b = 10;
(function b(){
    var b = 20; //or let b = 20;
	  console.log(this)
    console.log(this.b); //10
    console.log(b);  //20
})();
```
或者可以通过在调用IIFE时传入参数。
```javascript
    var b = 10;
    (function b(b){
		    console.log(window)
        console.log(window.b); //10
        b = 20;
        console.log(b);  //20
    })();
```

## 试一试

```javascript
var a = 10;
(function () {
    console.log(a)
    a = 5
    console.log(window.a)
    var a = 20;
    console.log(a)
})()
```

- 在立即执行函数中，var a = 20; 语句定义了一个局部变量 a，由于js的变量声明提升机制，局部变量a的声明会被提升至立即执行函数的函数体最上方，且由于这样的提升并不包括赋值，因此第一条打印语句会打印undefined，最后一条语句会打印20。
- 由于变量声明提升，a = 5; 这条语句执行时，局部的变量a已经声明，因此它产生的效果是对局部的变量a赋值，此时window.a 依旧是最开始赋值的10，

```javascript
var a = 10;
(function () {
    console.log(a)
    a = 5
    console.log(window.a)
    a = 20;
    console.log(a)
})()
```
10,5,20

总结：
- 自执行函数会形成块级作用域 
- 作用域链是自内向外查找
- 作用域形成与js引擎编译阶段，并不会做赋值操作 
- var声明的全局变量会赋值给window对象


```javascript
var name = 'Tom';
(function() {
if (typeof name == 'undefined') {
  var name = 'Jack';
  console.log('Goodbye ' + name);
} else {
  console.log('Hello ' + name);
}
})();
```

```javascript
var name = 'Tom';
(function() {
if (typeof name == 'undefined') {
  name = 'Jack';
  console.log('Goodbye ' + name);
} else {
  console.log('Hello ' + name);
}
})();
```

**参考：**
- <https://muyiy.vip/question/js/33.html>
- <https://muyiy.vip/question/js/34.html>
- <https://muyiy.vip/question/js/41.html>
- <https://developer.mozilla.org/zh-CN/docs/Glossary/%E7%AB%8B%E5%8D%B3%E6%89%A7%E8%A1%8C%E5%87%BD%E6%95%B0%E8%A1%A8%E8%BE%BE%E5%BC%8F>
- <https://muyiy.vip/question/js/108.html>
- <https://muyiy.vip/question/js/109.html>