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
const Result = require('../dto/Result');
const Utils = require('../util/Utils');
const PublicStruct = require('../thrift/PublicStruct_types');
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
        let res = yield apiService.boxLogin(params.username, params.password, params.box_id);
        console.log(res);
        let success = false;
        if (res && res.toNumber() > 0) {
            this.session.user = {
                id: res.toNumber(),
                box_id: params.box_id
            };
            success = true;
        }
        Utils.writeResult(this, new Result(success));
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
        let res = yield apiService.getBoxResourcesList(this.session.user.id);
        Utils.writeResult(this, new Result(true, {
            key: 'map',
            value: JSON.parse(res)
        }));
    }
};