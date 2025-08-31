---
title:  JavaScript 事件循环
layout: post
categories: JavaScript
tags: event-loop 事件循环 堆栈 宏任务 微任务
excerpt: JavaScript 运行机制以及堆栈的详细描述
---

# 运行时（runtime）

一个 JavaScript 运行时包含 **栈(stack), 堆(heap), 队列(queue)**;

# 栈 (stack)

**栈** 具有 **先进后出 (FILO, First In Last Out)** 的特点，有时也叫做 **堆栈**，可以理解为一个开口向上的容器，先进入的物体压瓶底，后进入的物体一层层向上堆叠，最后取出时，也是一个个拿出来，先拿出最后放进去的，也就是在最上面那个，最后拿出的就是之前第一个放入瓶底的物体；其中容器里的每一个物体叫做 **栈帧**，理解为动画的每一帧，即最小单元；

动画描述：

![stack_null.gif](https://i.loli.net/2019/06/19/5d0a3c772749842497.gif)

JavaScript 执行时，每一个调用函数执行时会被压入栈中，称为 **压栈**，这个函数执行完毕后从栈中弹出，称为 **弹栈**；即某个物体放入容器一定时间后，再从容器里面取出来，方便为下一次放入物体腾出空间；

例如：
```js
function fn1() {
    console.log('Message 1.');
}
console.log('Message 0.');
fn1();

// Message 0.
// Message 1.
```

如果一个函数执行时还会调用第二个函数，那么第一个函数压入栈底后，随后第二个函数便会压在第一个上面，如果还存在第三个、第四个等等，便以此类推向上堆叠，直到最后调用的一个函数执行完之后，在从后往前一次弹出每一个函数；

可以理解为容器放入第一个物体后，本来应该随后取出的，但是这个物体又牵连了第二个物体，所以又继续放入第二个，甚至第三个、第四个等等；

例如：
```js
function fn1() {
    console.log('Message 1.');
}
function fn2() {
    fn1();
    console.log('Message 2.');
}
function fn3() {
    fn2();
    console.log('Message 3.');
}

console.log('Message 0.');
fn3();

// Message 0.
// Message 1.
// Message 2.
// Message 3.
// 可以慢慢看几遍捋一下顺序
```

演示动画：

![stack_fn.gif](https://i.loli.net/2019/06/19/5d0a400b56afd25428.gif)

到这里可能就有问题了，函数能无限调用下去？能无限向栈中压入物体？当然，这个容器是有限制的，例如，在电脑浏览器控制台输入以下代码：
```js
(function fn(){fn()})()
```

其实就是一个递归函数，不断调用自己，并且一直执行下去，那么不出意外，会弹出如下错误提示：

![stack-exceed-fn.png](https://i.loli.net/2019/06/18/5d08ec91b92e653156.png)

大致意思就是说执行栈发生了溢出，就是不断调用的函数太多了，超过了栈的规定大小；

也可以尝试输入以下代码，看一下使用的浏览器的栈的尺寸：
```js
var i = 0;
(function fn() {
    console.log(++i);
    fn();
})()
```

回车之后，在浏览器没有卡死的情况下 -_-，n 分钟之后，应该会出现以下错误提示：

![stack-exceed-num.png](https://i.loli.net/2019/06/18/5d08ecab407ee90019.png)

最后一个出现的数字应该就是极限了，这里使用的是 Chrome 浏览器，可以看出还是比较大的；

# 堆 (heap)

**堆** 在运行期间被用来动态分配内存，比如给变量、对象、数组、字符串等分配特定的内存地址，用以访问，不像栈和队列，它是一个非结构化的区域；

# 队列 (queue)

**队列** 具有 **先进先出 (FIFO, First In First Out)** 的特点，这里就理解为排队取餐的一队人，先到先得，然后从前面先走，后来的排在最后，并且不允许插队；

在 JavaScript 运行时中，队列的结构被应用到了 **消息队列** 中；前面说到代码执行时，调用函数执行时被压入执行栈 (call stack) 中，并且需要等待该函数彻底执行完后，才能弹出栈，但是假如遇到 `setTimeout` 这样延时事件，由于 JavaScript 引擎的 **单线程** 特点，区别于其他语言，因此执行是不会因为延时函数而中断的，此时便会将 `setTimeout` 延时调用的函数放入 **消息队列** 中（延时短的早调用，延时长的晚调用，**与书写顺序无关**），等待当前环境所有压栈、弹栈操作执行完毕，再按照顺序执行队列中的调用函数；

例如：

```js
function fn1() {
    console.log('Message 1.');
}
function fn2() {
    fn1();
    setTimeout(function delay1(){
        console.log('Message 2.');
    }, 0)
}
function fn3() {
    fn2();
    setTimeout(function delay2(){
        console.log('Message 2.5.')
    }, 1000)
    console.log('Message 3.')
}

console.log('Message 0.')
fn3();

// Message 0.
// Message 1.
// Message 3.
// Message 2.
// Message 2.5. (大约 1 秒后)
```

动画演示：

![stack_fn_queue.gif](https://i.loli.net/2019/06/19/5d0a53f02b34680755.gif)

这里的结果就明显与之前的例子不同了，根据上面的描述，顺序为：
- 输出 `Message 0.`；
- `fn3()` 压入栈底；
- 然后压入 `fn2()`；
- 最后压入 `fn1()`；
- `fn1()` 内的语句执行完后，输出 `Message 1.`；
- 执行函数 `fn2()` 的语句；
- 由于 `fn2()` 内的 `setTimeout()` 函数是一个延时函数，所以其调用函数 `delay1()` 就被放到了消息队列中；
- 然后执行 `fn3()` 中的 `setTiemout()`，其调用函数 `delay2()` 也被放入了队列中；
- 由于 `delay1()` 的延时小于 `delay2()`，所以 `delay2()` 被放到了 `delay()` 的后面，反之颠倒顺序；
- 输出 `fn3()` 中的 `Message 3.`；
- 此时开始执行消息队列的函数；
- 先执行 `delay1()` 输出 `Message 2.`；
- 然后执行 `delay2()` 输出 `Message 2.5`；

**注意**，即使 `delay1()` 的延时为 `0`，也并不意味着该回调函数会在 0 毫秒后执行，即不会立即执行，由于机制原因，同样会被放入消息队列中，只不过会 **比较早执行** 而已；

# 事件循环 (Event Loop)

所谓事件循环，大致就是上诉过程；这里的 **事件** 指的就是消息队列中的消息，即队列中的调用函数；**循环** 即不断执行完队列中的消息，并等待是否有新消息到达，进而将其执行的这一循环过程；

# 宏任务/微任务

由于 JavaScript 的执行是**单线程**的（浏览器是多线程的），所以为了避免代码执行时遇到一些耗时的操作阻塞后续操作，就有了**同步任务**和**异步任务**之分；在 js 执行期间，遇到同步任务就执行**入栈**操作，遇到异步任务就放入**队列**中，栈中的同步任务执行完后再执行队列中的异步任务，也就是上面说的事件循环，这样就避免了耗时任务对栈中主线程的阻塞，一般大多数函数和变量声明都是同步任务，异步任务占少数如 `setTimeout()`, `setInterval()`, `Promise()` 等；其中，异步任务又可分为**宏任务**和**微任务**；

宏任务常见的有 `setTimeout()`, `setInterval()`，微任务常见的便是 `Promise()` 和 `process.nextTick()`（nodejs 中使用）；之前只提到消息队列，这里为了便于理解可以把宏任务和微任务看成两个分开的队列：宏任务队列与微任务队列；

我们通过以下代码看一下同步任务、宏任务、微任务的执行顺序：
```js
console.log('Sync task.');

setTimeout(() => {
    console.log('Macro task.');
}, 0);

Promise.resolve('Micro task.').then(res => {
    console.log(res);
})

console.log('End.');
// Sync task.
// End.
// Micro task.
// Macro task.
```

接下来我们把宏任务和微任务的顺序换一下，再看一下结果：
```js
console.log('Sync task.');

Promise.resolve('Micro task.').then(res => {
    console.log(res);
})

setTimeout(() => {
    console.log('Macro task.');
}, 0);

console.log('End.');
// Sync task.
// End.
// Micro task.
// Macro task.
```

综合结果证明，任务的执行顺序是：
```
同步任务 --> 微任务 --> 宏任务
```

再考虑下面这个较有代表性的稍微复杂点的嵌套情况（答案在代码最右侧，先思考再检查）：
```js
console.log(0);

setTimeout(() => {
    console.log(1);
}, 1000);
setTimeout(() => {
    console.log(2);
}, 0);

new Promise(resolve => {
    console.log(3);
    setTimeout(() => {
        console.log(4);
    }, 500);

    resolve(5);
}).then(res => {
    setTimeout(() => {
        console.log(6);
    }, 0)
    console.log(res);
})                                                                                                                                 // 0  
                                                                                                                                   // 3  
setTimeout(() => {                                                                                                                 // 9  
    console.log(7);                                                                                                                // 5  
}, 200)                                                                                                                            // 2  
setTimeout(() => {                                                                                                                 // 8  
    console.log(8);                                                                                                                // 6  
}, 0)                                                                                                                              // 7  
                                                                                                                                   // 4  
console.log(9);                                                                                                                    // 1  
```

查看答案后看看结果和预想的是否一致；可能唯一有疑惑的地方就是 **3** 和 **9** 的输出顺序，因为前面不是讲同步任务会先于 Promise 微任务执行吗？应该是 **9** 在 **3** 前面才对呀？其实不然，并不是在 Promise 函数代码内的都是微任务，因为所谓 **微任务** 就是一项任务，即指令下达后要做的事情，那么在函数中 **要做的事** 其实是 `.then()` 中包裹的代码，而 Promise 函数中包裹的代码（输出 **3**、**4**、**5**）算作 **同步任务** 的一部分，所以 **3** 会先于 **9** 输出；

另外，我们还能注意到，输出 **6** 的代码被 `setTimeout` 这个宏任务包裹，但这个宏任务又被 `.then()` 这个微任务包裹，根据最终的结果，这个宏任务基本还是被正常对待，只是在相同延时的宏任务中被最后执行了，尽管在代码中这个微任务中的宏任务写在了普通宏任务的前面，所以最终 **8** 会比 **6** 先输出；