$(function () {
    $('.ct_search a').on('tap', function () {
        /*跳转去搜索列表页，并且带上关键字*/
        var key = $.trim($('input').val());
        /*判断 没有关键字就提示用户 “请输入关键字搜索”*/
        if (!key) {
            /*mui消息提示*/
            mui.toast('请输入关键字');
            return false;
        }
        /*如果输入合法*/
        location.href = 'searchList.html?key=' + key;
    });
});