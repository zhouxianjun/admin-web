/**
 * Created with JetBrains Idea.
 * User: Gary
 * Date: 2016/6/30
 * Time: 10:31
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
const logger = require('./src/util/LogUtils').log();
const FileRouter = require('./src/util/FileRouter');
const Koa = require('koa');
const router = require('koa-router')();
const Static = require('koa-static');
const app = new Koa();

const ignoreUrl = ['/login'];

//logger
app.use(function* log(next) {
    let start = new Date;
    yield next;
    logger.log('%s %s - %s', this.method, this.url, new Date - start);
});

//static
app.use(Static('./www'));

const menu = [{
    id: 1000,
    pid: 0,
    name: 'test',
    sub: [{
        id: 1001,
        pid: 1000,
        name: 'test11'
    }]
}];
const urls = ['/demo'];
app.use(function* rbac(next) {
    if (ignoreUrl.indexOf(this.url) == -1 && urls.indexOf(this.url) == -1) {
        this.body = {
            msg: '403'
        };
        return;
    }
    yield next;
});

// router
new FileRouter(router).auto('./src/app/controller');
app.on('error', (err, ctx) =>
    logger.error('server error', err, ctx)
);
app.use(router.routes()).use(router.allowedMethods());
app.listen(3000);