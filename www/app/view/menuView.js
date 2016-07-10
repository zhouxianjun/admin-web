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
require(['jquery', 'util', 'layer', 'moment', 'permissionsService', 'dhtmlx'], function ($, util, layer, moment, PermissionsService) {
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

            }
        });
        myTreeGrid.init();
        var combo = myTreeGrid.getColumnCombo(5);//takes the column index
        combo.enableFilteringMode(false);
        combo.addOption([
            {value: true, text: '启用', css: 'color:green;'},
            {value: false, text: '禁用', css: 'color:gray;'}
        ]);
        myTreeGrid.load('/permissions/menusByMgr', function () {
            layer.closeAll('loading');
        }, 'js');
        util.adjustIframeHeight();
    });
});