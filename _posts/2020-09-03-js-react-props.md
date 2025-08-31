---
title: React 组件间传值的几种情形
layout: post
categories: JavaScript
tags: react 组件 props ref context
excerpt: 举例介绍 React 中组件间传值的几种情景
---
## 父级传向子级

这应该是最常见的一种场景，通过在子组件上写 `props`，将数据从父组件中传递到子组件，子组件再从 `this.props` 中获取相应的值，这样可以根据传入值的不同返回不同的状态，即实现组件的复用；例如：
```jsx
import React from 'react';

// 父组件
class Parent extends React.Component {
    message = 'Hello world!';

    render() {
        return (
            <Child myProp={this.message} />
        );
    }
}

// 子组件
class Child extends React.Component {
    message = this.props.myProp;

    render() {
        // Hello world!
        return (
            <div>{this.message}</div>
        );
    }
}

export default Parent;
```

### 多层传值

上述方法只用于单层数据传递，即父级传向子级，如果子级又存在子级，甚至向下递推，那么父组件要传值给后代组件，就要逐层向下传递，类似下面的情况：
```jsx
import React from 'react';

class Parent extends React.Component {
    render() {
        return <Child myProp="hello" />
    }
}

class Child extends React.Component {
    render() {
        return <Grandchild myProp1={this.props.myProp} />
    }
}

class Grandchild extends React.Component {
    render() {
        // hello
        return <div>{this.props.myProp1}</div>
    }
}

export default Parent;
```

如果层数再多一些就是书写噩梦了，所以 React 提供了 `context` 机制，解决了深层传值的问题，现在来改造上面的代码：
```jsx
import Reac from 'react';

// 首先需要创建一个自定义 context
// 该方法接收一个参数作为 context 的默认值
const myContext = React.createContext();
// 获取包裹组件，用于包裹需要应用 context 的组件
const { Provider } = myContext;

class Parent extends React.Component {
    value = {
        message: 'hello',
    };
    
    render() {
        // 通过包裹器的 value 属性向下传递指定值
        return (
            <Provider value={this.value}>
                <Child />
            </Provider>
        );
    }
}

class Child extends React.Component {
    render() {
        return <Grandchild />
    }
}

class Grandchild extends React.Component {
    // 在需要获取祖代传递的 context 值的后代组件中，
    // 声明 contextType 静态属性，值为之前创建的 context;
    static contextType = myContext;
    
    render() {
        // 最后使用 this.context 就能获取到之前
        // 在 Provider 中传入的 value 值；
        return <div>{this.context.message}</div>
        // hello
    }
}

export default Parent;
```

需要注意的是，由于提供方和调用方需要使用同一个使用 `React.createContext()` 创建的 `context`，所以如果父组件和要调用 context 的子组件不在同一个文件中的话，则需要考虑通过 `export` 和 `import` 来实现引用，但是这样组件间的耦合度又增加了一层，React 官方建议使用 **组合** 方式取代上述的 **继承** 方式，下面再次对上述代码进行改造：
```jsx
import React from 'react';

class Parent extends React.Component {
    value = {
        message: 'hello',
    };

    render() {
        return (
            <Child>
                {this.value.message}
            </Child>
        );
    }
}

class Child extends React.Component {
    render() {
        // this.props.children 会指向父组件在子组件中嵌入的数据或组件
        return (
            <div>{this.props.children}</div>
        );
    }
}

export default Parent;
```


## 子级传向父级

React 中似乎没有提供子级向父级直接传值，类似 `props` 的方法或途径，可以通过一些间接手段实现，开发中常见的处理方式就是子组件调用父组件通过 `props` 传入的处理函数，对需要传递的值进行处理；例如：
```jsx
import React from 'react';

class Parent extends React.Component {
    state = {
        message: '',
    };
    
    handleMsg(msg) {
        this.setState({
            message: msg,
        });
    }
    
    render() {
        // Hello
        return (
            <>
                {this.state.message}
                <Child 
                    onMsg={(msg) => this.handleMsg(msg)}
                />
            </>
        );
    }
}

class Child extends React.Component {
    handleClick() {
        this.props.onMsg('Hello');
    }

    render() {
        return (
            <button
                onClick={() => this.handleClick()}
            >Clike me</button>
        );
    }
}

export default Parent;
```

简单梳理一下流程：
- 父组件提前声明数据处理逻辑，该方法接收传入的值，然后进行相应处理；
- 父组件将该方法通过 props 传递给子组件；
- 子组件触发一些行为，得到了将要传递给父组件的值；
- 子组件通过 `this.props` 调用父组件传入的处理函数，并将要传递的值作为该函数的参数；
- 处理函数开始执行，由于其是在父组件的作用域中声明的，所以也能访问父组件中的一些数据，比如 `state`，相当于在父组件中处理子组件传入的数据；
- 处理函数更新 state 状态值，随后其他访问该 state 的地方也会随即更新；


## 同级间传递

### 状态提升

这是 React 官网提到的一个概念，即多个组件都在重复使用同一个状态值，可以将这个值 **提升** 至父组件中保存，相当于数据复用；当然如果想实现一个子组件向另一个子组件传值，也可以通过父组件这层“媒介”；下面举例说明：
```jsx
import React from 'react';

class Parent extends React.Component {
    state = {
        msg: 'hello',
    }
    
    handleChangeMsg(msg) {
        this.setState({
            msg: msg,
        });
    }
    
    render() {
        return (<>
            <ChildLabel msg={this.state.msg} />
            <ChildButton
                onChangeMsg={(msg) => this.handleChangeMsg(msg)}
            />
        </>);
    }
}

class ChildLabel extends React.Component {
    render() {
        return <span>{this.props.msg}</span>
    }
}

class ChildButton extends React.Component {
    render() {
        return (
            <button
                onClick={() => this.props.onChangeMsg('world')}
            >Change</button>
        )
    }
}

export default Parent;
```

这样在页面中点击子组件 `<ChildButton />` 中的按钮时，子组件 `<ChildLabel />` 中的文本便会发生相应变化，成功获取传入的值；这里的操作相当于子组件先向父组件传值，使得父组件状态变化，然后使用该状态的另一子组件就会相应地变化；

### Refs

`Refs` 是 React 提供的另一种机制，React 中典型数据流是通过 `props` 传递，而 refs 则相当于提供了直接操纵组件或 DOM 元素的一种途径，强制修改元素；因此官网也建议避免过度使用 refs，防止应用变得难以理解或“失控”；下面通过举例简单说明其用法：
```jsx
import React from 'react';

class Parent extends React.Component {
    // 首先需要声明 ref
    myRef = React.createRef();
    
    handleClick(msg) {
        // 通过 ref 的 current 属性实现对该元素的引用，
        // 然后就能想操作正常 DOM 一样实现控制；
        this.myRef.current.innerText = msg;
    }
    
    render() {
        // 对需要被引用的元素使用 ref 属性，值为之前所创建的 ref
        return (<>
            <span ref={this.myRef}>hello</span>
            <button
                onClick={() => this.handleClick('world')}
            >Change</button>
        </>);
    }
}

export default Parent;
```

在页面上点击按钮后，前面的文本同样会发生改变，即 DOM 元素的元素属性 `innerText` 值被成功修改，如需使用其他原生属性或方法同理；

### Refs 转发

虽然 `Refs` 提供了直接访问组件或元素的途径，但是它却访问不了**组件中的组件**，这是 React 层故意为之，隐藏组件实现细节与渲染结果，防止组件的 DOM 结构被过度依赖；但有一些特殊情况下确实需要访问组件内部的组件的话，React 也提供了另外一种机制，即 **Refs 转发（Refs Forwarding）**；顾名思义，组件 A 不能直接使用 `ref` 访问组件 B 中的组件 C，但是可以通过组件 B 转发 `ref` 给组件 C，这里改造一下上面 `Refs` 中的例子，我们在 `<Parent />` 和 `<span>` 之间再加一层组件，再实现对其的操作：
```jsx
class Parent extends React.Component {
    myRef = React.createRef();
    
    handleClick(msg) {
        this.myRef.current.innerText = msg;
    }
    
    render() {
        // 对子组件正常使用 ref
        return (
            <Child
                ref={this.myRef}
                handleClick={this.handleClick.bind(this)}
            />
        );
    }
}

// 使用 React.forwardRef 方法转发 ref 给下一层组件
const Child = React.forwardRef((props, ref) => {
    return (<>
        <span ref={ref}>hello</span>
        <button
            onClick={() => props.handleClick('world')}
        >Change</button>
    </>);
});
```

Refs 转发需要使用 `React.forwardRef()` 方法创造组件，该方法接收一个回调函数做为参数，该回调函数接收两个入参，第一个是传进组件的 `props`，第二个是传进组件的的 `ref`，通过内部逻辑决定 `ref` 再转发给谁，回调函数的返回值是最终生成的组件；页面加载组件后，点击按钮，就能像直接使用 `ref` 一样改变展示的文本值了；