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
module.exports = class {
    static get path() {
        return '/user';
    }
    logout(ctx) {
        ctx.session = null;
        ctx.redirect('/');
    }
    login(ctx) {
        var param = ctx.request.body;
        if (!param || !param.username) {
            ctx.throw(400);
            return;
        }
        console.log(ctx.session);
        ctx.session.user = {
            username: param.username,
            name: param.username
        };
        ctx.redirect('/pages/index.html');
    }
    users(ctx) {
        ctx.body = [];
    }
};