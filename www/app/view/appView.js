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
require(['jquery', 'util', 'layer', 'appService', 'ko', 'moment', 'merge', 'datatables', 'validator', 'slimScroll', 'datatables-tabletools', 'bootstrap-upload', 'fileupload'],
    function ($, util, layer, AppService, ko, moment) {
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
            open_network: ko.observable(),
            memo: ko.observable(),
            active_open_count: ko.observable(),
            active_flow: ko.observable(),
            active_stay_days: ko.observable(),
            active_show_time: ko.observable(),
            active_open_network: ko.observable(1)
        },
        app_file: {
            id: ko.observable(),
            resources_name: ko.observable('none'),
            resources_md5: ko.observable('none'),
            resources_size: ko.observable('none'),
            resources_time: ko.observable('none')
        },
        app_img_array: ko.observableArray([
            {"index":2,"width":"160","height":"120","showPicUrl": ''},
            {"index":3,"width":"160","height":"120","showPicUrl": ''},
            {"index":4,"width":"160","height":"120","showPicUrl": ''},
            {"index":5,"width":"160","height":"120","showPicUrl": ''}
        ]),
        imgCutArray: ko.observableArray(),
        showCutView: function() {

        },
        afterCut: function() {

        },
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
                },
                app_active_open_count: {
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
                active_open_network: {
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
            viewModel.app.network('1');
            viewModel.app.open_network('1');
            viewModel.app.active_open_network('1');
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
                    var form = $('#appImgForm');
                    form.data('bootstrapValidator').validate();
                    if (form.data('bootstrapValidator').isValid()) {
                        var vAjaxLoad = layer.load(2);
                        $.ajaxFileUpload({
                            url: '/app/updateImg?id=' + id,
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
                            }
                        });
                    }
                }
            });
            ko.applyBindings(viewModel, $('#appImgForm')[0]);
            $('#appImgForm').slimScroll({
                height: '100%', //可滚动区域高度
                disableFadeOut: true
            });
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
        viewModel.table = $('#app-table').DataTable(merge(util.dataTableSettings, {
            dom: 'T<"clear">lfrtip',
            ajax: function (data, callback, settings) {
                var sortParam = util.getSortParam(data, ['name', 'zh_name', 'cp_name', 'size', 'price', 'network', 'create_time']);
                var dataTableLoad = layer.load(2);
                util.send(AppService.listByPage(JSON.stringify(merge(sortParam, {
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
                    layer.close(dataTableLoad);
                }, function () {
                    layer.close(dataTableLoad);
                });
            },
            drawCallback: function (setting) {
                $('._data_table_update').click(function () {
                    var item = viewModel.table.row($(this).closest('tr')).data();
                    util.setViewModelData(viewModel.app, item);
                    viewModel.openForm(item.id);
                });
                $('._data_table_fileinput').click(function () {
                    var item = viewModel.table.row($(this).closest('tr')).data();
                    util.setViewModelData(viewModel.app_file, item);
                    viewModel.openFile(item.id);
                });
                $('._data_table_fileimg').click(function () {
                    var item = viewModel.table.row($(this).closest('tr')).data();
                    viewModel.openImg(item.id);
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
                    return '<button type="button" style="margin-right: 5px" class="_data_table_update btn btn-default fa fa-edit">修改</button>' +
                           '<button type="button" style="margin-right: 5px" class="_data_table_fileinput btn btn-default fa">应用</button>' +
                           '<button type="button" style="margin-right: 5px" class="_data_table_fileimg btn btn-default fa">图片</button>' +
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