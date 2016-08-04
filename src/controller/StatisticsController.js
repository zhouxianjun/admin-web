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
const statisticsService = require('../service/StatisticsService').instance();
const Result = require('../dto/Result');
const Utils = require('../util/Utils');
const moment = require('moment');
module.exports = class {
    static get path() {
        return '/statistics';
    }
    * indexForAdmin() {
        let params = this.request.body;
        let date = moment(params.date);
        date = date.isValid() ? date : moment();
        let res = yield statisticsService.getStaticIndexByDateForAdmin(
            this.session.user.id,
            date.startOf('month').toDate().getTime(),
            date.endOf('month').toDate().getTime(),
            params.province_id || 0,
            params.city_id || 0,
            params.sortName,
            params.sortDir
        );
        Utils.writeResult(this, new Result(true, {
            key: 'list',
            value: JSON.parse(res)
        }));
    }
};