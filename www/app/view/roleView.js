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
require(['jquery', 'util', 'layer', 'moment', 'permissionsService', 'dhtmlx'],
    function ($, util, layer, moment, PermissionsService) {
        var myTreeGrid = null;
        function update(rId, name, status, pid, oldPid) {
            var id = myTreeGrid.getRowAttribute(rId, 'id');
            status = typeof status == 'undefined' ? myTreeGrid.getRowAttribute(rId, 'status') : status;
            if (status == 'true') status = true;
            if (status == 'false') status = false;
            name = typeof name == 'undefined' ? myTreeGrid.getRowAttribute(rId, 'name') : name;
            var parentId = myTreeGrid.getParentId(rId);
            try {
                pid = typeof pid == 'undefined' ? myTreeGrid.getRowAttribute(parentId, 'id') : pid;
            } catch (err) {
                pid = 0
            }
            layer.load(2);
            var ajax = PermissionsService.updateRole(JSON.stringify({
                id: id,
                name: name,
                pid: pid,
                status: status
            }));
            util.send(ajax, function (response) {
                myTreeGrid._h2.forEachChild(rId, function(element){
                    myTreeGrid.cellById(element.id, 3).setValue(status);
                });
                if (!myTreeGrid.hasChildren(oldPid)) {
                    myTreeGrid.setItemImage(oldPid, '/plugins/dhtmlx/imgs/dhxgrid_skyblue/tree/leaf.gif');
                    myTreeGrid.setRowAttribute(oldPid, 'tree', {
                        image: 'leaf.gif'
                    });
                }
                if (myTreeGrid.hasChildren(pid)) {
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
        $(function () {
            layer.load(2);
            myTreeGrid = new dhtmlXGridObject('tree_role');
            myTreeGrid.setImagePath('/plugins/dhtmlx/imgs/');
            myTreeGrid.setHeader('ID,,名称,状态,创建时间,更新时间');
            myTreeGrid.setColumnIds('id,tree,name,status,create_time,update_time');
            //myTreeGrid.setInitWidths('60');
            myTreeGrid.setColAlign('left,left,center,center,center,center');
            myTreeGrid.setColTypes('ro,tree,ed,combo,ltro,ltro');
            // myTreeGrid.setColSorting("str,str,str,str,str");
            myTreeGrid.setColumnHidden(0, true);
            myTreeGrid.enableDragAndDrop(true);
            myTreeGrid.enableTreeGridLines();
            myTreeGrid.enableTreeCellEdit(false);
            myTreeGrid.enableAutoHeight(false, 0, true);
            var menu = new dhtmlXMenuObject({
                icons_path: '/plugins/dhtmlx/imgs/dhxmenu_skyblue/',
                context: true,
                items: [
                    {id: 'add', text: 'add'}
                ]
            });
            menu.attachEvent("onClick", function(id, zoneId, cas){
                if (id == 'add') {
                    var prompt = layer.prompt({
                        title: '请输入角色名称'
                    }, function(val){
                        var rowId = myTreeGrid.contextID.split('_')[0];
                        var id = myTreeGrid.getRowAttribute(rowId, 'id');
                        var ajax = PermissionsService.addRole(JSON.stringify({
                            name: val,
                            pid: id
                        }));
                        util.send(ajax, function (response) {
                            var time = new Date().getTime();
                            myTreeGrid.addRow(response.data.id,[
                                response.data.id, {
                                image: 'folder.gif'
                            }, val, true, time, time],0,rowId);
                            myTreeGrid.openItem(rowId);
                            layer.close(prompt);
                        }, function () {
                            layer.close(prompt);
                        });
                    });
                }
            });
            myTreeGrid.attachEvent("onEditCell", function(stage,rId,cInd,nValue,oValue){
                if (stage == 2) {
                    if (!nValue || !nValue.length || nValue == oValue)
                        return false;
                    update(rId, cInd == 2 ? nValue : undefined, cInd == 3 ? nValue : undefined);
                }
                return true;
            });
            myTreeGrid.attachEvent("onDrag", function(sId,tId,sObj,tObj,sInd,tInd){
                var parentId = myTreeGrid.getParentId(sId);
                update(sId, undefined, undefined, tId, parentId);
                return true;
            });
            myTreeGrid.enableContextMenu(menu);
            //myTreeGrid.enableAutoWidth(true);
            myTreeGrid.init();
            var combo = myTreeGrid.getColumnCombo(3);//takes the column index
            util.initStatusCombo(combo);
            myTreeGrid.load('/permissions/rolesByMgr', function () {
                layer.closeAll('loading');
            }, 'js');
            util.adjustIframeHeight();
        });
});