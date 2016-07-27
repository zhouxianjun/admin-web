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
const modelRefService = require('../service/ModelRefService').instance();
const Result = require('../dto/Result');
const Utils = require('../util/Utils');
const PublicStruct = require('../thrift/PublicStruct_types');
module.exports = class {
    static get path() {
        return '/model/ref';
    }
    * add() {
        let params = this.request.body;
        let res = yield modelRefService.add(new PublicStruct.ModelStruct(params), params.id, params.type);
        Utils.writeResult(this, new Result(res ? true : false, {
            key: 'id',
            value: res.toNumber()
        }));
    }
    * listModelByPage() {
        let params = this.request.body;
        let res = yield modelRefService.listModelByPage(new PublicStruct.PageParamStruct(params), params.id, params.type);
        Utils.writeResult(this, new Result(true, {
            key: 'list',
            value: res
        }));
    }
    * listByPage() {
        let params = this.request.body;
        let res = yield modelRefService.listByPage(new PublicStruct.PageParamStruct(params));
        Utils.writeResult(this, new Result(true, {
            key: 'list',
            value: res
        }));
    }
    * remove() {
        let params = this.request.body;
        let res = yield modelRefService.remove(params.ref, params.model, params.type);
        Utils.writeResult(this, new Result(res ? true : false));
    }
    * removeModel() {
        let params = this.request.body;
        let res = yield modelRefService.removeModel(params.id);
        Utils.writeResult(this, new Result(res ? true : false));
    }
};