/**
 * Created with JetBrains Idea.
 * User: Gary
 * Date: 16-7-17
 * Time: 下午1:28
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
const PublicStruct = require('../thrift/PublicStruct_types');
const logger = require('../util/LogUtils').log();
const fs = require("fs");
const path = require("path");
const crypt = require('crypto');
const Q = require('q');
module.exports = class LocalFileStoreService {
    static * save(part) {
        let defer = Q.defer();
        let stream = fs.createWriteStream(path.join(__dirname, part.filename));
        let length = 0;
        part.on('data', data => {
            length += data.length;
        });
        part.on('end', () => {
            logger.log('uploading %s -> %s', part.filename, stream.path);
            LocalFileStoreService.getFileSha(stream.path).then(sha => {
                defer.resolve(new PublicStruct.ResourcesStruct({
                    path: stream.path,
                    md5: sha,
                    name: part.filename,
                    size: length
                }));
            }, err => defer.reject(err));
        });
        part.on('error', err => defer.reject(err));
        part.pipe(stream);
        return defer.promise;
    }
    static getFileSha(path) {
        let defer = Q.defer();
        let shasum = crypt.createHash('sha1');
        let s = fs.ReadStream(path);
        s.on('data', d => {
            shasum.update(d);
        });

        s.on('end', () => {
            let d = shasum.digest('hex');
            defer.resolve(d);
        });
        s.on('error', err => defer.reject(err));
        return defer.promise;
    }
};