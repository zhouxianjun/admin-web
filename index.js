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
const Utils = require('./src/util/Utils');
const Result = require('./src/dto/Result');
const Koa = require('koa');
const router = require('koa-router')();
const Static = require('koa-static');
const session = require('koa-generic-session');
const redisStore = require('koa-redis');
const app = new Koa();

const ignoreUrl = ['/user/login'];

//logger
app.use(function* log(next) {
    let start = new Date;
    yield next;
    logger.log('%s %s - %s', this.method, this.url, new Date - start);
});

//session
app.keys = ['session_key'];
app.use(session({
    store: redisStore(),
    ttl: 1000 * 60 * 5
}));
app.use(function *session(next){
    yield next;
    // ignore favicon
    if (this.path === '/favicon.ico') return;

    var n = this.session.views || 0;
    this.session.views = ++n;
});

//static
app.use(Static('./www'));

const urls = ['/demo'];
/*app.use(function* rbac(next) {
    if (this.path.indexOf('.') != -1){
        yield next;
    } else {
        if (ignoreUrl.indexOf(this.path) == -1 && urls.indexOf(this.path) == -1) {
            Utils.writeResult(new Result(Result.CODE.NO_ACCESS));
            return;
        }
    }
    yield next;
});*/

app.use(function *pageNotFound(next){
    yield next;

    if (404 != this.status) return;

    // we need to explicitly set 404 here
    // so that koa doesn't assign 200 on body=
    this.status = 404;

    Utils.writeResult(this, new Result(Result.CODE.NOT_FOUND));
});

// router
new FileRouter(router).auto('./src/controller');
app.on('error', (err, ctx) =>
    logger.error('server error', err, ctx)
);
app.use(router.routes()).use(router.allowedMethods());
app.listen(3000);