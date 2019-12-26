$(function () {
    /*一级分类默认渲染 第一个一级分类对应的二级分类*/
    getFirstCategoryData(function (data) {
        /*一级分类默认渲染*/
        /*模板的使用顺序:json数据,定义模板,调用模板,返回html*/
        console.log(data)
        $('.cate_left ul').html(template('firstTemplate', data));
        // initSecondTapHandle();
        /*第一个一级分类对应的二级分类*/
        var categoryId = $('.cate_left ul').find('a').attr('data-id');
        render(categoryId);
    });
    /*点击一级分类,加载对应的二级分类*/
    $('.cate_left').on('tap', 'a', function () {
        /*当前选中的时候不去重复加载*/
        if($(this).parent().hasClass('now')) return false;
        /*样式的选中功能*/
        $('.cate_left li').removeClass('now');
        $(this).parent().addClass('now');
        /*数据的渲染*/
        render($(this).attr('data-id'));
    });

});
/*var initSecondTapHandle =function () {
    $('.cate_left li').on('tap',function (e) {
        console.log(e);
    });
};*/

var getFirstCategoryData = function (callback) {
    $.ajax({
        url: '/category/queryTopCategory',
        type: 'get',
        data: '',
        dataType: 'json',
        success: function (data) {
            callback && callback(data);
        }
    });

};
var getSecondCategoryData = function (params, callback) {
    $.ajax({
        url: '/category/querySecondCategory',
        type: 'get',
        data: params,
        dataType: 'json',
        success: function (data) {
            console.log(data);
            callback && callback(data);
        }
    });
};
/*渲染*/
var render = function (categoryId) {
    getSecondCategoryData({
        id:categoryId
    }, function (data) {
        $('.cate_right ul').html(template('secondTemplate',data));
    });
};