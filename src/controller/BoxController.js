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
const boxService = require('../service/BoxService').instance();
const Result = require('../dto/Result');
const Utils = require('../util/Utils');
const LocalFileStoreService = require('../service/LocalFileStoreService');
const PublicStruct = require('../thrift/PublicStruct_types');
const fileParse = require('co-busboy');
const path = require("path");
module.exports = class {
    static get path() {
        return '/box';
    }
    * add() {
        let params = this.request.body;
        params.user_id = this.session.user.id;
        let res = yield boxService.add(new PublicStruct.BoxStruct(params));
        Utils.writeResult(this, new Result(res ? true : false, {
            key: 'id',
            value: res.toNumber()
        }));
    }
    * update() {
        let params = this.request.body;
        let res = yield boxService.update(new PublicStruct.BoxStruct(params));
        Utils.writeResult(this, new Result(res ? true : false));
    }
    * listByPage() {
        let params = this.request.body;
        let res = yield boxService.boxByPage(new PublicStruct.PageParamStruct(params));
        Utils.writeResult(this, new Result(true, {
            key: 'boxs',
            value: res
        }));
    }
    * updateVersion() {
        let params = this.query;
        let part = yield fileParse(this);
        let resources = yield LocalFileStoreService.save(part);
        let res = yield boxService.updateVersion(resources, new PublicStruct.VersionStruct(params), params.box);
        this.body = new Result(res ? true : false).json;
    }
    * remove() {
        let params = this.request.body;
        let res = yield boxService.remove(params.id);
        Utils.writeResult(this, new Result(res ? true : false));
    }
    * allList() {
        let params = this.request.body;
        let res = yield boxService.allList(params.user || this.session.user.id);
        Utils.writeResult(this, new Result(true, {
            key: 'list',
            value: JSON.parse(res)
        }));
    }
};