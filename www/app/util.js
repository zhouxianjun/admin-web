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
define(['jquery', 'layer'], function ($, layer) {
    return {
        send: function (deferred, callback, errorFn) {
            $.when(deferred).done(function (response) {
                if (response.code == 99) {
                    window.location.href = '/';
                    return;
                }
                if (response.code != 1) {
                    layer.msg(response.msg || '操作失败', {icon: 2});
                    if (typeof errorFn === 'function') {
                        errorFn(response);
                        return;
                    }
                }
                if (typeof callback === 'function') {
                    callback(response);
                }
            }).fail(function (error) {
                layer.msg('操作失败', {icon: 2});
                if (typeof errorFn === 'function') {
                    errorFn(error);
                }
            });
        },
        adjustIframeHeight: function (hasParent) {
            var p = parent;
            if (hasParent) {
                p = parent.parent;
            }
            if (p != null && typeof p != 'undefined') {
                if ($('body').height() < 500 && !hasParent) {
                    var height = p.window.innerHeight - 166 < 500 ? 500 : parent.window.innerHeight - 166;
                    p.$('div.active iframe').height(height);
                } else {
                    p.$('div.active iframe').height($('body').height());
                }
            }
        }
    }
});