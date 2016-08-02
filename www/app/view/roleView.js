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
require(['jquery', 'util', 'layer', 'moment', 'permissionsService', 'ko', 'dhtmlx', 'slimScroll'],
    function ($, util, layer, moment, PermissionsService, ko) {
        var viewModel = {
            tree: null,
            openAdd: function() {
                var prompt = layer.prompt({
                    title: '请输入角色名称'
                }, function(val){
                    var rowId = myTreeGrid.contextID ? myTreeGrid.contextID.split('_')[0] : 0;
                    var id = rowId <= 0 ? 1 : myTreeGrid.getRowAttribute(rowId, 'id');
                    var ajax = PermissionsService.addRole(ko.toJSON({
                        name: val,
                        pid: id
                    }));
                    util.send(ajax, function (response) {
                        var time = new Date().getTime();
                        myTreeGrid.addRow(response.data.id,[
                            response.data.id, '', val, true, time, time],0,rowId);
                        myTreeGrid.setRowAttribute(response.data.id, 'id', response.data.id);
                        if (rowId > 0) {
                            myTreeGrid.openItem(rowId);
                            myTreeGrid.setItemImage(rowId, '/plugins/dhtmlx/imgs/dhxgrid_material/tree/folder.gif');
                        }
                        layer.close(prompt);
                        util.adjustIframeHeight();
                    }, function () {
                        layer.close(prompt);
                    });
                });
            }
        };
        var myTreeGrid = null;
        function openMenus(id) {
            var tree;
            var menuswin = layer.open({
                type: 1,
                title: '设置角色菜单',
                area: ['300px', '400px'], //宽高
                content: $('#show_menus').html(),
                btn: ['确定', '取消'],
                yes: function () {
                    util.send(PermissionsService.setMenus(ko.toJSON({
                        id: id,
                        menus: tree.getAllChecked().split(',')
                    })), function() {
                        layer.close(menuswin);
                    });
                }
            });
            util.send(PermissionsService.menusBySetRole(ko.toJSON({role: id})), function(response) {
                var checked = [];
                (function(fn) {
                    response = fn.call(fn, response.data.menus);
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
                tree = new dhtmlXTreeObject("menus_list", "100%", "100%", 0);
                tree.setImagePath("/plugins/dhtmlx/imgs/dhxtree_material/");
                tree.enableCheckBoxes(true);
                tree.enableThreeStateCheckboxes(true);
                response[0].open = 1;
                tree.loadJSONObject({id: 0, item: response}, function () {
                    $('#menus_list').slimScroll({
                        height: '100%', //可滚动区域高度
                        disableFadeOut: true
                    });
                    for (var i = 0; i < checked.length; i++) {
                        tree.setCheck(checked[i], true);
                    }
                });
            });
        }
        function update(rId, name, status, only_login, pid, oldPid) {
            var id = myTreeGrid.getRowAttribute(rId, 'id');
            status = typeof status == 'undefined' ? myTreeGrid.getRowAttribute(rId, 'status') : status;
            only_login = typeof only_login == 'undefined' ? myTreeGrid.getRowAttribute(rId, 'only_login') : only_login;
            if (status == 'true') status = true;
            if (status == 'false') status = false;
            name = typeof name == 'undefined' ? myTreeGrid.getRowAttribute(rId, 'name') : name;
            var parentId = myTreeGrid.getParentId(rId);
            try {
                pid = typeof pid == 'undefined' ? myTreeGrid.getRowAttribute(parentId, 'id') : pid;
            } catch (err) {
                pid = 0
            }
            var ajax = PermissionsService.updateRole(ko.toJSON({
                id: id,
                name: name,
                pid: pid,
                status: status,
                only_login: only_login
            }));
            util.send(ajax, function (response) {
                myTreeGrid._h2.forEachChild(rId, function(element){
                    myTreeGrid.cellById(element.id, 3).setValue(status);
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
        $(function () {
            myTreeGrid = new dhtmlXGridObject('tree_role');
            myTreeGrid.setImagePath('/plugins/dhtmlx/imgs/');
            myTreeGrid.setSkin("material");
            myTreeGrid.setHeader('ID,,名称,状态,单例登录,创建时间,更新时间');
            myTreeGrid.setColumnIds('id,tree,name,status,only_login,create_time,update_time');
            myTreeGrid.setInitWidths("*,*,*,*,*,140,140");
            myTreeGrid.setColTypes('ro,tree,ed,combo,combo,ltro,ltro');
            myTreeGrid.enableResizing('false,false,false,false,false,false,false');
            myTreeGrid.setColumnHidden(0, true);
            myTreeGrid.enableDragAndDrop(true);
            myTreeGrid.enableTreeGridLines();
            myTreeGrid.enableTreeCellEdit(false);
            myTreeGrid.enableAutoHeight(false);
            myTreeGrid.enableAutoWidth(true);
            var menu = new dhtmlXMenuObject({
                icons_path: '/plugins/dhtmlx/imgs/dhxmenu_material/',
                context: true,
                items: [
                    {id: 'add', text: '新增角色'},
                    {id: 'setMenu', text: '配置菜单'}
                ]
            });
            menu.setSkin("material");
            menu.attachEvent("onClick", function(id, zoneId, cas){
                var rowId = myTreeGrid.contextID.split('_')[0];
                var myId = myTreeGrid.getRowAttribute(rowId, 'id');
                if (id == 'add') {
                    viewModel.openAdd();
                } else if (id == 'setMenu') {
                    openMenus(myId);
                }
            });
            myTreeGrid.attachEvent("onEditCell", function(stage,rId,cInd,nValue,oValue){
                if (stage == 2) {
                    if (!nValue || !nValue.length || nValue == oValue)
                        return false;
                    update(rId, cInd == 2 ? nValue : undefined, cInd == 3 ? nValue : undefined, cInd == 4 ? nValue : undefined);
                }
                return true;
            });
            myTreeGrid.attachEvent("onDrag", function(sId,tId,sObj,tObj,sInd,tInd){
                var parentId = myTreeGrid.getParentId(sId);
                if (tId == parentId) return false;
                update(sId, undefined, undefined, tId || 1, parentId);
                return true;
            });
            myTreeGrid.enableContextMenu(menu);
            myTreeGrid.init();
            var combo = myTreeGrid.getColumnCombo(3);//takes the column index
            util.initStatusCombo(combo);
            util.initStatusCombo(myTreeGrid.getColumnCombo(4));
            util.send(PermissionsService.rolesByMgr()).then(function (response) {
                myTreeGrid.parse(response, 'js');
                myTreeGrid.expandAll();
                ko.applyBindings(viewModel);
            });
            util.adjustIframeHeight();
        });
});