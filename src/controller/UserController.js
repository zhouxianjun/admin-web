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
const userService = require('../service/UserService').instance();
const interfaceService = require('../service/InterfaceService').instance();
const userRefService = require('../service/UserRefService').instance();
const Result = require('../dto/Result');
const Utils = require('../util/Utils');
module.exports = class {
    static get path() {
        return '/user';
    }
    logout(ctx) {
        ctx.session = null;
        ctx.redirect('/');
    }
    * login() {
        let param = this.request.body;
        if (!param || !param.username) {
            this.throw(400);
            return;
        }
        let user = yield userService.login(param.username, param.password);
        if (user && user.id.toNumber() > 0) {
            user.id = user.id.toNumber();
            this.session.user = user;
            let res = yield interfaceService.interfacesByUser(this.session.user.id);
            this.session.interfaces = res;
            this.redirect('/pages/index.html');
        } else {
            this.redirect('/pages/login.html?error=500');
        }
    }
    * setRef() {
        let param = this.request.body;
        if (!param.user || !param.type) {
            this.throw(400);
            return;
        }
        let res = yield userRefService.setRef(param.user, param.refs, param.type);
        Utils.writeResult(this, new Result(res));
    }
    * setRefs() {
        let param = this.request.body;
        if (!param.user) {
            this.throw(400);
            return;
        }
        let res = yield userRefService.setRefs(param.user, param.box, param.app_package, param.require_package, param.app_white, param.install_active);
        Utils.writeResult(this, new Result(res));
    }
};