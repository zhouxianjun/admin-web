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
define(['jquery'], function ($) {
    return {
        menus: function(){
            return $.ajax({
                url: '/permissions/menus',
                type: 'get',
                dataType: 'json',
                contentType : 'application/json'
            });
        },
        addMenu: function(data) {
            return $.ajax({
                url: '/permissions/addMenu',
                type: 'post',
                dataType: 'json',
                data: data,
                contentType : 'application/json'
            });
        },
        updateMenu: function(data) {
            return $.ajax({
                url: '/permissions/updateMenu',
                type: 'post',
                dataType: 'json',
                data: data,
                contentType : 'application/json'
            });
        },
        delMenu: function(data) {
            return $.ajax({
                url: '/permissions/delMenu',
                type: 'post',
                dataType: 'json',
                data: data,
                contentType : 'application/json'
            });
        },
        addRole: function(data) {
            return $.ajax({
                url: '/permissions/addRole',
                type: 'post',
                dataType: 'json',
                data: data,
                contentType : 'application/json'
            });
        },
        updateRole: function(data) {
            return $.ajax({
                url: '/permissions/updateRole',
                type: 'post',
                dataType: 'json',
                data: data,
                contentType : 'application/json'
            });
        },
        updateRoleStatus: function(data) {
            return $.ajax({
                url: '/permissions/updateRoleStatus',
                type: 'post',
                dataType: 'json',
                data: data,
                contentType : 'application/json'
            });
        },
        addUser: function(data) {
            return $.ajax({
                url: '/permissions/addUser',
                type: 'post',
                dataType: 'json',
                data: data,
                contentType : 'application/json'
            });
        },
        updateUser: function(data) {
            return $.ajax({
                url: '/permissions/updateUser',
                type: 'post',
                dataType: 'json',
                data: data,
                contentType : 'application/json'
            });
        },
        interfaceByMgr: function() {
            return $.ajax({
                url: '/permissions/interfaceByMgr',
                type: 'get',
                dataType: 'json',
                contentType : 'application/json'
            });
        }
    };
});