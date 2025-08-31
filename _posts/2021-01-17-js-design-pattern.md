---
title: JavaScript 经典设计模式
layout: post
categories: JavaScript
tags: 设计模式 design pattern
excerpt: JavaScript中的经典设计模式详解
---
设计模式（**Design Pattern**）是一套被反复使用的代码设计经验总结，一个模式可以是一套可复用的方案，或者一个解决某一类问题的模板；使用固定的模式（解决方式）解决软件开发中的某些问题，利于代码的可理解性与可靠性，比如，比起设计一套标新立异的房屋结构，沿用大部分的现有设计结构更容易取得大部分人的信任与接受；下面是一些应用于 JavaScript 中的常用设计模式，以及以 JavaScript 实现的经典设计模式，包含示例与说明；


## 构造器模式

在构造器模式中，通过声明构造器函数，再使用 `new` 关键字可获取一个新实例对象；构造函数可以接收参数，并在实例化时传参赋值，也可以在构造函数的 `prototype` 中添加公共属性或方法，使得所有实例对象都能访问；
```js
function Person(name) {
    this.type = 'Human';
    this.name = name;
}
Person.prototype.getName = function() {
    return this.name;
}
Person.prototype.getType = function() {
    return this.type;
}

var knight = new Person('Knight');
console.log(knight);
// { type: "Human", name: "Knight" }

console.log(knight.getName());
// "Knight"

var cloud = new Person();
console.log(cloud.getType());
// "Human"
```

这是 ES5 原生的写法，在 ES6 中可以使用**类**的概念进行改造：
```js
class Person {
    // 类的构造器
    constructor(name) {
        this.name = name;
        this.type = 'Human';
    }
    
    // 实例的公共方法
    getName() {
        return this.name;
    }
    getType() {
        return this.type;
    }
}

const knight = new Person('Knight');
console.log(knight);
// { type: "Human", name: "Knight" }

console.log(knight.getName());
// "Knight"
```


## 模块化模式

模块是健壮的应用程序里不可或缺的一部分，模块化能助于系统各单元的合理分工，并维持清晰有组织的联系；模块可以提供私有和公共的封装方法，现代实现模块化的方式有多种，如 AMD, CommonJS, ES Module 等；

一个极简的模块可以用一个对象字面量表示：
```js
var module = {
    a: 1,
    getA: function() {
        return this.a;
    }
}
var a = 2;

console.log(module.getA()); // 1
console.log(module.a); // 1
console.log(a); // 2
```

模块中的属性都可看作维护的“私有”变量，如 `module.a` 的值并不与全局的 `a` 冲突，但是这也仅仅是防止了模块内外的变量命名冲突，其实还是能进行全局访问或修改，准确讲上面的模块的属性都为“公共”属性；

但很多时候又确实需要维护一些仅模块内部可访问的私有属性或变量，下面便是一种使用**闭包**特性实现的常用手法：
```js
var module = (function() {
    var a = 1;
    this.b = 2;

    return {
        getA: function() {
            return a;
        },
        setA: function(n) {
            a = n;
        }
    }
})();

console.log(module.getA()); // 1
console.log(module.a); // undefined
console.log(module.b); // undefined

module.setA(3);
console.log(module.getA()); // 3
```

即模块通过某些方式，暴露一个公共的接口，以提供外部访问或修改模块内部某些属性或变量的途径；


## 暴露模块模式

暴露模块，即在模块化的基础上，实现对私有或公有成员的改名，甚至成员之间的相互访问：
```js
var module = (function(){
    var a = 1;

    function privateFn() {
        return 2;
    }

    function publicFn() {
        var r = privateFn();
        return r;
    }
    
    return {
        b: a,
        renameFn: publicFn
    }
})();

console.log(module.b); // 1
console.log(module.renameFn()); // 2
```

这样做可以实现将模块内部的私有属性，以更加规范化或标准化的方式展现（暴露给外部），增强可读性；


## 单例模式

单例模式（Singleton Pattern）中，单例是指类只有一个实例对象，实现思路可以是返回一个实例对象时，如果未初始化则初始化后返回，已经初始化则返回对它的引用；

单例类有且只有一个自己的实例，并能提供给作用域中所有其他对象访问；
```js
var Singleton = (function(){
    var instance;

    function init() {
        var r = Math.random();
        return {
            r: r
        }
    }
    
    return {
        // 单例模式的方法，只实例化一次
        getR: function() {
            if (!instance) instance = init();
            return instance;
        },
        
        // 非单例模式的方法，每次都实例化
        _getR: function() {
            return init();
        }
    }
})();

// 下面的输出值随机，不过两次输出相同
console.log(Singleton.getR().r);
// 0.9703895249107328
console.log(Singleton.getR().r);
// 0.9703895249107328

// 两次输出不同
console.log(Singleton._getR().r);
// 0.49340212997805155
console.log(Singleton._getR().r);
// 0.06939910709339148
```

直接的对象定义（对象字面量）是最简单的单例模式，因为利用变量声明的不可重复特性，保证了对象的唯一性与作用域可访问性；
```js
var obj = {
    name: 'Knight',
    age: 22,
    getName() {
        return this.name;
    }
}
```


## 观察者模式

观察者模式（Observer Pattern）由被观察者和观察者组成，观察者可以是多个，被观察者维护着多个观察者，如添加或删除观察者；当被观察着数据变化时，会通过广播的方式通知维护的每一个观察者（即调用观察者提供的回调函数）；

简单实现：
```js
// 被观察者
class Source {
    // 维护的一组观察者
    observers = [];

    // 获取观察者
    getObserver(idx) {
        if (idx) {
            return this.observers;
        } else {
            return this.observers[idx];
        }
    }

    // 添加观察者
    addObserver(...obs) {
        Array.prototype.push.apply(this.observers, obs);
    }

    // 删除指定观察者
    deleteObserver(idx) {
        this.observers.splice(idx, 1);
    }

    // 发布通知（广播）的函数
    notify(data) {
        this.observers.forEach(x => {
            // 执行观察者提供的回调，实现通知数据的变化
            x.callback.call(null, data);
            console.log('Notified ' + x.name);
        })
    }
}

// 观察者
class Observer {
    constructor(name) {
        this.name = name;
    }
    
    callback(data) {
        console.log(data);
    }
}


// 定义两个观察者，接口要和被观察者里的一直
const observer1 = new Observer('observer1');
const observer2 = new Observer('observer2');

// 注册观察者
const source = new Source();
source.addObserver(observer1, observer2);

// 发布通知
source.notify('I am changed.');
// 随后会输出以下内容，表示通知到了被观察者们

// I am changed.
// Notified observer1
// I am changed.
// Notified observer2
```


## 发布/订阅模式

发布/订阅模式是在观察者模式的一种变体，区别在于，观察者模式每个观察者想要接收通知需要到被观察者上面去注册，而发布/订阅模式的原理是发布者（可以理解为之前的被观察者）将信息发送到指定的频道(channel)上，如果订阅者（理解为观察者）对某个频道感兴趣，就可以订阅该频道以接收消息，不感兴趣后还可以取消订阅（整个过程和平时订阅杂志蛮像的）；所以其相比于观察者模式的优点便是减小了信息发布者和接收者的依赖性和耦合度；

简单实现：
```js
// 发布者
class Publisher {
    // 定义一些固定的频道供订阅者订阅
    // 每个频道都维护着多个订阅者，数组长度即订阅者数量
    channels = {
        'Game': [],
        'Movie': [],
        'Music': []
    }

    // 每个订阅者的唯一标识符
    subId = 0;
    
    // 订阅者实现订阅的函数
    // 参数包括要订阅的频道和回调函数
    subscribe(channel, callback) {
        if (this.channels[channel] !== undefined) {
            // 某频道的每个订阅者包含的信息，
            // 包括一个唯一标识符和一个回调函数
            this.channels[channel].push({
                subId: this.subId++,
                callback
            });
        } else {
            console.log('Channel not found!');
        }
    }

    // 为订阅者取消订阅
    unsubscribe(id) {
        let found = false;

        for (let k in this.channels) {
            if (found) {
                break;
            } else {
                for (let i = 0; i < this.channels[k].length; i++) {
                    if (this.channels[k][i][subId] === id) {
                        this.channels[k].splice(i, 1);
                        found = true;
                        break;
                    }
                }
            }
        }
    }

    // 为指定频道发布通知
    publish(channel, data) {
        if (this.channels[channel] !== undefined) {
            this.channels[channel].forEach(x => {
                x.callback.call(null, data);
            });
        } else {
            console.log('Channel not found!');
        }
    }

    // 添加消息发布频道
    addChannel(channel) {
        if (this.channels[channel] !== undefined) {
            console.log('Channel existed!');
        } else {
            this.channels[chanel] = [];
        }
    }

    // 删除指定频道
    deleteChannel(channel) {
        if (this.channels[channel] !== undefined) {
            delete this.channels[channel];
        } else {
            console.log('Channel not exist!');
        }
    }
}

const publisher = new Publisher();
// 用户订阅频道
// 用户 1
publisher.subscribe('Game', function(data) {
    console.log(data);
});

// 用户 2
publisher.subscribe('Music', function(data) {
    console.log(data);
});

// 发布订阅
publisher.publish('Music', 'Add a new music.');
// Add a new music. （用户 2 收到消息）

publisher.publish('Game', 'Add a new game.');
// Add a new game. （用户 1 收到消息）
``` 


## 中介者模式

中介者模式（Mediator Pattern），中介者的定义是，一个在谈判或冲突解决过程中起辅助作用的**中立方**，如生活中的房屋中介，可以减少普通用户购房过程的一些繁杂操作；机场的航站塔，接受总部指令，控制具体那些飞机可以起飞、降落；软件中的中介者用于减少组件间的大量直接通信，转而通过某个中心点来控制，可以实现**松耦合**，同时提高其复用性；

尝试实现一个简单的聊天室，不同用户发送消息，中介者（消息处理器）统一处理信息（如显示在公屏上）；
```js
// 定义用户及其行为
class User {
    constructor(name) {
        this.name = name;
    }

    sendMessage(msg, to) {
        MessageMediator.sendMessage(this.name, msg, to);
    }
}

// 聊天室
class ChatRoom {
    // 模拟在公屏上展示消息
    static showMessage(msg) {
        console.log(msg);
    }
}

// 消息处理器
class MessageMediator {
    // 统一处理不同用户发送的消息
    static sendMessage(user, msg, to) {
        let toUser = '';
        if (to) {
            toUser = `@${to};`;
        }
        ChatRoom.showMessage(`[${user}]: ${toUser} ${msg}`);
    }
}

const jack = new User('Jack');
const bob = new User('Bob');

// 模拟发送消息
jack.sendMessage('Hello everyone!');
// [Jack]: Hello everyone!
bob.sendMessage('Welcome! Jack.', 'Jack');
// [Bob]: @Jack; Welcome! Jack.
```

咋一看是一个简单的功能用了大量代码来实现，但是当用户量相当大，逻辑更复杂时，就能较好的把用户与聊天室的联系松开，通过中间件处理两边的复杂逻辑并做好二者的衔接工作，实现一个中介的价值；


## 原型模式

原型模式（Prototype Pattern）核心为**继承**，即能够基于一个对象或类为模板，创建另一个对象或类，使新对象与原型对象拥有一些共同属性或方法；该模式创建重复对象，可以一定程度上提升性能；

JavaScript 中基于一个对象为原型创建另一个对象常用的方法是 `Object.create()`，方法第一个参数是原型（prototype）对象，第二个参数是新建对象的一些属性描述：
```js
const protoObj = {
    a: 1,
    getA: function() {
        return this.a;
    }
}
const newObj = Object.create(protoObj, {
    b: {
        value: 2
    },
    getB: {
        value: function() {
            return this.b;
        }
    }
});

console.log(newObj.a); // 1
console.log(newObj.getA()); // 1

console.log(newObj.b); // 2
console.log(newObj.getB()); // 2

console.log(newObj.__proto__); // { a: 1, getA: f () }

protoObj.a = 3;
console.log(newObj.a); // 3
newObj.a = 4;
console.log(protoObj.a); // 3
```

或者模拟一下实现：
```js
function createObj(proto, obj) {
    function F() {};
    F.prototype = proto;

    return new F();
}

const protoObj = { a: 1 };
const newObj = createObj(protoObj);
newObj.b = 2;

console.log(newObj.a); // 1
console.log(newObj.b); // 2
console.log(newObj.__proto__); // { a: 1 }

protoObj.a = 3;
console.log(newObj.a); // 3
newObj.a = 4;
console.log(protoObj.a); // 3
```

以上例子最后的执行结果都表明，新建对象的原型是对原型对象的一个引用，并且是**单向引用**，即原型对象会影响新对象，新对象无法影响到原型对象，这就可以在实现克隆或继承对象的功能时，减少内存的开销，提升性能；

类的原型继承就比较简单了：
```js
class A {
    a = 1
}
class B extends A {
    b = 2;
}
const b = new B();

console.log(b); // { a: 1, b: 2 }
```

由于 JavaScript 不像 Java 一样有类的机制，所以上述写法也只是 ES6 的新特性，方便书写代码，底层实现和 `Object.create()` 相差无几；


## 命令模式

命令模式（Command Pattern）是将一系列方法封装在一个对象中，对方法的调用请求以命令的形式传递给这个对象，然后由该对象来寻找处理该命令的合适方法；是一种数据驱动的模式；将方法的实现与调用解耦，并实现方法调用的参数化，能便于后期的逻辑调整；

考虑下面一种购买商品的简单场景：
```js
const itemObj = {
    buy: function(item) {
        console.log('You have bought the ' + item);
    },
    sell: function(item) {
        console.log('You have sold the ' + item);
    }
}

itemObj.buy('phone'); // You have bought the phone
```

这样 `itemObj` 既是内部方法的声明者也是调用者，如果后期一些内部方法的逻辑调整，比如方法名或传参，那么后面所有调用这些方法的地方都得要改一遍，这种强耦合对于开发是很不利的，所以需要实现一个方法，专门用于接受一些调用命令，再自行去对应地调用合适的方法执行逻辑；比如：
```js
const itemObj = {
    buy: function(item) {
        console.log('You have bought the ' + item);
    },
    sell: function(item) {
        console.log('You have sold the ' + item);
    },
    execute: function(command, content) {
        switch (command) {
            case 'buy':
                return this.buy(content);
            case 'sell':
                return this.buy(content);
            default:
                return;
        }
    }
}

itemObj.execute('buy', 'phone'); // You have bought the phone
```

这种对方法或属性进行实现与调用的松耦合操作，有些类似一些面向对象语言中的**抽象类(abstract class)**和**接口(interface)**特性，即将实现与调用分离;


## 外观模式

外观模式（Facade Pattern），概括就是隐藏系统的复杂性，对外封装提供一个更易于使用和访问的接口；所谓外观便是，好看好用就行，管它内部经络骨骼有多复杂和不堪，比如 `JQuery`，能曾经一度流行也和其对一些方法和兼容性处理逻辑的封装有着很大关系，比如 `$()` 可直接进行多种类型的元素选择，不用再去写冗长的 `getElementById()` 或者 `getElementsByClassName()` 等方法；

比如要实现一个简单的字符串转十六进制码的方法，可以这样封装：
```js
class StringConvertor {
    static toHex(str) {
        const strArr = str.split('');
        const hexArr = strArr.map(char => {
            return char.charCodeAt().toString(16);
        });
        
        return hexArr.join('');
    }
}

const hex = StringConvertor.toHex('Hello world!');
console.log(hex); // "48656c6c6f20776f726c6421"
```

当然使用这种模式也需要考虑性能等因素，需要权衡实现需求与性能消耗之间，是否值得加上并使用这一层抽象逻辑，否则这种外观就成了“花瓶”，中看不中用；比如使用但从速度上说，`$('#id')` 是肯定比不上 `getElementById('id')` 的，当然为了整体的使用体验愿意牺牲这些性能也可以完全忽略；而对于一些复杂逻辑的实现，难以找到更好的替代选项，那么提供这一层封装多方面来讲都是有益的；


## 工厂模式

工厂模式（Factory Pattern），提供了一种对象的创建方式，一个工厂能提供一个公共接口用于对象创建，接口内部封装好对象的创建逻辑而不会暴露出来，通常用于逻辑复杂的对象生成场景，如根据输入获得不同类型的对象；

例如一个简单的生产汽车的工厂示例：
```js
// 生产 A 类汽车的类
class CarA {
    constructor(option) {
        this.carAttr = option;
    }
    getCarAttr() {
        return this.carAttr;
    }
}

// 生产 B 类汽车的类
class CarB {
    constructor(option) {
        this.carAttr = option;
    }
    getCarAttr() {
        return this.carAttr;
    }
}

// 生产不同汽车的工厂类
class CarFactory {
    static createCar(option) {
        const { type, name, color } = option;
        if (type === 'A') {
            return new CarA({ name, color });
        } else if (type === 'B') {
            return new CarB({ name, color });
        } else {
            return {};
        }
    }
}


const car1 = CarFactory.createCar({
    type: 'A',
    name: 'car1',
    color: 'red'
});
const car2 = CarFactory.createCar({
    type: 'B',
    name: 'car2',
    color: 'black'
});
const car1Attr = car1.getCarAttr();
const car2Attr = car2.getCarAttr();

console.log(car1Attr); // {name: "car1", color: "red"}
console.log(car2Attr); // {name: "car2", color: "black"}
```

当然，像上面这类简单场景，使用工厂模式实现对象创建这一需求，被弄得有些复杂了，所以使用时需要斟酌建立在复杂需求上的设计必要性与该模式所引入的复杂性之间的利害关系；


## 抽象工厂模式

抽象工厂模式（Abstract Factory Pattern），即对上面提到的工厂模式中的工厂的抽象，可以理解为一个超级工厂，或者创建工厂的工厂，相当于工厂的上一级，和抽象类的概念有些类似，工厂是生产某些产品的具体工厂，抽象工厂则创建具有有些相同特征的一类工厂；

沿用之前的汽车工厂的例子，汽车工厂可以生产一辆辆具体属性的某系列汽车，那么汽车抽象工厂，则可以建造不同品牌的汽车工厂，比如创建了福特汽车工厂，可以用于生产福特某系列的汽车，创建奔驰汽车工厂，可以生产奔驰一系列的汽车，示例如下：
```js
// 抽象汽车工厂
class AbstractCarFactory {
    static createFactory(brand) {
        if (brand === 'Benz') {
            return new BenzFactory();
        } else if (brand === 'Ford') {
            return new FordFactory();
        } else {
            return {};
        }
    }
}

// 奔驰汽车工厂
class BenzFactory {
    createCar(option) {
        const { series, name, color } = option;
        
        if (series === 'v1') {
            return new BenzV1({ name, color });
        } else if (series === 'v2') {
            return new BenzV2({ name, color });
        } else {
            return {};
        }
    }
}

// 奔驰 v1 系列汽车
class BenzV1 {
    constructor(option) {
        this.carAttr = option;
    }
    
    getAttr() {
        return this.carAttr;
    }
}

// 奔驰 v2 系列汽车
class BenzV2 {
    constructor(option) {
        this.carAttr = option;
    }
    
    getAttr() {
        return this.carAttr;
    }
}

// 福特汽车工厂
class FordFactory {
    // ...
}


// 创建汽车工厂
const benzFactory = AbstractCarFactory.createFactory('Benz');

// 生产具体系列汽车
const benzV1 = benzFactory.createCar({
    series: 'v1',
    name: 'Benz V1',
    color: 'red'
});
const benzV2 = benzFactory.createCar({
    series: 'v2',
    name: 'Benz V2',
    color: 'black'
});

const benzV1Attr = benzV1.getAttr();
const benzV2Attr = benzV2.getAttr();

console.log(benzV1Attr); // {name: "Benz V1", color: "red"}
console.log(benzV2Attr); // {name: "Benz V2", color: "black"}
```

由于抽象工厂是建立在工厂模式之上，所以复杂度会比之前的工厂模式更高一级，所以同样需要考虑使用该模式引入的复杂性是否是系统设计的必要；


## 混入模式

混入模式（Mixin Pattern），即对象实现属性的继承，功能的复用与拓展，其实就是**继承**这一概念的特性，该模式可以简单理解为将某一特定对象的属性方法**混入**多个对象中；对象中有一个原型，可以从原型中继承额外的属性，而原型又能从其它对象继承而来；在类中，子类B 继承自超类A，则类B 的实例就拥有了所有类A 的方法，还有类B 中额外定义的方法，以及重载的类A的方法；


下面是一个使用 Mixin 实现对象继承的示例，这是原始（ES5）的一种写法：
```js
var mixin = {
    firstName: 'Knight',
    lastName: 'Huang',
}

function Person() {
    this.hobby = 'Games';
}

// 将 mixin 的属性继承给 Person，实际就是将 mixin 的所有属性，
// 拷贝到 Person.prototype 这个对象的 __proto__ 属性中，即原型链继承；
Person.prototype = mixin;

var knight = new Person();
console.log(knight.firstName, knight.lastName, knight.hobby);
// Knight Huang Games
```

当然更通用和规范的写法（ES5）是：
```js
// 被继承的超类
function Mixin() {
    this.firstName = 'Knight';
    this.lastName = 'Huang';
}

function Person() {
    // 调用超类的构造函数，继承其属性
    Mixin.call(this);

    this.hobby = 'Games';
}

// 还需要继承超类的原型链属性
Person.prototype = Object.create(Mixin.prototype);

var knight = new Person();
console.log(knight);
// {firstName: "Knight", lastName: "Huang", hobby: "Games"}
```

更直观和方便的新语法（ES6）写法是：
```js
class Mixin {
    constructor() {
        this.firstName = 'Knight';
        this.lastName = 'Huang';
    }
}

class Person extends Mixin {
    constructor() {
        // 调用超类构造函数，继承属性
        super();
        this.hobby = 'Games';
    }
}

const knight = new Person();
console.log(knight);
// {firstName: "Knight", lastName: "Huang", hobby: "Games"}
```


## 装饰器模式

装饰器模式（Decorator Pattern），是一种类似混入模式的用于提升复用性的模式，其主要功能是向现有的类或对象动态添加新功能（属性/方法），并且不改变，也不用关心该类或对象原有的结构；顾名思义，现实世界的大部分装饰物，都是起着美化原有物的作用，并且基本都不会改变其结构，比如给房间添加个挂件什么的，还不至于把整个房子拆了重建，那就不是装饰而是改造了；

装饰器模式解决的问题也很明显，假如需要给某对象添加一些新特性，按传统思维就是使用继承，但是新功能的量很大，或者在不断递增时，使用继承再获取对象实例的开销（子类量）就相当大了；下面是一个车辆装饰器的简单示例：
```js
class Car {
    constructor(option) {
        this.brand = option.brand;
        this.name = option.name;
    }
}

class CarDecorator {
    constructor(car) {
        this.car = car;
        // 添加额外功能
        this.addColor('blue');
        // ...
    }

    getAttr() {
        return this.car;
    }

    // 为汽车添加涂色
    addColor(color) {
        this.car.color = color;
    }

    // ... 其它需要装饰的功能    
}

const benz = new Car({
    brand: 'Benz',
    name: 'My car'
});
const newBenz = new CarDecorator(benz);
const newBenzAttr = newBenz.getAttr();

console.log(newBenzAttr);
// {brand: "Benz", name: "My car", color: "blue"}
```

这里所谓的不改变原有结构进行装饰，其实就是在类的**实例**对象中动态增加功能，而该类的其它实例不会收到影响；


## 享元模式

享元模式（Flyweight Pattern），是一种减少对象创建数量，提倡数据共享，减少重复数据以优化性能（如内存占用）的结构化解决方案；“Flyweight”这个单词源自拳击比赛中“轻量级”选手一词，该模式的命名者也是如此取其含义，就是使应用程序更轻量级，“享元”也可以理解为共享元数据；

享元模式下一个重要概念是区分**内部**状态和**外部**状态，内部状态即需要维护的共享元，供外部共享，且不会因外部变化而改变；内部状态不被共享，会随外部环境变化而改变；享元工厂应维护一个内部状态，并能够接受或操作外部状态，同时需要将二者**分离**开来，相互的影响会引起系统的混乱；

以下是一个汽车工厂的例子，需要实现零件共享（如轮胎，车门，车窗...），生产组装车辆时可以使用现有零组件，零件库里没有找到再进行单独制造，然后放入零件库中供后续使用；
```js
// 单个零件类
class CarComponent {
    constructor(option) {
        const { name, color } = option;
        this.name = name;
        this.color = color;
    }
}

// 汽车零件享元工厂
class FlyweightFactory {
    constructor() {
        // 内部状态，供接口调用访问
        this.components = {};
    }

    // 获取零件
    getComponent(option) {
        const { name, color } = option;
        let component = this.components[name];

        // 存在该零件则直接返回，否则重新生产
        if (!component) {
            component = new CarComponent({name, color});
            this.components[name] = component;
        }

        return component;
    }
    
    // 返回所有已有零件
    getAllComponents() {
        return this.components;
    }
}

// 汽车工厂
class CarFactory {
    // 通过组装零件生产汽车
    static createCar(components) {
        // 外部状态，与共享的内部状态分离
        const carAttr = {};

        carAttr.door = components.getComponent({
            name: 'door',
            color: 'blue'
        });
        carAttr.window = components.getComponent({
            name: 'window',
            color: 'transparent'
        });
        carAttr.tire = components.getComponent({
            name: 'tire',
            color: 'black'
        });
        
        return carAttr;
    }
}


// 先实例化享元工厂，建立共享零件库
const components = new FlyweightFactory();

// 组建汽车
const car1 = CarFactory.createCar(components);
const car2 = CarFactory.createCar(components);

console.log(car1);
// {
//   "door": {"name": "door", "color": "blue"},
//   "window": {"name": "window", "color": "transparent"},
//   "tire": {"name": "tire", "color": "black"}
// }
console.log(car2);
// {
//   "door": {"name": "door", "color": "blue"},
//   "window": {"name": "window", "color": "transparent"},
//   "tire": {"name": "tire", "color": "black"}
// }

const allComponents = components.getAllComponents();

console.log(allComponents);
// {
//   "door": {"name": "door", "color": "blue"},
//   "window": {"name": "window", "color": "transparent"},
//   "tire": {"name": "tire", "color": "black"}
// }
```


## MVC 模式

MVC 模式即：模型（**Model**），视图（**View**），控制器（**Controller**），实现了将业务数据模型从用户视图中分离，通过控制器处理数据逻辑与页面交互逻辑；用户在视图上触发某一动作（点击、拖拽...）后，会通知处理该交互的控制器更新模型中的数据，模型更新后会再通知其观察者（视图），然后视图层收到通知便会自行做出相应更新；整体结构有些类似这样：
```
      产生交互               更新数据
View ---------> Controller ----------> Model
 ^                                       |
 |_______________________________________|
               更新页面通知
```

一个极简的计数器的示例：
```js
// 视图
class CounterView {
    // 初始化视图
    constructor(text) {
        const body = document.querySelector("body");
        const elCounter = document.createElement("div");
        const elDisplay = document.createElement("div");
        const elButton = document.createElement("button");

        elDisplay.innerText = `Current count: ${text}`;
        elButton.innerText = "Add count";

        elCounter.appendChild(elDisplay);
        elCounter.appendChild(elButton);
        body.appendChild(elCounter);

        // 提供接口供控制器操作
        this.elDisplay = elDisplay;
        this.elButton = elButton;
    }
    
    // 更新视图自身内容的逻辑
    updateView(text) {
        this.elDisplay.innerText = `Current count: ${text}`;
    }
}

// 数据模型
class CounterModel {
    constructor(initValue) {
        this.count = initValue;
        // 维护观察者
        this.observers = [];
    }

    // 获取数据
    getCount() {
        return this.count;
    }

    // 改变数据
    setCount(value, view) {
        this.count = value;

        // 通知观察者们更新
        this.observers.forEach(view => {
            view.updateView(value);
        });
    }
    
    // 添加观察者
    addObserver(view) {
        this.observers.push(view);
    }
}

// 控制器
class CounterController {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        // 给视图绑定事件监听
        view.elButton.addEventListener(
            "click",
            this.clickCallback.bind(this)
        );
    }

    // 视图事件回调
    clickCallback() {
        const count = this.model.getCount();

        // 触发模型数据更新
        this.model.setCount(count + 1, this.view);
    }
}


// 建立视图
const counterView = new CounterView(0);
// 建立模型
const counterModel = new CounterModel(0);
// 添加视图为模型的观察者
counterModel.addObserver(counterView);
// 建立控制器
const counterController = new CounterController(
    counterModel,
    counterView
);
// Current count: 0

// 模拟用户交互
counterView.elButton.click();
// Current count: 1
```


## MVP 模式

MVP 模式（模型-**Model**，视图-**View**，展示器-**Presenter**）是 MVC 模式的一个衍生模式，不同于 MVC 中的 **Controller**，可能更侧重于处理视图层对模型层的操作逻辑，MVP 会更专注于提升展现逻辑，即 **Presenter** 的功能，通常它是一个包含视图层逻辑的组件，处理用户的交互请求，然后对模型中的数据进行读写等操作，数据更新后又将数据稍做处理，**格式化展现**到视图中，也因此 MVP 模式的的视图层几乎不再包含任何逻辑，通常被称作**被动视图**（Passive View）；

这种模式下展示器更像一个中介者，解耦视图与模型的相互关联，因此这也更易于进行单元测试，比如对指定视图状态的模拟；MVP 模式的整体结构有些类似下图：
```
       交互回调                 更新数据
View ------------> Controller ------------> Model
     <------------            <------------
        更新页面                 更新通知
```

沿用上面 MVC 模式的计数器例子，MVP 模式下可以改造成这样：
```js

// 视图
class CounterView {
    // 初始化视图
    constructor(text) {
        const body = document.querySelector("body");
        const elCounter = document.createElement("div");
        const elDisplay = document.createElement("div");
        const elButton = document.createElement("button");

        elDisplay.innerText = `Current count: ${text}`;
        elButton.innerText = "Add count";

        elCounter.appendChild(elDisplay);
        elCounter.appendChild(elButton);
        body.appendChild(elCounter);

        // 提供接口供控制器操作
        this.elDisplay = elDisplay;
        this.elButton = elButton;
    }
}

// 数据模型
class CounterModel {
    constructor(initValue) {
        this.count = initValue;
    }

    // 获取数据
    getCount() {
        return this.count;
    }

    // 改变数据
    setCount(value, callback) {
        this.count = value;
        
        // 数据更新后执行的回调，这里就是通知展示器
        callback(value);
    }
}

// 控制器
class CounterController {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        // 给视图绑定事件监听
        view.elButton.addEventListener(
            "click",
            this.clickCallback.bind(this)
        );
    }
    
    // 更新视图
    updateView(value) {
        this.view.elDisplay.innerText = `Current count: ${value}`;
    }
    
    // 更新模型
    updateModel(value, callback) {
        this.model.setCount(value, callback);
    }

    // 视图事件回调
    clickCallback() {
        const count = this.model.getCount();

        // 触发模型更新
        this.updateModel(
            count + 1,
            this.updateView.bind(this)
        );
    }
}


// 建立视图
const counterView = new CounterView(0);
// 建立模型
const counterModel = new CounterModel(0);
// 建立控制器
const counterController = new CounterController(
    counterModel,
    counterView
);
// Current count: 0

// 模拟用户交互
counterView.elButton.click();
// Current count: 1
```


## MVVM 模式

MVVM 模式：（模型-**Model**，视图-**View**，视图模型-**ViewModel**）是一种基于 MVC 和 MVP 的衍生模式，它试图将视图层（用户界面，UI）从业务逻辑中更清晰地分析出来，使得 UI 和逻辑层的开发工作可以同时进行，UI 交互设计师负责绑定 View 与 ViewModel，专注于用户体验，而业务逻辑开发者负责维护 Model 与 ViewModel 的联系，专注于业务需求；MVVM 模式所呈现的结构类似下图：
```
       双向绑定               改变数据
View <-----------> ViewModel ----------> Model
                             <----------
                               数据展示 
```

MVVM 模式最初由微软在 WPF（Windows Presentation Foundation，`.NET` 图形系统）中推出使用，视图层（View）与 MVC 和 MVP 中的视图一样，即用户所看见的页面结构和布局，能展示模型层的数据并接受用户的交互操作，只不过不再是被动视图，而是包含数据绑定与事件指令，是一种主动视图；

视图模型层（**ViewModel**）是 MVVM 与 MVC 和 MVP 形成区别的地方，它和 MVP 中的 **Presenter** 有些类似，包含状态与逻辑信息，负责沟通数据模型层与视图层，把数据信息转换并展示到视图层，同时也能将视图层的指令传递到模型层，或者对输入数据进行验证；视图通常使用一类标记语言或者约定的标记语法，实现与视图模型层的数据双向绑定，从而达到同步更新；

流行的 **Vue** 框架，就是典型的 MVVM 模式，下面通过 Vue 的语法，依然以前面的计数器为例进行简单说明：

`index.html`：
```html
<!DOCTYPE html>
<html>
<head>
    <title>Counter</title>
    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.12"></script>
</head>
<body>
    <div id="app">
        <div>Current count: {{ count }}</div>
        <button v-on:click="addCount">Add count</button>
    </div>
    <script src="./index.js"></script>
</body>
</html>
```

这里的 HTML 代码就可以看作视图层（View），由于框架层提供的特性，所以它相比于传统 HTML 代码有一些区别，就是使用了模板语法，能够直接在元素中使用数据变量（`{{count}}`），以及绑定事件（`v-on:click="addCount"`），而这些都是之前所说的 MVVM 模式中视图层的特性；

`index.js`：
```js
new Vue({
    el: '#app',
    data: {
        count: 0
    },
    methods: {
        addCount: function() {
            const count = this.count;
            this.count = count + 1;
        }
    }
})
```

这里的 JS 逻辑代码可以看作视图模型层（ViewModel），包含对数据的展示处理，以及视图的指令（事件）监听处理，当然，`data` 属性可以看作是模型层（Model），但一般大型应用而言，真正意义的数据模型通常是位于服务端，页面对数据的增删改查通过接口进行，客户端则一般只对数据进行临时性存储；

MVVM 与 MVC 以及 MVP 的**区别**之处在于，**ViewModel** 不用像 **Controller** 一样不做干预，将 Model 直接暴露给 View，也不像 **Presenter** 一样，需要去引用 View，视图模型只是让视图将展示绑定到自己的属性上，再将模型中的数据处理后暴露给视图；当然能够轻松的使用 MVVM 带来的各种松耦合的便利，都离不开隐藏在框架之下的复杂性的支持，比如如何具体实现视图层与视图模型层的双向绑定，指令监听等，所以使用时必然需要考虑这层复杂逻辑带来的性能损耗是否在预期范围内；