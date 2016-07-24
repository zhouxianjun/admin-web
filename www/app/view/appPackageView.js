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
require(['jquery', 'util', 'layer', 'appPackageService', 'appService', 'packageService', 'modelMgrService', 'ko', 'moment', 'merge', 'datatables', 'validator', 'slimScroll', 'datatables-tabletools', 'select2'],
    function ($, util, layer, AppPackageService, AppService, PackageService, ModelMgrService, ko, moment) {
    var viewModel = {
        table: null,
        util: util,
        moment: moment,
        app: {
            id: ko.observable(),
            name: ko.observable(),
            common: ko.observable('1'),
            root: ko.observable('1'),
            brand_id: ko.observable(),
            model_id: ko.observable(),
            version_id: ko.observable(),
            base_version_id: ko.observable(),
            package_id: ko.observable(),
            pre: ko.observableArray([]),
            install: ko.observableArray([])
        },
        model_id: null,
        version_id: null,
        base_version_id: null,
        pre_app: null,
        install_app: null,
        appPreOptions: ko.observableArray([]),
        appInstallOptions: ko.observableArray([]),
        brandOptions: ko.observableArray([]),
        modelOptions: ko.observableArray([]),
        versionOptions: ko.observableArray([]),
        baseOptions: ko.observableArray([]),
        packageOptions: ko.observableArray([]),
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
        setApp: function (id, type, select, delSelect) {
            util.send(AppPackageService.appAllList(JSON.stringify({
                id: id,
                type: type
            }))).then(function (response) {
                var list = response.data.list;
                if (list && list.length) {
                    var arr = [];
                    for (var i = 0; i < list.length; i++) {
                        arr.push(list[i].id);
                        $(delSelect + ' option[value="'+ list[i].id +'"]').remove();
                    }
                    $(select).val(arr).trigger('change');
                }
            });
        },
        openForm: function (id) {
            var appLayer = layer.open({
                type: 1,
                title: id ? '修改应用包' : '新增应用包',
                area: ['400px', '350px'], //宽高
                content: $('#layer_app').html(),
                btn: ['确定', '取消'],
                yes: function () {
                    var form = $('#appForm');
                    form.data('bootstrapValidator').validate();
                    if (form.data('bootstrapValidator').isValid()) {
                        id && viewModel.app.id(id);
                        id || viewModel.app.id(null);
                        if (viewModel.app.common() == '1')
                            viewModel.app.common(true);
                        else
                            viewModel.app.common(false);
                        if (viewModel.app.root() == '1')
                            viewModel.app.root(true);
                        else
                            viewModel.app.root(false);
                        viewModel.app.pre(viewModel.pre_app.val());
                        viewModel.app.install(viewModel.install_app.val());
                        var deferred = id ? AppPackageService.update(ko.toJSON(viewModel.app)) : AppPackageService.add(ko.toJSON(viewModel.app));
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
                app_common: {
                    validators: {
                        notEmpty: {
                            message: '不能为空'
                        }
                    }
                },
                app_root: {
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
            viewModel.pre_app = $('#pre_select').select2();
            viewModel.install_app = $('#install_select').select2();

            if (id) {
                viewModel.setApp(id, 1, '#pre_select', '#install_select');
                viewModel.setApp(id, 2, '#install_select', '#pre_select');
            }

            $('#pre_select').on('select2:select', function (evt) {
                var arr = viewModel.install_app.val();
                if (arr) {
                    for (var i = 0; i < arr.length; i++) {
                        if (arr[i] == evt.params.data.id) {
                            arr.splice(i, 1);
                            break;
                        }
                    }
                    $('#install_select').val(arr).trigger('change');
                }
                $('#install_select option[value="'+ evt.params.data.id +'"]').remove();
            });
            $('#pre_select').on('select2:unselect', function (evt) {
                $('#install_select').append('<option value="'+ evt.params.data.id +'">'+evt.params.data.text+'</option>');
            });
            $('#install_select').on('select2:select', function (evt) {
                var arr = viewModel.pre_app.val();
                if (arr) {
                    for (var i = 0; i < arr.length; i++) {
                        if (arr[i] == evt.params.data.id) {
                            arr.splice(i, 1);
                            break;
                        }
                    }
                    $('#pre_select').val(arr).trigger('change');
                }
                $('#pre_select option[value="'+ evt.params.data.id +'"]').remove();
            });
            $('#install_select').on('select2:unselect', function (evt) {
                $('#pre_select').append('<option value="'+ evt.params.data.id +'">'+evt.params.data.text+'</option>');
            });
        },
        openPreApp: function(id) {
            layer.open({
                type: 1,
                title: '预置列表',
                area: ['600px', '400px'], //宽高
                content: $('#layer_app_pre_list').html()
            });
            var pre_table = $('#app-pre-table').DataTable(merge(true, util.dataTableSettings, {
                ajax: function (data, callback, settings) {
                    var sortParam = util.getSortParam(data, ['name', 'zh_name', 'cp_name', 'price', 'create_time']);
                    util.send(AppPackageService.listAppByPage(JSON.stringify(merge(true, sortParam, {
                        page: Math.floor(data.start / 10) + 1,
                        pageSize: 10,
                        id: id,
                        type: 1
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
                    $('._app_pre_table_remove').click(function () {
                        var item = pre_table.row($(this).closest('tr')).data();
                        var confirmLayer = layer.confirm('您确定删除此应用的关联吗？', {
                            btn: ['确定','取消'] //按钮
                        }, function(){
                            util.send(AppPackageService.removeApp(JSON.stringify({
                                id: id,
                                app: item.id,
                                type: 1
                            })), function() {
                                pre_table.draw(false);
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
                    data: 'price',
                    render: function (price) {
                        return '$' + price;
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
                        return '<button type="button" class="_app_pre_table_remove btn btn-default fa fa-remove">删除关联</button>';
                    }
                }]
            }));
        },
        openInstallApp: function(id) {
            layer.open({
                type: 1,
                title: '安装列表',
                area: ['600px', '400px'], //宽高
                content: $('#layer_app_install_list').html()
            });
            var install_table = $('#app-install-table').DataTable(merge(true, util.dataTableSettings, {
                ajax: function (data, callback, settings) {
                    var sortParam = util.getSortParam(data, ['name', 'zh_name', 'cp_name', 'price', 'create_time']);
                    util.send(AppPackageService.listAppByPage(JSON.stringify(merge(true, sortParam, {
                        page: Math.floor(data.start / 10) + 1,
                        pageSize: 10,
                        id: id,
                        type: 2
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
                    $('._app_install_table_remove').click(function () {
                        var item = install_table.row($(this).closest('tr')).data();
                        var confirmLayer = layer.confirm('您确定删除此应用的关联吗？', {
                            btn: ['确定','取消'] //按钮
                        }, function(){
                            util.send(AppPackageService.removeApp(JSON.stringify({
                                id: id,
                                app: item.id,
                                type: 2
                            })), function() {
                                install_table.draw(false);
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
                    data: 'price',
                    render: function (price) {
                        return '$' + price;
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
                        return '<button type="button" class="_app_install_table_remove btn btn-default fa fa-remove">删除关联</button>';
                    }
                }]
            }));
        },
        init: function () {
            util.send(AppService.allList()).then(function (response) {
                viewModel.appPreOptions(response.data.list);
                viewModel.appInstallOptions(response.data.list);
            });
            util.send(ModelMgrService.brandList()).then(function (response) {
                var list = response.data.list;
                if (list && list.length) {
                    for (var i = 0; i < list.length; i++) {
                        viewModel.brandOptions.push(list[i]);
                    }
                }
            });
            util.send(PackageService.allList()).then(function (response) {
                viewModel.packageOptions(response.data.list);
            });
            viewModel.initKoSubscribe();
        }
    };
    $(function () {
        viewModel.table = $('#app-table').DataTable(merge(true, util.dataTableSettings, {
            dom: 'T<"clear">lfrtip',
            ajax: function (data, callback, settings) {
                var sortParam = util.getSortParam(data, ['name', 'common', 'app_count', 'app_size', 'create_time']);
                util.send(AppPackageService.listByPage(JSON.stringify(merge(true, sortParam, {
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
                    viewModel.app.common('' + item.common);
                    viewModel.app.root('' + item.root);
                    viewModel.model_id = item.model_id;
                    viewModel.version_id = item.version_id;
                    viewModel.base_version_id = item.base_version_id;
                    viewModel.app.brand_id(item.brand_id);
                    viewModel.app.id(item.id);
                    viewModel.app.name(item.name);
                    viewModel.app.package_id(item.package_id);
                    viewModel.openForm(item.id);
                });
                $('._data_table_app_pre').click(function () {
                    var item = viewModel.table.row($(this).closest('tr')).data();
                    viewModel.openPreApp(item.id);
                });
                $('._data_table_app_install').click(function () {
                    var item = viewModel.table.row($(this).closest('tr')).data();
                    viewModel.openInstallApp(item.id);
                });
                $('._data_table_remove').click(function () {
                    var item = viewModel.table.row($(this).closest('tr')).data();
                    var confirmLayer = layer.confirm('您确定删除此应用包吗？', {
                        btn: ['确定','取消'] //按钮
                    }, function(){
                        util.send(AppPackageService.remove(JSON.stringify({
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
                data: 'common',
                render: function (common) {
                    return common ? '是' : '否';
                }
            }, {
                data: 'app_count'
            }, {
                data: 'app_size',
                render: function (app_size) {
                    return (app_size || 0) + 'KB';
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
                            '<li><a href="#" class="_data_table_app_pre">预置应用</a></li>' +
                            '<li><a href="#" class="_data_table_app_install">安装应用</a></li>' +
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