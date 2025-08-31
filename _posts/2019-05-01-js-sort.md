---
title:  JavaScript 之常见算法排序
layout: post
categories: JavaScript
tags: 算法排序
excerpt: JavaScript 实现冒泡、选择、插入、快速、归并排序
---
# 冒泡排序

冒泡排序即数组从头到尾，依次比较相邻两数的大小，不符合顺序则交换位置，一直循环直到排序完成。如果是升序排序，那么每一轮的一系列比较和交换之后，最大那个数一定会被排到最后（不信可以动手验证一下），可以理解为**冒泡**到最后，这样每一轮的最大那个数都冒到最后，所以每一轮需要比较的总数都在减少，直到剩一个数为止，序列就有序了，降序也是同样的道理；
```js
// 输入值 _arr 为需要排序的数组，返回一个有序新数组
function bubbleSort(_arr) {
    var arr = _arr.concat();
    var len = arr.length;
    for (var i = len - 1; i > 0; i--) {
        for (var j = 0; j < i; j++) {
            if (arr[j] > arr[j + 1]) {
                let tmp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = tmp;
            }
        }
    }
    return arr;
}
```

# 选择排序

选择排序即从数组第一个数到倒数第二个数，分别与后面的数中的选出的最值（升序就是最小值）进行比较，满足条件（升序就是大于最小值）就交换位置，然后完成排序。这里可以理解为先**选择**出最小值，然后与前面的数进行比较和交换，就不用像冒泡那样挨个比较和交换了；另外，这里为了交换方便，记录的最值其实是该值在数组中的**索引**，而不是实际值；
```js
function selectSort(_arr) {
    var arr = _arr.concat();
    var len = arr.length;
    for (var i = 0; i < len - 1; i++) {
        var minIdx = i;
        for (var j = i + 1; j < len; j++) {
            if (arr[j] < arr[minIdx]) minIdx = j;
        }
        // 如果当前值已经是最小值，就可以不用交换，
        // 避免浪费时间
        if (minIdx !== i) {
            var tmp = arr[i];
            arr[i] = arr[minIdx];
            arr[minIdx] = tmp;
        }
    }
    return arr;
}
```

# 插入排序

插入排序即从第二个到最后一个数，分别与排在前面的有序序列（第一轮该序列只有一个数，肯定是有序的，之后每一轮结束这个有序序列都会增加）中的每个数进行比较，然后**插入**合适的位置使其有序，直到最后一个数插入时完成排序；
```js
function insertSort(_arr) {
    var arr = _arr.concat();
    var len = arr.length;
    for (let i = 1; i < len; i++) {
        // 先将插入值（当前值）备份，方便后续插入操作
        let tmp = arr[i];
        // 插入值在有序序列中从右向左比较
        for (let j = i; j > 0; j--) {
            // 下面就是“插入”操作的实现：
            // 如果插入值小于比较值（j-1），则将前面的数向后挪一位，
            // 这样就可以把被插入的空间留出来了，并且在不断向前移动
            if (tmp < arr[j - 1]) {
                arr[j] = arr[j - 1];
            // 如果插入值大于或等于比较值，则把插入值放到这个比较值的后面
            // 也就是之前留出来的插入空间
            } else {
                arr[j] = tmp;
                break;
            }
        }
    }
    return arr;
}
```

# 快速排序

快速排序在数组中任选一个数（下面选第一个数）作中间值，然后将余下的数分别与其比较，比中间值小则放到左边，否则放右边，然后再进行递归，将放在左边和右边的数组分别作为新数组进行同样的排序操作，直到数组不能再分，最后将所有排序结果合并；这里**快速**可以理解为整个操作过程相比于其他方法简单快捷，找好任一个中间值后便将剩下的数挨个放入其左或右，而不用管左右数组是否有序，直到递归完成就整体有序了，至于排序是否快速就要看情况了；
```js
// 方法一：
function quickSort(arr) {
    let len = arr.length;
    if (len < 2) {
        return arr;
    } else {
        let mid = arr[0], // 基准（中间值）
            left = [], // 放到基准左边的数
            right = []; // 放到基准右边的数
        for (let i = 1; i < len; i++) {
            if (arr[i] < mid) {
                left.push(arr[i]);
            } else {
                right.push(arr[i]);
            }
        }
        // 递归分割下去，不能分割时合并左中右数组返回
        return quickSort(left).
            concat(mid).
            concat(quickSort(right));
    }
}

// 方法二：
function quickSort(arr) {
    let len = arr.length;
    if (len < 2) {
        return arr;
    } else {
        let midIdx = 0; // 基准值的索引
        // 这里执行的就是把值放入基准左边还是右边的操作
        for (let i = 1; i < len; i++) {
            // 由于基准是第一个数，并且是从左向右遍历，
            // 所以后面的遍历值如果小于基准就先删除再 unshift 到最前面，
            // 这样就实现了“放到左边”，
            // 如果大于或等于基准就不用管，也就“放到右边”了；
            if (arr[i] < arr[midIdx]) {
                arr.unshift(arr.splice(i, 1)[0]);
                midIdx++;
            }
        }
        
        return quickSort(arr.slice(0, midIdx)).
            concat(arr[midIdx]).
            concat(quickSort(arr.slice(midIdx + 1)));
    }
}

// 经测试方法一比方法二快一些，数组越大相差倍数数量级也越大。
// 显而易见方法一在空间上消耗不少，所以在时间上占优势；
```

# 归并排序

归并排序**递归**地将数组分割为两个部分（左数组与右数组），直到不能再分，然后再定义一个合并函数，负责**递归**地将两部分合并为一个有序数组作为返回值；合并函数其实会是合并两个有序的数组，合并方法便是分别将两数组第一个数取出（删除）放入返回数组中，至于两个数先放哪一个，可以通过比较大小来确定；所以这里的**归并**可以理解为递**归**地合**并**为一个有序序列；
```js
function mergeSort(arr) {
    if (arr.length < 2) {
        // 不能再分时返回数组，执行之后的合并操作
        return arr;
    } else {
        // 将数组分割成两部分
        let mid = Math.ceil(arr.length / 2);
        let left = arr.slice(0, mid);
        let right = arr.slice(mid);
        // 递归地合并每次分割的左右数组
        return merge(mergeSort(left), mergeSort(right));
    }
}
// 把左右数组合并为一个有序数组的函数
function merge(left, right) {
    let result = [];
    let len = left.length + right.length;
    for (let i = 0; i < len; i++) {
         // 分割后左数组为空的情况
        if (!left[0]) {
            result.push(right.shift());
        // 右数组为空
        } else if (!right[0]) {
            result.push(left.shift());
        // 左右数组都不为空
        } else {
            // 较小的元素优先放入
            if (left[0] < right[0]) {
                result.push(left.shift());
            } else {
                result.push(right.shift());
            }
        }
        // 不存在左右数组都为空的情况，因为总循环次数为 len
        // 所以左右数组都空之前已经停止循环了
    }
    return result;
}
```