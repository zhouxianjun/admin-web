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
        var myTreeGrid = new dhtmlXGridObject('tree_user');
        myTreeGrid.setImagePath('/plugins/dhtmlx/imgs/');
        myTreeGrid.setHeader(',ID,用户名,名称,上级,电话,省,市,状态,创建时间');
        myTreeGrid.setColumnIds(',id,username,name,pname,phone,province,city,status,create_date');
        myTreeGrid.setInitWidths('60');
        myTreeGrid.setColAlign('center,center,center,center,center,center,center,center,center,center');
        myTreeGrid.setColTypes('tree,ro,ro,ed,ro,ed,combo,combo,ch,ro');
        myTreeGrid.setColSorting("na,int,str,str,str,na,na,na,int,date");
        myTreeGrid.enableDragAndDrop(true);
        //myTreeGrid.enableAutoWidth(true);
        myTreeGrid.init();
        myTreeGrid.load('/user/users', 'js');
        util.adjustIframeHeight();
    });
});