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
const modelMgrService = require('../service/ModelMgrService').instance();
const Result = require('../dto/Result');
const Utils = require('../util/Utils');
const PublicStruct = require('../thrift/PublicStruct_types');
module.exports = class {
    static get path() {
        return '/modelMgr';
    }
    * addBrand() {
        let params = this.request.body;
        let res = yield modelMgrService.addBrand(params.name);
        Utils.writeResult(this, new Result(res ? true : false, {
            key: 'id',
            value: res.toNumber()
        }));
    }
    * removeBrand() {
        let params = this.request.body;
        let res = yield modelMgrService.removeBrand(params.id);
        Utils.writeResult(this, new Result(res ? true : false));
    }
    * addModel() {
        let params = this.request.body;
        let res = yield modelMgrService.addModel(params.name, params.brand);
        Utils.writeResult(this, new Result(res ? true : false));
    }
    * removeModel() {
        let params = this.request.body;
        let res = yield modelMgrService.removeModel(params.id);
        Utils.writeResult(this, new Result(res ? true : false));
    }
    * addVersion() {
        let params = this.request.body;
        let res = yield modelMgrService.addVersion(params.name, params.model);
        Utils.writeResult(this, new Result(res ? true : false));
    }
    * removeVersion() {
        let params = this.request.body;
        let res = yield modelMgrService.removeVersion(params.id);
        Utils.writeResult(this, new Result(res ? true : false));
    }
    * addBaseVersion() {
        let params = this.request.body;
        let res = yield modelMgrService.addBaseVersion(params.name, params.version);
        Utils.writeResult(this, new Result(res ? true : false));
    }
    * removeBaseVersion() {
        let params = this.request.body;
        let res = yield modelMgrService.removeBaseVersion(params.id);
        Utils.writeResult(this, new Result(res ? true : false));
    }
    * brandByPage() {
        let params = this.request.body;
        let res = yield modelMgrService.brandByPage(new PublicStruct.PageParamStruct(params));
        Utils.writeResult(this, new Result(true, {
            key: 'list',
            value: res
        }));
    }
    * modelByPage() {
        let params = this.request.body;
        let res = yield modelMgrService.modelByPage(new PublicStruct.PageParamStruct(params), params.brand);
        Utils.writeResult(this, new Result(true, {
            key: 'list',
            value: res
        }));
    }
    * versionByPage() {
        let params = this.request.body;
        let res = yield modelMgrService.versionByPage(new PublicStruct.PageParamStruct(params), params.model);
        Utils.writeResult(this, new Result(true, {
            key: 'list',
            value: res
        }));
    }
    * baseVersionByPage() {
        let params = this.request.body;
        let res = yield modelMgrService.baseVersionByPage(new PublicStruct.PageParamStruct(params), params.version);
        Utils.writeResult(this, new Result(true, {
            key: 'list',
            value: res
        }));
    }
};