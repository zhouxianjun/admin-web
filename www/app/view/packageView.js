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
require(['jquery', 'util', 'layer', 'packageService', 'ko', 'moment', 'merge', 'datatables', 'validator', 'slimScroll', 'datatables-tabletools', 'bootstrap-upload', 'fileupload'],
    function ($, util, layer, PackageService, ko, moment) {
    var viewModel = {
        table: null,
        util: util,
        moment: moment,
        app: {
            id: ko.observable(),
            name: ko.observable(),
            price: ko.observable()
        },
        openForm: function (id) {
            var appLayer = layer.open({
                type: 1,
                title: id ? '修改套餐' : '新增套餐',
                area: ['400px'], //宽高
                content: $('#layer_app').html(),
                btn: ['确定', '取消'],
                yes: function () {
                    var form = $('#appForm');
                    form.data('bootstrapValidator').validate();
                    if (form.data('bootstrapValidator').isValid()) {
                        id && viewModel.app.id(id);
                        id || viewModel.app.id(null);
                        var deferred = id ? PackageService.update(ko.toJSON(viewModel.app)) : PackageService.add(ko.toJSON(viewModel.app));
                        util.send(deferred, function (response) {
                            viewModel.table.draw(false);
                            form.data('bootstrapValidator').resetForm(true);
                            layer.close(appLayer);
                        });
                    }
                }
            });
            util.initValidForm($('#appForm'), {
                app_name: {
                    validators: {
                        notEmpty: {
                            message: '不能为空'
                        }
                    }
                },
                app_price: {
                    validators: {
                        notEmpty: {
                            message: '不能为空'
                        }
                    }
                }
            });
            id || util.clearViewModel(viewModel.app);
            ko.applyBindings(viewModel, $('#appForm')[0]);
            $('#appForm').slimScroll({
                height: '100%', //可滚动区域高度
                disableFadeOut: true
            });
        },
        openAppPackage: function(id) {
            layer.open({
                type: 1,
                title: '应用包列表',
                area: ['600px', '400px'], //宽高
                content: $('#layer_app_package').html()
            });
            $('#app-package-table').DataTable(merge(true, util.dataTableSettings, {
                ajax: function (data, callback, settings) {
                    var sortParam = util.getSortParam(data, ['name', 'common', 'root', 'create_time']);
                    util.send(PackageService.listPackageByPage(ko.toJSON(merge(true, sortParam, {
                        page: Math.floor(data.start / 10) + 1,
                        pageSize: 10,
                        id: id
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
                    util.adjustIframeHeight();
                },
                columns: [{
                    data: 'name'
                }, {
                    data: 'common',
                    render: function (common) {
                        return common ? '是' : '否'
                    }
                }, {
                    data: 'root',
                    render: function (root) {
                        return root ? '是' : '否'
                    }
                }, {
                    data: 'create_time',
                    render: function(create_time) {
                        return moment(create_time).format('YYYY-MM-DD HH:mm:ss');
                    }
                }]
            }));
        },
        init: function () {
        }
    };
    $(function () {
        util.tableToolsButton();
        viewModel.table = $('#app-table').DataTable(merge(true, util.dataTableSettings, {
            dom: 'T<"clear">lfrtip',
            ajax: function (data, callback, settings) {
                var sortParam = util.getSortParam(data, ['name', 'price', 'create_time']);
                util.send(PackageService.listByPage(ko.toJSON(merge(true, sortParam, {
                    page: Math.floor(data.start / 10) + 1,
                    pageSize: 10
                }))), function(response) {
                    var returnData = {};
                    var list = response.data.list;
                    returnData.draw = list.draw;
                    returnData.recordsTotal = list.count;
                    returnData.recordsFiltered = list.count;
                    returnData.data = list.count == 0 ? [] : JSON.parse(list.items);
                    callback(returnData);
                });
            },
            drawCallback: function (setting) {
                $('._data_table_update').click(function () {
                    var item = viewModel.table.row($(this).closest('tr')).data();
                    util.clearViewModel(viewModel.app);
                    util.setViewModelData(viewModel.app, item);
                    viewModel.openForm(item.id);
                });
                $('._data_table_app_package').click(function () {
                    var item = viewModel.table.row($(this).closest('tr')).data();
                    viewModel.openAppPackage(item.id);
                });
                $('._data_table_remove').click(function () {
                    var item = viewModel.table.row($(this).closest('tr')).data();
                    var confirmLayer = layer.confirm('您确定删除此应用吗？', {
                        btn: ['确定','取消'] //按钮
                    }, function(){
                        util.send(PackageService.remove(ko.toJSON({
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
                data: 'price',
                render: util.RENDER.PRICE
            }, {
                data: 'create_time',
                render: function(create_time) {
                    return moment(create_time).format('YYYY-MM-DD HH:mm:ss');
                }
            }, {
                data: null,
                orderable: false,
                render: function(data) {
                    return '<div class="btn-group">' +
                        '<button type="button" class="_data_table_update btn btn-success">修改</button>' +
                        '<button type="button" class="btn btn-success dropdown-toggle" data-toggle="dropdown">' +
                            '<span class="caret"></span>' +
                        '</button>' +
                        '<ul class="dropdown-menu">' +
                            '<li><a href="#" class="_data_table_app_package">应用包</a></li>' +
                            '<li><a href="#" class="_data_table_remove">删除</a></li>' +
                        '</ul>' +
                    '</div>';
                }
            }]
        }));
        viewModel.init();
        ko.applyBindings(viewModel);
        util.adjustIframeHeight();
        $.fn.dataTable.ext.errMode = function(s,h,m){};
    });
});