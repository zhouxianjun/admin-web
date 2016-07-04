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
    $(ctx) {
        ctx.body = '33';
    }
    login(ctx) {
        ctx.body = new Result(true, {
            key: 'menus',
            value: [{
                id: 1000,
                pid: 0,
                name: 'test',
                icon: 'fa-dashboard',
                panel: 'test',
                sub: [{
                    id: 1001,
                    pid: 1000,
                    name: 'test11',
                    panel: 'test',
                    path: '/index.html',
                    icon: '',
                    sub: []
                }]
            }]
        }, {
            role: ''
        });
    }
};