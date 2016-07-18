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
const appService = require('../service/AppService').instance();
const Result = require('../dto/Result');
const Utils = require('../util/Utils');
const LocalFileStoreService = require('../service/LocalFileStoreService');
const PublicStruct = require('../thrift/PublicStruct_types');
const fileParse = require('co-busboy');
const path = require("path");
module.exports = class {
    static get path() {
        return '/app';
    }
    * add() {
        let params = this.request.body;
        let res = yield appService.add(new PublicStruct.AppStruct(params));
        Utils.writeResult(this, new Result(res ? true : false, {
            key: 'id',
            value: res.toNumber()
        }));
    }
    * update() {
        let params = this.request.body;
        let res = yield appService.update(new PublicStruct.AppStruct(params));
        Utils.writeResult(this, new Result(res ? true : false));
    }
    * listByPage() {
        let params = this.request.body;
        let res = yield appService.appByPage(new PublicStruct.PageParamStruct(params));
        Utils.writeResult(this, new Result(true, {
            key: 'apps',
            value: res
        }));
    }
    * updateFile() {
        let params = this.query;
        let part = yield fileParse(this);
        let resources = yield LocalFileStoreService.save(part);
        let res = yield appService.changeAppFile(params.id, resources);
        this.body = new Result(res ? true : false).json;
    }
    * updateImg() {
        let params = this.query;
        let parts = fileParse(this);
        let part, resourcesList = [];
        while (part = yield parts) {
            let resources = yield LocalFileStoreService.save(part);
            resourcesList.push(resources);
        }
        let res = yield appService.changeAppImg(params.id, resourcesList);
        this.body = new Result(res ? true : false).json;
    }
    * remove() {
        let params = this.request.body;
        let res = yield appService.remove(params.id);
        Utils.writeResult(this, new Result(res ? true : false));
    }
};