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
require(['jquery', 'util', 'layer', 'permissionsService', 'ko', 'dhtmlx', 'validator', 'slimScroll'],
    function ($, util, layer, PermissionsService, ko) {
    var viewModel = {
        menu: {
            name: ko.observable(),
            seq: ko.observable(0),
            path: ko.observable(''),
            status: ko.observable(1),
            target: ko.observable(),
            icon: ko.observable(''),
            pid: ko.observable(),
            show: ko.observable(1)
        },
        statusOptions: ko.observableArray([{
            name: '启用',
            id: 1
        }, {
            name: '禁用',
            id: 0
        }]),
        openAddMenu: function (isRoot) {
            var rowId = isRoot || viewModel.grid.contextID.split('_')[0];
            var pid = isRoot || viewModel.grid.getRowAttribute(rowId, 'id');
            viewModel.menu.pid(isRoot ? 0 : pid);
            //捕获页
            var addLayer = layer.open({
                type: 1,
                title: '新增菜单',
                area: ['500px', '400px'], //宽高
                content: $('#layer_add_menu').html(),
                btn: ['确定', '取消'],
                yes: function () {
                    var form = $('#addMenuForm');
                    form.data('bootstrapValidator').validate();
                    if (form.data('bootstrapValidator').isValid()) {
                        var deferred = PermissionsService.addMenu(ko.toJSON(viewModel.menu));
                        util.send(deferred, function (response) {
                            viewModel.grid.addRow(response.data.id, [
                                response.data.id, '', viewModel.menu.seq(), viewModel.menu.name(), viewModel.menu.path(),
                                viewModel.menu.status(), viewModel.menu.show(), viewModel.menu.target(), viewModel.menu.icon()],0,isRoot ? 0 : rowId);
                            isRoot || viewModel.grid.openItem(rowId);
                            viewModel.grid.setRowAttribute(response.data.id, 'id', response.data.id);
                            form.data('bootstrapValidator').resetForm(true);
                            layer.close(addLayer);
                            util.adjustIframeHeight();
                        });
                    }
                }
            });
            util.initValidForm($('#addMenuForm'), {
                menu_name: {
                    validators: {
                        notEmpty: {
                            message: '菜单名不能为空'
                        }
                    }
                },
                menu_seq: {
                    validators: {
                        notEmpty: {
                            message: '序号不能为空'
                        },
                        integer: {
                            message: '必须是数字'
                        }
                    }
                },
                menu_status: {
                    validators: {
                        notEmpty: {
                            message: '状态不能为空'
                        }
                    }
                },
                menu_show: {
                    validators: {
                        notEmpty: {
                            message: '不能为空'
                        }
                    }
                }
            });
            ko.applyBindings(viewModel, $('#addMenuForm')[0]);
            $('#addMenuForm').slimScroll({
                height: '100%', //可滚动区域高度
                disableFadeOut: true
            });
        },
        openInterface: function(id) {
            var tree;
            var interfaceswin = layer.open({
                type: 1,
                title: '设置菜单接口',
                area: ['300px', '400px'], //宽高
                content: $('#show_interfaces').html(),
                btn: ['确定', '取消'],
                yes: function () {
                    var setInterfaceLoad = layer.load(2);
                    util.send(PermissionsService.setInterfaces(ko.toJSON({
                        id: id,
                        interfaces: tree.getAllChecked().split(',')
                    })), function() {
                        layer.close(setInterfaceLoad);
                        layer.close(interfaceswin);
                    }, function() {
                        layer.close(setInterfaceLoad);
                    });
                }
            });
            util.send(PermissionsService.interfacesBySetMenu(ko.toJSON({menu: id})), function(response) {
                var checked = [];
                (function(fn) {
                    response = fn.call(fn, response.data.interfaces);
                })(function(data) {
                    var items = [];
                    for (var i = 0; i < data.length; i++) {
                        items.push({
                            id: data[i].id,
                            text: data[i].name,
                            item: (data[i].rows && data[i].rows.length) ? this.call(this, data[i].rows) : []
                        });
                        if (data[i].ow) checked.push(data[i].id);
                    }
                    return items;
                });
                tree = new dhtmlXTreeObject("interfaces_list", "100%", "100%", 0);
                tree.setImagePath("/plugins/dhtmlx/imgs/dhxtree_material/");
                tree.enableCheckBoxes(true);
                tree.enableThreeStateCheckboxes(true);
                tree.loadJSONObject({id: 0, item: response}, function () {
                    $('#interfaces_list').slimScroll({
                        height: '100%', //可滚动区域高度
                        disableFadeOut: true
                    });
                    for (var i = 0; i < checked.length; i++) {
                        tree.setCheck(checked[i], true);
                    }
                    util.adjustIframeHeight();
                });
            });
        }
    };
    $(function () {
        layer.load(2);
        var myTreeGrid = viewModel.grid = new dhtmlXGridObject('menu-grid');
        myTreeGrid.setImagePath('/plugins/dhtmlx/imgs/');
        myTreeGrid.setSkin("material");
        myTreeGrid.setHeader('ID,,序号,名称,路径,状态,显示,选项卡,图标');
        myTreeGrid.setColumnIds('id,tree,seq,name,path,status,show,target,icon');
        myTreeGrid.setColTypes('ro,tree,ed,ed,ed,combo,combo,ed,ed');
        myTreeGrid.setInitWidths("140");
        myTreeGrid.enableResizing('false,false,false,false,false,false,false,false,false');
        myTreeGrid.setColumnHidden(0, true);
        myTreeGrid.enableValidation(false,false,true,true,false,true,true,false,false);
        myTreeGrid.setColValidators(',,NotEmpty,NotEmpty,,NotEmpty,NotEmpty');
        myTreeGrid.enableDragAndDrop(true);
        myTreeGrid.enableTreeGridLines();
        myTreeGrid.enableTreeCellEdit(false);
        myTreeGrid.enableAutoHeight(false);
        myTreeGrid.enableAutoWidth(true);
        var menu = new dhtmlXMenuObject({
            icons_path: '/plugins/dhtmlx/imgs/dhxmenu_material/',
            context: true,
            items: [
                {id: 'add', text: '新增'},
                {id: 'del', text: '删除'},
                {id: 'setInterface', text: '配置接口'}
            ]
        });
        menu.setSkin("material");
        menu.attachEvent("onClick", function(id, zoneId, cas){
            if (id == 'add') {
                viewModel.openAddMenu(false);
            } else if (id == 'del') {
                var rowId = myTreeGrid.contextID.split('_')[0];
                var did = myTreeGrid.getRowAttribute(rowId, 'id');
                var confirm = layer.confirm('您确定删除当前菜单？', {
                    btn: ['确定','取消'] //按钮
                }, function(){
                    var deferred = PermissionsService.delMenu(ko.toJSON({
                        id: did
                    }));
                    util.send(deferred, function (response) {
                        myTreeGrid.deleteRow(rowId);
                        layer.close(confirm);
                    }, function () {
                        layer.close(confirm);
                    });
                }, function(){
                    layer.close(confirm);
                });
            } else if (id == 'setInterface') {
                var rowId = myTreeGrid.contextID.split('_')[0];
                var myid = myTreeGrid.getRowAttribute(rowId, 'id');
                viewModel.openInterface(myid);
            }
        });
        myTreeGrid.attachEvent("onEditCell", function(stage,rId,cInd,nValue,oValue){
            if (stage == 2) {
                if (!nValue || !nValue.length || nValue == oValue)
                    return false;
                if (!myTreeGrid.validateCell(rId, cInd))
                    return false;
                update(rId, cInd, nValue);
            }
            return true;
        });
        myTreeGrid.attachEvent("onDrag", function(sId,tId,sObj,tObj,sInd,tInd){
            var parentId = myTreeGrid.getParentId(sId);
            update(sId, undefined, undefined, tId, parentId);
            return true;
        });
        myTreeGrid.enableContextMenu(menu);
        myTreeGrid.init();
        var combo = myTreeGrid.getColumnCombo(5);//takes the column index
        util.initStatusCombo(combo);
        util.initStatusCombo(myTreeGrid.getColumnCombo(6));
        util.adjustIframeHeight();
        util.send(PermissionsService.menusByMgr()).then(function (response) {
            myTreeGrid.parse(response, 'js');
            myTreeGrid.expandAll();
            ko.applyBindings(viewModel);
        });

        function update(rId, cInd, nValue, pid, oldPid) {
            var id = myTreeGrid.getRowAttribute(rId, 'id');
            var seq = cInd == 2 ? nValue : myTreeGrid.getRowAttribute(rId, 'seq');
            var name = cInd == 3 ? nValue : myTreeGrid.getRowAttribute(rId, 'name');
            var path = cInd == 4 ? nValue : myTreeGrid.getRowAttribute(rId, 'path');
            var status = cInd == 5 ? nValue : myTreeGrid.getRowAttribute(rId, 'status');
            var show = cInd == 6 ? nValue : myTreeGrid.getRowAttribute(rId, 'show');
            var target = cInd == 7 ? nValue : myTreeGrid.getRowAttribute(rId, 'target');
            var icon = cInd == 8 ? nValue : myTreeGrid.getRowAttribute(rId, 'icon');
            if (status == 'true') status = true;
            if (status == 'false') status = false;
            if (show == 'true') show = true;
            if (show == 'false') show = false;
            var parentId = myTreeGrid.getParentId(rId);
            try {
                pid = typeof pid == 'undefined' ? myTreeGrid.getRowAttribute(parentId, 'id') : pid;
            } catch (err) {
                pid = 0
            }
            var ajax = PermissionsService.updateMenu(ko.toJSON({
                id: id,
                seq: seq,
                name: name,
                path: path,
                status: status,
                target: target,
                icon: icon,
                pid: pid,
                show: show
            }));
            util.send(ajax, function (response) {
                myTreeGrid._h2.forEachChild(rId, function(element){
                    myTreeGrid.cellById(element.id, 5).setValue(status);
                });
                if (typeof oldPid != 'undefined' && oldPid > 0 && !myTreeGrid.hasChildren(oldPid)) {
                    myTreeGrid.setItemImage(oldPid, '/plugins/dhtmlx/imgs/dhxgrid_material/tree/leaf.gif');
                    myTreeGrid.setRowAttribute(oldPid, 'tree', {
                        image: 'leaf.gif'
                    });
                }
                if (typeof pid != 'undefined' && pid > 0 && myTreeGrid.hasChildren(pid)) {
                    myTreeGrid.setItemImage(pid, '/plugins/dhtmlx/imgs/dhxgrid_material/tree/folder.gif');
                    myTreeGrid.setRowAttribute(pid, 'tree', {
                        image: 'folder.gif'
                    });
                }
            });
        }
    });
});