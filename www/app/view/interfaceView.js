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
require(['jquery', 'util', 'layer', 'permissionsService', 'ko', 'moment', 'merge', 'datatables', 'validator', 'slimScroll'],
    function ($, util, layer, PermissionsService, ko, moment) {
    var viewModel = {
        table: null,
        query: {
            name: ko.observable(),
            auth: ko.observable()
        },
        interface: {
            id: ko.observable(),
            name: ko.observable(),
            auth: ko.observable(''),
            status: ko.observable(1),
            description: ko.observable('')
        },
        statusOptions: ko.observableArray([{
            name: '启用',
            id: 1
        }, {
            name: '禁用',
            id: 0
        }]),
        doQuery: function() {
            viewModel.table.draw(false);
        },
        openForm: function (id) {
            var interfaceLayer = layer.open({
                type: 1,
                title: id ? '修改接口' : '新增接口',
                area: ['450px'], //宽高
                content: $('#layer_interface').html(),
                btn: ['确定', '取消'],
                yes: function () {
                    var form = $('#interfaceForm');
                    form.data('bootstrapValidator').validate();
                    if (form.data('bootstrapValidator').isValid()) {
                        id && viewModel.interface.id(id);
                        id || viewModel.interface.id(null);
                        var deferred = id ? PermissionsService.updateInterface(ko.toJSON(viewModel.interface)) : PermissionsService.addInterface(ko.toJSON(viewModel.interface));
                        util.send(deferred, function (response) {
                            viewModel.table.draw(false);
                            form.data('bootstrapValidator').resetForm(true);
                            layer.close(interfaceLayer);
                        });
                    }
                }
            });
            util.initValidForm($('#interfaceForm'), {
                interface_name: {
                    validators: {
                        notEmpty: {
                            message: '不能为空'
                        }
                    }
                },
                interface_status: {
                    validators: {
                        notEmpty: {
                            message: '不能为空'
                        }
                    }
                },
                interface_auth: {
                    validators: {
                        notEmpty: {
                            message: '不能为空'
                        }
                    }
                }
            });
            id || util.clearViewModel(viewModel.interface);
            ko.applyBindings(viewModel, $('#interfaceForm')[0]);
        }
    };
    $(function () {
        viewModel.table = $('#interface-table').DataTable(merge(true, util.dataTableSettings, {
            ajax: function (data, callback, settings) {
                var sortParam = util.getSortParam(data, ['name', 'auth', 'description', 'status', 'create_time']);
                util.send(PermissionsService.interfaceByMgr(ko.toJSON(merge(true, sortParam, {
                    page: Math.floor(data.start / 10) + 1,
                    pageSize: 10,
                    query: ko.toJS(viewModel.query)
                }))), function(response) {
                    var returnData = {};
                    var interfaces = response.data.interfaces;
                    returnData.draw = data.draw;
                    returnData.recordsTotal = interfaces.count;
                    returnData.recordsFiltered = interfaces.count;
                    returnData.data = interfaces.count == 0 ? [] : JSON.parse(interfaces.items);
                    callback(returnData);
                });
            },
            drawCallback: function (setting) {
                $('._data_table_update').click(function () {
                    var item = viewModel.table.row($(this).closest('tr')).data();
                    util.setViewModelData(viewModel.interface, item);
                    viewModel.openForm(item.id);
                });
                util.adjustIframeHeight();
            },
            columns: [{
                data: 'name'
            }, {
                data: 'auth'
            }, {
                data: 'description'
            }, {
                data: 'status',
                render: function(status) {
                    return status ? '<span class="text-green">启用</span>' : '<span class="text-muted">禁用</span>';
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
                    return '<button type="button" class="_data_table_update btn btn-small btn-primary">修改</button>';
                }
            }]
        }));
        ko.applyBindings(viewModel);
        util.adjustIframeHeight();
    });
});