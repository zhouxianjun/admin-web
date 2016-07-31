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
require(['jquery', 'util', 'layer', 'pushService', 'resourcesService', 'ko', 'moment', 'merge', 'datatables', 'validator', 'slimScroll', 'datatables-tabletools', 'bootstrap-upload', 'fileupload', 'daterange'],
    function ($, util, layer, PushService, ResourcesService, ko, moment) {
    var viewModel = {
        table: null,
        util: util,
        moment: moment,
        app: {
            id: ko.observable(),
            name: ko.observable(),
            type: ko.observable(),
            client_type: ko.observable(),
            img: ko.observable(),
            app: ko.observable(),
            deduct: ko.observable(),
            url: ko.observable(),
            start_time: ko.observable(),
            end_time: ko.observable(),
            text: ko.observable()
        },
        app_file: {
            id: ko.observable(),
            resources_name: ko.observable(''),
            resources_md5: ko.observable(''),
            resources_size: ko.observable(0),
            resources_time: ko.observable()
        },
        update: false,
        typeOptions: ko.observableArray([{
            id: 1,
            name: '图文'
        }, {
            id: 2,
            name: '安装'
        }, {
            id: 3,
            name: '卸载'
        }, {
            id: 4,
            name: '暗扣'
        }, {
            id: 5,
            name: '网页'
        }]),
        clientTypeOptions: ko.observableArray([{
            id: 1,
            name: '盒子'
        }, {
            id: 2,
            name: 'SDK'
        }]),
        openForm: function (id) {
            var appLayer = layer.open({
                type: 1,
                title: id ? '修改推送' : '新增推送',
                area: ['400px', '350px'], //宽高
                content: $('#layer_app').html(),
                btn: ['确定', '取消'],
                yes: function () {
                    var form = $('#appForm');
                    form.data('bootstrapValidator').validate();
                    if (form.data('bootstrapValidator').isValid()) {
                        id && viewModel.app.id(id);
                        id || viewModel.app.id(null);
                        if (id) {
                            viewModel.app.img(null);
                            viewModel.app.app(null);
                        } else {
                            if ($('#app_img')[0].files[0] || $('#app_app')[0].files[0]) {
                                ResourcesService.uploadFile([viewModel.app.type() == 1 ? $('#app_img')[0].files[0] : $('#app_app')[0].files[0]]).then(function (resList) {
                                    if (viewModel.app.type() == 1) {
                                        viewModel.app.img(resList[0]);
                                    } else {
                                        viewModel.app.app(resList[0]);
                                    }
                                    var deferred = id ? PushService.update(ko.toJSON(viewModel.app)) : PushService.add(ko.toJSON(viewModel.app));
                                    util.send(deferred, function (response) {
                                        viewModel.table.draw(false);
                                        form.data('bootstrapValidator').resetForm(true);
                                        layer.close(appLayer);
                                    });
                                });
                                return;
                            }
                        }
                        var deferred = id ? PushService.update(ko.toJSON(viewModel.app)) : PushService.add(ko.toJSON(viewModel.app));
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
                app_type: {
                    validators: {
                        notEmpty: {
                            message: '不能为空'
                        }
                    }
                },
                app_client_type: {
                    validators: {
                        notEmpty: {
                            message: '不能为空'
                        }
                    }
                },
                app_url: {
                    validators: {
                        uri: {}
                    }
                }
            });
            $('#date_range').daterangepicker({
                format: 'YYYY-MM-DD'
            });
            $('#date_range').on('apply.daterangepicker', function (e, datePicker) {
                viewModel.app.start_time(datePicker.startDate.toDate().getTime());
                viewModel.app.end_time(datePicker.endDate.toDate().getTime());
            });
            id || util.clearViewModel(viewModel.app);
            viewModel.update = id ? true : false;
            id || viewModel.app.type(1);
            ko.applyBindings(viewModel, $('#appForm')[0]);
            $('#appForm').slimScroll({
                height: '100%', //可滚动区域高度
                disableFadeOut: true
            });
            if (id) {
                $('#date_range').data('daterangepicker').setStartDate(new Date(viewModel.app.start_time()));
                $('#date_range').data('daterangepicker').setEndDate(new Date(viewModel.app.end_time()));
            }
        },
        openFile: function (id, img) {
            var fileLayer = layer.open({
                type: 1,
                title: img ? '图片' : '应用',
                area: ['450px'], //宽高
                content: $('#layer_app_file').html(),
                btn: ['确定', '取消'],
                yes: function () {
                    var form = $('#appFileForm');
                    form.data('bootstrapValidator').validate();
                    if (form.data('bootstrapValidator').isValid() && $('#app_file_resource')[0].files[0]) {
                        viewModel.app_file.id(id);
                        ResourcesService.uploadFile([$('#app_file_resource')[0].files[0]]).then(function(resList) {
                            util.send((img ? PushService.updateImg : PushService.updateApp)(ko.toJSON({
                                id: id,
                                resources: resList[0]
                            }))).then(function() {
                                viewModel.table.draw(false);
                                util.clearViewModel(viewModel.app_file);
                                layer.close(fileLayer);
                            }, function() {
                                layer.msg('操作失败', {icon: 2});
                                layer.close(fileLayer);
                            });
                        });
                    }
                }
            });
            util.initValidForm($('#appFileForm'), {
                app_file_resource: {
                    validators: {
                        notEmpty: {
                            message: '不能为空'
                        }
                    }
                }
            });
            id || util.clearViewModel(viewModel.app_file);
            ko.applyBindings(viewModel, $('#appFileForm')[0]);
            $('#appFileForm').slimScroll({
                height: '100%', //可滚动区域高度
                disableFadeOut: true
            });
        },
        status: function (id, status) {
            util.clearViewModel(viewModel.app);
            viewModel.app.id(id);
            viewModel.app.status = status;
            var deferred = PushService.update(ko.toJSON(viewModel.app));
            delete viewModel.app.status;
            util.send(deferred, function (response) {
                viewModel.table.draw(false);
            });
        },
        init: function () {
        }
    };
    $(function () {
        util.tableToolsButton();
        viewModel.table = $('#app-table').DataTable(merge(true, util.dataTableSettings, {
            dom: 'T<"clear">lfrtip',
            ajax: function (data, callback, settings) {
                var sortParam = util.getSortParam(data, ['name', 'ow', 'type', 'text', 'client_type', 'deduct', 'url', 'status', 'create_time']);
                util.send(PushService.listByPage(ko.toJSON(merge(true, sortParam, {
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
                $('._data_table_img_file').click(function () {
                    var item = viewModel.table.row($(this).closest('tr')).data();
                    util.clearViewModel(viewModel.app_file);
                    viewModel.app_file.id(item.img_resources_id);
                    viewModel.app_file.resources_md5(item.img_md5);
                    viewModel.app_file.resources_name(item.img_name);
                    viewModel.app_file.resources_size(item.img_size);
                    viewModel.app_file.resources_time(item.img_time);
                    viewModel.openFile(item.id, true);
                });
                $('._data_table_app_file').click(function () {
                    var item = viewModel.table.row($(this).closest('tr')).data();
                    util.clearViewModel(viewModel.app_file);
                    viewModel.app_file.id(item.app_resources_id);
                    viewModel.app_file.resources_md5(item.app_md5);
                    viewModel.app_file.resources_name(item.app_name);
                    viewModel.app_file.resources_size(item.app_size);
                    viewModel.app_file.resources_time(item.app_time);
                    viewModel.openFile(item.id, false);
                });
                $('._data_table_send').click(function () {
                    var item = viewModel.table.row($(this).closest('tr')).data();
                    viewModel.send(item.id);
                });
                $('._data_table_disable').click(function () {
                    var item = viewModel.table.row($(this).closest('tr')).data();
                    viewModel.status(item.id, false);
                });
                $('._data_table_enable').click(function () {
                    var item = viewModel.table.row($(this).closest('tr')).data();
                    viewModel.status(item.id, true);
                });
                util.adjustIframeHeight();
            },
            columns: [{
                data: 'name',
                class: 'ellipsis',
                width: '60px',
                render: util.RENDER.ELLIPSIS
            }, {
                data: 'ow'
            }, {
                data: 'type',
                render: function (type) {
                    var arr = viewModel.typeOptions();
                    for (var i = 0; i < arr.length; i++) {
                        if (arr[i].id == type)
                            return arr[i].name;
                    }
                    return '';
                }
            }, {
                data: 'text',
                class: 'ellipsis',
                width: '80px',
                render: util.RENDER.ELLIPSIS
            }, {
                data: 'client_type',
                render: function (type) {
                    var arr = viewModel.clientTypeOptions();
                    for (var i = 0; i < arr.length; i++) {
                        if (arr[i].id == type)
                            return arr[i].name;
                    }
                    return '';
                }
            }, {
                data: 'deduct',
                render: util.RENDER.PRICE
            }, {
                data: 'url',
                class: 'ellipsis',
                width: '80px',
                render: util.RENDER.ELLIPSIS_URL
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
                            (data.type == 1 ? '<li><a href="#" class="_data_table_img_file">上传图片</a></li>' : '') +
                            (data.type == 2 || data.type == 3 ? '<li><a href="#" class="_data_table_app_file">上传应用</a></li>' : '') +
                            (data.status ? '<li><a href="#" class="_data_table_disable">禁用</a></li>' : '') +
                            (!data.status ? '<li><a href="#" class="_data_table_enable">启用</a></li>' : '') +
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