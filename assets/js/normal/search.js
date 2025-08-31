/**
 * 网站文章内容搜索功能实现
 * Copyright (c) 2020 knightyun. <https://github.com/knightyun/knightyun.github.io/assets/js/search.js>
 * @todo 多关键词搜索
 */

// 获取搜索框、搜索按钮、清空搜索、结果输出对应的元素
var elSearchBox = document.querySelector(".search"),
    elSearchBtn = document.querySelector(".search-start"),
    elSearchClear = document.querySelector(".search-clear"),
    elSearchInput = document.querySelector(".search-input"),
    elSearchResults = document.querySelector(".search-results");

// 声明保存文章的标题、链接、内容的数组变量
var searchValue = "",
    arrItems = [],
    arrContents = [],
    arrLinks = [],
    arrTitles = [],
    arrResults = [],
    indexItem = [],
    itemLength = 0;
var tmpDiv = document.createElement("div"),
    tmpAnchor = document.createElement("a");
var isSearchFocused = false;

// ajax 的兼容写法
var xhr = new XMLHttpRequest() || new ActiveXObject("Microsoft.XMLHTTP");

// 获取根目录下 feed.xml 文件内的数据
xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
        var xml = xhr.responseXML;
        if (!xml) return;

        arrItems = xml.getElementsByTagName("item");
        itemLength = arrItems.length;

        // 遍历并保存所有文章对应的标题、链接、内容到对应的数组中
        // 同时过滤掉 HTML 标签
        for (i = 0; i < itemLength; i++) {
            arrContents[i] = arrItems[i]
                .getElementsByTagName("description")[0]
                .childNodes[0].nodeValue.replace(/<.*?>/g, "");
            arrLinks[i] = arrItems[i]
                .getElementsByTagName("link")[0]
                .childNodes[0].nodeValue.replace(/<.*?>/g, "");
            arrTitles[i] = arrItems[i]
                .getElementsByTagName("title")[0]
                .childNodes[0].nodeValue.replace(/<.*?>/g, "");
        }

        // 内容加载完毕后显示搜索框
        elSearchBox.style.display = "block";
    }
};
xhr.open("get", "/feed.xml", true);
xhr.send();

// 绑定按钮事件
elSearchBtn.onclick = searchConfirm;
elSearchClear.onclick = searchClear;

// 输入框内容变化后就开始匹配，可以不用点按钮
// 经测试，onkeydown, onchange 等方法效果不太理想，
// 存在输入延迟等问题，最后发现触发 input 事件最理想，
// 并且可以处理中文输入法拼写的变化
elSearchInput.oninput = function () {
    setTimeout(searchConfirm, 0);
};
elSearchInput.onfocus = function() {
    isSearchFocused = true;
}
elSearchInput.onblur = function() {
    isSearchFocused = false;
}

/** 搜索确认 */
function searchConfirm() {
    if (elSearchInput.value == "") {
        searchClear();
    } else if (elSearchInput.value.search(/^\s+$/) >= 0) {
        // 检测输入值全是空白的情况
        searchInit();
        var itemDiv = tmpDiv.cloneNode(true);
        itemDiv.innerText = "请输入有效内容...";
        elSearchResults.appendChild(itemDiv);
    } else {
        // 合法输入值的情况
        searchInit();
        searchValue = elSearchInput.value;
        // 在标题、内容中匹配搜索值
        searchMatching(arrTitles, arrContents, searchValue);
    }
}

/** 搜索清空 */
function searchClear() {
    elSearchInput.value = "";
    elSearchClear.style.display = "none";
    elSearchResults.style.display = "none";
    elSearchResults.classList.remove("result-item");
}

/** 每次搜索完成后的初始化 */
function searchInit() {
    arrResults = [];
    indexItem = [];
    elSearchResults.innerHTML = "";
    elSearchClear.style.display = "block";
    elSearchResults.style.display = "block";
    elSearchResults.classList.add("result-item");
}

/**
 * 匹配搜索内容
 * @param {string[]} arrTitles   - 所有文章标题
 * @param {string[]} arrContents - 所有文件内容
 * @param {string}   input       - 搜索内容
 */
function searchMatching(arrTitles, arrContents, input) {
    var inputReg;

    try {
        // 转换为正则表达式，忽略输入大小写
        inputReg = new RegExp(input, "i");
    } catch (_) {
        var errorInputDiv = tmpDiv.cloneNode(true);

        errorInputDiv.innerHTML =
            '正则表达式语法错误，特殊符号前考虑加上转义符："&Backslash;"';
        errorInputDiv.className = "pink-text result-item";
        elSearchResults.appendChild(errorInputDiv);
        return;
    }

    // 在所有文章标题、内容中匹配搜索值
    for (i = 0; i < itemLength; i++) {
        var titleIndex = arrTitles[i].search(inputReg);
        var contentIndex = arrContents[i].search(inputReg);
        var resultIndex, resultArr;

        if (titleIndex !== -1 || contentIndex !== -1) {
            // 优先搜索标题
            if (titleIndex !== -1) {
                resultIndex = titleIndex;
                resultArr = arrTitles;
            } else {
                resultIndex = contentIndex;
                resultArr = arrContents;
            }

            // 保存匹配值的索引
            indexItem.push(i);

            var len = resultArr[i].match(inputReg)[0].length;
            var step = 10;

            // 将匹配到内容的地方进行黄色标记，并包括周围一定数量的文本
            arrResults.push(
                resultArr[i].slice(resultIndex - step, resultIndex) +
                    "<mark>" +
                    resultArr[i].slice(resultIndex, resultIndex + len) +
                    "</mark>" +
                    resultArr[i].slice(
                        resultIndex + len,
                        resultIndex + len + step
                    )
            );
        }
    }

    // 输出总共匹配到的数目
    var totalDiv = tmpDiv.cloneNode(true);

    totalDiv.className = "result-title";
    totalDiv.innerHTML = "总匹配：<b>" + indexItem.length + "</b> 项";
    elSearchResults.appendChild(totalDiv);

    // 未匹配到内容的情况
    if (indexItem.length == 0) {
        var noneItemDiv = tmpDiv.cloneNode(true);

        noneItemDiv.innerText = "未匹配到内容...";
        noneItemDiv.className = "teal-text text-darken-3 result-item";
        elSearchResults.appendChild(noneItemDiv);
    }

    // 将所有匹配内容进行组合
    for (i = 0; i < arrResults.length; i++) {
        var itemDiv = tmpDiv.cloneNode(true);
        var itemTitleDiv = tmpDiv.cloneNode(true);
        var itemDetailDiv = tmpDiv.cloneNode(true);
        var itemDetailDivAnchor = tmpAnchor.cloneNode(true);

        itemDiv.className = "card hoverable result-item";
        itemTitleDiv.className = "card-content result-item-title";
        itemDetailDiv.className = "card-action result-item-detail";
        itemDetailDivAnchor.className = "blue-text";

        itemTitleDiv.innerText = arrTitles[indexItem[i]];
        itemDetailDivAnchor.innerHTML = arrResults[i];
        itemDetailDivAnchor.href = arrLinks[indexItem[i]];

        itemDiv.appendChild(itemTitleDiv);
        itemDetailDiv.appendChild(itemDetailDivAnchor);
        itemDiv.appendChild(itemDetailDiv);

        elSearchResults.appendChild(itemDiv);
    }
}

window.addEventListener("load", searchClear);

// 搜索快捷键
document.addEventListener('keydown', function(evt) {
    if (isSearchFocused) return;
    if (evt.key === '/') {
        evt.preventDefault();
        elSearchInput.focus();
        window.isSearchFocused = true;
    }
})