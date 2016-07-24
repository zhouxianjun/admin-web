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
const pushService = require('../service/PushService').instance();
const Result = require('../dto/Result');
const Utils = require('../util/Utils');
const PublicStruct = require('../thrift/PublicStruct_types');
module.exports = class {
    static get path() {
        return '/push';
    }
    * send() {
        Utils.writeResult(this, new Result(true));
    }
    * add() {
        let params = this.request.body;
        params.user_id = this.session.user.id;
        let pushStruct = new PublicStruct.PushStruct(params);
        if (params.img) {
            pushStruct.img = new PublicStruct.ResourcesStruct(params.img);
        }
        if (params.app) {
            pushStruct.app = new PublicStruct.ResourcesStruct(params.app);
        }
        let res = yield pushService.add(pushStruct);
        Utils.writeResult(this, new Result(res ? true : false, {
            key: 'id',
            value: res.toNumber()
        }));
    }
    * update() {
        let params = this.request.body;
        let res = yield pushService.update(new PublicStruct.PushStruct(params));
        Utils.writeResult(this, new Result(res ? true : false));
    }
    * listByPage() {
        let params = this.request.body;
        let res = yield pushService.listByPage(new PublicStruct.PageParamStruct(params));
        Utils.writeResult(this, new Result(true, {
            key: 'list',
            value: res
        }));
    }
    * updateImg() {
        let params = this.request.body;
        let res = yield pushService.changeImg(new PublicStruct.ResourcesStruct(params.resources), params.id);
        this.body = new Result(res ? true : false).json;
    }
    * updateApp() {
        let params = this.request.body;
        let res = yield pushService.changeApp(new PublicStruct.ResourcesStruct(params.resources), params.id);
        this.body = new Result(res ? true : false).json;
    }
};