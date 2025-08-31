/**
 * 个性化展示个人介绍功能实现
 * Copyright (C) 2020 knightyun. <https://github.com/knightyun/knightyun.github.io/assets/js/about.js>
 */

var elTypingText = document.querySelector('.typing-text');
var typingTextArr = elTypingText.innerText.split(',').map(x => x.trim());

elTypingText.innerHTML = '';
elTypingText.classList.remove('hidden');

var options = {
	el: elTypingText,
	textArr: typingTextArr,
	typeInterval: 200,
	delInterval: 200,
	typeDelInterval: 1500,
	textInterval: 0,
	cycleTimes: -1,
	isRandom: true
}

typeDeleteTextArr(options);

// 按指定时间间隔打印和删除一组单词
//
// Options         | Type      | Description
//===========================================================================
// el              | 'node'    | 操作的元素
// textArr         | 'array'   | 一组要打印和删除的文本
// typeInterval    | 'number'  | 打印单个字符时间间隔
// delInterval     | 'number'  | 删除单个字符时间间隔
// typeDelInterval | 'number'  | 打印与删除之间的时间间隔
// textInterval    | 'number'  | 操作每条文本的时间间隔
// cycleTimes      | 'number'  | 循环操作文本组的次数( > 0 )，<= 0 表示无限循环
// isRandom        | 'boolean' | 是否乱序操作文本组
async function typeDeleteTextArr(options) {
	// 判断循环次数
	var isInfiniteLoop = options.cycleTimes > 0 ? false : true;

	while (isInfiniteLoop || options.cycleTimes) {
		// 判断文本数组是否乱序
		if (options.isRandom)
			options.textArr.sort(() => Math.random() - 0.5);

		for (let i = options.textArr.length; i > 0; i--) {
			var _options = {
				el: options.el,
				text: options.textArr[i - 1],
				typeInterval: options.typeInterval,
				delInterval: options.delInterval,
				typeDelInterval: options.typeDelInterval
			}
			// 打印和删除单条文本
			await typeDeleteText(_options);
			// 每组单词的时间间隔
			await new Promise(res => setTimeout(res, options.textInterval));
		}

		options.cycleTimes--;
	}
}

// 按指定时间间隔打印和删除单词
//
// Options         | Type     | Description
//======================================================
// el              | 'node'   | 操作的元素
// text            | 'array'  | 一组要打印和删除的文本
// typeInterval    | 'number' | 打印单个字符的时间间隔
// delInterval     | 'number' | 删除单个字符的时间间隔
// typeDelInterval | 'number' | 打印与删除之间的时间间隔
async function typeDeleteText(options) {
	// 打印单词
	await typingText(options.el, options.text, options.typeInterval);
	// 打印与删除操作的时间间隔
	await new Promise(res => setTimeout(res, options.typeDelInterval));
	// 删除单词
	await deletingText(options.el, options.delInterval);
}

// 按指定时间间隔打印单词
async function typingText(el, text, typeInterval) {
	var words = text.split('');
	var len = words.length;
	// 清空元素
	el.innerHTML = '';
	// 创建光标
	var cursor = document.createElement('span');
	el.appendChild(cursor);

	for (let i = 0; i < len; i++) {
		var elWord = document.createTextNode(words[i]);
		el.insertBefore(elWord, cursor);
		cursor.className = 'word-typing';

		// 延时后进入下次循环
		await new Promise(res => setTimeout(res, typeInterval));
	}
	// 光标闪烁
	cursor.className = 'word-waiting';
}

// 按指定时间间隔删除单词
async function deletingText(el, delInterval) {
	// 创建光标
	var cursor = document.createElement('span');
	var len = el.innerText.length;
	
	// for (let i = len; i > 0; i--) {
	for (let i = 0; i < len; i++) {
		// 删除中停止闪烁光标
		cursor.className = 'word-typing';
		// 删除最后一个字符以及光标
		el.innerText = el.innerText.slice(0, -1);
		el.appendChild(cursor);

		// 延时指定时间后进入下次循环
		await new Promise(res => setTimeout(res, delInterval));
	}
	// 光标闪烁
	cursor.className = 'word-waiting';
}