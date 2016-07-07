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
require(['jquery', 'util', 'xtree'], function ($, util) {
    $(function () {
        var tree = new dhtmlXTreeObject('tree_role', '100%', '100%', 0);
        tree.setImagePath('/plugins/xtree/imgs/dhxtree_material/');
        tree.loadJSONObject({
            id: 0,
            item: [{
                id: 1, text: '超级管理员',
                item: [{
                    id: 2,
                    text: '管理员1'
                }, {
                    id: 3,
                    text: '管理员2'
                }]
            }]
        });
        var menu = new dhtmlXMenuObject({
            context: true,
            icons_path: '/plugins/xtree/imgs/dhxmenu_material/',
            items: [{
                id: 'modify',
                text: '修改'
            }, {
                type: "separator"
            }, {
                id: 'add', text: '新增', img: "dhxmenu_arrow_down.png"
            }, {
                id: 'del', text: '删除', img: "dhxmenu_arrow_up.png"
            }]
        });
        console.log(menu);
        menu.attachEvent('onClick', function(id, zoneId, cas){
            
        });
        //menu.setImagePath('/plugins/xtree/imgs/dhxmenu_material/');
        tree.enableContextMenu(menu);
        util.adjustIframeHeight();
    });
});