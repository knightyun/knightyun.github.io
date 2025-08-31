---
title: TypeScript 中类型 any，void，unknown，never之间的区别
layout: post
excerpt: '分析对比 ts 中基本类型 any, void, unknown, never之间的区别'
categories: JavaScript
tags: ts typescript any  unknown never
---
TypeScript 拓展了 JavaScript 的基本类型与语言特性，为了覆盖类型检查的情景，衍生出了一些额外的类型，其中 `any`, `unknown`, `void`, `never` 这几个类型所适用的情形容易使人混淆，下面通过举例进行一下区分；

## any

这应该是 typescript 中最开始就会接触到的类型，顾名思义：**任意类型**，这也是 ts 中不写类型申明时的默认类型，即不作任何约束，编译时会跳过对其的类型检查，
```ts
let val1: any;
val1 = 'abc';
val1 = 123;
val1 = true;

const arry: any[] = [123, 'abc', true, null];
```

## void

`void` 表示**无任何类型**，正好与 `any` 相反，没有类型，如果是函数则应没有返回值或者返回 `undefined`，和 C 等语言中的无返回值函数申明类似：
```ts
function voidFn(): void {}
function voidFn1(): void { return undefined; }
function voidFn2(): void { return; }

function voidFn3(): void { return 1; } // Error
```

变量也可以申明为 `void` 类型，只不过只能给这个变量分配 `undefined`, `null` 和 `void` 类型的值（如果 ts 配置文件中设置了 `"strictNullChecks": false`，那么分配 `null` 类型的值也会报错）:
```ts
let val1: void;
let val2: null = null;
let val3: undefined = undefined;
let val4: void;

val1 = val2; // "strictNullChecks": false 时报错
val1 = val3;
val1 = val4;
```

## unknown

顾名思义，`unknown` 表示**未知类型**，是 `typescript 3.0` 中引入的新类型，即写代码的时候还不清楚会得到怎样的数据类型，如服务器接口返回的数据，`JSON.parse()` 返回的结果等；该类型相当于 `any`，可以理解为官网指定的替代 `any` 类型的**安全**版本（因为不提倡直接使用 `any` 类型）；

它能被赋值为任何类型，但不能被赋值给除了 `any` 和 `unknown` 之外的其他类型，同时，不允许执行 `unknown` 类型变量的方法（`any` 可以），举个例子：
```ts
let uk: unknown = 'abc';

uk = 123;
uk = true;
uk.toString(); // Error

let valAny: any = 'abc';
valAny.toString(); // 'abc'

let uk1: unknown = uk;
let uk2: any = uk;
let uk2: string = uk; // Error
```

## never

`never` 同样顾名思义，表示**永不存在的值**的类型，是 `typescript 2.0` 中引入的新类型，概念有点绕，什么情况下变量会永远不存在值呢？因为通常情况下，变量一旦申明了，就会被分配值，即使没有特别指定，也会被初始化为 `undefined`，同样一个函数即使有个写返回值，也会默认返回 `undefined`，也不是真正的不存在返回值：
```js
let foo;
console.log(typeof foo); // 'undefined'

function bar() {};
console.log(typeof bar()); // 'undefined'
```

其实确实有一些情形，值会永不存在，比如，从程序运行的维度讲，如果一个函数执行时抛出了**异常**，那么这个函数变永远不会有值了（因为抛出异常会直接中断程序运行，这样程序就运行不到返回值那一步了，即具有不可达的终点，也就永不存在返回了）：
```ts
function err(msg: string): never {
    throw new Error(msg);
}

// 有机会到达终点的函数也算存在返回值，编译会报错
function err1(): never { // Error
  if (Math.random() > 0.5) {
     throw new Error('message');
  }
}
```

还有一种极端情况也比较类似，就是函数中执行无限循环的代码（**死循环**），这样也同样使得程序永远无法运行到函数返回值那一步，永不存在返回：
```ts
function loopForever(): never {
    while (true) {};
}
```

变量也可以直接申明为 `never` 类型，让它永不存在值，其实就是意思就是永远不能给它**赋值**，否则就会报错，这样就可以形成一种保护机制；
```ts
let ne: never;

ne = 123; // Error
```

另外，`never` 是所有类型的子类型，意思就是它可以赋值给任何类型（前提是配置里 `"strictNullChecks": false`，否则检查不通过）；
```ts
let num: number = 123;
let ne: never;

num = ne;
```

同时也没有任何类型是 `never` 的子类型，除了 `never` 自身，即除了 `never` 任何类型都不能赋值给 `never` 类型的变量（如果前提是 `"strictNullChecks": true`，`never` 也不能赋值给 `never`）；
```ts
let ne1: never;
let ne2: never;

ne1 = ne2;

// any 也不能分配给 never
let any1: any = 123;
ne1 = any1; // Error
```