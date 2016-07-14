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
const interfaceService = require('../service/InterfaceService').instance();
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
    * rolesBySetUser() {
        let params = this.request.body;
        let roles = yield roleService.rolesBySetUser(params.id, this.session.user.id);
        Utils.writeResult(this, new Result(true, {
            key: 'roles',
            value: Utils.makeTree(roles, this.session.user.id, 'pid', 'id', 'rows', item => {
                if (item.rows && item.rows.length) {
                    item.tree = {
                        image: 'folder.gif'
                    }
                }
            })
        }));
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
    * setMenus() {
        let params = this.request.body;
        let res = yield roleService.setMenus(params.id, this.session.user.id, params.menus);
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
    * menusBySetRole() {
        let params = this.request.body;
        let menus = yield menuService.menusBySetRole(this.session.user.id, params.role);
        Utils.writeResult(this, new Result(true, {
            key: 'menus',
            value: Utils.makeTree(menus, 0, 'pid', 'id', 'rows', item => {
                if (item.rows && item.rows.length) {
                    item.tree = {
                        image: 'folder.gif'
                    }
                }
            })
        }));
    }
    * addMenu() {
        let params = this.request.body;
        let res = yield menuService.add(new PublicStruct.MenuStruct(params), this.session.user.id);
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
    * menus(ctx) {
        let menus = yield menuService.menusByUser(this.session.user.id);
        Utils.writeResult(this, new Result(true, {
            key: 'menus',
            value: Utils.makeTree(menus, 0, 'pid', 'id', 'sub', item => {
                if (!item.sub) item.sub = [];
                if (!item.panel) item.panel = 'panel_' + item.id;
            })
        }, {
            key: 'user',
            value: this.session.user
        }));
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
    * setRoles() {
        let params = this.request.body;
        let res = yield userService.setRoles(params.id, this.session.user.id, params.roles);
        Utils.writeResult(this, new Result(res ? true : false));
    }
    * interfaceByMgr() {
        let params = this.request.body;
        let res = yield interfaceService.interfacesByPage(new PublicStruct.PageParamStruct(params));
        Utils.writeResult(this, new Result(true, {
            key: 'interfaces',
            value: res
        }));
    }
    * addInterface() {
        let params = this.request.body;
        let res = yield interfaceService.add(new PublicStruct.InterfaceStruct(params));
        Utils.writeResult(this, new Result(res ? true : false, {
            key: 'id',
            value: res.toNumber()
        }));
    }
    * updateInterface() {
        let params = this.request.body;
        let res = yield interfaceService.update(new PublicStruct.InterfaceStruct(params));
        Utils.writeResult(this, new Result(res ? true : false));
    }
    * interfacesBySetMenu() {
        let params = this.request.body;
        let interfaces = yield interfaceService.interfacesBySetMenu(this.session.user.id, params.menu);
        Utils.writeResult(this, new Result(true, {
            key: 'interfaces',
            value: Utils.makeList(interfaces)
        }));
    }
    * setInterfaces() {
        let params = this.request.body;
        let res = yield menuService.setInterfaces(params.id, this.session.user.id, params.interfaces);
        Utils.writeResult(this, new Result(res ? true : false));
    }
};