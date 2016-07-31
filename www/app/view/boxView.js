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
require(['jquery', 'util', 'layer', 'boxService', 'ko', 'moment', 'merge', 'datatables', 'validator', 'slimScroll', 'datatables-tabletools', 'fileupload'],
    function ($, util, layer, BoxService, ko, moment) {
    var viewModel = {
        table: null,
        box: {
            id: ko.observable(),
            box_id: ko.observable(),
            status: ko.observable(1),
            province_id: ko.observable(),
            city_id: ko.observable()
        },
        version: {
            box: ko.observable(),
            version_code: ko.observable(),
            version: ko.observable(),
            version_desc: ko.observable()
        },
        version_show: {
            version_code: ko.observable(),
            version: ko.observable(),
            desc: ko.observable(),
            resource: ko.observable(),
            resource_id: ko.observable()
        },
        provinceOptions: ko.observableArray(),
        cityOptions: ko.observableArray(),
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
                        var deferred = id ? BoxService.update(ko.toJSON(viewModel.box)) : BoxService.add(ko.toJSON(viewModel.box));
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
            $('#boxForm').slimScroll({
                height: '100%', //可滚动区域高度
                disableFadeOut: true
            });
        },
        openVersion: function (id) {
            var versionLayer = layer.open({
                type: 1,
                title: '更新版本',
                area: ['450px'], //宽高
                content: $('#layer_version').html(),
                btn: ['确定', '取消'],
                yes: function () {
                    var form = $('#versionForm');
                    form.data('bootstrapValidator').validate();
                    if (form.data('bootstrapValidator').isValid()) {
                        var vAjaxLoad = layer.load(2);
                        viewModel.version.box = id;
                        $.ajaxFileUpload({
                            url: '/box/updateVersion?' + $.param(ko.toJS(viewModel.version)),
                            secureuri: false,
                            fileElementId: 'version_version_resource',//file标签的id
                            dataType: 'json',//返回数据的类型
                            success: function(response) {
                                util.ajaxResponse(response, function() {
                                    layer.close(vAjaxLoad);
                                    viewModel.table.draw(false);
                                    util.clearViewModel(viewModel.version);
                                    layer.close(versionLayer);
                                });
                            },
                            error: function () {
                                layer.msg('操作失败', {icon: 2});
                            }
                        });
                    }
                }
            });
            util.initValidForm($('#versionForm'), {
                version_version: {
                    validators: {
                        notEmpty: {
                            message: '不能为空'
                        }
                    }
                },
                version_version_code: {
                    validators: {
                        notEmpty: {
                            message: '不能为空'
                        }
                    }
                },
                version_version_resource: {
                    validators: {
                        notEmpty: {
                            message: '不能为空'
                        }
                    }
                }
            });
            id || util.clearViewModel(viewModel.version);
            ko.applyBindings(viewModel, $('#versionForm')[0]);
            $('#versionForm').slimScroll({
                height: '100%', //可滚动区域高度
                disableFadeOut: true
            });
        },
        initKoSubscribe: function() {
            viewModel.box.province_id.subscribe(function (newValue) {
                viewModel.cityOptions([]);
                if (typeof newValue != 'undefined') {
                    viewModel.cityOptions(util.loadCityList(newValue));
                }
            });
        },
        init: function () {
            viewModel.provinceOptions(util.loadProvinceList());
            viewModel.initKoSubscribe();
        }
    };
    $(function () {
        util.tableToolsButton();
        viewModel.table = $('#box-table').DataTable(merge(true, util.dataTableSettings, {
            dom: 'T<"clear">lfrtip',
            ajax: function (data, callback, settings) {
                var sortParam = util.getSortParam(data, ['box_id', 'ow', 'version', 'status', 'province_id', 'city_id', 'create_time', 'update_time']);
                util.send(BoxService.listByPage(ko.toJSON(merge(true, sortParam, {
                    page: Math.floor(data.start / 10) + 1,
                    pageSize: 10
                }))), function(response) {
                    var returnData = {};
                    var boxs = response.data.boxs;
                    returnData.draw = data.draw;
                    returnData.recordsTotal = boxs.count;
                    returnData.recordsFiltered = boxs.count;
                    returnData.data = boxs.count == 0 ? [] : JSON.parse(boxs.items);
                    callback(returnData);
                });
            },
            drawCallback: function (setting) {
                $('._data_table_update').click(function () {
                    var item = viewModel.table.row($(this).closest('tr')).data();
                    util.setViewModelData(viewModel.box, item);
                    viewModel.openForm(item.id);
                });
                $('._data_table_fileinput').click(function () {
                    var item = viewModel.table.row($(this).closest('tr')).data();
                    viewModel.openVersion(item.id);
                });
                $('._data_table_remove').click(function () {
                    var item = viewModel.table.row($(this).closest('tr')).data();
                    var confirmLayer = layer.confirm('您确定删除此盒子吗？', {
                        btn: ['确定','取消'] //按钮
                    }, function(){
                        util.send(BoxService.remove(ko.toJSON({
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
                data: 'box_id'
            }, {
                data: 'ow'
            }, {
                data: 'version',
                render: function (version, sn, data) {
                    if (!version) return '';
                    return '<a target="_blank" class="fa fa-download" href="/resources/downloadByVersion?id=' + data.version_id + '">&nbsp;' + version + '</a>';
                }
            }, {
                data: 'status',
                render: util.RENDER.STATUS
            }, {
                data: 'province_id',
                render: function(province_id) {
                    return util.getProvinceNameById(province_id);
                }
            }, {
                data: 'city_id',
                render: function(city_id) {
                    return util.getCityNameById(city_id);
                }
            }, {
                data: 'create_time',
                render: function(create_time) {
                    return moment(create_time).format('YYYY-MM-DD HH:mm:ss');
                }
            }, {
                data: 'update_time',
                render: function(update_time) {
                    return moment(update_time).format('YYYY-MM-DD HH:mm:ss');
                }
            }, {
                data: null,
                orderable: false,
                render: function(data) {
                    return '<button type="button" style="margin-right: 5px" class="_data_table_update btn btn-default fa fa-edit">修改</button>' +
                           '<button type="button" style="margin-right: 5px" class="_data_table_fileinput btn btn-default fa">版本</button>' +
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