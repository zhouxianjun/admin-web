/**
 * Created with JetBrains Idea.
 * User: Gary
 * Date: 16-7-21
 * Time: 下午8:02
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
define(['jquery', 'util'], function ($, util) {
    return {
        upload: function(data){
            return util.buildUploadAjax('http://up.qiniu.com', data);
        },
        uptoken: function() {
            return util.buildAjax('/resources/uptoken');
        },
        uploadFile: function (files) {
            var defer = $.Deferred();
            var resList = [];
            var self = this;
            function upload(token, i) {
                util.send(self.upload({
                    token: token,
                    file: files[i]
                })).then(function(response) {
                    resList.push(response.data.res);
                    if (i >= files.length - 1)
                        defer.resolve(resList);
                    else
                        upload(token, ++i);

                }, defer.reject);
            }
            util.send(this.uptoken()).then(function(response) {
                upload(response.data.token, 0);
            });
            return defer.promise();
        }
    };
});