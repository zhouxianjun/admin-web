/**
 * Created with JetBrains Idea.
 * User: Gary
 * Date: 16-7-4
 * Time: 下午10:03
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
        listByPage: function(data){
            return util.buildAjax('/appPackage/listByPage', data);
        },
        add: function(data){
            return util.buildAjax('/appPackage/add', data);
        },
        update: function(data){
            return util.buildAjax('/appPackage/update', data);
        },
        remove: function (data) {
            return util.buildAjax('/appPackage/remove', data);
        },
        removeApp: function (data) {
            return util.buildAjax('/appPackage/removeApp', data);
        },
        appAllList: function (data) {
            return util.buildAjax('/appPackage/appAllList', data);
        },
        listAppByPage: function (data) {
            return util.buildAjax('/appPackage/listAppByPage', data);
        }
    };
});