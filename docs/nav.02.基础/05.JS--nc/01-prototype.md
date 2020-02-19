# JS继承的八种方式

## 原型链继承

```javascript
function SuperProto () {
  this.property = true;
}

SuperProto.prototype.getSuperValue = function () {
  return this.property;
}

function SubProto () {
  this.subproperty = false;
}
// 继承的本质是复制，重写原型对象，指向新的实例。
SubProto.prototype = new SuperProto();
SubProto.prototype.getSubValue = function () {
  return this.subproperty;
}
var instance = new SubProto();
console.log(instance.getSuperValue());
```

原型链存在的问题：多个实例引用，篡改其中一个，其他的都会受到影响。
```javascript
// 原型链继承

function SuperProto () {
  this.colors = ['red', 'blue', 'green'];
}

function SubProto () {
  this.subproperty = false;
}
// 继承的本质是复制，重写原型对象，指向新的实例。
SubProto.prototype = new SuperProto();


var instance = new SubProto();
instance.colors.push('white');
console.log(instance.colors); // [ 'red', 'blue', 'green', 'white' ]

var instance2 = new SubProto();
console.log(instance2.colors); // [ 'red', 'blue', 'green', 'white' ]

```

## 借用构造函数
通过子函数的构造函数，直接调用，用call传入对应的this。
```javascript
function SuperProto () {
  this.colors = ['red', 'blue', 'green'];
}

function SubProto () {
  // 复制SuperProto（父类）的属性
  SuperProto.call(this);
}

var instance = new SubProto();
instance.colors.push('white');
console.log(instance.colors); //[ 'red', 'blue', 'green', 'white' ]

var instance2 = new SubProto();
console.log(instance2.colors); //[ 'red', 'blue', 'green' ]
```
- 只能继承父类的属性和方法，不能继承原型上的属性和方法。
- 不能实现复用，每次都等于把父类的属性和方法复制一遍。影响性能。

## 组合继承
结合 原型链继承和构造函数继承。

```javascript
function SuperProto () {
  this.colors = ['red', 'blue', 'green'];
  this.name = 'zhangsan';
}

SuperProto.prototype.sayName = function() {
  console.log(this.name);
}

function SubProto(name, age) {
  // 第二次调用，当实例创建时再复制一次。
  SuperProto.call(this, name);
  this.age = age;
}

//第一次调用， 给SubProto 复制一份父类的属性。
SubProto.prototype = new SuperProto();
SubProto.prototype.constructor  = SubProto;
SubProto.prototype.sayAge = function() {
  console.log(this.age);
}

var instance1 = new SubProto("Nicholas", 29);
instance1.colors.push("black");
console.log(instance1.colors); //"red,blue,green,black"
instance1.sayName(); //"Nicholas";
instance1.sayAge(); //29

var instance2 = new SubProto("Greg", 27);
console.log(instance2.colors); //"red,blue,green"
instance2.sayName(); //"Greg";
instance2.sayAge(); //27
```

- 第一次调用，给SubType.prototype上加上继承的属性和方法，
- 第二次调用，给实例加上继承的属性和方法

实例对象创建时，屏蔽了SubType.prototype上的同名属性，导致每次创建都会复制两份属性/方法。

## 原型式继承


```javascript
function Object(obj) {
  function F() {};
  F.prototype = obj;
  return new F();
}

var person = {
  name: "Nicholas",
  friends: ["Shelby", "Court", "Van"]
};

var anotherperson = Object(person);
anotherperson.name = 'zhangsan';
anotherperson.friends.push('zhangsan');

var anotherperson2 = Object(person);
anotherperson2.name = 'lisi';
anotherperson2.friends.push('lisi');

console.log(person.name); //Nicholas
console.log(person.friends); //[ 'Shelby', 'Court', 'Van', 'zhangsan', 'lisi' ]
```

- 多个实例指向同一个引用，会出现篡改的问题
- 无法传递参数。

## 寄生式继承
核心： 再原型式的基础上增强对象，返回对象

```javascript
function Object(obj) {
  function F() {};
  F.prototype = obj;
  return new F();
}

function createAnother(origin) {
  var obj = Object(origin);
  obj.sayhi = function () {
    console.log('hi');
  }
  return obj;
}
var person = {
  name: "Nicholas",
  friends: ["Shelby", "Court", "Van"]
};

var anotherperson = createAnother(person);
anotherperson.name = 'zhangsan';
anotherperson.friends.push('zhangsan');
anotherperson.sayhi(); // hi

var anotherperson2 = createAnother(person);
anotherperson2.name = 'lisi';
anotherperson2.friends.push('lisi');

console.log(person.name); //Nicholas
console.log(person.friends); //[ 'Shelby', 'Court', 'Van', 'zhangsan', 'lisi' ]
```
缺点同原型式继承：
- 多个实例指向同一个引用，会出现篡改的问题
- 无法传递参数。

## 寄生组合式继承
借助寄生式继承和构造函数继承结合。**（当前最成熟的）**

```javascript
function inheritPrototype(subType, superType){
  var prototype = Object.create(superType.prototype); // 创建对象，创建父类原型的一个副本
  prototype.constructor = subType;                    // 增强对象，弥补因重写原型而失去的默认的constructor 属性
  subType.prototype = prototype;                      // 指定对象，将新创建的对象赋值给子类的原型
}

function SuperProto(name){
  this.name = name;
  this.colors = ["red", "blue", "green"];
}

SuperProto.prototype.sayName = function(){
  console.log(this.name);
};


function SubProto(name, age) {
  SuperProto.call(this, name);
  this.age = age;
}

inheritPrototype(SubProto, SuperProto);

SubProto.prototype.sayAge = function () {
  console.log(this.age);
}

var instance1 = new SubProto("Nicholas", 29);
instance1.colors.push("black");
console.log(instance1.colors); //"red,blue,green,black"
instance1.sayName(); //"Nicholas";
instance1.sayAge(); //29

var instance2 = new SubProto("Greg", 27);
console.log(instance2.colors); //"red,blue,green"
instance2.sayName(); //"Greg";
instance2.sayAge(); //27
```

- 只调用一次SuperProto的构造函数，避免了在SubProto.prototype上创建重复的属性/方法。
- 保持原型链上的调用

## 混入方式继承多个对象

```javascript
function MyClass() {
     SuperClass.call(this);
     OtherSuperClass.call(this);
}

// 继承一个类
MyClass.prototype = Object.create(SuperClass.prototype);
// 混合其它
Object.assign(MyClass.prototype, OtherSuperClass.prototype);
// 重新指定constructor
MyClass.prototype.constructor = MyClass;

MyClass.prototype.myMethod = function() {
     // do a thing
};
```

Object.assign会把 OtherSuperClass原型上的函数拷贝到 MyClass原型上，使 MyClass 的所有实例都可用 OtherSuperClass 的方法。

## ES6类继承extends

```javascript
class Rectangle {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  getArea () {
    return this.width * this.height
  }

}

const rectangle = new Rectangle(10, 20);
console.log(rectangle.getArea());

class Square extends Rectangle {
  constructor (length) {
    super(length, length);
    this.name = 'Square';
  }

  getName () {
    return this.name;
  }
}


const square = new Square(10);
console.log(square.getName()); //Square
console.log(square.getArea()) //100
```

extends继承的核心代码如下:
```javascript
function _inherits(subType, superType) {
  
    // 创建对象，创建父类原型的一个副本
    // 增强对象，弥补因重写原型而失去的默认的constructor 属性
    // 指定对象，将新创建的对象赋值给子类的原型
    subType.prototype = Object.create(superType && superType.prototype, {
        constructor: {
            value: subType,
            enumerable: false,
            writable: true,
            configurable: true
        }
    });
    
    if (superType) {
        Object.setPrototypeOf 
            ? Object.setPrototypeOf(subType, superType) 
            : subType.__proto__ = superType;
    }
}
```
总：
- ES5先创建子类的实例对象，再将父类方法的加上去。
- ES5是先创建父类的实例对象this，然后再用子类的构造函数修改this。因为子类没有自己的this对象，所以必须先调用父类的super()方法，否则新建实例报错。

**参考：**
- <https://juejin.im/post/5bcb2e295188255c55472db0#heading-5>
