$(function () {
    $('#login').bootstrapValidator({
        /*提示的图标*/
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        /*属性对应的是表单的名字*/
        fields: {
            /*配置校验规则*/
            username: {
                /*规则*/
                validators: {
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                    /*设置校验信息，和规则无关，和后台校验有关*/
                    callback: {
                        message: '用户名错误'
                    }
                }
            },
            password: {
                validators: {
                    notEmpty: {
                        message: '密码不能为空'
                    },
                    stringLength: {
                        min: 6,
                        max: 18,
                        message: '密码在6-18个字符内'
                    },
                    callback: {
                        message: '密码不正确'
                    }
                }
            }
        }
        /*表单校验成功*/
    }).on('success.form.bv', function (e) {
        /*禁用默认提交方式，使用ajax提交*/
        e.preventDefault();
        /*获取当前的表单*/
        var $form = $(e.target);
        /*发送登录请求*/
        $.ajax({
            type: 'post',
            url: '/employee/employeeLogin',
            data: $form.serialize(),
            dataType: 'json',
            success: function (data) {
                if (data.success) {
                    /*登陆成功，跳转页面*/
                    location.href = 'index.html';
                } else {
                    /*登录失败，恢复可提交的按钮*/
                    $form.data('bootstrapValidator').disableSubmitButtons(false);
                    /*指定某一表单元素的错误提示*/
                    if (data.error == 1000) {
                        $form.data('bootstrapValidator').updateStatus('username', 'INVALID', 'callback');
                    } else {
                        $form.data('bootstrapValidator').updateStatus('password', 'INVALID', 'callback');
                    }
                }
            }
        });
    });
    /*重置功能*/
    $('[type="reset"]').on('click',function () {
        /*重置验证*/
        $('#login').data('bootstrapValidator').resetForm();
    });
});