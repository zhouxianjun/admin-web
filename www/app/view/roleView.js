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
require(['jquery', 'util', 'dhtmlx'], function ($, util) {
    $(function () {
        var myTreeGrid = new dhtmlXGridObject('tree_role');
        myTreeGrid.setImagePath('/plugins/dhtmlx/imgs/');
        myTreeGrid.setHeader(',名称,上级角色,状态,创建时间,更新时间');
        myTreeGrid.setColumnIds(',name,pname,status,create_date,update_date');
        myTreeGrid.setInitWidths('60');
        myTreeGrid.setColAlign('center,center,center,center,center,center');
        myTreeGrid.setColTypes('tree,ed,ro,ch,ro,ro');
        myTreeGrid.setColSorting("str,str,str,str,str,str");
        myTreeGrid.enableDragAndDrop(true);
        //myTreeGrid.enableAutoWidth(true);
        myTreeGrid.init();
        myTreeGrid.load('/permissions/rolesByMgr', 'js');
        util.adjustIframeHeight();
    });
});