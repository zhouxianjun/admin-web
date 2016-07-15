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
        box: {
            id: ko.observable(),
            box_id: ko.observable(),
            status: ko.observable(1),
            province_id: ko.observable(),
            city_id: ko.observable()
        },
        statusOptions: ko.observableArray([{
            name: '启用',
            id: 1
        }, {
            name: '禁用',
            id: 0
        }]),
        openForm: function (id) {
            var boxLayer = layer.open({
                type: 1,
                title: id ? '修改盒子' : '新增盒子',
                area: ['450px'], //宽高
                content: $('#layer_box').html(),
                btn: ['确定', '取消'],
                yes: function () {
                    var form = $('#boxForm');
                    form.data('bootstrapValidator').validate();
                    if (form.data('bootstrapValidator').isValid()) {
                        id && viewModel.box.id(id);
                        id || viewModel.box.id(null);
                        var deferred = id ? PermissionsService.updateInterface(ko.toJSON(viewModel.box)) : PermissionsService.addInterface(ko.toJSON(viewModel.box));
                        util.send(deferred, function (response) {
                            viewModel.table.draw(false);
                            form.data('bootstrapValidator').resetForm(true);
                            layer.close(boxLayer);
                        });
                    }
                }
            });
            util.initValidForm($('#boxForm'), {
                box_id: {
                    validators: {
                        notEmpty: {
                            message: '不能为空'
                        }
                    }
                },
                box_status: {
                    validators: {
                        notEmpty: {
                            message: '不能为空'
                        }
                    }
                },
                box_province: {
                    validators: {
                        notEmpty: {
                            message: '不能为空'
                        }
                    }
                },
                box_city: {
                    validators: {
                        notEmpty: {
                            message: '不能为空'
                        }
                    }
                }
            });
            id || util.clearViewModel(viewModel.box);
            ko.applyBindings(viewModel, $('#boxForm')[0]);
        }
    };
    $(function () {
        viewModel.table = $('#box-table').DataTable(merge(util.dataTableSettings, {
            ajax: function (data, callback, settings) {
                var sortParam = util.getSortParam(data, ['box_id', 'user_id', 'version', 'status', 'province_id', 'city_id', 'create_time', 'update_time']);
                var dataTableLoad = layer.load(2);
                util.send(PermissionsService.interfaceByMgr(JSON.stringify(merge(sortParam, {
                    page: Math.floor(data.start / 10) + 1,
                    pageSize: 10
                }))), function(response) {
                    var returnData = {};
                    var boxs = response.data.boxs;
                    returnData.draw = boxs.current;
                    returnData.recordsTotal = boxs.count;
                    returnData.recordsFiltered = boxs.count;//后台不实现过滤功能，每次查询均视作全部结果
                    var items = [];
                    for (var i = 0; i < boxs.items.length; i++) {
                        var item = JSON.parse(boxs.items[i]);
                        items.push(item);
                    }
                    returnData.data = items;
                    callback(returnData);
                    layer.close(dataTableLoad);
                }, function () {
                    layer.close(dataTableLoad);
                });
            },
            drawCallback: function (setting) {
                $('._data_table_update').click(function () {
                    var item = viewModel.table.row($(this).closest('tr')).data();
                    util.setViewModelData(viewModel.box, item);
                    viewModel.openForm(item.id);
                });
                util.adjustIframeHeight();
            },
            columns: [{
                data: 'box_id'
            }, {
                data: 'user_name'
            }, {
                data: 'description'
            }, {
                data: 'status',
                render: function(status) {
                    return status ? '<span class="text-green">启用</span>' : '<span class="text-muted">禁用</span>';
                }
            }, {
                data: 'create_time',
                render: function(data) {
                    return moment(data.create_time).format('YYYY-MM-DD HH:mm:ss');
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