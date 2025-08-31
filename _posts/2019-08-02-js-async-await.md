---
title: async 与 await 的用法详解
layout: post
categories: JavaScript
tags: asnyc await 异步
excerpt: 关于异步函数中 async 与 await 的用法详解
---
# async

## 概念

用于声明异步函数，返回值为一个 `Promise` 对象，它以类似 **同步** 的方式来写异步方法，语法与声明函数类似，例如：
```js
async function fn() {
    console.log('Hello world!');
}

console.log(fn().constructor); // Promise()
// 这里证明其返回值为一个 Promise 对象；
```

## 返回值

也许这里会有疑问，返回值是 Promise 对象，那么函数本身定义的返回值跑到哪里去了呢？其实，熟悉 Promise 的就知道其异步结果是通过 `.then()` 或者 `.catch()` 方法来获取并进行进一步处理的，这样一个道理，定义的异步函数中的返回值会当成 `resolve` 状态来处理，一般用 `.then()` 方法处理，而如果定义的异步函数抛出错误，例如变量未定义，则会被当做 `reject` 状态来处理，一般使用 `.catch()` 方法来处理；

举例：
```js
// 使用 .then() 的情况
async function fn1() {
    return 'Hello world!';
}

fn1().then(function(res) {
    console.log(res);
});
// Hello world!

// 使用 .catch() 的情况
async function fn2() {
    console.log(aaa); // 这里的变量 aaa 未定义，为了制造错误
}

fn2().catch(function(error) {
    console.log(error);
});
// ReferenceError: aaa is not defined
```

假如是既有返回值，又有错误的话，来看看结果如何：
```js
async function fn3(){
    console.log(aaa); // aaa 依然未定义；
    return 'Hello world!';
}

fn3().then(function(res){
    console.log(res);
}).catch(function(error){
    console.log(error);
});
// ReferenceError: aaa is not defined
```

结果证明只会执行 `reject` 状态的情况下的语句，忽略了 `resolve` 时的代码，所以此处值得 **注意**；

# await

## 概念

用法顾名思义，有 **等待** 的意思，语法为：
```js
var value = await myPromise();
```

所谓 **等待** 其实就是指暂停当前 `async function` 内部语句的执行，等待后面的 `myPromise()` 处理完返回结果后，继续执行 `async function` 函数内部的剩余语句；`myPromise()` 是一个 Promise对象，而自定义的变量 `value` 则用于获取 Promise 对象返回的 **resolve** 状态值；

## 用法

值得 **注意** 的是，`await` 必须在 `async function` 内使用，否则会提示语法错误；如果 await 后面跟的是其他值，则直接返回该值：
```js
async function fn() {
    console.log(1);
    var result = await new Promise(function(resolve, reject) {
        setTimeout(function(){
            resolve(2);
        }, 2000);
    });
	console.log(result);
    console.log(3);
    console.log(await 4); // 4 会被直接返回
}
fn();
// 1
// 2 (2 秒后输出)
// 3
// 4
```

如果不用获取返回值，也可以直接执行语句：
```js
async function fn() {
    console.log(1);
    await new Promise(function(resolve, reject) {
        setTimeout(function() {
            console.log(2);
            resolve(0);
        }, 2000);
    });
    console.log(3);
}
fn();
// 1
// 2 (2 秒后)
// 3
```

## 返回结果

如之前所说，await 会等到后面的 Promise **返回结果** 后才会执行 async 函数后面剩下的语句，也就是说如果 Promise 不返回结果（如 resolve 或 reject），后面的代码就不会执行，例如：
```js
async function fn() {
    console.log(1);
    await new Promise(function(resolve, reject) {
        setTimeout(function() {
            console.log(2);
        }, 2000);
    });
    console.log(3);
}
fn();
// 1
// 2 (2 秒后输出，并且后面不会继续输出 3)
```

这里可以理解为函数会一直等待 await 返回结果（resolve / reject）才会执行剩下的语句，没有返回结果就会一直等下去，也就一直等不到剩下的语句执行了（还挺痴情-_-）；

如果 await 后面的 Promise 返回一个 `reject` 状态的结果的话，则会被当成错误在后台抛出，例如：
```js
async function fn() {
    console.log(1);
    var result = await new Promise(function(resolve, reject) {
        setTimeout(function() {
            reject(2);
        }, 2000);
    });
    console.log(3);
}
fn();
// 1
// Uncaught (in promise) 2 (2 秒后输出)
```

如上，2 秒后会抛出出错误，并且 3 这个数并没有被输出，说明后面的执行也被忽略了；

## 匿名函数

async 也可以用于申明匿名函数用于不同场景，或者嵌套使用 async 函数，如 `await async` 的形式，只是要在 await 后面使用 async 形式的函数的话，需要这个函数立即执行且有返回值；
```js
let fn = async function() {
    let a = await (async function() {
        console.log(1);
        return 2;
    })();
    console.log(a);

    async function fn2() {
        return 3;
    }
    console.log(await fn2());
}
fn();
// 1
// 2
// 3
```

另外，await 后面的 Promise 返回的 reject， 也可以被该 async 函数返回的 Promise 对象以 reject 状态获取，例如：
```js
async function fn() {
    console.log(1);
    var result = await new Promise(function(resolve, reject) {
        setTimeout(function() {
            reject(2);
        }, 2000);
    });
    console.log(3);
}
fn().catch(function(error) {
    console.log(error);
});
// 1
// 2 (2 秒后输出)
```

这种情况就不会以错误抛出，直接对异常值进行了处理，并且最后同样没有输出数字 3，即后面的代码依然被忽略了；

# 注意事项

## 非 await 部分

`async/await` 函数以同步的方式书写异步函数确实方便了不少场景，如定义所讲，函数内部遇到 `await` 会等到返回结果再继续执行下去，也就是说，非 await 部分仍然会以正常的异步或同步方式执行，例如遇到 `setTimeout()` 就会放入任务队列等待同步语句执行完后再执行；

比如以下情况：
```js
async function fn() {
    console.log(0);
    
    await new Promise(resolve => {
        setTimeout(() => {
            console.log(1);
            resolve();
        }, 1000);
    });

    setTimeout(() => {
        console.log(2);
    }, 0);

    console.log(3);
}

fn();
// 0
// 1（2 秒后）
// 3
// 2
```

## await 内部

虽然说函数会等待 await 返回结果在继续执行，但是 await 内部的代码也依然按正常的同步和异步执行，例如：
```js
async function fn() {
    console.log(0);
    
    setTimeout(() => {
        console.log(1);
    }, 0);

    await new Promise(resolve => {
        setTimeout(() => {
            console.log(2);
        }, 0);

        console.log(3);

        setTimeout(() => {
            console.log(4);
            resolve();
        }, 1000);

        setTimeout(() => {
            console.log(5);
        }, 0);
    });

    setTimeout(() => {
        console.log(6);
    }, 0);
    console.log(7);
}

fn();
// 0
// 3
// 1
// 2
// 5
// 4（2 秒后）
// 7
// 6
```

上面的代码中返回结果的函数 `resolve()` 是在 `setTimeout()` 这个 **异步任务** 中，所以其被丢到事件队列中等待 2 秒再执行，由于此时 await 还未返回结果，所以还不会去执行 await 以外的代码（输出 7、6），而是先执行同为异步任务、但延时较短的输出 1、2、5 的代码；2 秒后结果返回了，就会继续正常执行 await 以外的同步任务和异步任务了；

但是假如 await 代码内返回结果的函数（resolve() 或 reject()）是在 **同步任务** 中执行的话，情况就有些不一样了，例如：
```js
async function fn() {
    console.log(0);

    setTimeout(() => {
        console.log(1);
    }, 0);

    await new Promise(resolve => {
        setTimeout(() => {
            console.log(2);
        }, 0);

        console.log(3);
        resolve();
        console.log(4);

        setTimeout(() => {
            console.log(5);
        }, 0);
    });

    setTimeout(() => {
        console.log(6);
    }, 0);
    console.log(7);
}

fn();
// 0 
// 3
// 4
// 7
// 1
// 2
// 5
// 6
```

由于同步任务 **先于** 异步任务执行的机理，在同步任务执行过程中依次输出了 0、3 后，就立即执行了 `resolve()` 使得 await 得到了返回结果，再往后就继续同步的输出了 4，但是输出 5 的代码是异步任务，与输出 1、2 的代码一并放入任务队列，此时由于 await 返回了结果，所以可以执行 await 以外的代码了，输出 6 是异步任务，于是先输出了同步任务的 7，同步任务都执行完了，最后执行任务队列中的异步任务，按之前进入队列的顺序，就是依次输出 1、2、5、6，所有代码运行结束；

## 函数嵌套

当 async 函数中嵌套着其他 async 函数时，执行过程可能又有些和预想的不一样，先来看下面的例子：
```js
async function fn() {
    console.log(0);

    setTimeout(() => {
        console.log(1);
    }, 0);

    (async function() {
        console.log(2);
    
        setTimeout(() => {
            console.log(3);
        }, 0);

        await new Promise(res => setTimeout(res, 1000))

        setTimeout(() => {
            console.log(4);
        }, 1000);

        console.log(5);
    })()

    console.log(6)
}

fn();
// 0
// 2
// 6
// 1
// 3
// 5（1 秒后）
// 4（再等 1 秒后）
```

也许会疑惑，不是说 async 函数会等到 await 返回结果后再继续执行吗，为何就先输出 6 了？其实不要混淆概念，确实 async 函数内部是这样干的（3 后 1秒输出 5、4），但 async 函数它自身执行时依然是正常的同步任务执行，也就是虽然内部的 async 函数会等待其 await 返回结果才继续执行后面的代码，但外部的 async 函数可不会等待内部的那个 await，会照常执行（你不是我的菜，天涯何处无芳草╮(╯▽╰)╭）；

如果确实需要等待这个嵌套的 async 函数执行完再执行剩下的代码，那么前面加个 await 就行了，原理是也是可行的，因为 async 函数就是返回的一个 Promise 函数，代码如下：
```js
async function fn() {
    console.log(0);

    setTimeout(() => {
        console.log(1);
    }, 0);

    await (async function() {
        console.log(2);
    
        setTimeout(() => {
            console.log(3);
        }, 0);

        await new Promise(res => setTimeout(res, 1000))

        setTimeout(() => {
            console.log(4);
        }, 1000);

        console.log(5);
    })()

    console.log(6)
}

fn();
// 0
// 2
// 1
// 3
// 5（1 秒后）
// 6
// 4（再等 1 秒后）
```

这里也要 **注意**，假如嵌套的 async 函数中的 await 不返回结果，并且没有在嵌套的 async 函数前面添加 await，那么外部的 async 函数内部剩余的代码也不会执行；