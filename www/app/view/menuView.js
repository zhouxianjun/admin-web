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
require(['jquery', 'util', 'layer', 'moment', 'permissionsService', 'ko', 'dhtmlx', 'validator'],
    function ($, util, layer, moment, PermissionsService, ko) {
    var viewModel = {
        menu: {
            name: ko.observable(),
            seq: ko.observable(0),
            path: ko.observable(''),
            status: ko.observable(1),
            target: ko.observable(),
            icon: ko.observable(''),
            pid: ko.observable()
        },
        statusOptions: ko.observableArray([{
            name: '启用',
            id: 1
        }, {
            name: '禁用',
            id: 0
        }])
    };
    $(function () {
        layer.load(2);
        var myTreeGrid = new dhtmlXGridObject('menu-grid');
        myTreeGrid.setImagePath('/plugins/dhtmlx/imgs/');
        myTreeGrid.setHeader('ID,,序号,名称,路径,状态,选项卡,图标');
        myTreeGrid.setColumnIds('id,tree,seq,name,path,status,target,icon');
        myTreeGrid.setColAlign('left, left,center,center,center,center,center,center');
        myTreeGrid.setColTypes('ro,tree,ed,ed,ed,combo,ed,ed');
        // myTreeGrid.setColSorting("str,str,str,str,na,str");
        myTreeGrid.setColumnHidden(0, true);
        myTreeGrid.enableValidation(false,false,true,true,false,true,false,false);
        myTreeGrid.setColValidators(',,Number0,NotEmpty,,Boolean');
        myTreeGrid.enableDragAndDrop(true);
        myTreeGrid.enableTreeGridLines();
        myTreeGrid.enableTreeCellEdit(false);
        myTreeGrid.enableAutoHeight(false, 0, true);
        var menu = new dhtmlXMenuObject({
            icons_path: '/plugins/dhtmlx/imgs/dhxmenu_skyblue/',
            context: true,
            items: [
                {id: 'add', text: '新增'},
                {id: 'del', text: '删除'}
            ]
        });
        menu.attachEvent("onClick", function(id, zoneId, cas){
            if (id == 'add') {
                var rowId = myTreeGrid.contextID.split('_')[0];
                var pid = myTreeGrid.getRowAttribute(rowId, 'id');
                viewModel.menu.pid(pid);
                //捕获页
                layer.open({
                    type: 1,
                    title: false,
                    area: ['500px'], //宽高
                    content: $('#layer_add_menu').html()
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
                            },
                            between: {
                                min: 0,
                                max: 1,
                                message: '请正确选择状态',
                                inclusive: true
                            }
                        }
                    }
                }, function(validator, form, submitButton) {
                    var deferred = PermissionsService.addMenu(ko.toJSON(viewModel.menu));
                    util.send(deferred, function (response) {
                        myTreeGrid.addRow(response.data.id, [
                            response.data.id, {
                                image: 'folder.gif'
                            }, viewModel.menu.seq(), viewModel.menu.name(), viewModel.menu.path(),
                            viewModel.menu.status(), viewModel.menu.target(), viewModel.menu.icon()],0,rowId);
                        myTreeGrid.openItem(rowId);
                        form.bootstrapValidator('resetForm', true);
                    }, function () {
                        form.bootstrapValidator('disableSubmitButtons', false);
                    });
                });
                ko.applyBindings(viewModel, $('#addMenuForm')[0]);
            } else if (id == 'del') {
                var rowId = myTreeGrid.contextID.split('_')[0];
                var did = myTreeGrid.getRowAttribute(rowId, 'id');
                var confirm = layer.confirm('您确定删除当前菜单？', {
                    btn: ['确定','取消'] //按钮
                }, function(){
                    layer.load(2);
                    var deferred = PermissionsService.delMenu(JSON.stringify({
                        id: did
                    }));
                    util.send(deferred, function (response) {
                        myTreeGrid.deleteRow(rowId);
                        layer.closeAll('loading');
                    }, function () {
                        layer.closeAll('loading');
                    });
                }, function(){
                    layer.close(confirm);
                });
            }
        });
        myTreeGrid.attachEvent("onEditCell", function(stage,rId,cInd,nValue,oValue){
            if (stage == 2) {
                if (!nValue || !nValue.length || nValue == oValue)
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
        myTreeGrid.load('/permissions/menusByMgr', function () {
            layer.closeAll('loading');
            ko.applyBindings(viewModel);
        }, 'js');
        util.adjustIframeHeight();

        function update(rId, cInd, nValue, pid, oldPid) {
            var id = myTreeGrid.getRowAttribute(rId, 'id');
            var seq = cInd == 2 ? nValue : myTreeGrid.getRowAttribute(rId, 'seq');
            var name = cInd == 3 ? nValue : myTreeGrid.getRowAttribute(rId, 'name');
            var path = cInd == 4 ? nValue : myTreeGrid.getRowAttribute(rId, 'path');
            var status = cInd == 5 ? nValue : myTreeGrid.getRowAttribute(rId, 'status');
            var target = cInd == 6 ? nValue : myTreeGrid.getRowAttribute(rId, 'target');
            var icon = cInd == 7 ? nValue : myTreeGrid.getRowAttribute(rId, 'icon');
            if (status == 'true') status = true;
            if (status == 'false') status = false;
            var parentId = myTreeGrid.getParentId(rId);
            try {
                pid = typeof pid == 'undefined' ? myTreeGrid.getRowAttribute(parentId, 'id') : pid;
            } catch (err) {
                pid = 0
            }
            layer.load(2);
            var ajax = PermissionsService.updateMenu(JSON.stringify({
                id: id,
                seq: seq,
                name: name,
                path: path,
                status: status,
                target: target,
                icon: icon,
                pid: pid
            }));
            util.send(ajax, function (response) {
                myTreeGrid._h2.forEachChild(rId, function(element){
                    myTreeGrid.cellById(element.id, 5).setValue(status);
                });
                if (typeof oldPid != 'undefined' && !myTreeGrid.hasChildren(oldPid)) {
                    myTreeGrid.setItemImage(oldPid, '/plugins/dhtmlx/imgs/dhxgrid_skyblue/tree/leaf.gif');
                    myTreeGrid.setRowAttribute(oldPid, 'tree', {
                        image: 'leaf.gif'
                    });
                }
                if (typeof pid != 'undefined' && myTreeGrid.hasChildren(pid)) {
                    myTreeGrid.setItemImage(pid, '/plugins/dhtmlx/imgs/dhxgrid_skyblue/tree/folder.gif');
                    myTreeGrid.setRowAttribute(pid, 'tree', {
                        image: 'folder.gif'
                    });
                }
                layer.closeAll('loading');
            }, function () {
                layer.closeAll('loading');
            });
        }
    });
});