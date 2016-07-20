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
const resourcesService = require('../service/ResourcesService').instance();
const Result = require('../dto/Result');
const Utils = require('../util/Utils');
const fs = require("fs");
const qiniu = require('qiniu');
//需要填写你的 Access Key 和 Secret Key
qiniu.conf.ACCESS_KEY = 'qZq3Y85XBAWIWvwZpbl-REEd3SfSlOrjc55gcgxO';
qiniu.conf.SECRET_KEY = 'kdW-1Ynd-1H5nw-gfHi-BKgDodsVSdcaZi_GUhpZ';
//要上传的空间
const bucket = 'hlyt';
module.exports = class {
    static get path() {
        return '/resources';
    }
    * downloadByVersion() {
        let params = this.query;
        let res = yield resourcesService.getByVersion(params.id);
        this.attachment(res.name);
        this.body = fs.createReadStream(res.path);
    }
    * uptoken() {
        let params = this.request.body;
        let putPolicy = new qiniu.rs.PutPolicy(`${bucket}:${params.key}`);
        putPolicy.callbackUrl = 'http://your.domain.com/callback';
        putPolicy.callbackBody = 'filename=$(fname)&filesize=$(fsize)';
        Utils.writeResult(this, new Result());
        return putPolicy.token();
    }
};