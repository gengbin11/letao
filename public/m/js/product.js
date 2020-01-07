$(function () {
    mui('.mui-scroll-wrapper').scroll({
        scrollX: false,//是否横向滚动
        scrollY: true,//是否竖向滚动
        startX: 0,//初始化时滚动至x
        startY: 0,//初始化滚动至Y
        indicators: false,//是否显示滚动条
        deceleration: 0.0006,//阻尼系数，越小滚动越快
        bounce: true//是否启用反弹
    });
    mui.init({
        pullRefresh: {
            container: '.mui-scroll-wrapper',
            down: {
                auto: true,
                callback: function () {
                    var that = this;
                    /*1.加载商品数据*/
                    getProductData(CT.getParamsByUrl().productId, function (data) {
                        /*渲染商品详情页*/
                        $('.mui-scroll').html(template('detail', data));
                        /*结束刷新状态*/
                        that.endPulldownToRefresh();
                        /*初始化轮播图*/
                        mui('.mui-slider').slider({
                            interval: 2000
                        });
                    });
                }
            }
        }
    });
    /*2.选中商品尺码*/
    $('body').on('tap', '.btn_size', function () {
        var $this = $(this);
        $('.btn_size').removeClass('now');
        $this.addClass('now');
    }).on('tap', '.p_number span', function () {
        var $this = $(this), $input = $('.p_number input');
        var num = parseInt($input.val()), max = $input.attr('data-max');
        if ($this.hasClass('jian')) {
            num > 0 && $input.val(num - 1);
        }
        if ($this.hasClass('jia')) {
            if (num < max) {
                $input.val(num + 1);
            } else {
                mui.toast('没有库存了');
            }
        }
    }).on('tap', '.btn_addCart', function () {
        var data = {
            productId: CT.getParamsByUrl().productId,
            size: $('.btn_size.now').html(),
            num: parseInt($('.p_number input').val())
        };
        if (!data.productId) {
            mui.toast('商品异常');
            return false;
        }
        if (!data.size) {
            mui.toast('请选择尺码');
            return false;
        }
        if (!data.num) {
            mui.toast('请选择数量');
            return false;
        }
        addCart(data, function () {
            window.addCarting = 0;
            mui.confirm('添加成功，去购物车看看？', '温馨提示', ['是', '否'], function (e) {
                if (e.index == 0) {
                    location.href = CT.CART_URL;
                } else {
                    //TODO
                }
            });
        });
    }).on('tap', '.btn_pay', function () {
        mui.toast('未实现');
    });
});
    var getProductData = function (productId, callback) {
        $.ajax({
            url: '/product/queryProductDetail',
            type: 'get',
            data: {
                id: productId
            },
            dataType: 'json',
            success: function (data) {
                setTimeout(function () {
                    callback && callback(data);
                }, 1000);
            }
        });
    };
    var addCart = function (data, callback) {
        $.ajax({
            type: 'post',
            url: '/cart/addCart',
            data: data,
            dataType: 'json',
            beforeSend: function () {
                window.addCarting = true;
            },
            success: function (data) {
                callback && callback(data);
            },
            error: function () {
                mui.toast('服务器繁忙');
            }
        });
    }