/**
 * Created with JetBrains Idea.
 * User: Gary
 * Date: 16-7-4
 * Time: 下午9:10
 *                 _ooOoo_
 *                o8888888o
 *                88" . "88
 *                (| -_- |)
 *                O\  =  /O
 *             ____/`---'\____
 *           .'  \\|     |//  `.
 *           /  \\|||  :  |||//  \
 *           /  _||||| -:- |||||-  \
 *           |   | \\\  -  /// |   |
 *           | \_|  ''\---/''  |   |
 *           \  .-\__  `-`  ___/-. /
 *         ___`. .'  /--.--\  `. . __
 *      ."" '<  `.___\_<|>_/___.'  >'"".
 *     | | :  `- \`.;`\ _ /`;.`/ - ` : | |
 *     \  \ `-.   \_ __\ /__ _/   .-` /  /
 *======`-.____`-.___\_____/___.-`____.-'======
 *                   `=---='
 *^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
 *           佛祖保佑       永无BUG
 */
'use strict';
require(['jquery', 'ko', 'userService', 'util', 'bootstrap', 'icheck', 'validator'], function ($, ko, UserService, util) {
    var viewModel = {
        username: ko.observable(),
        password: ko.observable(),
        error: ko.observable(util.getUrlParam('error'))
    };
    ko.applyBindings(viewModel);
    $(function () {
        $('input').iCheck({
            checkboxClass: 'icheckbox_square-blue',
            radioClass: 'iradio_square-blue',
            increaseArea: '20%' // optional
        });
        util.initValidForm($('#loginForm'), {
            username: {
                validators: {
                    notEmpty: {
                        message: '不能为空'
                    },
                    stringLength: {
                        min: 3,
                        max: 20,
                        message: '必须是3～20个字符之间'
                    },
                    regexp: {
                        regexp: /^[a-zA-Z0-9_]{3,16}$/,
                        message: '只能为字母数字字符或下划线'
                    }
                }
            },
            password: {
                validators: {
                    notEmpty: {
                        message: '不能为空'
                    }
                }
            }
        });
    });
});