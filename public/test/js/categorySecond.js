$(function () {
    /*1.数据渲染*/
    var currPage = 1;
    var render = function () {
        getCategorySecondData({
            page: currPage,
            pageSize: 5
        }, function (data) {
            /*渲染列表*/
            $('tbody').html(template('template', data));
            setPaginator(data.page, Math.ceil(data.total / data.size), render);
        });
    }
    render();
    /*2.实现分页渲染*/
    var setPaginator = function (pageCurr, pageSum, callback) {
        $('.pagination').bootstrapPaginator({
            bootstrapMajorVersion: 3,
            size: 'small',
            currentPage: pageCurr,
            totalPages: pageSum,
            onPageClicked: function (event, originalEvent, type, page) {
                currPage = page;
                callback && callback();
            }
        });
    }
    /*3.添加二级分类*/
    $('#addBtn').on('click', function () {
        $('#addModal').modal('show');
    });
    /*初始化模态框*/
    initDropDown();
    initUpload();

});
/*查询二级分类数据*/
var getCategorySecondData = function (params, callback) {
    $.ajax({
        type: 'get',
        url: '/category/querySecondCategoryPaging',
        data: params,
        dataType: 'json',
        success: function (data) {
            callback && callback(data);
        }
    });
}
/*下拉选择*/
var initDropDown = function () {
    var $dropDown = $('.dropdown-menu');
    $.ajax({
        type: 'get',
        url: '/category/queryTopCategoryPaging',
        data: {
            page: 1,
            pageSize: 100
        },
        dataType: 'json',
        success: function (data) {
            var html = [];
            $.each(data.rows, function (i, item) {
                html.push('<li><a data-id="' + item.id + '" href="javascript:;">' + item.categoryName + '</a></li>')
            })
            $dropDown.html(html.join(''))
        }
    });
    $dropDown.on('click', 'a', function () {
        /*显示选中*/
        $('.dropdown-text').html($(this).html());
        /*设置表单的值*/
        $('[name="categoryId"]').val($(this).data('id'));
        /*显示合法的提示*/
        $('#form').data('bootstrapValidator').updateStatus('categoryId', 'VALID');
    });
}
/*2.图片上传*/
var initUpload = function () {
    $('[name="pic1"]').fileupload({
        dataType: 'json',
        done: function (e, data) {
            /*预览图*/
            $(this).parent().parent().next().find('img').attr('src',data.result.picAddr);
            /*设置表单的值*/
            $('[name=brandLogo]').val(data.result.picAddr);
            /*显示合法的提示*/
            $('#form').data()
        }
    });
}
