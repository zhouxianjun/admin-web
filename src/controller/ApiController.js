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
const apiService = require('../service/ApiService').instance();
const pushService = require('../service/PushService').instance();
const Result = require('../dto/Result');
const Utils = require('../util/Utils');
const PublicStruct = require('../thrift/PublicStruct_types');
const dowlUrl = '/resources/qiniuDownload?key=';
module.exports = class {
    static get path() {
        return '/api';
    }
    * boxLogin() {
        let params = this.request.body;
        if (!params || !params.username || !params.box_id) {
            this.throw(400);
            return;
        }
        let res = yield Utils.boxLogin(this, params);
        Utils.writeResult(this, new Result(res));
    }
    * checkBoxVersion() {
        let params = this.request.body;
        let res = yield apiService.checkBoxVersion(this.session.user.box_id, params.version_code);
        res = JSON.parse(res);
        if (res.md5) {
            res.url = '/resources/qiniuDownload?key=' + res.md5;
        }
        Utils.writeResult(this, new Result(res ? true : false, {
            key: 'version',
            value: res
        }));
    }
    * getBoxResourcesList() {
        console.log(this.ips);
        console.log(this.ip);
        console.log(getClientIp(this.req));
        let res = yield apiService.getBoxResourcesList(this.session.user.id, dowlUrl);
        Utils.writeResult(this, new Result(true, {
            key: 'map',
            value: JSON.parse(res)
        }));
    }
    * uploadBrush() {
        let params = this.request.body;
        let res = yield apiService.uploadBrush(this.session.user.box_id, JSON.stringify(params), this.session.user.id, this.ip);
        Utils.writeResult(this, new Result(res));
    }
    * appActive() {
        let params = this.request.body;
        let res = yield apiService.appActive(this.session.user.box_id, JSON.stringify(params), this.session.user.id, this.ip);
        Utils.writeResult(this, new Result(res));
    }
    * mobileActive() {
        let params = this.request.body;
        let res = yield apiService.mobileActive(this.session.user.box_id, JSON.stringify(params), this.session.user.id, this.ip);
        Utils.writeResult(this, new Result(res));
    }
    * listUnRead() {
        let params = this.request.body;
        let res = yield pushService.listUnRead(this.session.user.id, params.client, params.type, dowlUrl);
        Utils.writeResult(this, new Result(true, {
            key: 'list',
            value: JSON.parse(res)
        }));
    }
    * readPush() {
        let params = this.request.body;
        let res = yield pushService.readPush(this.session.user.id, params.client, params.type, params.push);
        Utils.writeResult(this, new Result(res));
    }
};
function getClientIp(req) {
    return req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
};