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
require(['jquery', 'util', 'layer', 'permissionsService', 'ko', 'dhtmlx', 'validator', 'slimScroll'], function ($, util, layer, PermissionsService, ko) {
    var viewModel = {
        user: {
            id: ko.observable(),
            username: ko.observable(),
            real_name: ko.observable(),
            company: ko.observable(),
            name: ko.observable(),
            phone: ko.observable(),
            province_id: ko.observable(),
            city_id: ko.observable(),
            status: ko.observable(),
            email: ko.observable(),
            pid: ko.observable()
        },
        provinceText: ko.observable(),
        cityText: ko.observable(),
        provinceOptions: ko.observableArray(),
        cityOptions: ko.observableArray(),
        formTitle: ko.observable(''),
        statusOptions: ko.observableArray([{
            name: '启用',
            id: 1
        }, {
            name: '禁用',
            id: 0
        }]),
        initKoSubscribe: function() {
            viewModel.user.province_id.subscribe(function (newValue) {
                viewModel.cityOptions([]);
                if (typeof newValue != 'undefined') {
                    viewModel.cityOptions(util.loadCityList(newValue));
                }
            });
        },
        init: function () {
            viewModel.provinceOptions(util.loadProvinceList());
            viewModel.initKoSubscribe();
        },
        updateGrid: function (myTreeGrid, rowId) {
            myTreeGrid.cells(rowId, 1).setValue(viewModel.user.real_name());
            myTreeGrid.setRowAttribute(rowId, 'real_name', viewModel.user.real_name());
            myTreeGrid.cells(rowId, 2).setValue(viewModel.user.company());
            myTreeGrid.setRowAttribute(rowId, 'company', viewModel.user.company());
            myTreeGrid.cells(rowId, 3).setValue(viewModel.user.email());
            myTreeGrid.setRowAttribute(rowId, 'email', viewModel.user.email());
            myTreeGrid.cells(rowId, 5).setValue(viewModel.user.username());
            myTreeGrid.setRowAttribute(rowId, 'username', viewModel.user.username());
            myTreeGrid.cells(rowId, 6).setValue(viewModel.user.name());
            myTreeGrid.setRowAttribute(rowId, 'name', viewModel.user.name());
            myTreeGrid.cells(rowId, 7).setValue(viewModel.user.phone());
            myTreeGrid.setRowAttribute(rowId, 'phone', viewModel.user.phone());
            myTreeGrid.cells(rowId, 8).setValue(viewModel.user.province_id());
            myTreeGrid.setRowAttribute(rowId, 'province_id', viewModel.user.province_id());
            myTreeGrid.cells(rowId, 9).setValue(viewModel.user.city_id());
            myTreeGrid.setRowAttribute(rowId, 'city_id', viewModel.user.city_id());
            myTreeGrid.cells(rowId, 10).setValue(viewModel.user.status());
            myTreeGrid.setRowAttribute(rowId, 'status', viewModel.user.status());
            myTreeGrid.cells(rowId, 11).setValue(new Date().getTime());
        },
        clearAddForm: function () {
            viewModel.user.id('');
            viewModel.user.username('');
            viewModel.user.real_name('');
            viewModel.user.company('');
            viewModel.user.name('');
            viewModel.user.phone('');
            viewModel.user.province_id('');
            viewModel.user.city_id('');
            viewModel.user.status('');
            viewModel.user.email('');
            viewModel.user.pid('');
        },
        addOrUpdate: function (update, rowId, myTreeGrid, form, lwin) {
            var deferred = update ? PermissionsService.updateUser(ko.toJSON(viewModel.user)) : PermissionsService.addUser(ko.toJSON(viewModel.user));
            util.send(deferred, function (response) {
                if (update) {
                    viewModel.updateGrid(myTreeGrid, rowId);
                    myTreeGrid._h2.forEachChild(rowId, function(element){
                        myTreeGrid.cellById(element.id, 7).setValue(viewModel.user.status());
                    });
                } else {
                    myTreeGrid.addRow(response.data.id, [
                        response.data.id, viewModel.user.real_name(), viewModel.user.company(),
                        viewModel.user.email(), '', viewModel.user.username(), viewModel.user.name(),
                        viewModel.user.phone(), viewModel.user.province_id(), viewModel.user.city_id(),
                        viewModel.user.status(), new Date().getTime()], 0, rowId);
                    viewModel.updateGrid(myTreeGrid, response.data.id);
                    if (rowId > 0) {
                        myTreeGrid.setRowAttribute(response.data.id, 'id', response.data.id);
                        myTreeGrid.openItem(rowId);
                        myTreeGrid.setItemImage(rowId, '/plugins/dhtmlx/imgs/dhxgrid_skyblue/tree/folder.gif');
                    }
                }
                form.bootstrapValidator('resetForm', true);
                layer.close(lwin);
            }, function () {
                form.bootstrapValidator('disableSubmitButtons', false);
            });
        },
        openUserForm: function (update, rowId, myTreeGrid, id) {
            var lwin = layer.open({
                type: 1,
                title: update ? '修改用户' : '新增用户',
                area: ['500px', '400px'], //宽高
                content: $('#layer_add_user').html(),
                btn: ['确定', '取消'],
                yes: function () {
                    var form = $('#addUserForm');
                    form.data('bootstrapValidator').validate();
                    if (form.data('bootstrapValidator').isValid()) {
                        viewModel.addOrUpdate(update, rowId, myTreeGrid, form, lwin);
                    }
                }
            });
            if (update) {
                viewModel.user.id(id);
                viewModel.user.username(myTreeGrid.getRowAttribute(rowId, 'username'));
                viewModel.user.real_name(myTreeGrid.getRowAttribute(rowId, 'real_name'));
                viewModel.user.company(myTreeGrid.getRowAttribute(rowId, 'company'));
                viewModel.user.name(myTreeGrid.getRowAttribute(rowId, 'name'));
                viewModel.user.phone(myTreeGrid.getRowAttribute(rowId, 'phone'));
                viewModel.user.province_id(myTreeGrid.getRowAttribute(rowId, 'province_id'));
                viewModel.user.city_id(myTreeGrid.getRowAttribute(rowId, 'city_id'));
                viewModel.user.status(myTreeGrid.getRowAttribute(rowId, 'status'));
                viewModel.user.email(myTreeGrid.getRowAttribute(rowId, 'email'));
            } else {
                viewModel.clearAddForm();
                viewModel.user.pid(id);
            }
            util.initValidForm($('#addUserForm'), {
                user_username: {
                    validators: {
                        notEmpty: {
                            message: '不能为空'
                        },
                        stringLength: {
                            min: 3,
                            max: 20,
                            message: '必须是3～20个字符之间'
                        },
                        regexp: {
                            regexp: /^[a-zA-Z0-9_]{3,16}$/,
                            message: '只能为字母数字字符或下划线'
                        }
                    }
                },
                user_name: {
                    validators: {
                        notEmpty: {
                            message: '不能为空'
                        }
                    }
                },
                user_phone: {
                    validators: {
                        regexp: {
                            regexp: /(^(\d{3,4}-)?\d{7,8})$|(13[0-9]{9})/,
                            message: '请输入正确的电话与手机号码'
                        }
                    }
                },
                user_real_name: {
                    validators: {
                        regexp: {
                            regexp: /[\u4E00-\u9FA5]{2,5}(?:·[\u4E00-\u9FA5]{2,5})*/,
                            message: '请输入正确姓名'
                        }
                    }
                },
                user_province: {
                    validators: {
                        notEmpty: {
                            message: '不能为空'
                        }
                    }
                },
                user_city: {
                    validators: {
                        notEmpty: {
                            message: '不能为空'
                        }
                    }
                },
                user_email: {
                    validators: {
                        email: {
                            message: '请输入正确到邮箱地址'
                        }
                    }
                },
                user_status: {
                    validators: {
                        notEmpty: {
                            message: '不能为空'
                        }
                    }
                }
            });
            ko.applyBindings(viewModel, $('#addUserForm')[0]);
            $('#addUserForm').slimScroll({
                height: '100%', //可滚动区域高度
                disableFadeOut: true
            });
        }
    };
    viewModel.init();
    $(function () {
        layer.load(2);
        var myTreeGrid = new dhtmlXGridObject('tree_user');
        myTreeGrid.setImagePath('/plugins/dhtmlx/imgs/');
        myTreeGrid.setHeader('ID,real_name,company,email,,用户名,名称,电话,省,市,状态,创建时间');
        myTreeGrid.setColumnIds('id,real_name,company,email,tree,username,name,phone,province_id,city_id,status,create_time');
        myTreeGrid.setColAlign('left,left,left,left,left,center,center,center,center,center,center,center');
        myTreeGrid.setColTypes('ro,ro,ro,ro,tree,ro,ro,ro,combo,combo,combo,ltro');
        myTreeGrid.setColumnHidden(0, true);
        myTreeGrid.setColumnHidden(1, true);
        myTreeGrid.setColumnHidden(2, true);
        myTreeGrid.setColumnHidden(3, true);
        myTreeGrid.enableDragAndDrop(true);
        myTreeGrid.enableTreeGridLines();
        myTreeGrid.enableTreeCellEdit(false);
        myTreeGrid.enableAutoHeight(true, 0, true);
        myTreeGrid.setEditable(false);
        var menu = new dhtmlXMenuObject({
            icons_path: '/plugins/dhtmlx/imgs/dhxmenu_skyblue/',
            context: true,
            items: [
                {id: 'add', text: '新增'},
                {id: 'update', text: '修改'}
            ]
        });
        menu.attachEvent("onClick", function(id, zoneId, cas) {
            var rowId = myTreeGrid.contextID.split('_')[0];
            var myId = myTreeGrid.getRowAttribute(rowId, 'id');
            if (id == 'add') {
                //捕获页
                viewModel.openUserForm(false, rowId, myTreeGrid, myId);
            } else if (id == 'update') {
                viewModel.openUserForm(true, rowId, myTreeGrid, myId);
            }
            myTreeGrid.selectRowById(rowId);
        });
        myTreeGrid.attachEvent("onDrag", function(sId,tId,sObj,tObj,sInd,tInd){
            var id = myTreeGrid.getRowAttribute(sId, 'id');
            var pid = myTreeGrid.getRowAttribute(tId, 'id');
            var parentId = myTreeGrid.getParentId(sId);
            layer.load(2);
            var ajax = PermissionsService.updateUser(JSON.stringify({
                id: id,
                pid: pid
            }));
            util.send(ajax, function (response) {
                if (!myTreeGrid.hasChildren(parentId)) {
                    myTreeGrid.setItemImage(parentId, '/plugins/dhtmlx/imgs/dhxgrid_skyblue/tree/leaf.gif');
                    myTreeGrid.setRowAttribute(parentId, 'tree', {
                        image: 'leaf.gif'
                    });
                }
                if (myTreeGrid.hasChildren(tId)) {
                    myTreeGrid.setItemImage(tId, '/plugins/dhtmlx/imgs/dhxgrid_skyblue/tree/folder.gif');
                    myTreeGrid.setRowAttribute(tId, 'tree', {
                        image: 'folder.gif'
                    });
                }
                layer.closeAll('loading');
            }, function () {
                layer.closeAll('loading');
            });
            return true;
        });
        myTreeGrid.enableContextMenu(menu);
        myTreeGrid.init();
        util.initStatusCombo(myTreeGrid.getColumnCombo(10));
        util.initProvinceCombo(myTreeGrid.getColumnCombo(8));
        util.initCityCombo(myTreeGrid.getColumnCombo(9));
        myTreeGrid.load('/permissions/users', function () {
            layer.closeAll('loading');
            myTreeGrid.expandAll();
            ko.applyBindings(viewModel);
            var count = myTreeGrid.getRowsNum();
            if (!count || count <= 0) {
                viewModel.openUserForm(false, 0, myTreeGrid, 1);
            }
        }, 'js');
        util.adjustIframeHeight();
    });
});