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
        var myTreeGrid = new dhtmlXGridObject('menu-grid');
        myTreeGrid.setImagePath('/plugins/dhtmlx/imgs/');
        myTreeGrid.setHeader(',序号,名称,路径,状态,选项卡,图标');
        myTreeGrid.setColumnIds(',seq,name,path,status,target,icon');
        myTreeGrid.setInitWidths('60');
        myTreeGrid.setColAlign('center,center,center,center,center,center,center');
        myTreeGrid.setColTypes('tree,edn,ed,ed,ch,ed,ed');
        myTreeGrid.setColSorting("str,str,str,str,na,str");
        myTreeGrid.enableDragAndDrop(true);
        //myTreeGrid.enableAutoWidth(true);
        myTreeGrid.init();
        myTreeGrid.load('/permissions/menusByMgr', 'js');
        util.adjustIframeHeight();
    });
});