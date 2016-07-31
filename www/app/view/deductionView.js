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
require(['jquery', 'util', 'layer', 'deductionService', 'permissionsService', 'appService', 'ko', 'moment', 'merge', 'datatables', 'validator', 'slimScroll', 'datatables-tabletools', 'select2', 'daterange', 'dhtmlx'],
    function ($, util, layer, DeductionService, PermissionsService, AppService, ko, moment) {
    var viewModel = {
        table: null,
        util: util,
        moment: moment,
        app: {
            id: ko.observable(),
            name: ko.observable(),
            start: ko.observable(0),
            percent: ko.observable(0),
            model: ko.observable(),
            start_time: ko.observable(),
            end_time: ko.observable(),
            apps: ko.observableArray([]),
            status: ko.observable(1)
        },
        apps: null,
        statusOptions: ko.observableArray([{
            name: '启用',
            id: 1
        }, {
            name: '禁用',
            id: 0
        }]),
        appOptions: ko.observableArray([]),
        modelOptions: ko.observableArray([{
            id: 1,
            name: '装机量'
        }, {
            id: 2,
            name: '有效装机量'
        }, {
            id: 3,
            name: '到达量'
        }, {
            id: 4,
            name: 'APP安装'
        }, {
            id: 5,
            name: 'APP激活'
        }]),
        initKoSubscribe: function() {
        },
        openForm: function (id) {
            var appLayer = layer.open({
                type: 1,
                title: id ? '修改扣量' : '新增扣量',
                area: ['400px', '350px'], //宽高
                content: $('#layer_app').html(),
                btn: ['确定', '取消'],
                yes: function () {
                    var form = $('#appForm');
                    form.data('bootstrapValidator').validate();
                    if (form.data('bootstrapValidator').isValid() && viewModel.app.start_time() && viewModel.app.end_time()) {
                        id && viewModel.app.id(id);
                        id || viewModel.app.id(null);
                        viewModel.app.apps(viewModel.apps.val());
                        var deferred = id ? DeductionService.update(ko.toJSON(viewModel.app)) : DeductionService.add(ko.toJSON(viewModel.app));
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
                app_start: {
                    validators: {
                        notEmpty: {
                            message: '不能为空'
                        }
                    }
                },
                app_percent: {
                    validators: {
                        notEmpty: {
                            message: '不能为空'
                        }
                    }
                },
                app_status: {
                    validators: {
                        notEmpty: {
                            message: '不能为空'
                        }
                    }
                },
                app_model: {
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
            $('#date_range').daterangepicker({
                format: 'YYYY-MM-DD'
            });
            $('#date_range').on('apply.daterangepicker', function (e, datePicker) {
                viewModel.app.start_time(datePicker.startDate.toDate().getTime());
                viewModel.app.end_time(datePicker.endDate.toDate().getTime());
            });
            viewModel.apps = $('#app_select').select2();

            if (id) {
                util.send(DeductionService.getApps(ko.toJSON({
                    id: id
                }))).then(function (response) {
                    if (response.data.list && response.data.list.length) {
                        var arr = [];
                        for (var i = 0; i < response.data.list.length; i++) {
                            arr.push(response.data.list[i].id);
                        }
                        $('#app_select').val(arr).trigger('change');
                    }
                });
                $('#date_range').data('daterangepicker').setStartDate(new Date(viewModel.app.start_time()));
                $('#date_range').data('daterangepicker').setEndDate(new Date(viewModel.app.end_time()));
            }
        },
        openUsers: function (id) {
            var tree;
            var userswin = layer.open({
                type: 1,
                title: '设置扣量用户',
                area: ['300px', '400px'], //宽高
                content: $('#show_users').html(),
                btn: ['确定', '取消'],
                yes: function () {
                    util.send(DeductionService.setUsers(ko.toJSON({
                        id: id,
                        users: tree.getAllChecked().split(',')
                    })), function() {
                        layer.close(userswin);
                    });
                }
            });
            util.send(PermissionsService.users(), function(response) {
                (function(fn) {
                    response = fn.call(fn, response);
                })(function(data) {
                    var items = [];
                    for (var i = 0; i < data.length; i++) {
                        items.push({
                            id: data[i].id,
                            text: data[i].name,
                            item: (data[i].rows && data[i].rows.length) ? this.call(this, data[i].rows) : []
                        });
                    }
                    return items;
                });
                tree = new dhtmlXTreeObject("users_list", "100%", "100%", 0);
                tree.setImagePath("/plugins/dhtmlx/imgs/dhxtree_material/");
                tree.enableCheckBoxes(true);
                tree.enableThreeStateCheckboxes(true);
                response[0].open = 1;
                tree.loadJSONObject({id: 0, item: response}, function () {
                    $('#menus_list').slimScroll({
                        height: '100%', //可滚动区域高度
                        disableFadeOut: true
                    });
                    util.send(DeductionService.getUsers(ko.toJSON({
                        id: id
                    }))).then(function (response) {
                        var list = response.data.list;
                        if (list && list.length) {
                            for (var i = 0; i < list.length; i++) {
                                tree.setCheck(list[i].id, true);
                            }
                        }
                    });
                });
            });
        },
        init: function () {
            util.send(AppService.allList()).then(function (response) {
                viewModel.appOptions(response.data.list);
            });
            viewModel.initKoSubscribe();
        }
    };
    $(function () {
        util.tableToolsButton();
        viewModel.table = $('#app-table').DataTable(merge(true, util.dataTableSettings, {
            dom: 'T<"clear">lfrtip',
            ajax: function (data, callback, settings) {
                var sortParam = util.getSortParam(data, ['name', 'start', 'percent', 'model', 'start_time', 'end_time', 'status', 'create_time']);
                util.send(DeductionService.listByPage(ko.toJSON(merge(true, sortParam, {
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
                $('._user_table_remove').click(function () {
                    var item = viewModel.table.row($(this).closest('tr')).data();
                    viewModel.openUsers(item.id);
                });
                $('._data_table_remove').click(function () {
                    var item = viewModel.table.row($(this).closest('tr')).data();
                    var confirmLayer = layer.confirm('您确定删除此扣量吗？', {
                        btn: ['确定','取消'] //按钮
                    }, function(){
                        util.send(DeductionService.remove(ko.toJSON({
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
                data: 'start'
            }, {
                data: 'percent',
                render: function (percent) {
                    return (percent || 0) + '%';
                }
            }, {
                data: 'model',
                render: function (model) {
                    var arr = viewModel.modelOptions();
                    for (var i = 0; i < arr.length; i++) {
                        if (arr[i].id == model)
                            return arr[i].name;
                    }
                    return '';
                }
            }, {
                data: 'start_time',
                render: function(start_time) {
                    return moment(start_time).format('YYYY-MM-DD HH:mm:ss');
                }
            }, {
                data: 'end_time',
                render: function(end_time) {
                    return moment(end_time).format('YYYY-MM-DD HH:mm:ss');
                }
            }, {
                data: 'status',
                render: util.RENDER.STATUS
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
                            '<li><a href="#" class="_user_table_remove">设置用户</a></li>' +
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