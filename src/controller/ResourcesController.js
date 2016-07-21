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
const _ = require('underscore');
const querystring = require('querystring');
const fs = require("fs");
const qiniu = require('qiniu');
//需要填写你的 Access Key 和 Secret Key
qiniu.conf.ACCESS_KEY = 'qZq3Y85XBAWIWvwZpbl-REEd3SfSlOrjc55gcgxO';
qiniu.conf.SECRET_KEY = 'kdW-1Ynd-1H5nw-gfHi-BKgDodsVSdcaZi_GUhpZ';
//要上传的空间
const bucket = 'hlyt';
const baseUrl = 'http://oalnquhic.bkt.clouddn.com/';
const callBack = 'http://alone.ngrok.cc/resources/qiniuCallback';
const callBackBody = 'filename=$(fname)&filesize=$(fsize)&md5=$(etag)';
const putPolicy = new qiniu.rs.PutPolicy(`${bucket}`, callBack, callBackBody);
const getPolicy = new qiniu.rs.GetPolicy(60 * 5);
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
        Utils.writeResult(this, new Result(true, {
            key: 'token',
            value: putPolicy.token()
        }));
    }
    * qiniuCallback() {
        let params = this.request.body;
        let res = yield resourcesService.getByMD5(params.md5);
        res.name = params.filename;
        res.size = params.filesize;
        res.md5 = params.md5;
        res.id = res.id.toNumber();
        res.create_time = parseInt(res.create_time);
        this.status = 200;
        this.body = new Result(true, {
            key: 'res',
            value: res
        }).json;
    }
    * qiniudl() {
        let key = this.query.key || this.request.body.key;
        if (!key) Utils.writeResult(this, new Result(false));
        let urls = buildUrl(key);

        Utils.writeResult(this, new Result(true, {
            key: 'urls',
            value: urls
        }));
    }
    * qiniuDownload() {
        let params = this.query || this.request.body;
        let key = params.key;
        if (!key) this.throw(404);
        let res = {};
        if (!params.show) {
            res = yield resourcesService.getByMD5(key);
        }
        let urls = buildUrl(key, res.name);
        this.redirect(urls[0]);
    }
};
function buildUrl(key, name) {
    let urls = [];

    if (!_.isArray(key)) {
        key = [key];
    }
    key.forEach(k => {
        if (!_.isEmpty(name) && name)
            urls.push(getPolicy.makeRequest(`${baseUrl}${k}?attname=${querystring.escape(name)}`));
        else
            urls.push(getPolicy.makeRequest(`${baseUrl}${k}`));
    });
    return urls;
}