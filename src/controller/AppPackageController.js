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
const appPackageService = require('../service/AppPackageService').instance();
const Result = require('../dto/Result');
const Utils = require('../util/Utils');
const PublicStruct = require('../thrift/PublicStruct_types');
module.exports = class {
    static get path() {
        return '/appPackage';
    }
    * add() {
        let params = this.request.body;
        let res = yield appPackageService.add(new PublicStruct.AppPackageStruct(params));
        Utils.writeResult(this, new Result(res ? true : false, {
            key: 'id',
            value: res.toNumber()
        }));
    }
    * update() {
        let params = this.request.body;
        let res = yield appPackageService.update(new PublicStruct.AppPackageStruct(params));
        Utils.writeResult(this, new Result(res ? true : false));
    }
    * listByPage() {
        let params = this.request.body;
        let res = yield appPackageService.listByPage(new PublicStruct.PageParamStruct(params));
        Utils.writeResult(this, new Result(true, {
            key: 'list',
            value: res
        }));
    }
    * listAppByPage() {
        let params = this.request.body;
        let res = yield appPackageService.listAppByPage(new PublicStruct.PageParamStruct(params), params.type, params.id);
        Utils.writeResult(this, new Result(true, {
            key: 'list',
            value: res
        }));
    }
    * remove() {
        let params = this.request.body;
        let res = yield appPackageService.remove(params.id);
        Utils.writeResult(this, new Result(res ? true : false));
    }
    * removeApp() {
        let params = this.request.body;
        let res = yield appPackageService.removeApp(params.id, params.app, params.type);
        Utils.writeResult(this, new Result(res ? true : false));
    }
    * appAllList() {
        let params = this.request.body;
        let res = yield appPackageService.appAllList(params.id, params.type);
        Utils.writeResult(this, new Result(true, {
            key: 'list',
            value: JSON.parse(res)
        }));
    }
    * allList() {
        let params = this.request.body;
        let res = yield appPackageService.allList(params.user || this.session.user.id);
        Utils.writeResult(this, new Result(true, {
            key: 'list',
            value: JSON.parse(res)
        }));
    }
};