/**
 * Created with JetBrains Idea.
 * User: Gary
 * Date: 16-7-6
 * Time: 下午10:24
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
define(['jquery'], function ($) {
    return {
        send: function (deferred, callback, errorFn) {
            $.when(deferred).done(function (response) {
                if (response.code == 99) {
                    window.location.href = '/';
                    return;
                }
                if (typeof callback === 'function') {
                    callback(response);
                }
            }).fail(function (error) {
                if (typeof errorFn === 'function') {
                    errorFn(error);
                    return;
                }
                console.log(error);
                alert('请求失败');
            });
        }
    };
});