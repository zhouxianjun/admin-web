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
const rootConfigService = require('../service/RootConfigService').instance();
const Result = require('../dto/Result');
const Utils = require('../util/Utils');
const PublicStruct = require('../thrift/PublicStruct_types');
module.exports = class {
    static get path() {
        return '/rootConfig';
    }
    * add() {
        let params = this.request.body;
        let res = yield rootConfigService.add(new PublicStruct.RootConfigStruct(params));
        Utils.writeResult(this, new Result(res ? true : false, {
            key: 'id',
            value: res.toNumber()
        }));
    }
    * update() {
        let params = this.request.body;
        let res = yield rootConfigService.update(new PublicStruct.RootConfigStruct(params));
        Utils.writeResult(this, new Result(res ? true : false));
    }
    * listByPage() {
        let params = this.request.body;
        let res = yield rootConfigService.listByPage(new PublicStruct.PageParamStruct(params));
        Utils.writeResult(this, new Result(true, {
            key: 'list',
            value: res
        }));
    }
    * listModelByPage() {
        let params = this.request.body;
        let res = yield rootConfigService.listModelByPage(new PublicStruct.PageParamStruct(params), params.id);
        Utils.writeResult(this, new Result(true, {
            key: 'list',
            value: res
        }));
    }
    * updateFile() {
        let params = this.request.body;
        let res = yield rootConfigService.changeAppFile(params.id, new PublicStruct.ResourcesStruct(params.resources));
        this.body = new Result(res ? true : false).json;
    }
    * remove() {
        let params = this.request.body;
        let res = yield rootConfigService.remove(params.id);
        Utils.writeResult(this, new Result(res ? true : false));
    }
    * removeModel() {
        let params = this.request.body;
        let res = yield rootConfigService.removeModel(params.id);
        Utils.writeResult(this, new Result(res ? true : false));
    }
    * addModel() {
        let params = this.request.body;
        let res = yield rootConfigService.addModel(new PublicStruct.RootModelStruct(params), params.id);
        Utils.writeResult(this, new Result(res ? true : false));
    }
};