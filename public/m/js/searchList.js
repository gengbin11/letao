$(function () {
    /*区域滚动*/
    mui('.mui-scroll-wrapper').scroll({
        indicators: false
    });
    /*1.页面初始化的时候，关键字在输入框内显示*/
    /*获取关键字*/
    var urlParams = CT.getParamsByUrl();
    var $input = $('input').val(urlParams.key || '')
    /*2.页面初始化的时候，根据关键字查询第一页数据，4条*/
    getSearchData({
        proName:urlParams.key,
        page:1,
        pageSize:4
    },function (data) {
        /*渲染数据*/
        $('.ct_product').html(template('list',data));
    })
});

var getSearchData = function (params, callback) {
    $.ajax({
        url: '/product/queryProduct',
        type: 'get',
        data: params,
        dataType: 'json',
        success: function (data) {
            callback && callback(data);
        }
    });
};