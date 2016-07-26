/**
 * Created by cz on 2016/7/26.
 */
'use strict';
const userService = require('../service/UserService').instance();
const Result = require('../dto/Result');
const Utils = require('../util/Utils');
const PublicStruct = require('../thrift/PublicStruct_types');
module.exports = class {
    static get path() {
        return '/appActive';
    }
    * add() {
        let params = this.request.body;
        let res = yield appActiveService.add(new PublicStruct.AppActiveStruct(params));
        Utils.writeResult(this, new Result(res ? true : false, {
            key: 'id',
            value: res.toNumber()
        }));
    }
    * update() {
        let params = this.request.body;
        let res = yield appActiveService.update(new PublicStruct.AppActiveStruct(params));
        Utils.writeResult(this, new Result(res ? true : false));
    }
    * listByPage() {
        let params = this.request.body;
        let res = yield appActiveService.listByPage(new PublicStruct.PageParamStruct(params));
        Utils.writeResult(this, new Result(true, {
            key: 'list',
            value: res
        }));
    }
    * remove() {
        let params = this.request.body;
        let res = yield appActiveService.remove(params.id);
        Utils.writeResult(this, new Result(res ? true : false));
    }
};