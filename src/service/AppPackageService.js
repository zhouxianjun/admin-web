/**
 * Created with JetBrains Idea.
 * User: Gary
 * Date: 16-7-8
 * Time: 下午10:35
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
const ThriftClient = require('node-thrift-client');
module.exports = class AppPackageService extends ThriftClient.referenceBean {
    listByPage() {}
    add() {}
    update() {}
    remove() {}
    listAppByPage() {}
    removeApp() {}
    appAllList() {}
    allList() {}
    get type() {
        return require('../thrift/AppPackageService');
    }
};