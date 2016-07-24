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
require(['jquery', 'util', 'layer', 'appWhiteService', 'modelMgrService', 'resourcesService', 'ko', 'moment', 'merge', 'datatables', 'validator', 'slimScroll', 'datatables-tabletools', 'bootstrap-upload', 'fileupload'],
    function ($, util, layer, AppWhiteService, ModelMgrService, ResourcesService, ko, moment) {
    var viewModel = {
        table: null,
        util: util,
        moment: moment,
        app: {
            id: ko.observable(),
            name: ko.observable(),
            version: ko.observable(),
            brand_id: ko.observable(),
            model_id: ko.observable(),
            version_id: ko.observable(),
            base_version_id: ko.observable()
        },
        model_id: null,
        version_id: null,
        base_version_id: null,
        app_file: {
            id: ko.observable(),
            resources_name: ko.observable(''),
            resources_md5: ko.observable(''),
            resources_size: ko.observable(0),
            resources_time: ko.observable()
        },
        brandOptions: ko.observableArray([]),
        modelOptions: ko.observableArray([]),
        versionOptions: ko.observableArray([]),
        baseOptions: ko.observableArray([]),
        openForm: function (id) {
            var appLayer = layer.open({
                type: 1,
                title: id ? '修改应用' : '新增应用',
                area: ['400px'], //宽高
                content: $('#layer_app').html(),
                btn: ['确定', '取消'],
                yes: function () {
                    var form = $('#appForm');
                    form.data('bootstrapValidator').validate();
                    if (form.data('bootstrapValidator').isValid()) {
                        id && viewModel.app.id(id);
                        id || viewModel.app.id(null);
                        var deferred = id ? AppWhiteService.update(ko.toJSON(viewModel.app)) : AppWhiteService.add(ko.toJSON(viewModel.app));
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
                app_version: {
                    validators: {
                        notEmpty: {
                            message: '不能为空'
                        }
                    }
                },
                app_brand: {
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
                },
                app_mversion: {
                    validators: {
                        notEmpty: {
                            message: '不能为空'
                        }
                    }
                },
                app_base: {
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
                    if (form.data('bootstrapValidator').isValid() && $('#app_file_resource')[0].files[0]) {
                        viewModel.app_file.id(id);
                        ResourcesService.uploadFile([$('#app_file_resource')[0].files[0]]).then(function(resList) {
                            util.send(AppWhiteService.updateFile(JSON.stringify({
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
        initKoSubscribe: function() {
            viewModel.app.brand_id.subscribe(function (newValue) {
                viewModel.modelOptions([]);
                if (typeof newValue != 'undefined' && newValue != null) {
                    util.send(ModelMgrService.modelList(newValue)).then(function (response) {
                        var list = response.data.list;
                        if (list && list.length) {
                            for (var i = 0; i < list.length; i++) {
                                viewModel.modelOptions.push(list[i]);
                            }
                            if (viewModel.model_id) {
                                viewModel.app.model_id(viewModel.model_id);
                                viewModel.model_id = null;
                            }
                        }
                    });
                }
            });
            viewModel.app.model_id.subscribe(function (newValue) {
                viewModel.versionOptions([]);
                if (typeof newValue != 'undefined' && newValue != null) {
                    util.send(ModelMgrService.versionList(newValue)).then(function (response) {
                        var list = response.data.list;
                        if (list && list.length) {
                            for (var i = 0; i < list.length; i++) {
                                viewModel.versionOptions.push(list[i]);
                            }
                            if (viewModel.version_id) {
                                viewModel.app.version_id(viewModel.version_id);
                                viewModel.version_id = null;
                            }
                        }
                    });
                }
            });
            viewModel.app.version_id.subscribe(function (newValue) {
                viewModel.baseOptions([]);
                if (typeof newValue != 'undefined' && newValue != null) {
                    util.send(ModelMgrService.baseVersionList(newValue)).then(function (response) {
                        var list = response.data.list;
                        if (list && list.length) {
                            for (var i = 0; i < list.length; i++) {
                                viewModel.baseOptions.push(list[i]);
                            }
                            if (viewModel.base_version_id) {
                                viewModel.app.base_version_id(viewModel.base_version_id);
                                viewModel.base_version_id = null;
                            }
                        }
                    });
                }
            });
        },
        init: function () {
            util.send(ModelMgrService.brandList()).then(function (response) {
                var list = response.data.list;
                if (list && list.length) {
                    for (var i = 0; i < list.length; i++) {
                        viewModel.brandOptions.push(list[i]);
                    }
                }
            });
            viewModel.initKoSubscribe();
        }
    };
    $(function () {
        viewModel.table = $('#app-table').DataTable(merge(true, util.dataTableSettings, {
            dom: 'T<"clear">lfrtip',
            ajax: function (data, callback, settings) {
                var sortParam = util.getSortParam(data, ['name', 'version', 'create_time']);
                util.send(AppWhiteService.listByPage(JSON.stringify(merge(true, sortParam, {
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
                    viewModel.model_id = item.model_id;
                    viewModel.version_id = item.version_id;
                    viewModel.base_version_id = item.base_version_id;
                    viewModel.app.brand_id(item.brand_id);
                    viewModel.app.id(item.id);
                    viewModel.app.name(item.name);
                    viewModel.app.version(item.version);
                    viewModel.openForm(item.id);
                });
                $('._data_table_fileinput').click(function () {
                    var item = viewModel.table.row($(this).closest('tr')).data();
                    util.clearViewModel(viewModel.app_file);
                    util.setViewModelData(viewModel.app_file, item);
                    viewModel.openFile(item.id);
                });
                $('._data_table_remove').click(function () {
                    var item = viewModel.table.row($(this).closest('tr')).data();
                    var confirmLayer = layer.confirm('您确定删除此应用吗？', {
                        btn: ['确定','取消'] //按钮
                    }, function(){
                        util.send(AppWhiteService.remove(JSON.stringify({
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
                data: 'version'
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