---
title: 记一次 React 组件无法更新状态值的问题分析与解决
layout: post
categories: JavaScript
tags: react state getter setter 状态
excerpt: 记录一次React组件中变量绑定state无法正常更新值的问题分析与解决过程
---
## 问题

React 组件中通过直接声明的元素变量（`jsx` 写法），在访问 `state` 中指定的状态值时，如果状态发生改变，使用状态值的元素内容无法得到相应更新；

下面的例子中，直接在 class 组件中声明元素变量 `myDiv`，并且需要访问 `this.state` 中的数据，最终对状态值进行展示，按钮用于改变状态值：
```jsx
import React from 'react';

class App extends React.Component {
  state = {
    msg: 'hello',
  };
  
  myDiv = <div>{this.state.msg}</div>;
  
  handleClick() {
    this.setState({
      msg: 'world',
    })
  }
  
  render() {
    return (
      <>
        <div>{this.myDiv}</div>
        <button onClick={() => this.handleClick()}>
          change
        </button>
      </>
    );
  }
}

export default App;
```

按理说点击按钮后，状态发生改变（`this.state.msg`），页面的值会发生相应更新，但是页面内容并未发生相应改变，这其实是一个微小的细节问题，下面对其进行展开分析；

## 分析

上例中，在组件中直接声明了值为元素的一个变量 `myDiv`，并且其内容调用了状态值（`this.state.msg`），其实该变量在声明时状态内容直接被赋予了 `this.state.msg` 的**当前值**，并非想象中的**引用值**，然后状态改变（`this.setState()`）时，React 会重新调用组件的 `render()` 方法，重新渲染组件内容，但是此时该变量中的状态值仍是之前被赋予的字面值，不会再访问一次当前的 `state`，所以其值最终也就不会发生相应的改变；

并且在一般的写法中，涉及访问状态的逻辑（如 `{this.state.msg}`）一般都写在整个 `render()` 方法之中，这样每次状态的改变导致 `render` 方法重新执行，使得重新执行获取状态的逻辑，就能每次都访问到最新的状态值了；但有时又很难避免在复用组件时在 `render` 方法以外的地方访问 `state`，并期望数据被动态改变，这里就需要寻求其他解决方案；

## 解决方案

### 方法一

我们可以使用 `getter` 方式来声明变量，`getter/setter` 方法是声明对象属性的一种方式，可以实现该对象指定属性的属性值的访问控制（`getter`）以及修改控制（`setter`），下面是一个简单的使用示例：
```js
var obj = {
    num: 1,
    get a() {
        return this.num;
    }
    set b(n) {
        this.num = n;
    }
}

console.log(obj.a); // 1

obj.b = 2;
console.log(obj.a); // 2
```

`getter` 声明的属性的特点是，每次调用对象的该属性，都会执行一次 `getter` 函数内的逻辑，然后返回 `return` 的值；所以如果把之前组件中的 `myDiv` 属性以 `get` 方式进行声明，这样每一次状态改变后，`render()` 方法重新执行，然后就会涉及对该变量的访问，导致重新执行 `getter` 方法中的逻辑，最后就能访问到改变后的状态值（`this.state.msg`），页面也就相应地更新了；

改造后的组件代码：
```jsx
import React from 'react';

class App extends React.Component {
  state = {
    msg: 'hello',
  };
  
  get myDiv() {
    return <div>{this.state.msg}</div>;  
  } 
  
  handleClick() {
    this.setState({
      msg: 'world',
    })
  }
  
  render() {
    return (
      <>
        <div>{this.myDiv}</div>
        <button onClick={() => this.handleClick()}>
          change
        </button>
      </>
    );
  }
}

export default App;
```

### 方法二

类似使用 `getter` 的思路，为了让每次状态改变，用到状态的变量也发生相应的更新，另一种方法就是将变量 `myDiv` 声明为**函数**类型，同样也能使每次获取变量时都重新执行一次获取状态的逻辑，以获取最新状态值，改造后代码如下：
```jsx
import React from 'react';

class App extends React.Component {
  state = {
    msg: 'hello',
  };
  
  myDiv = () => <div>{this.state.msg}</div>;
  // 或者是：
  // myDiv() { return <div>{this.state.msg}</div> };
  
  handleClick() {
    this.setState({
      msg: 'world',
    })
  }
  
  render() {
    return (
      <>
        <div>{this.myDiv()}</div>
        <button onClick={() => this.handleClick()}>
          change
        </button>
      </>
    );
  }
}

export default App;
```

不同之处就是每次调用变量 `myDiv` 时需要使用函数式调用（后面加一对括号），为了方便多处调用，显然方法一更有优势；