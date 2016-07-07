/**
 * Created with JetBrains Idea.
 * User: Gary
 * Date: 16-7-4
 * Time: 下午9:18
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
const Result = require('../dto/Result');
const Utils = require('../util/Utils');
module.exports = class {
    static get path() {
        return '/permissions';
    }
    rolesByMgr(ctx) {
        ctx.body = [{
            id: 1000,
            name: '超级管理员',
            pname: '',
            create_date: '2016-07-08 11:11:11',
            update_date: '2016-07-08 11:11:11',
            status: true,
            rows: [{
                id: 2000,
                name: '管理员2',
                pname: '超级管理员',
                create_date: '2016-07-08 11:11:11',
                update_date: '2016-07-08',
                status: true
            }, {
                id: 3000,
                name: '管理员3',
                pname: '超级管理员',
                create_date: '2016-07-08 11:11:11',
                update_date: '2016-07-08',
                status: false
            }]
        }];
    }
    menusByMgr(ctx) {
        ctx.body = [{
            id: 1000,
            seq: 1,
            name: "权限管理",
            icon: 'fa-dashboard',
            target: 'permissions_panel',
            status: true,
            rows: [{
                id: 1001,
                seq: 1,
                name: '菜单配置',
                target: 'permissions_panel',
                path: '/pages/menuMgr.html',
                icon: '',
                status: true
            }, {
                id: 1002,
                seq: 2,
                name: '角色配置',
                target: 'permissions_panel',
                path: '/pages/roleMgr.html',
                icon: '',
                status: true
            }, {
                id: 1003,
                seq: 3,
                name: '用户配置',
                target: 'permissions_panel',
                path: '#',
                icon: '',
                status: false
            }]
        }, {
            id: 1100,
            seq: 1,
            name: '设备管理',
            icon: 'fa-dashboard',
            target: 'device_panel',
            status: true
        }];
    }
    menus(ctx) {
        ctx.body = new Result(true, {
            key: 'menus',
            value: [{
                id: 1000,
                pid: 0,
                name: '权限管理',
                icon: 'fa-dashboard',
                panel: 'permissions_panel',
                sub: [{
                    id: 1001,
                    pid: 1000,
                    name: '菜单配置',
                    panel: 'permissions_panel',
                    path: '/pages/menuMgr.html',
                    icon: '',
                    sub: []
                }, {
                    id: 1002,
                    pid: 1000,
                    name: '角色配置',
                    panel: 'permissions_panel',
                    path: '/pages/roleMgr.html',
                    icon: '',
                    sub: []
                }, {
                    id: 1003,
                    pid: 1000,
                    name: '用户配置',
                    panel: 'permissions_panel',
                    path: '#',
                    icon: '',
                    sub: []
                }]
            }, {
                id: 1100,
                pid: 0,
                name: '设备管理',
                icon: 'fa-dashboard',
                panel: 'device_panel',
                sub: []
            }, {
                id: 1200,
                pid: 0,
                name: '数据统计',
                icon: 'fa-dashboard',
                panel: 'statistics_panel',
                sub: [{
                    d: 1201,
                    pid: 0,
                    name: '产线数据列表',
                    icon: 'fa-dashboard',
                    panel: 'statistics_panel',
                    sub: []
                }, {
                    d: 1202,
                    pid: 0,
                    name: '终端数据列表',
                    icon: 'fa-dashboard',
                    panel: 'statistics_panel',
                    sub: []
                }, {
                    d: 1203,
                    pid: 0,
                    name: '应用数据列表',
                    icon: 'fa-dashboard',
                    panel: 'statistics_panel',
                    sub: []
                }]
            }, {
                id: 1300,
                pid: 0,
                name: '装机管理',
                icon: 'fa-dashboard',
                panel: 'apps_panel',
                sub: []
            }, {
                id: 1400,
                pid: 0,
                name: '数据推送',
                icon: 'fa-dashboard',
                panel: 'data_send_panel',
                sub: []
            }]
        }, {
            key: 'user',
            value: ctx.session.user
        }).json;
    }
};