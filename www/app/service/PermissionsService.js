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
        menus: function(){
            return util.buildAjax('/permissions/menus', null, 'get');
        },
        addMenu: function(data) {
            return util.buildAjax('/permissions/addMenu', data);
        },
        updateMenu: function(data) {
            return util.buildAjax('/permissions/updateMenu', data);
        },
        delMenu: function(data) {
            return util.buildAjax('/permissions/delMenu', data);
        },
        menusBySetRole: function(data) {
            return util.buildAjax('/permissions/menusBySetRole', data);
        },
        menusByMgr: function() {
            return util.buildAjax('/permissions/menusByMgr');
        },
        setMenus: function (data) {
            return util.buildAjax('/permissions/setMenus', data);
        },
        addRole: function(data) {
            return util.buildAjax('/permissions/addRole', data);
        },
        updateRole: function(data) {
            return util.buildAjax('/permissions/updateRole', data);
        },
        rolesByMgr: function () {
            return util.buildAjax('/permissions/rolesByMgr');
        },
        rolesBySetUser: function(data) {
            return util.buildAjax('/permissions/rolesBySetUser', data);
        },
        users: function () {
            return util.buildAjax('/permissions/users');
        },
        updateRoleStatus: function(data) {
            return util.buildAjax('/permissions/updateRoleStatus', data);
        },
        addUser: function(data) {
            return util.buildAjax('/permissions/addUser', data);
        },
        updateUser: function(data) {
            return util.buildAjax('/permissions/updateUser', data);
        },
        setRoles: function(data) {
            return util.buildAjax('/permissions/setRoles', data);
        },
        interfaceByMgr: function(data) {
            return util.buildAjax('/permissions/interfaceByMgr', data);
        },
        updateInterface: function(data) {
            return util.buildAjax('/permissions/updateInterface', data);
        },
        addInterface: function(data) {
            return util.buildAjax('/permissions/addInterface', data)
        },
        interfacesBySetMenu: function(data) {
            return util.buildAjax('/permissions/interfacesBySetMenu', data);
        },
        setInterfaces: function (data) {
            return util.buildAjax('/permissions/setInterfaces', data);
        }
    };
});