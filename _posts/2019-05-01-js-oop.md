---
title:  JavaScript 面向对象编程
layout: post
categories: JavaScript
tags: 面向对象编程 oop 构造函数 原型 继承
excerpt: JavaScript 面向对象编程的一些概念与举例
---

# 概述

面向对象编程思想，顾名思义，即模仿现实世界的存在物，一切节对象，拥有各自的特性与行为，如人类，外貌、肤色、身高、体重等是其特征，能吃饭睡觉行走是其行为；

同样，编程中，一个对象拥有 **属性(key/property)**，相当于人类的特征，当然这些属性一般都有 **属性值(value)**，相当于人类特征的具体内容，如黄皮肤、身高 180cm；对象还拥有一类特殊属性，叫 **方法(method)**，也可以理解为一种属性，只不过它的属性值是一个函数，对象的方法就相当于人类的行为，如行走、吃饭、说话，别人叫你名字时你会做出回应等；

# 构造函数

通常申明一个对象是这样的：
```js
var obj = {
    name: 'knight',  // name, age 是对象 obj 的属性
    age: 20,
    greet: function(you) {  // greet 是对象 obj 的方法，可以接受参数
        console.log('Hello ' + you + ', my name is ' + this.name);
    }
}

console.log(obj.name);  // 'knight'
obj.greet('cloud');     // 'Hello cloud, my name is knight'
```

面向对象编程则使用 **构造函数** 创建一个 **对象构造器**，例如：
```js
function Obj() {
    this.name = 'knight',
    this.age = 20,
    this.greet = function(you) {
        console.log('Hello ' + you + ', my name is ' + this.name);
    }
}
```

其实就是申明一个函数，只不过函数名通常首字母大写来区分普通函数，函数的作用也与普通函数有所区别；其中的 **`this`** 指向当前环境的对象，是一种方便的写法；

# 对象实例

上面创建了一个对象构造函数，当然这还只是一个函数，不是一个直接能用的对象，从构造函数得到对应的对象，称为创建该构造函数的一个 **实例(instance)**，即一个新对象，使用 `new` 关键字：
```js
function Obj() {
    this.name = 'knight',
    this.age = 20,
    this.greet = function(you) {
        console.log('Hello ' + you + ', my name is ' + this.name);
    }
}

var obj = new Obj();  // 创建对象实例
console.log(obj.name);  // "knight"
obj.greet('cloud');  // "Hello cloud, my name is knight"
```

## new

使用 `new` 关键字时，其实大致执行了以下操作：
```js
// 正常使用 new
function Obj(name) {
    this.name = name;
}
var obj = new Obj('Knight');
console.log(obj.name); // Knight

// 模拟使用 new
function Obj(name) {
    this.name = name;
}
function _new(fn, name) {
    var result = {}; // 先创建一个空对象
    result.__proto__ = fn.prototype; // 执行原型链连接
    var _result = fn.call(result, name); // 执行构造函数方法
    if (_result) { // 构造函数有返回值则返回该值
        return _result;
    } else {
        return result; // 否则返回该对象
    }
}
var obj = _new(Obj, 'Knight');
console.log(obj.name); // Knight
```

## instanceof

判断某对象是否是某函数的实例，需要用到 `instanceof` 操作符，注意是操作符，类似 `+ - * /`，而不是函数，用法如下：
```js
var date = new Date();
console.log(date instanceof Date);
// true
```

## constructor

反过来，想要知道某对象的构造函数，可以使用 `constructor` 属性，一般对象都有这个属性，其值为该对象的构造函数；
```js
function Obj() {
    this.name = 'knight';
}
var obj = new Obj();
console.log(obj.constructor); // function Obj(){this.name='knight'}

var date = new Date();
console.log(date.constructor); // function Date(){[native code]}
```

# 原型

构造函数创建实例后，函数内部定义的属性和方法也会复制一份到实例中，这类属性称为 **own property**，对象实例可以通过方法 `hasOwnProperty()` 检测是否拥有某属性，返回 `true / false`；
```js
function Obj() {
    this.name = 'knight';
}

var obj = new Obj();
console.log(obj.hasOwnProperty('name'));
// true
```

构造函数还能定义一种属性，叫做 **prototype**(原型)，这样所有实例都能获取函数定义的 **公共** 属性，定义方式如下：
```js
function Obj() {
    this.name = 'knight';
}

Obj.prototype.age = 20; // 只能外部定义，不能在函数内部定义；
var obj = new Obj();
console.log(obj.age); // 20
```

**注意：**`prototype` 是函数的一个属性，同时**对象**也有一个隐式的原型，即对象的 `__proto__` 属性（前后各有两个下划线）指向其构造函数的 `prototype`，另外函数也存在 `__proto__` 属性指向其构造函数，不过对象是没有 `prototype` 属性的；通常存在以下关系：
```js
function Obj() {};
var obj = new Obj();
console.log(obj.__proto__ === Obj.prototype);
// true
```

其实这就是常说的**原型链**，一般对象存在以下原型链指向关系：
```js
var o = {};
o.__proto__ === Object.prototype; // true，对象是 Object 的实例
Object.__proto__ === Function.prototype; // true，Object 是 Function 的实例，因为 Object 本身就是函数
Function.__proto__ === Function.prototype; // true，Function 是 Function 的实例，Function 也是函数
Function.prototype.__proto__ === Object.prototype; //true，函数的原型其实是个对象
Objec.prototype.__proto__ === null; // true，这是原型链指向的顶端，默认设为 null
```

当定义较多属性时，可以将 `prototype` 定义为一个新对象：
```js
function Obj() {
    this.name = 'knight';
}
Obj.prototype = {
    age: 20,
    hobby: 'game'
}
var obj = new Obj();
console.log(obj.hobby); // 'game'
console.log(obj.constructor); // undefined
```

如上，将 `prototype` 定义为新对象时，会 **删除** 对象的 `constructor` 值，因为 `constructor` 属性是定义在构造函数的 `prototype` 对象中的，所以从新定义 `prototype` 对象时需要 **添加** `constructor` 属性喝值：
```js
function Obj() {
    this.name = 'knight';
}
Obj.prototype = {
    constructor: Obj, // 只需写出构造函数名即可
    age: 20,
    hobby: 'game'
}
var obj = new Obj();
console.log(obj.constructor); // function Obj(){this.name='knight'}
```

这里也可看出，`constructor` 虽然可以判断对象的构造函数，但是它却是可以被更改的，因此尽量使用 `instanceof` 判断；

# 遍历对象属性

常用的遍历方法是 `for...in`，该方法可以遍历出对象的所有属性，包括原型 `prototype` 中定义的属性，因为 `prototype` 中的属性是无法用 `.hasOwnProperty()` 方法访问的，用法如下:
```js
function Obj() {
    this.name = 'knight';
}
Obj.prototype.age = 20;
var obj = new Obj();

console.log(obj.hasOwnProperty('age')); // 非 own 属性
for (var i in obj) {
    console.log(i + ': ' + obj[i]);
}
/*
'name': 'knight'
'age': 20
*/
```

# 继承

多个构造函数需要相同的 `prototype` 时，避免每个设置一遍，重复代码，可以定义一个公共的 `prototype`，使用 `Object.create()` 复用代码:
```js
var common = {
    age: 20
}
var obj = Object.create(common);

console.log(obj.age); // 20
console.log(obj); // {}
```

注意 `Object.create()` 方法是将括号内的对象设置为定义的对象的 `__proto__` 属性，所以直接输出 `obj` 会出现 `{}`，但是却可以访问其值，即该值在它的原型链上；

该方法也可以用来 **继承** 其他构造函数的 `prototype` 属性，实现代码复用：
```js
function Common() {
    this.hobby = 'game';
}
Common.prototype.age = 20;
function Obj() {
    this.name = 'knight';
}
// Obj 继承 Common
Obj.prototype = Object.create(Common.prototype);
// 相当于 Obj.prototype.__proto__ = Common.prototype

// 不要忘记把 constructor 改回来
Obj.prototype.constructor = Obj;

var obj = new Obj();
console.log(obj.age); // 20
console.log(obj); // {name: "knight"}
console.log(obj.hobby); // undefined
```

不过该方法存在问题，即子类只能继承父类原型中的属性和方法，父类中的私有属性和方法无法获取；

改进版：
```js
function Common(name) {
    this.age = 20;
    this.name = name;
}
function Obj(name) {
    Common.call(this, name);
}
Obj.prototype = new Common();
Obj.prototype.constructor = Obj;

var obj = new Obj('Knight');
console.log(obj);
// {age: 20, name: "Knight"}
```

这里就解决了之前的问题，子类可以继承父类的私有属性和方法，并且还能进行参数传递，同时也继承了父类的原型中的属性和方法；但是，细看会发现，构造函数其实被执行了两次，因此在实例和实例的原型中会出现相同的属性；

最终版：
```js
function Common(name) {
    this.age = 20;
    this.name = name;
}
function Obj(name) {
    Common.call(this, name);
}

// 相当于只执行了 obj.prototype = new Common(); 步骤中的原型链连接操作
// 即 obj.prototype.__proto__ = Common.prototype
// 而没有执行构造函数 Common()
Obj.prototype = Object.create(Common.prototype);

Obj.prototype.constructor = Obj;

var obj = new Obj('Knight');
console.log(obj);
// {age: 20, name: "Knight"}
```

这种组合方式也基本成为了最理想的继承实现方式；