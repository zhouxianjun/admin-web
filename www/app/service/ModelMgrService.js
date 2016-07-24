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
        addBrand: function(data){
            return util.buildAjax('/modelMgr/addBrand', data);
        },
        removeBrand: function(data){
            return util.buildAjax('/modelMgr/removeBrand', data);
        },
        addModel: function(data){
            return util.buildAjax('/modelMgr/addModel', data);
        },
        removeModel: function (data) {
            return util.buildAjax('/modelMgr/removeModel', data);
        },
        addVersion: function (data) {
            return util.buildAjax('/modelMgr/addVersion', data);
        },
        removeVersion: function (data) {
            return util.buildAjax('/modelMgr/removeVersion', data);
        },
        addBaseVersion: function (data) {
            return util.buildAjax('/modelMgr/addBaseVersion', data);
        },
        removeBaseVersion: function (data) {
            return util.buildAjax('/modelMgr/removeBaseVersion', data);
        },
        brandByPage: function (data) {
            return util.buildAjax('/modelMgr/brandByPage', data);
        },
        modelByPage: function (data) {
            return util.buildAjax('/modelMgr/modelByPage', data);
        },
        versionByPage: function (data) {
            return util.buildAjax('/modelMgr/versionByPage', data);
        },
        baseVersionByPage: function (data) {
            return util.buildAjax('/modelMgr/baseVersionByPage', data);
        },
        brandList: function (data) {
            return util.buildAjax('/modelMgr/brandList', data);
        },
        modelList: function (data) {
            return util.buildAjax('/modelMgr/modelList', data);
        },
        versionList: function (data) {
            return util.buildAjax('/modelMgr/versionList', data);
        },
        baseVersionList: function (data) {
            return util.buildAjax('/modelMgr/baseVersionList', data);
        }
    };
});