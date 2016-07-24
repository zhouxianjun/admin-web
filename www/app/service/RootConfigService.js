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
            return util.buildAjax('/rootConfig/listByPage', data);
        },
        add: function(data){
            return util.buildAjax('/rootConfig/add', data);
        },
        update: function(data){
            return util.buildAjax('/rootConfig/update', data);
        },
        remove: function (data) {
            return util.buildAjax('/rootConfig/remove', data);
        },
        updateFile: function (data) {
            return util.buildAjax('/rootConfig/updateFile', data);
        },
        listModelByPage: function (data) {
            return util.buildAjax('/rootConfig/listModelByPage', data);
        },
        addModel: function (data) {
            return util.buildAjax('/rootConfig/addModel', data);
        },
        removeModel: function (data) {
            return util.buildAjax('/rootConfig/removeModel', data);
        }
    };
});