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
require(['jquery', 'util', 'layer', 'modelMgrService', 'ko', 'moment', 'merge', 'datatables', 'validator', 'slimScroll', 'datatables-tabletools'],
    function ($, util, layer, ModelMgrService, ko, moment) {
    var viewModel = {
        brand_table: null,
        model_table: null,
        version_table: null,
        base_version_table: null,
        addBrand: function() {
            var prompt = layer.prompt({
                title: '请输入品牌名称'
            }, function(val){
                var ajax = ModelMgrService.addBrand(JSON.stringify({
                    name: val
                }));
                util.send(ajax, function (response) {
                    viewModel.brand_table.draw(false);
                    layer.close(prompt);
                    util.adjustIframeHeight();
                });
            });
        },
        addModel: function(id) {
            var prompt = layer.prompt({
                title: '请输入型号名称'
            }, function(val){
                var ajax = ModelMgrService.addModel(JSON.stringify({
                    name: val,
                    brand: id
                }));
                util.send(ajax, function (response) {
                    viewModel.model_table.draw(false);
                    layer.close(prompt);
                    util.adjustIframeHeight();
                });
            });
        },
        addVersion: function(id) {
            var prompt = layer.prompt({
                title: '请输入版本名称'
            }, function(val){
                var ajax = ModelMgrService.addVersion(JSON.stringify({
                    name: val,
                    model: id
                }));
                util.send(ajax, function (response) {
                    viewModel.version_table.draw(false);
                    layer.close(prompt);
                    util.adjustIframeHeight();
                });
            });
        },
        addBaseVersion: function(id) {
            var prompt = layer.prompt({
                title: '请输入基带名称'
            }, function(val){
                var ajax = ModelMgrService.addBaseVersion(JSON.stringify({
                    name: val,
                    version: id
                }));
                util.send(ajax, function (response) {
                    viewModel.base_version_table.draw(false);
                    layer.close(prompt);
                    util.adjustIframeHeight();
                });
            });
        },
        init: function () {
        }
    };
    $(function () {
        var brand = null, model = null, version = null;
        viewModel.brand_table = $('#brand-table').DataTable(merge(true, util.dataTableSettings, {
            pagingType: 'simple',
            ajax: function (data, callback, settings) {
                var sortParam = util.getSortParam(data, ['name']);
                util.send(ModelMgrService.brandByPage(JSON.stringify(merge(true, sortParam, {
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
                $('._brand_table_model').click(function () {
                    var item = viewModel.brand_table.row($(this).closest('tr')).data();
                    viewModel.addModel(item.id);
                });
                $('._brand_table_remove').click(function () {
                    var item = viewModel.brand_table.row($(this).closest('tr')).data();
                    util.send(ModelMgrService.removeBrand(JSON.stringify({
                        id: item.id
                    })), function (response) {
                        viewModel.brand_table.draw(false);
                        layer.close(prompt);
                        util.adjustIframeHeight();
                    });
                });
                util.adjustIframeHeight();
            },
            createdRow: function ( row, data, index ) {
                $(row).click(function () {
                    var newid = viewModel.brand_table.row(this).data().id;
                    if (newid == brand) return;
                    brand = newid;
                    viewModel.model_table.draw(true);
                });
            },
            columns: [{
                data: 'name'
            }, {
                data: null,
                orderable: false,
                render: function(data) {
                    return '<div class="btn-group">' +
                        '<button type="button" class="btn btn-success dropdown-toggle" data-toggle="dropdown">' +
                        '<span class="caret"></span>' +
                        '</button>' +
                        '<ul class="dropdown-menu">' +
                        '<li><a href="#" class="_brand_table_model">添加型号</a></li>' +
                        '<li><a href="#" class="_brand_table_remove">删除</a></li>' +
                        '</ul>' +
                        '</div>';
                }
            }]
        }));

        viewModel.model_table = $('#model-table').DataTable(merge(true, util.dataTableSettings, {
            pagingType: 'simple',
            ajax: function (data, callback, settings) {
                var sortParam = util.getSortParam(data, ['name']);
                util.send(ModelMgrService.modelByPage(JSON.stringify(merge(true, sortParam, {
                    page: Math.floor(data.start / 10) + 1,
                    pageSize: 10,
                    brand: brand
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
                $('._model_table_model').click(function () {
                    var item = viewModel.model_table.row($(this).closest('tr')).data();
                    viewModel.addVersion(item.id);
                });
                $('._model_table_remove').click(function () {
                    var item = viewModel.model_table.row($(this).closest('tr')).data();
                    util.send(ModelMgrService.removeModel(JSON.stringify({
                        id: item.id
                    })), function (response) {
                        viewModel.model_table.draw(false);
                        layer.close(prompt);
                        util.adjustIframeHeight();
                    });
                });
                util.adjustIframeHeight();
            },
            createdRow: function ( row, data, index ) {
                $(row).click(function () {
                    var newid = viewModel.model_table.row(this).data().id;
                    if (newid == model) return;
                    model = newid;
                    viewModel.version_table.draw(true);
                });
            },
            columns: [{
                data: 'name'
            }, {
                data: null,
                orderable: false,
                render: function(data) {
                    return '<div class="btn-group">' +
                        '<button type="button" class="btn btn-success dropdown-toggle" data-toggle="dropdown">' +
                        '<span class="caret"></span>' +
                        '</button>' +
                        '<ul class="dropdown-menu">' +
                        '<li><a href="#" class="_model_table_model">添加版本</a></li>' +
                        '<li><a href="#" class="_model_table_remove">删除</a></li>' +
                        '</ul>' +
                        '</div>';
                }
            }]
        }));

        viewModel.version_table = $('#version-table').DataTable(merge(true, util.dataTableSettings, {
            pagingType: 'simple',
            ajax: function (data, callback, settings) {
                var sortParam = util.getSortParam(data, ['name']);
                util.send(ModelMgrService.versionByPage(JSON.stringify(merge(true, sortParam, {
                    page: Math.floor(data.start / 10) + 1,
                    pageSize: 10,
                    model: model
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
                $('._version_table_model').click(function () {
                    var item = viewModel.version_table.row($(this).closest('tr')).data();
                    viewModel.addBaseVersion(item.id);
                });
                $('._version_table_remove').click(function () {
                    var item = viewModel.version_table.row($(this).closest('tr')).data();
                    util.send(ModelMgrService.removeVersion(JSON.stringify({
                        id: item.id
                    })), function (response) {
                        viewModel.version_table.draw(false);
                        layer.close(prompt);
                        util.adjustIframeHeight();
                    });
                });
                util.adjustIframeHeight();
            },
            createdRow: function ( row, data, index ) {
                $(row).click(function () {
                    var newid = viewModel.version_table.row(this).data().id;
                    if (newid == version) return;
                    version = newid;
                    viewModel.base_version_table.draw(true);
                });
            },
            columns: [{
                data: 'name'
            }, {
                data: null,
                orderable: false,
                render: function(data) {
                    return '<div class="btn-group">' +
                        '<button type="button" class="btn btn-success dropdown-toggle" data-toggle="dropdown">' +
                        '<span class="caret"></span>' +
                        '</button>' +
                        '<ul class="dropdown-menu">' +
                        '<li><a href="#" class="_version_table_model">添加基带</a></li>' +
                        '<li><a href="#" class="_version_table_remove">删除</a></li>' +
                        '</ul>' +
                        '</div>';
                }
            }]
        }));

        viewModel.base_version_table = $('#base-table').DataTable(merge(true, util.dataTableSettings, {
            pagingType: 'simple',
            ajax: function (data, callback, settings) {
                var sortParam = util.getSortParam(data, ['name']);
                util.send(ModelMgrService.baseVersionByPage(JSON.stringify(merge(true, sortParam, {
                    page: Math.floor(data.start / 10) + 1,
                    pageSize: 10,
                    version: version
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
                $('._base_table_remove').click(function () {
                    var item = viewModel.base_version_table.row($(this).closest('tr')).data();
                    util.send(ModelMgrService.removeBaseVersion(JSON.stringify({
                        id: item.id
                    })), function (response) {
                        viewModel.base_version_table.draw(false);
                        layer.close(prompt);
                        util.adjustIframeHeight();
                    });
                });
                util.adjustIframeHeight();
            },
            columns: [{
                data: 'name'
            }, {
                data: null,
                orderable: false,
                render: function(data) {
                    return '<button type="button" class="_base_table_remove btn btn-default fa fa-remove">删除</button>';
                }
            }]
        }));
        viewModel.init();
        ko.applyBindings(viewModel);
        util.adjustIframeHeight();
        $.fn.dataTable.ext.errMode = function(s,h,m){};
    });
});