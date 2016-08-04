/**
 * Created with JetBrains Idea.
 * User: Gary
 * Date: 16-7-6
 * Time: 下午11:21
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
require(['jquery', 'util', 'layer', 'statisticsService', 'userService', 'ko', 'moment', 'merge', 'datatables', 'slimScroll', 'datatables-tabletools', 'datepicker'],
    function ($, util, layer, StatisticsService, UserService, ko, moment) {
    var viewModel = {
        table: null,
        query: {
            province_id: ko.observable(),
            city_id: ko.observable(),
            user_id: ko.observable(),
            date: ko.observable()
        },
        provinceOptions: ko.observableArray(),
        cityOptions: ko.observableArray(),
        userOptions: ko.observableArray(),
        initKoSubscribe: function() {
            viewModel.query.province_id.subscribe(function (newValue) {
                viewModel.cityOptions([]);
                if (typeof newValue != 'undefined') {
                    viewModel.cityOptions(util.loadCityList(newValue));
                }
            });
        },
        init: function () {
            viewModel.provinceOptions(util.loadProvinceList());
            util.send(UserService.childUsers()).then(function (response) {
                viewModel.userOptions(response.data.list);
            });
            viewModel.initKoSubscribe();
            $('#query_month').datepicker({
                format: "yyyy-mm",
                minViewMode: 1,
                maxViewMode: 2,
                language: 'zh-CN',
                autoclose: true
            });
        },
        doQuery: function () {
            viewModel.table.ajax.reload();
        }
    };
    $(function () {
        util.tableToolsButton();
        viewModel.table = $('#box-table').DataTable(merge(true, util.dataTableSettings, {
            dom: 'T<"clear">lfrtip',
            paging: false,
            serverSide: false,
            ajax: function (data, callback, settings) {
                var sortParam = util.getSortParam(data, ['date', 'installed', 'mobile_active', 'app_active']);
                util.send(StatisticsService.indexForAdmin(ko.toJSON(merge(true, sortParam, ko.toJS(viewModel.query)))), function(response) {
                    var returnData = {};
                    var list = response.data.list;
                    returnData.data = list && list.length > 0 ? list : [];
                    console.log(returnData);
                    callback(returnData);
                });
            },
            drawCallback: function (setting) {
                util.adjustIframeHeight();
            },
            columns: [{
                data: 'date',
                render: function(date) {
                    return moment(date).format('YYYY-MM-DD');
                }
            }, {
                data: 'installed'
            }, {
                data: 'mobile_active'
            }, {
                data: 'app_active'
            }]
        }));
        viewModel.init();
        ko.applyBindings(viewModel);
        util.adjustIframeHeight();
        $.fn.dataTable.ext.errMode = function(s,h,m){};
    });
});