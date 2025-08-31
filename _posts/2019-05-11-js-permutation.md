---
title:  JavaScript 实现元素全排列
layout: post
categories: JavaScript
tags: 全排列
excerpt: JavaScript 实现不同元素的全排列情况
---
# 排列 (Permutation / Arrangement)

## 概念
n 个不同元素中任意选取 m (m <= n) 个元素进行排列，所有排列情况的个数叫做 **排列数**，其值等于：
```
A = n! / (n - m)!
```

`!` 表示数学中的阶乘运算符，可以通过以下函数实现：
```js
function factorial(n) {
    if (n === 0 || n === 1) {
        return 1;
        
    } else if (n < 0) {
        return null;
        
    } else {
        return n * factorial(n - 1);
    }
}

console.log(factorial(4)); // 24
```

当 n = m 时，称为 **全排列**，其值等于：
```    
A = n!
```    

全排列相当于将**所有元素**进行排序，得到所有不同顺序情况的个数；

## 分析

利用阶乘函数，通过上述数学公式只能得到所有情况的个数值，不容易得到具体的每种情况，要获取每种情况的输出值的话需要另寻他法；

用数组举例分析：
```
全排列：

    [1, 2, 3] => [              
                    [1, 2, 3], 
                    [1, 3, 2], 
                    [2, 1, 3], 
                    [2, 3, 1], 
                    [3, 1, 2], 
                    [3, 2, 1]
                 ]
                
                共 6 种情况

    树状图表示：
    
      1       2       3
     / \     / \     / \
    2   3   1   3   1   2
    |   |   |   |   |   |
    3   2   3   1   2   1   =>  6 

3 个元素中选取 2 个时：(n = 3, m = 2)

    [1, 2, 3] => [              
                    [1, 2], 
                    [1, 3], 
                    [2, 1], 
                    [2, 3], 
                    [3, 1], 
                    [3, 2]
                 ]
                
                共 6 种情况
    
    树状图表示：
    
      1       2       3
     / \     / \     / \
    2   3   1   3   1   2   =>  6

```

## 实现

```js
let arr = [1, 2, 3];

/*
参数 a 为输入数组，
元素个数 n 为 a 的长度，
选取个数为 m；
*/
function permutation(a, m) {

    // 保存最终输出结果
    let result = [];
    
    // 定义 m 值默认等于 n，即全排列
    let n = a.length;
    m = m || n;
    
    // 定义递归函数保存结果到数组中
    // _a 为输入数组，
    // tmpResult 为保存单个情况结果的数组
    function recur(_a, tmpResult = []) {
        if (tmpResult.length === m) {
        
            // 结果达到 m 个时保存结果，
            // 停止递归并进入下一次遍历
            result.push(tmpResult);
            
        } else {
            for (let i = 0; i < _a.length; i++) {
                
                // 复制一份输入数组，防止引用值被改变
                let tmpA = _a.concat();
            
                // 复制一份保存结果的数组，防止每次遍历相互影响
                let _tmpResult = tmpResult.concat();
                
                // 保存当前遍历值
                _tmpResult.push(tmpA[i]);
                
                // 删除当前遍历值，传递参数进入下一层递归
                tmpA.splice(i, 1);
                recur(tmpA, _tmpResult);
            }
        }
    }
    
    // 开始执行递归，然后返回最后结果
    recur(a);
    return result;
}

console.log(permutation(arr));
// 3 个数全排列：
/*
[              
    [1, 2, 3], 
    [1, 3, 2], 
    [2, 1, 3], 
    [2, 3, 1], 
    [3, 1, 2], 
    [3, 2, 1]
]
*/

console.log(permutation(arr, 2));
// 3 个数中选取 2 个数排列：
/*
[              
    [1, 2], 
    [1, 3], 
    [2, 1], 
    [2, 3], 
    [3, 1], 
    [3, 2]
]
*/
```

最终实现函数就是 `permutation(a, m)`，其中参数 `a` 为输入数组，包含需要排列的所有元素，参数 `m` 为选取需要排列的个数，默认等于输入数组的长度，即默认全排列，注意 `m` 不能大于元素个数；

## 拓展

以上函数输出值为一个二维数组，如果需要便于观察，输出一个一维数组，可以定义一个合并函数：
```js
function merge(arr) {
    return arr.map(x => x.join(''));
}

let result = merge(permutation([1, 2, 3]));
console.log(result);
// [123, 132, 213, 231, 312, 321]
```