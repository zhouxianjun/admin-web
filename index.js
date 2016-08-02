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
const config = require('./config.json');
const Koa = require('koa');
const router = require('koa-router')();
const Static = require('koa-static');
const session = require('koa-generic-session');
const redisStore = require('koa-redis');
const bodyParser = require('koa-bodyparser');
const co = require('co');
const app = new Koa();

const ignoreUrl = config.ignoreUrl;
const loginUrl = config.loginUrl;

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
    ttl: config.session_ttl,
    cookie: {
        path: (!config.base_path || config.base_path == '') ? '/' : config.base_path
    },
    beforeSave: function (ctx, session) {
        if (session.user) {
            let roles = session.user.roles;
            if (!roles) return;
            let needOnly = true;
            roles.forEach(role => {
                if (!role.only_login) {
                    needOnly = false;
                    return false;
                }
            });
            if (needOnly) {
                let key = `user:${session.user.id}`;
                co(function* () {
                    let res = yield ctx.sessionStore.get(key);
                    if (res && res != ctx.sessionId) {
                        logger.info('user: %s rep login now ip: %s destroy before session: %s', session.user.id, ctx.ip, res);
                        yield ctx.sessionStore.destroy(res);
                    }
                    yield ctx.sessionStore.set(key, ctx.sessionId, config.session_ttl);
                }, (err, result) => {
                    if (err)
                        logger.error('Need Only Login error', err);
                });
            }
        }
        return false;
    }
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
            let params = this.request.body;
            if (params.username && params.password) {
                let res = params.box_id ? yield Utils.boxLogin(this, params) : yield Utils.login(this, params);
                if (res) {
                    yield next;
                    return;
                }
            }
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

if (config.base_path && config.base_path != '') {
    router.get('/', function *(next) {
        this.redirect(config.base_path);
    });
    router.get(config.base_path, function *(next) {
        if (this.session.user) {
            this.redirect('/pages/index.html');
            return;
         }
        this.redirect('/pages/login.html');
    });
} else {
    router.get('/', function *(next) {
        if (this.session.user) {
            this.redirect('/pages/index.html');
            return;
        }
        this.redirect('/pages/login.html');
    });
}

router.get((!config.base_path || config.base_path == '') ? '/' : config.base_path, function *(next) {
    console.log(this.session);
    /*if (this.session.user) {
        this.redirect('/pages/index.html');
        return;
    }*/
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
    app.listen(config.port, '0.0.0.0');
});