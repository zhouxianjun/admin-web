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
require(['jquery', 'util', 'layer', 'appService', 'appActiveService', 'ko', 'moment', 'merge', 'datatables', 'validator', 'slimScroll', 'datatables-tabletools', 'bootstrap-upload', 'fileupload'],
    function ($, util, layer, AppService, AppActiveService, ko, moment) {
    var viewModel = {
        table: null,
        util: util,
        moment: moment,
        app: {
            id: ko.observable(),
            name: ko.observable(),
            zh_name: ko.observable(),
            cp_name: ko.observable(),
            price: ko.observable(),
            network: ko.observable(),
            open_network: ko.observable(''),
            memo: ko.observable(),
            active_id: ko.observable()
        },
        app_file: {
            id: ko.observable(),
            resources_name: ko.observable(''),
            resources_md5: ko.observable(''),
            resources_size: ko.observable(0),
            resources_time: ko.observable()
        },
        app_img_array: ko.observableArray([
            {"index":1,"width":"160","height":"120","showPicUrl": ''},
            {"index":2,"width":"160","height":"120","showPicUrl": ''},
            {"index":3,"width":"160","height":"120","showPicUrl": ''},
            {"index":4,"width":"160","height":"120","showPicUrl": ''}
        ]),
        imgCutArray: ko.observableArray(),
        showCutView: function() {

        },
        afterCut: function() {

        },
        active_name: ko.observable('none'),
        networkOptions: ko.observableArray([{
            name: '联网',
            id: 1
        }, {
            name: '单机',
            id: 0
        }]),
        openForm: function (id) {
            var appLayer = layer.open({
                type: 1,
                title: id ? '修改应用' : '新增应用',
                area: ['600px', '400px'], //宽高
                content: $('#layer_app').html(),
                btn: ['确定', '取消'],
                yes: function () {
                    var form = $('#appForm');
                    form.data('bootstrapValidator').validate();
                    if (form.data('bootstrapValidator').isValid()) {
                        id && viewModel.app.id(id);
                        id || viewModel.app.id(null);
                        if (viewModel.app.open_network() == '1')
                            viewModel.app.open_network(true);
                        else
                            viewModel.app.open_network(false);
                        var deferred = id ? AppService.update(ko.toJSON(viewModel.app)) : AppService.add(ko.toJSON(viewModel.app));
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
                app_zh_name: {
                    validators: {
                        notEmpty: {
                            message: '不能为空'
                        }
                    }
                },
                app_cp_name: {
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
                        },
                        numeric: {}
                    }
                },
                app_open_network: {
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
        openFile: function (id) {
            var fileLayer = layer.open({
                type: 1,
                title: '应用详情',
                area: ['450px'], //宽高
                content: $('#layer_app_file').html(),
                btn: ['确定', '取消'],
                yes: function () {
                    var form = $('#appFileForm');
                    form.data('bootstrapValidator').validate();
                    if (form.data('bootstrapValidator').isValid()) {
                        var vAjaxLoad = layer.load(2);
                        viewModel.app_file.id(id);
                        $.ajaxFileUpload({
                            url: '/app/updateFile?id=' + id,
                            secureuri: false,
                            fileElementId: 'app_file_resource',//file标签的id
                            dataType: 'json',//返回数据的类型
                            success: function(response) {
                                util.ajaxResponse(response, function() {
                                    layer.close(vAjaxLoad);
                                    viewModel.table.draw(false);
                                    util.clearViewModel(viewModel.app_file);
                                    layer.close(fileLayer);
                                });
                            },
                            error: function () {
                                layer.msg('操作失败', {icon: 2});
                                layer.close(vAjaxLoad);
                                layer.close(fileLayer);
                            }
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
        openImg: function (id) {
            var imgLayer = layer.open({
                type: 1,
                title: '应用图片',
                area: ['450px', '400px'], //宽高
                content: $('#layer_app_img').html(),
                btn: ['确定', '取消'],
                yes: function () {
                    var vAjaxLoad = layer.load(2);
                    $.ajaxFileUpload({
                        url: '/app/updateImg?id=' + id,
                        secureuri: false,
                        fileElementId: ['pic1', 'pic2'],//file标签的id
                        dataType: 'json',//返回数据的类型
                        success: function (response) {
                            util.ajaxResponse(response, function () {
                                layer.close(vAjaxLoad);
                                viewModel.table.draw(false);
                                util.clearViewModel(viewModel.app_file);
                                layer.close(imgLayer);
                                layer.close(vAjaxLoad);
                            });
                        },
                        error: function () {
                            layer.msg('操作失败', {icon: 2});
                            layer.close(imgLayer);
                            layer.close(vAjaxLoad);
                        }
                    });
                }
            });
            ko.applyBindings(viewModel, $('#appImgForm')[0]);
            $('#appImgForm').slimScroll({
                height: '100%', //可滚动区域高度
                disableFadeOut: true
            });
        },
        openActive: function(id) {
            var activeLayer = layer.open({
                type: 1,
                title: '选择激活策略',
                area: ['600px', '400px'], //宽高
                content: $('#layer_active').html(),
                btn: ['确定', '取消'],
                yes: function () {
                    var active_id = $('input[name="active_id"]:checked').val();
                    if (!active_id) {
                        layer.msg('请选择激活策略');
                        return;
                    }
                    viewModel.app.id(id);
                    viewModel.app.active_id(active_id);
                    if (viewModel.app.open_network() == '1')
                        viewModel.app.open_network(true);
                    else
                        viewModel.app.open_network(false);
                    var deferred = AppService.update(ko.toJSON(viewModel.app));
                    util.send(deferred, function (response) {
                        viewModel.table.draw(false);
                        layer.close(activeLayer);
                    });
                }
            });
            ko.applyBindings(viewModel, $('#activeBox')[0]);
            $('#active-table').DataTable(merge(true, util.dataTableSettings, {
                ajax: function (data, callback, settings) {
                    var sortParam = util.getSortParam(data, ['name', 'open_count', 'flow', 'stay_days', 'show_time', 'open_network']);
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
                    util.adjustIframeHeight();
                },
                columns: [{
                    data: 'id',
                    orderable: false,
                    render: function (id) {
                        return '<input type="radio" name="active_id" value="'+ id +'"/>';
                    }
                }, {
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
                }]
            }));
        },
        init: function () {
            viewModel.imgCutArray([
                {"index":1,"afterCut": viewModel.afterCut},
                {"index":2,"afterCut": viewModel.afterCut},
                {"index":3,"afterCut": viewModel.afterCut},
                {"index":4,"afterCut": viewModel.afterCut},
                {"index":5,"afterCut": viewModel.afterCut}
            ]);
        }
    };
    $(function () {
        viewModel.table = $('#app-table').DataTable(merge(true, util.dataTableSettings, {
            dom: 'T<"clear">lfrtip',
            ajax: function (data, callback, settings) {
                var sortParam = util.getSortParam(data, ['name', 'zh_name', 'cp_name', 'size', 'price', 'network', 'create_time']);
                util.send(AppService.listByPage(JSON.stringify(merge(true, sortParam, {
                    page: Math.floor(data.start / 10) + 1,
                    pageSize: 10
                }))), function(response) {
                    var returnData = {};
                    var apps = response.data.apps;
                    returnData.draw = data.draw;
                    returnData.recordsTotal = apps.count;
                    returnData.recordsFiltered = apps.count;
                    returnData.data = apps.count == 0 ? [] : JSON.parse(apps.items);
                    callback(returnData);
                });
            },
            drawCallback: function (setting) {
                $('._data_table_update').click(function () {
                    var item = viewModel.table.row($(this).closest('tr')).data();
                    util.clearViewModel(viewModel.app);
                    util.setViewModelData(viewModel.app, item);
                    viewModel.app.open_network(item.open_network + '');
                    viewModel.openForm(item.id);
                });
                $('._data_table_fileinput').click(function () {
                    var item = viewModel.table.row($(this).closest('tr')).data();
                    util.clearViewModel(viewModel.app_file);
                    util.setViewModelData(viewModel.app_file, item);
                    viewModel.openFile(item.id);
                });
                $('._data_table_fileimg').click(function () {
                    var item = viewModel.table.row($(this).closest('tr')).data();
                    viewModel.openImg(item.id);
                });
                $('._data_table_active').click(function () {
                    var item = viewModel.table.row($(this).closest('tr')).data();
                    viewModel.active_name(item.active_name || 'none');
                    util.clearViewModel(viewModel.app);
                    util.setViewModelData(viewModel.app, item);
                    viewModel.app.open_network(item.open_network + '');
                    viewModel.openActive(item.id);
                });
                $('._data_table_remove').click(function () {
                    var item = viewModel.table.row($(this).closest('tr')).data();
                    var confirmLayer = layer.confirm('您确定删除此应用吗？', {
                        btn: ['确定','取消'] //按钮
                    }, function(){
                        util.send(AppService.remove(JSON.stringify({
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
                data: 'zh_name'
            }, {
                data: 'cp_name'
            }, {
                data: 'resources_size',
                render: function(size) {
                    return (size || '') + 'KB';
                }
            }, {
                data: 'price',
                render: function(price) {
                    return '$' + price;
                }
            }, {
                data: 'network',
                render: function(network) {
                    return network == 1 ? '网络' : '单机';
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
                    return '<div class="btn-group">' +
                        '<button type="button" class="_data_table_update btn btn-success">修改</button>' +
                        '<button type="button" class="btn btn-success dropdown-toggle" data-toggle="dropdown">' +
                            '<span class="caret"></span>' +
                        '</button>' +
                        '<ul class="dropdown-menu">' +
                            '<li><a href="#" class="_data_table_fileinput">上传应用</a></li>' +
                            '<li><a href="#" class="_data_table_fileimg">更新图片</a></li>' +
                            '<li><a href="#" class="_data_table_active">设置策略</a></li>' +
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