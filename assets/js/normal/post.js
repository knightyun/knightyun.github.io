var postContent = document.querySelector('#post-content');
var imgs = postContent.querySelectorAll('img');
var len = imgs.length;

// 格式化显示所有文章图片
for (let i = 0; i < len; i++) {
    imgs[i].classList.add('materialboxed');
    imgs[i].classList.add('z-depth-4');
}

// 初始化侧栏目录插件
document.addEventListener('DOMContentLoaded', function () {
    var elemCategory = document.querySelector('#category');
    M.Sidenav.init(elemCategory, {
        'edge': 'right'
    });
});

// 选中文章内容并复制
document.addEventListener('keyup', e => {
    if (e.key === 'A' && e.ctrlKey && e.shiftKey) {
        getSelection().selectAllChildren(postContent);
        document.execCommand('copy');
    }
})