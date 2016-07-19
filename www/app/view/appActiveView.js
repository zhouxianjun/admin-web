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
require(['jquery', 'util', 'layer', 'appActiveService', 'ko', 'moment', 'merge', 'datatables', 'validator', 'slimScroll', 'datatables-tabletools'],
    function ($, util, layer, AppActiveService, ko, moment) {
    var viewModel = {
        table: null,
        app_active: {
            id: ko.observable(),
            name: ko.observable(),
            open_count: ko.observable(),
            flow: ko.observable(),
            stay_days: ko.observable(),
            show_time: ko.observable(),
            open_network: ko.observable('')
        },
        openForm: function (id) {
            var formLayer = layer.open({
                type: 1,
                title: id ? '修改应用激活策略' : '新增应用激活策略',
                area: ['450px', '400px'], //宽高
                content: $('#layer_app_active').html(),
                btn: ['确定', '取消'],
                yes: function () {
                    var form = $('#appActiveForm');
                    form.data('bootstrapValidator').validate();
                    if (form.data('bootstrapValidator').isValid()) {
                        id && viewModel.app_active.id(id);
                        id || viewModel.app_active.id(null);
                        if (viewModel.app_active.open_network() == '1')
                            viewModel.app_active.open_network(true);
                        else
                            viewModel.app_active.open_network(false);
                        var deferred = id ? AppActiveService.update(ko.toJSON(viewModel.app_active)) : AppActiveService.add(ko.toJSON(viewModel.app_active));
                        util.send(deferred, function (response) {
                            viewModel.table.draw(false);
                            form.data('bootstrapValidator').resetForm(true);
                            layer.close(formLayer);
                        });
                    }
                }
            });
            util.initValidForm($('#appActiveForm'), {
                app_active_name: {
                    validators: {
                        notEmpty: {
                            message: '不能为空'
                        }
                    }
                },
                app_active_stay_days: {
                    validators: {
                        notEmpty: {
                            message: '不能为空'
                        }
                    }
                },
                app_active_show_time: {
                    validators: {
                        notEmpty: {
                            message: '不能为空'
                        }
                    }
                },
                app_active_open_network: {
                    validators: {
                        notEmpty: {
                            message: '不能为空'
                        }
                    }
                }
            });
            id || util.clearViewModel(viewModel.app_active);
            ko.applyBindings(viewModel, $('#appActiveForm')[0]);
            $('#appActiveForm').slimScroll({
                height: '100%', //可滚动区域高度
                disableFadeOut: true
            });
        },
        init: function () {
        }
    };
    $(function () {
        viewModel.table = $('#box-table').DataTable(merge(true, util.dataTableSettings, {
            dom: 'T<"clear">lfrtip',
            ajax: function (data, callback, settings) {
                var sortParam = util.getSortParam(data, ['name', 'open_count', 'flow', 'stay_days', 'show_time', 'open_network', 'create_time']);
                util.send(AppActiveService.listByPage(JSON.stringify(merge(true, sortParam, {
                    page: Math.floor(data.start / 10) + 1,
                    pageSize: 10
                }))), function(response) {
                    var returnData = {};
                    var list = response.data.list;
                    returnData.draw = data.draw;
                    returnData.recordsTotal = list.count;
                    returnData.recordsFiltered = list.count;
                    returnData.data = list.count == 0 ? [] : JSON.parse(list.items);
                    callback(returnData);
                });
            },
            drawCallback: function (setting) {
                $('._data_table_update').click(function () {
                    var item = viewModel.table.row($(this).closest('tr')).data();
                    util.clearViewModel(viewModel.app_active);
                    util.setViewModelData(viewModel.app_active, item);
                    viewModel.app_active.open_network('' + item.open_network);
                    viewModel.openForm(item.id);
                });
                $('._data_table_remove').click(function () {
                    var item = viewModel.table.row($(this).closest('tr')).data();
                    var confirmLayer = layer.confirm('您确定删除此策略吗？', {
                        btn: ['确定','取消'] //按钮
                    }, function(){
                        util.send(AppActiveService.remove(JSON.stringify({
                            id: item.id
                        })), function() {
                            viewModel.table.draw(false);
                            layer.close(confirmLayer);
                        });
                    });
                });
                util.adjustIframeHeight();
            },
            columns: [{
                data: 'name'
            }, {
                data: 'open_count'
            }, {
                data: 'flow'
            }, {
                data: 'stay_days'
            }, {
                data: 'show_time'
            }, {
                data: 'open_network',
                render: function(open_network) {
                    return (open_network == 1 || open_network == '1') ? '是' : '否';
                }
            }, {
                data: 'create_time',
                render: function(create_time) {
                    return moment(create_time).format('YYYY-MM-DD HH:mm:ss');
                }
            }, {
                data: null,
                orderable: false,
                render: function(data) {
                    return '<button type="button" style="margin-right: 5px" class="_data_table_update btn btn-default fa fa-edit">修改</button>' +
                           '<button type="button" class="_data_table_remove btn btn-default fa fa-remove">删除</button>'
                }
            }]
        }));
        viewModel.init();
        ko.applyBindings(viewModel);
        util.adjustIframeHeight();
        $.fn.dataTable.ext.errMode = function(s,h,m){};
    });
});