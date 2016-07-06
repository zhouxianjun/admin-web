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
require(['jquery', 'ko', 'userService', 'bootstrap', 'icheck', 'validator'], function ($, ko, UserService) {
    var viewModel = {
        username: ko.observable(),
        password: ko.observable()
    };
    ko.applyBindings(viewModel);
    $(function () {
        console.log(UserService);
        $('input').iCheck({
            checkboxClass: 'icheckbox_square-blue',
            radioClass: 'iradio_square-blue',
            increaseArea: '20%' // optional
        });

        $('#loginForm').bootstrapValidator({
            message: 'This value is not valid',
            live: 'enabled',
            trigger: 'blur',
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            /*submitHandler: function(validator, form, submitButton) {
                var deferred = UserService.login(ko.toJSON(viewModel));
                $.when(deferred).done(function (response) {
                    console.log(response);
                    window.location.href = './index.html';
                }).fail(function (error) {
                    alert('登录失败');
                });
            },*/
            fields: {
                username: {
                    validators: {
                        notEmpty: {
                            message: 'The username is required and can\'t be empty'
                        },
                        stringLength: {
                            min: 3,
                            max: 20,
                            message: 'The full name must be less than 20 characters'
                        }
                    }
                },
                password: {
                    validators: {
                        notEmpty: {
                            message: 'The password is required and can\'t be empty'
                        },
                        stringLength: {
                            min: 6,
                            max: 20,
                            message: 'The full name must be less than 20 characters'
                        }
                    }
                }
            }
        });
    });
});