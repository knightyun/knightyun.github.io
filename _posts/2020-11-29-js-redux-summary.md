---
title: Redux 主要知识学习总结
layout: post
categories: JavaScript
tags: redux state store 状态
excerpt: 总结Redux 的一些主要知识内容与特性
---
## 概念

**Redux** 作为一个状态管理器，可以应用于多种 web 技术或框架中，React 只是其中之一；Redux 的特点在于，多个页面或组件使用同一个状态（store，用于管理应用的 state），可以实现各模块或组件之间的数据共享，应用的任何部分都能进行状态修改，避免了传统的组件间深层次传值问题；


## 使用

### 创建状态（store）

`Redux.createStore()` 方法用于创建一个 `store`，其接收 **`reducer`** 作为第一个参数；

`reducer` 为一个自定义函数，接收 `state` 作为第一个参数，同时返回一个值作为新的 `state`；

reduce 有缩减，减少的意思，可以理解为一个缩减器，不断将新得到的状态覆盖原状态，以实现 `store` 的单一状态更新，其名字也是根据 `Array` 的 `.reduce()` 方法而来的；
```js
import Redux from 'redux';

// 为 state 设置默认值
const reducer = (state = 1, action) => {
    return state;
}
const store = Redux.createStore(reducer);
```

`createStore()` 方法还接收第二个参数 **`initialState`**，作为 `state` 的初始化值，即下面两种写法效果相同：
```js
import Redux from 'redux';

const store1 = Redux.createStore((state = 1) => {
    return state;
});
const store2 = Redux.createStore((state) => {
    return state;
}, 1);

const state1 = store1.getState();
const state2 = store2.getState();

console.log(state1); // 1
console.log(state2); // 1
```


### 读取状态

`getState()`，是所创建的 `store` 对象的一个方法，用于获取创建的状态；
```js
const store = Redux.createStore(
    (state = 1) => state;
);
const state = store.getState();

console.log(state); // 1
```


### 改变状态（action）

#### 触发更新

`state` 的更新需要通过触发 `action` 来实现，`actoin` 是前面的 `reducer` 函数接收的第二个参数，一个 `action` 是一个包含操作信息的对象，同时也可以携带要传递的额外数据；

触发 `action` 使用 `dispatch` 实现，`dispatch` 是 `store` 对象的一个方法，其接收参数为 `action` 对象，是更新状态的唯一途径；

这里之所以多加一层 `action`，而不直接修改状态，是为了追踪某一状态为何更新，或者调试时进行操作复现等目的，而 `action` 中的 `type` 就相当于为了被追踪而留下的痕迹；
```js
const store = Redux.createStore(
    (state=1, action) => {
        if (action.type === 'myAction') {
            return action.myData;
        } else {
            return state;
        }
    }
);

const action = {
    type: 'myAction', // type 属性为必填项
    myData: 'myContent.', // 自定义携带数据
}

store.dispatch(action);
console.log(store.getState()); // "myContent."
```

在模块较多的复杂应用中，为了辨识操作，方便理解，通常 `type` 的格式会定义为 `模块/操作` 的形式，`模块`一般和对应的 `reducer` 相关，例如：
```js
const todoReducer = (state, action) => state;
const userReducer = (state, action) => state;

const addTodo = { type: 'todo/add' };
const renameUser = { type: 'user/rename' };
```


#### 响应更新

更新 `state` 的 `action` 被触发了，还需要定义一些操作对其进行响应，在 `action` 触发时执行，即指定如何更新 `state`；

这里更新 `state` 的逻辑写在之前创建 `store` 时传入的 `reducer` 函数中，由于 Redux 中的 `state` 是只读的（并未强制，但需自行在代码中遵守），所以 `reducer` 每次返回的 `state` 都是新的；
```js
const myState = {
    num: 0
}
const myReducer = (state=myState, action) => {
    if (action.type === 'add') {
        return {
            num: state.num + 1
        };
    } else {
        return state; // 非指定状态需要考虑返回原状态
    }
}
const store = Redux.createStore(myReducer);
const myAction = {
    type: 'add'
}

store.dispatch(myAction);

console.log(store.getState().num); // 1
```

Redux 并未强制 `reducer` 中的 `state` 为只读的，其实是可以对其进行修改，例如：
```js
const defaultState = { num: 0 };
const store = Redux.createStore(
    (state=defaultState, action) => {
        if (action.type === 'add') {
            state.num += 1;
            return state;
        } else {
            return state;
        }
    }
);

console.log(store.getState()); // { num: 0 }

store.dispatch({ type: 'add'});

console.log(store.getState()); // { num: 1 }
```

但官方并不建议这么做，这有可能导致页面数据得不到及时更新的 bug，所以需要开发者考虑自行维护其**不可变性（Immutability）**，这也能实现更好的状态追踪，问题追溯等开发体验，如官网提到的一项叫 `time traveling debugging` 技术；并且，Redux 官网对该框架的介绍也是 `Redux is a predictable state container`，即具有预见性的状态管理器；


### 订阅状态

`subscribe()` 是 store 对象的方法之一，它接收一个函数作为参数，用于设置监听器以订阅状态的更新，即指定 `state` 更新时应该做什么；
```js
const store = Redux.createStore((state=0, action) => {
    if (action.type === 'add') {
        return state + 1;
    } else {
        return state;
    }
});

store.subscribe(() => {
    // 指定每次更新状态就打印当前值
    console.log('dispatch', store.getState());
})
store.dispatch({ type: 'add' }); // 'dispatch' 1
store.dispatch({ type: 'add' }); // 'dispatch' 2
```


## 拓展

### 状态合成

虽然 Redux 为了管理方便而设置单一的 `store` 对所有 `state` 进行统一管理，但是状态量的增长会使得书写变得复杂，所以 Redux 对象提供了一个 `combineReducers()` 方法，将所有声明的分工不同（不同组件、页面或子应用）的 `reducer` 合并为一个总的 `reducer`；

该方法接收一个对象作为参数，不同的属性名用于标识不同作用的 `reducer`，以及状态更新后从 `store` 中取回状态值，属性值为声明的 `reducer` 函数；
```js
const calcReducer = (state=1, action) => {
    switch (action.type) {
        case 'add':
            return state + 1;
        case 'minus':
            return state - 1;
        default:
            return state;
    }
}
const countReducer = (state=0, action) => {
    if (action.type === 'add') return state + 1;
    else return state;
}
const rootReducer = Redux.combineReducers({
    calc: calcReducer,
    count: countReducer,
});
const store = Redux.createStore(rootReducer);


console.log(store.getState()); // { calc: 1, count: 0, }

store.dispatch({ type: 'add' });

console.log(store.getState()); // { calc: 2, count: 1 }
```

`combineReducers()` 参数对象中指定的属性名用于存储该 reducer 的所有状态值；


### Enhancer

`Redux.createStore()` 方法还可以接收第三个参数 **`enhancer`**，用于自定义 `store` 的功能或强化其能力（例如魔改），比如改变 `dispatch()`, `getState()`, `subscribe()` 等方法的默认行为；

`enhancer` 参数为一个自定义函数，其接收 `Redux.createStore` 这个方法作为参数，并返回一个新的 `createStore` 方法；

下面是一个为 `dispatch` 添加功能的简单示例：
```js
const myReducer = (state=1, action) => {
    if (action.type === 'add') {
        return state + 1;
    } else {
        return state;
    }
}
// enhancer 接收一个参数，即 Redux.createStore 这个方法，
// 用于执行创建 store 的默认行为；
const myEnhancer = (createStore) => {
    // enhancer 需要返回一个函数，其参数与 Redux.createStore 的相同，
    // 可以理解为返回另一个新的 createStore 函数；
    return (reducer, initialState, enhancer) => {
        // 需要执行一次 Redux.createStore 的默认行为，并获取 store
        const store = createStore(reducer, initialState, enhancer);

        // 修改 store 中的默认 dispatch 方法
        store.dispatch = (action) => {
            // 新加的功能
            console.log('dispatched.');
            // 最后仍需执行一次 dispatch 的默认行为
            return store.dispatch(action);
        }
        
        // 修改默认的 getState 方法
        store.getState = () => {
            return store.getState() + 1;
        }

        // 返回的新 createStore 方法还需要返回一个对象，即整个 store 对象；
        return store; 
        }
    }
}

const store = Redux.createStore(myReducer, undefined, myEnhancer);

store.dispatch({ type: 'add' }); // "dispatched."

console.log(store.getState()); // 3
```

需要同时使用多个 `enhancer` 时，需要进行合成，可以使用 `Redux.compose()` 方法：
```js
const enhancers = Redux.compose(enhancer1, enhancer2); // 可以传入多个参数作 enhancer
const store = Redux.createStore(myReducer, undefined, enhancers);
```

### Middleware

大多数时候，我们只希望自定义 `dispatcch` 方法的逻辑，所以官方专门提供了一个叫 **`middleware`** 的特性，翻译过来就是**中间件**，即在触发 `action` 和调用 `reducer` 执行响应之间，给用户提供一个可操作空间，如用于日志记录，问题报告，或者处理异步操作等；

`middleware` 是一个自定义函数，其接收一个对象作为参数，该参数对象有两个方法，分别是 `dispatch` 和 `getState`，逻辑都与 `store` 对象中的两个同名方法相同；

`middleware` 函数还需要返回另一个函数作为包装（自定义）后的 `dispatch` 方法，由于逻辑层次较多，下面会通过代码说明；

Redux 中内置了一个叫做 `applyMiddleware` 的 `enhancer` 方法，用于添加 `middleware`，它可以接收多个参数以传入多个 `middleware`；

具体实现通过举例说明：
```js
const myReducer = (state, action) => {
    if (action.type === 'add') {
        return state + 1;
    } else {
        return state;
    }
}

// 自定义的中间件函数
const myMiddleware1 = ({ dispatch, getState }) => {
    // 中间件需要返回一个函数，即新的 dispatch 逻辑，
    // 该函数又接收一个参数 next，用于执行下一个 middleware，
    // 当然如果有下一个中间件就执行，没有了就执行原始的 dispatch，
    // 其实这个参数 next 也就是原始的那个 store.dispatch 方法；
    return (next) => {
        // 该函数也需要返回一个函数，用于处理 action，
        // 接收一个 acction 作参数，即 store 触发的 action；
        return (action) => {
            // 自定义逻辑
            console.log('mid 1', getState());

            // 这个函数还需要返回一个函数，即用之前的 next 方法
            // 将 action 传递给下一个 middleware 继续处理；
            return next(action);
        }
    }
}

// 也可以使用简写方式
const myMiddleware2 = ({ getState }) => next => action => {
    console.log('mid 2', getState());
    const result = next(action);
    console.log('mid 2 new', getState());

    return result;
}

// 使用中间件
const myEnhancer = Redux.applyMiddleware(myMiddleware1, myMiddleware2);

const store = Redux.createStore(myReducer, 1, myEnhancer);

store.dispatch({ type: 'add' });
// "mid 1" 1
// "mid 2" 1
// "mid 2 new" 2

console.log(store.getState());
// 2
```

总结一下整个执行过程就是：
- 用户调用了 `store.dispatch()` 触发 `action`；
- Redux 按 `applyMiddleware()` 方法中参数的传入顺序，挨个执行自定义的 `middleware` 逻辑；
- 然后再调用原始的 `store.dispatch()` 方法触发 `action`；
- 最终执行 `reducer` 中的逻辑；
 
整个过程有些类似函数的链式调用：
```sh
dispatch -> middleware1 -> middleware2 ... -> dispatch -> reducer
```

此外，由于 `middleware` 的执行逻辑，其特性还包括对 `action` 中数据的修改、中断甚至彻底停止 `action`，的触发，例如上例中最后不返回 `next(action)`，那么整个过程执行完第一个 `middleware` 就结束了，`state` 也不会发生预期的改变；

### 处理异步逻辑

Redux 内部并不知道如何处理异步逻辑，只会同步的触发 action，然后调用 reducer 更新 state，所以任何异步逻辑需要我们在外部自己实现；而 Redux 的宗旨是 recuder 不要有任何**副作用**，最好是一个**纯函数**，即不要有多余的外部联系，如控制台打印，异步请求等；

而 `middleware` 就是 Redux 专为**副作用**逻辑需求而设计的，这里以异步操作为例用代码进行简单实现：
```js
const reducer = (state, action) => {
    if (action.type === 'add') {
        return state + 1;
    } else if (action.type === 'asyncAdd') {
        return action.data;
    } else {
        return state;
    }
}
const asyncMiddleware = _store => next => action => {
    if (action.type === 'asyncAdd') {
        setTimeout(() => {
            action.data = 'some data.';
            next(action);
        }, 2000);
    } else {
        next(action);
    }
}
const enhancer = Redux.applyMiddleware(asyncMiddleware);
const store = Redux.createStore(reducer, 0, enhancer);


store.dispatch({ type: 'add' });
console.log(store.getState()); // 1

store.dispatch({ type: 'asyncAdd' });
console.log(store.getState()); // 1

setTimeout(() => {
    console.log(store.getState());
}, 2000);
// 2 秒后输出：
// some data.
```

结果显示异步操作获取的数据，可以成功被 `reducer` 拿到并实现相应的逻辑，所以把 `setTimeout` 换成 `Ajax` 请求也同样可以从服务器获取到数据，然后传递给 Redux 进行下一步处理；

由于上面的异步逻辑的原生写法不太方便，Redux 官方就提供了一款 `redux-thunk` 工具，封装好了一个 `middleware`，应用之后就可以将 `action` 声明为一个函数（以前是一个对象），其接收 `dispatch` 和 `getState` 两个参数；具体用法如下：
```js
import Redux from 'redux';
import ReduxThunk from 'redux-thunk';

const reducer = (state, action) => {
    if (action.type === 'add') {
        return state + 1;
    } else if (action.type === 'asyncAdd') {
        return action.data;
    } else {
        return state;
    }
}

// 直接应用该工具
const middlewareEnhancer = Redux.applyMiddleware(ReduxThunk.default);

const store = Redux.createStore(reducer, 1, middlewareEnhancer);

// 这里 action 声明为函数，处理异步逻辑
const asyncAction = (dispatch, getState) => {
    console.log('old state:', getState());
    setTimeout(() => {
        dispatch({ type: 'asyncAdd', data: 'some data.' });
    }, 2000);
}

store.dispatch(asyncAction);
// "old state:" 1

setTimeout(() => {
    console.log(store.getState());
}, 2000);
// 2 秒后输出：
// "some data."
```

需要**注意**的是，一些教程上（包括 Redux 官网）介绍 `Redux Thunk` 的用法时，仍然使用的 `Redux.applyMiddleware(ReduxThunk)` 写法，这是该工具 `1.x` 版本的写法，现在 `2.x` 版本需要加上 `.default`，即 `Redux.applyMiddleware(ReduxThunk.default)`，不然程序会出现问题；