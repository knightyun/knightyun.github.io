---
title: TypeScript 之泛型
layout: post
categories: JavaScript
tags: ts typescript 泛型 generic
excerpt: 介绍TypeScript中泛型的概念与使用场景
---
## 背景

**泛型**用于创建可复用的支持多种类型的组件，比如不仅能支持当前的类型，还能支持未来的类型，为大型系统的构建提供一定灵活性，**泛**有广泛、多种的意思，即泛型可实现对多种类型的支持；泛型是一种已有的概念，除了 TypeScript，同样也存在于其他多种语言中；

先举一个基本的例子，ts 中实现一个加法运算的函数，可以是这样的：
```ts
function addFn(arg1: number, arg2: number): number {
    return arg1 + arg2;
}
addFn(1, 2);
```

如果后期功能拓展，需要上述函数也具备拼接字符串的功能，即：
```ts
function addFn(arg1: string, arg2: string): string {
    return arg1 + arg2;
}
addFn('a', 'b');
```

但是这样的申明并不与上面已有的申明兼容，即使使用**联合类型**处理也比较复杂，但是它们的处理逻辑却是一样的，只是类型值换了，重写一个新函数也不符合拓展的初衷，所以需要寻求其他方法；


## 函数重载

在 ts 中**重载**是为一个函数提供多个类型定义的操作，使得函数可以根据传参的不同而拥有不同的返回类型；这样，我们就能轻松实现之前例子的拓展需求：
```ts
function addFn(arg1: string, arg2: string): string;
function addFn(arg1: number, arg2: number): number;
function addFn(arg1: any, arg2: any): any {
  // 上面一行只是函数的实现签名，为了兼容上面两个重载签名，不能被直接调用，
  // 同时它也并不算作一个重载，真正的重载签名只有最上面的两个
  return arg1 + arg2;
}

// 以下代码都能通过类型检查
addFn(1, 2);
addFn('a', 'b');

// 而没在重载定义中的类型会报错
// addFn(true, true); // Error
```

这个例子中，该申明函数与正常函数的区别是：
- 在函数申明的上方又叠加了几个申明表达式，包裹参数类型和返回类型，末尾以分号结束，每一个申明便是一个重载；
- 然后是在函数区块中写处理逻辑，同时包含进上面的几种参数与返回类型的情况；
- 最后调用时就可以传入不同重载所对应的传参类型，并且能通过类型检查，而不在重载定义中的类型则不会通过类型检查；
- 函数在调用时，ts 会在申明的函数重载中自上而下查找第一个匹配的重载签名，最后一个函数签名称为“实现签名”，并不会被调用；

使用重载虽然实现了同时能计算数字和拼接字符串的需求，但是这种写法还是有些复杂，因为参数类型与返回类型具有一定规律性；因此还可以继续寻求更简便的方式；


## 类型变量

在 ts 中，可以使用**泛型**来解决上述需求，具体的方式是使用**类型变量**，顾名思义，ts 包含一个庞大的类型处理系统，有各种使用类型的情景，为了应对一些场景，就需要类型值有像**变量**一样的变化性，支持赋值与取值操作；

先看一下使用类型变量的具体写法：
```ts
function addFn<T>(arg1: T, arg2: T): T {
    return arg1 + arg2;
}
addFn<number>(1, 2);
addFn<string>('1', '2');
addFn('a', 'b'); // 调用时也可以省略类型赋值
```

这里的写法就比写重载的形式简便了许多；示例中出现了 `<T>` 这个标识，其中 `T` 表示**类型变量**，`<>` 表示对类型变量的申明，即申明时使用 `<>` 设置变量，调用时再使用 `<>` 进行赋值，这样所有用到变量 `T` 的地方都会被替换为传入的类型值；这里可以发现，泛型就像类型系统中一个针对类型的**函数**，类型参数就是**形参**；

调用时可以省略类型赋值的操作是因为上面的场景中 ts 可以利用**类型推断**机制自动判断出 `T` 的实际类型值（`number`）；

由于 `T` 表示任意类型，所以不能直接访问某些属性或方法：
```ts
function fn<T>(arg: T): T {
  // return arg.toString(); // Error，因为并不是所有类型都有该方法
  return arg;
}
```

如果是复合类型，则可以使用某些固有属性：
```ts
function fn<T>(arg: T[]): string {
  return arg.toString(); // 普通数组类型都具有该方法
}
```

类型变量也可以使用其他字母或者单词（通常使用 T），并且可以同时定义多个变量：
```ts
function fn<M, My, other>(arg: M): M {
  let one: My;
  let two: other;

  return arg;
}

// 存在多个类型变量时，需要依次赋值类型
fn<string, number, boolean>('abc');
```


## 泛型接口

除了函数，泛型也可以在接口中使用，例如：
```ts
interface IGeneric {
  <T>(arg: T): T;
}

let fn: IGeneric = function(arg) {
  return arg;

  // 和接口申明不一致会报错
  // return arg + '';
}
```

或者是针对整个接口的泛型：
```ts
interface IGeneric<T> {
  a: T;
  b: T[];
  c(arg: T): T;
}

const obj: IGeneric<number> = {
  a: 123,
  b: [1, 2, 3],
  c: (arg) => arg + 1
};
```


## 泛型类

针对类定义类型变量时，类的所有非静态成员都可以使用该变量：
```ts
class CS<T> {
  constructor(public attr: T) {}

  fn(): T {
    return this.attr;
  }

  // 静态成员不能使用泛型类型
  // static a: T = ''; // Error
}

// 实例化时传入类型值
const cs = new CS<number>(123);

cs.fn(); // 123
```


## 泛型约束

在一些场景中，可能并不期望类型变量的值太**泛**，而是需要具有某些属性或方法，这时就可以使用 `extends` 关键字对类型加一些**约束**，这和类中的**继承**用途也有些类似；例如：
```ts
interface IObj {
  length: number;
}

// 将参数约束为具有 length 属性的任意类型
function fn<T extends IObj>(arg: T): number {
  return arg.length;
}

fn('abc'); // 3

// 报错，因为数字没有 length 属性
// fn(123); // Error
```

结合其他 ts 特性，也能表示一些特殊情形，比如下例表示函数第二个参数，需要是第一个参数对象的属性名之一，`keyof` 关键字为索引查询操作符，`keyof T` 表示 `T` 的所有属性构成的联合类型：
```ts
function fn<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}

fn({ a: 1 }, 'a');

// 报错，因为第一个参数对象中并没有一个叫 'b' 的属性
// fn({ a: 1 }, 'b'); // Error
```