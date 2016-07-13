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
const Result = require('../dto/Result');
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
        let userId = yield userService.login(param.username, param.password);
        if (userId && userId.toNumber() > 0) {
            this.session.user = {
                id: userId.toNumber(),
                username: param.username
            };
            this.redirect('/pages/index.html');
        } else {
            this.redirect('/pages/login.html?error=500');
        }
    }
};