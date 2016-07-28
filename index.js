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
const bodyParser = require('koa-bodyparser');
const app = new Koa();

const ignoreUrl = ['/user/login', '/', '/resources/qiniuCallback', '/api/boxLogin'];
const loginUrl = ['/permissions/menus', '/user/logout', '/resources/uptoken', '/resources/qiniuDownload'];

//logger
app.use(function* log(next) {
    let start = new Date;
    yield next;
    logger.log('%s %s - %s', this.method, this.url, new Date - start);
});

//body
app.use(bodyParser());

//session
app.keys = ['session_key'];
app.use(session({
    store: redisStore(),
    ttl: 1000 * 60 * 30
}));
app.use(function *session(next){
    yield next;
    // ignore favicon
    if (this.path === '/favicon.ico' || !this.session) return;

    var n = this.session.views || 0;
    this.session.views = ++n;
});

//static
app.use(Static('./www'));

app.use(function* rbac(next) {
    if (this.path.indexOf('.') != -1){
        yield next;
    } else {
        if (ignoreUrl.indexOf(this.path) == -1 && !this.session.user) {
            Utils.writeResult(this, new Result(Result.CODE.NO_LOGIN));
            return;
        }
        if (loginUrl.indexOf(this.path) != -1 && this.session.user) {
            yield next;
            return;
        }
        if (ignoreUrl.indexOf(this.path) == -1) {
            let have = false;
            this.session.interfaces.forEach(auth => {
                if (auth.auth == this.path) {
                    have = true;
                    return false;
                }
            });
            if (!have) {
                Utils.writeResult(this, new Result(Result.CODE.NO_ACCESS));
                return;
            }
        }
    }
    yield next;
});

app.use(function *pageNotFound(next){
    yield next;

    if (404 != this.status) return;

    // we need to explicitly set 404 here
    // so that koa doesn't assign 200 on body=
    this.status = 404;

    Utils.writeResult(this, new Result(Result.CODE.NOT_FOUND));
});

app.use(function *error(next){
    try {
        yield next;
    } catch (err) {
        Utils.writeResult(this, new Result(false, err.msg || err.message || '操作失败'));
        logger.error('router error', err, this);
    }
});

router.get('/', function *(next) {
    this.redirect('/pages/login.html');
});

app.on('error', (err, ctx) => {
    logger.error('server error', err, ctx);
});
process.on('uncaughtException', err => {logger.error('uncaughtException', err)});

app.use(router.routes()).use(router.allowedMethods());

require('./src/ThirftClient')(() => {
    // router
    new FileRouter(router).auto('./src/controller');
    app.listen(3000, '0.0.0.0');
});