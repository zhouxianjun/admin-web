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
require(['jquery', 'util', 'layer', 'requirePackageService', 'appRequireService', 'ko', 'moment', 'merge', 'datatables', 'validator', 'slimScroll', 'datatables-tabletools', 'select2'],
    function ($, util, layer, RequirePackageService, AppRequireService, ko, moment) {
    var viewModel = {
        table: null,
        util: util,
        moment: moment,
        app: {
            id: ko.observable(),
            name: ko.observable(),
            android_version: ko.observable(),
            root: ko.observable('1'),
            pre: ko.observableArray([]),
            install: ko.observableArray([])
        },
        pre_app: null,
        install_app: null,
        appPreOptions: ko.observableArray([]),
        appInstallOptions: ko.observableArray([]),
        appRequireAppType: [{
            name: 'APK',
            id: 1
        }, {
            name: 'BIN',
            id: 2
        }, {
            name: '脚本',
            id: 3
        }, {
            name: '配置文件',
            id: 4
        }, {
            name: '其他',
            id: 5
        }],
        initKoSubscribe: function() {
        },
        setApp: function (id, type, select, delSelect) {
            util.send(RequirePackageService.appAllList(JSON.stringify({
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
                title: id ? '修改必刷包' : '新增必刷包',
                area: ['400px', '350px'], //宽高
                content: $('#layer_app').html(),
                btn: ['确定', '取消'],
                yes: function () {
                    var form = $('#appForm');
                    form.data('bootstrapValidator').validate();
                    if (form.data('bootstrapValidator').isValid()) {
                        id && viewModel.app.id(id);
                        id || viewModel.app.id(null);
                        if (viewModel.app.root() == '1')
                            viewModel.app.root(true);
                        else
                            viewModel.app.root(false);
                        viewModel.app.pre(viewModel.pre_app.val());
                        viewModel.app.install(viewModel.install_app.val());
                        var deferred = id ? RequirePackageService.update(ko.toJSON(viewModel.app)) : RequirePackageService.add(ko.toJSON(viewModel.app));
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
                app_android_version: {
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
                    var sortParam = util.getSortParam(data, ['name', 'type', 'create_time']);
                    util.send(RequirePackageService.listAppByPage(JSON.stringify(merge(true, sortParam, {
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
                            util.send(RequirePackageService.removeApp(JSON.stringify({
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
                    data: 'type',
                    render: function (type) {
                        var arr = viewModel.appRequireAppType;
                        for (var i = 0; i < arr.length; i++) {
                            if (arr[i].id == type)
                                return arr[i].name;
                        }
                        return '';
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
                    var sortParam = util.getSortParam(data, ['name', 'type', 'create_time']);
                    util.send(RequirePackageService.listAppByPage(JSON.stringify(merge(true, sortParam, {
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
                            util.send(RequirePackageService.removeApp(JSON.stringify({
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
                    data: 'type',
                    render: function (type) {
                        var arr = viewModel.appRequireAppType;
                        for (var i = 0; i < arr.length; i++) {
                            if (arr[i].id == type)
                                return arr[i].name;
                        }
                        return '';
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
            util.send(AppRequireService.allList()).then(function (response) {
                viewModel.appPreOptions(response.data.list);
                viewModel.appInstallOptions(response.data.list);
            });
            viewModel.initKoSubscribe();
        }
    };
    $(function () {
        viewModel.table = $('#app-table').DataTable(merge(true, util.dataTableSettings, {
            dom: 'T<"clear">lfrtip',
            ajax: function (data, callback, settings) {
                var sortParam = util.getSortParam(data, ['name', 'android_version', 'app_count', 'app_size', 'create_time']);
                util.send(RequirePackageService.listByPage(JSON.stringify(merge(true, sortParam, {
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
                    viewModel.app.root(item.root + '');
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
                        util.send(RequirePackageService.remove(JSON.stringify({
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
                data: 'android_version'
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