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
const thrift = require('thrift');
const roleService = require('../service/RoleService').instance();
const menuService = require('../service/MenuService').instance();
const userService = require('../service/UserService').instance();
const PublicStruct = require('../thrift/PublicStruct_types');
module.exports = class PermissionsController {
    static get path() {
        return '/permissions';
    }
    * rolesByMgr() {
        let roles = yield roleService.rolesByUser(this.session.user.id);
        this.body = Utils.makeTree(roles, this.session.user.id, 'pid', 'id', 'rows', item => {
            if (item.rows && item.rows.length) {
                item.tree = {
                    image: 'folder.gif'
                }
            }
        });
    }
    * addRole() {
        let params = this.request.body;
        let res = yield roleService.add(params.name, params.pid);
        Utils.writeResult(this, new Result(res ? true : false, {
            key: 'id',
            value: res.toNumber()
        }));
    }
    * updateRole() {
        let params = this.request.body;
        let res = yield roleService.update(params.id, params.name, params.status, params.pid);
        Utils.writeResult(this, new Result(res ? true : false));
    }
    * updateRoleStatus() {
        let params = this.request.body;
        let res = yield roleService.updateStatus(params.ids);
        Utils.writeResult(this, new Result(res ? true : false));
    }
    * menusByMgr() {
        let menus = yield menuService.menus();
        this.body = Utils.makeTree(menus, 0, 'pid', 'id', 'rows', item => {
            if (item.rows && item.rows.length) {
                item.tree = {
                    image: 'folder.gif'
                }
            }
        });
    }
    * addMenu() {
        let params = this.request.body;
        let res = yield menuService.add(new PublicStruct.MenuStruct(params));
        Utils.writeResult(this, new Result(res ? true : false, {
            key: 'id',
            value: res.toNumber()
        }));
    }
    * updateMenu() {
        let params = this.request.body;
        let res = yield menuService.update(new PublicStruct.MenuStruct(params));
        Utils.writeResult(this, new Result(res ? true : false));
    }
    * delMenu() {
        let params = this.request.body;
        let res = yield menuService.delMenu(params.id);
        Utils.writeResult(this, new Result(res ? true : false));
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
                    path: '/pages/userMgr.html',
                    icon: '',
                    sub: []
                }, {
                    id: 1004,
                    pid: 1000,
                    name: '接口配置',
                    panel: 'permissions_panel',
                    path: '/pages/interfaceMgr.html',
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
    * users() {
        let users = yield userService.usersByUser(this.session.user.id);
        this.body = Utils.makeTree(users, this.session.user.id, 'pid', 'id', 'rows', item => {
            if (item.rows && item.rows.length) {
                item.tree = {
                    image: 'folder.gif'
                }
            }
        });
    }
    * addUser() {
        let params = this.request.body;
        let res = yield userService.add(new PublicStruct.UserStruct(params));
        Utils.writeResult(this, new Result(res ? true : false, {
            key: 'id',
            value: res.toNumber()
        }));
    }
    * updateUser() {
        let params = this.request.body;
        let res = yield userService.update(new PublicStruct.UserStruct(params));
        Utils.writeResult(this, new Result(res ? true : false));
    }
};