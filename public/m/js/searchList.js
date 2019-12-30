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

    /*3.用户输入新的关键词，点击搜索，重置排序功能*/
    $('.ct_search a').on('tap', function () {
        var key = $.trim($input.val());
        if (!key) {
            mui.toast('请输入关键字');
            return false;
        }
        getSearchData({
            proName: key,
            page: 1,
            pageSize: 4
        }, function (data) {
            $('.ct_product').html(template('list', data));
        });
    });

    /*4.搜索结果排序功能*/
    $('.ct_order a').on('tap', function () {
        /*当前点击的A*/
        var $this = $(this);
        /*如果之前没有选择*/
        if (!$this.hasClass('now')) {
            /*选中，并且取消其他的选中,箭头默认朝下*/
            $this.addClass('now').siblings().removeClass('now').find('span').removeClass('fa-angle-up').addClass('fa-angle-down');
        } else {
            /*当前已经有被选择的分类，则改变箭头的方向*/
            if ($this.find('span').hasClass('fa-angle-down')) {
                $this.find('span').removeClass('fa-angle-down').addClass('fa-angle-up');
            } else {
                $this.find('span').removeClass('fa-angle-up').addClass('fa-angle-down');
            }
        }
        /*获取当前点击的功能参数*/
        var order = $this.attr('data-order');
        var orderVal = $this.find('span').hasClass('fa-angle-up') ? 1 : 2;
        var key = $.trim($input.val());
        if (!key) {
            mui.toast('请输入关键字');
            return false;
        }
        var params = {
            proName: key,
            page: 1,
            pageSize: 4
        };
        params[order] = orderVal;
        getSearchData(params, function (data) {
            $('.ct_product').html(template('list', data));
        });
    });
    /*5.下拉刷新，上拉加载*/
    mui.init({
        pullRefresh:{
            /*下拉容器*/
            container:"#refreshContainer",
            /*下拉*/
            down:{
                auto:true,
                callback:function () {
                    var that = this;
                    var key = $.trim($input.val());
                    if(!key){
                        mui.toast('请输入关键字');
                        return false;
                    }
                    getSearchData({
                        proName:key,
                        page:1,
                        pageSize:4
                    },function (data) {
                        setTimeout(function () {
                            $('.ct_product').html(template('list',data));
                            that.endPulldownToRefresh();
                        },2000);
                    });
                }
            }
        }
    });
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