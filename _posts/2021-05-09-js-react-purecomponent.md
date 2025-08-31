---
title: React 组件性能优化之 PureComponent 的使用
layout: post
categories: JavaScript
tags: react purecomponent 性能优化 组件
excerpt: 探究 React 中使用 PureComponent 的性能优化效果
---
在 React 类组件中，如果状态（`state`）发生变化，便会触发组件的重新渲染（执行 `render` 方法），并且是包括所有子组件在内的全部重渲染，无论某些子组件是否有用到 `state` 中的值；但有些时候部分子组件计算或渲染工作量较大，并且只做一些情况单一的展示工作，那么在更新状态时对其的渲染，便是额外的性能负担，所以需要寻求一些优化手段；


## shouldComponentUpdate

`shouldComponentUpdate` 是 React 的生命周期函数之一，它会在每次渲染（`render`）之前被调用，并且根据该函数的返回值（`true`/`false`）来决定是否调用渲染函数（`return true` 触发渲染，`return false` 阻止渲染），但是组件的首次渲染或者调用 `forceUpdate()` 方法时**不会**触发调用 `shouldComponentUpdate` 方法；该生命周期函数的**默认行为**是在每次 `state` 发生变化时触发重新渲染，如果自行声明该函数会**覆盖**这一默认行为，需要自行判断 `state` 的变化以决定是否重新渲染；

`shouldComponentUpdate` 方法接收两个传参：`(nextProps, nextState)`，分别表示变化后的 `props`（组件的参数） 和 `state`（组件的状态）；
```ts
class MyComponent extends React.Component {
  state = { count: 0 };

  shouldComponentUpdate(nextProps, nextState) {
    // 无需手动更新 state 值，组件会自动更新
    // this.setState({ ...nextState });

    if (nextState.count <= 3) {
      // count 值大于 3 后，组件便不再更新
      return true;
    } else {
      return false;
    }
  }

  render() {
    const { count } = this.state;
    return (
      <button onClick={() => this.setState({ count: count + 1 })}>
        {count}
      </button>
    );
  }
}
```


## PureComponent

`React.PureComponent` 类似于我们常用的 `React.Component`，区别在于 `PureComponent` 的内置 `shouldComponentUpdate` 逻辑，它会同时对 `props` 和 `state` 的变化前和变化后的值进行**浅对比**，如果都没发生变化则会跳过重渲染，相当于多了一层 `props` 对比；下面通过一个简单的例子来对比这两种组件的效果差异；

### 效果对比

假设有一个计数器，点击按钮增加计数，并用两种组件渲染计数值：
```ts
class Counter extends React.Component {
  state = { count: 0 };

  render() {
    const { count } = this.state;
    return (
      <div style={{ float: "right", textAlign: 'right' }}>
        <div>count: {count}</div>
        <CountText count={count > 2 ? count : 0} />
        <ConstText count={count > 2 ? count : 0} />
        <button onClick={() => this.setState({ count: count + 1 })}>Add</button>
      </div>
    );
  }
}

// 普通组件
class CountText extends React.Component {
  render() {
    const { count } = this.props;
    console.log('normal rendered', count);
    return <div>normal: {count}</div>;
  }
}

// “纯”组件
class ConstText extends React.PureComponent {
  render() {
    const { count } = this.props;
    console.log('pure rendered', count);
    return <div>pure: {count}</div>;
  }
}
```

初次渲染的效果图与输出如下，页面初始化时普通组件与纯组件都会进行一次渲染：

![1](https://img-blog.csdnimg.cn/20210509121150531.png)

第一次和第二次点击按钮后，可以看到都只有普通组件触发了渲染，即使组件每次接收的 `props` 值 `count` 都没有发生变化：

![2](https://img-blog.csdnimg.cn/20210509121240758.png)

![3](https://img-blog.csdnimg.cn/20210509125010295.png)

在第三次点击按钮后，由于 `props` 的传入值发生了改变，因此纯组件也触发了重渲染，页面内容正常更新：

![4](https://img-blog.csdnimg.cn/20210509125340917.png)


### 子组件更新问题

可以看到 `PureComponent` 确实可以在传入 `props` 值没有变化时避免重新渲染，在一些场景下优化性能，但是这也是使用 `PureComponent` 的一个前提，即需要组件在相同 `props` 传入值的情况下总会有相同的渲染内容，也就是纯组件中 `Pure` 的含义所在，它有些类似**纯函数**的定义（传入相同的参数执行后，总会得到相同的返回值）；

从另一个方面来说，就是 `PureComponent` 跳过渲染时，它的所有**子组件**也会跳过渲染，即使子组件应被更新，所以需要保证纯组件的所有子组件也都是纯组件；举个例子，下面的纯组件包含一个展示当前时间的子组件：
```ts
class Counter extends React.Component {
  state = { count: 0 };

  render() {
    const { count } = this.state;
    return (
      <div style={{ float: "right", textAlign: 'right' }}>
        <div>count: {count}</div>
        <ConstText count={count > 2 ? count : 0} />
        <button onClick={() => this.setState({ count: count + 1 })}>Add</button>
      </div>
    );
  }
}

// “纯”组件
class ConstText extends React.PureComponent {
  render() {
    const { count } = this.props;
    const d = new Date();
    const time = `${d.getHours()}: ${d.getMinutes()}: ${d.getSeconds()}`;
    console.log('pure rendered', count);

    return (
      <div>
        pure: {count}
        <ConstChild time={time} />
      </div>
    );
  }
}

// 展示时间的子组件
class ConstChild extends React.Component {
  render() {
    const { time } = this.props;
    console.log('child rendered', time);
    return <div>{time}</div>
  }
}
```

页面初始化时：

![5](https://img-blog.csdnimg.cn/20210509133437250.png)

前两次点击按钮后：

![6](https://img-blog.csdnimg.cn/20210509133505131.png)

![7](https://img-blog.csdnimg.cn/20210509133522526.png)

此时纯组件和其子组件都未触发更新，在第三次点击后，才同时触发更新：

![8](https://img-blog.csdnimg.cn/20210509133559596.png)


### 浅对比问题

最开始有提到 `PureComponent` 是对 `props` 的变化前后的值进行浅对比来决定是否重渲染组件，实际上就是对每个 `props` 值进行基本的值对比，如果值类型是复杂类型，如引用类型（对象），并不会深入遍历每个属性的变化，下面改造一下上面的示例，让传入纯组件的 `props` 变成一个引用对象：
```ts
class Counter extends React.Component {
  state = { count: 0 };
  obj = { num: [0] };

  handleAdd() {
    const newCount = this.state.count + 1;
    this.setState({ count: newCount });
    this.obj.num[0] = newCount;
  }

  render() {
    const { count } = this.state;
    console.log('Counter rendered', count, JSON.stringify(this.obj));

    return (
      <div style={{ float: "right", textAlign: 'right' }}>
        <div>count: {count}</div>
        <ConstText count={this.obj} />
        <button onClick={() => this.handleAdd()}>Add</button>
      </div>
    );
  }
}

class ConstText extends React.PureComponent {
  render() {
    const { count: { num: [count] } } = this.props;
    console.log('pure rendered', count);
    return <div>pure: {count}</div>;
  }
}
```

首次初始化后的结果：

![9](https://img-blog.csdnimg.cn/20210509140040488.png)

依次点击三次后的结果：

![10](https://img-blog.csdnimg.cn/20210509140105603.png)

![11](https://img-blog.csdnimg.cn/20210509140144675.png)

![12](https://img-blog.csdnimg.cn/2021050914021458.png)

可以看到其实每次传入纯组件的 `props` 的实际值都有发生变化，但是由于是引用类型，所以组件并没有识别到这一变化，永远跳过了组件更新；因此如果遇到复杂数据结构的情况，尽量使用 `state`，因为 `state` 由于自身的特性和规则，每次变化后的值都是一个全新的值；

当然，还有一种特殊情况，如果在组件中使用了 **Render prop** 或类似的形式，即 `props` 的值是一个返回某个值的函数，如：
```ts
<Counter count={() => 3} />
```

那么即使每次函数实际执行的值都是相同的，也都会触发渲染，因为这个函数本身每次都会被判断为一个**新值**，使得性能优化**失效**；


## React.memo

`React.memo` 是一个类似 `PureComponent` 的高阶组件，只不过它用于**函数组件**，而 `PureComponent` 用于类（`class`）组件，但二者的实际展示与优化效果是一致的，下面是两种组件形式的写法：
```ts
// 类组件
class ConstText1 extends React.PureComponent {
  render() {
    const { count } = this.props;
    console.log('pure rendered', count);
    return <div>pure: {count}</div>;
  }
}

// 函数组件
const ConstText2 = React.memo(function(props) {
  const { count } = props;
  console.log('const rendered', count);
  return <div>{count}</div>
});
```