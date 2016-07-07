/**
 * Created with JetBrains Idea.
 * User: Gary
 * Date: 16-7-4
 * Time: 下午10:58
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
require.config({
    baseUrl: '/app',
    paths: {
        'app': 'app',
        'util': 'util',
        'jquery-tmpl': '/plugins/jquery.tmpl.min',
        'ko': '/plugins/knockout-3.4.0',
        'jquery': '/plugins/jQuery/jQuery-2.2.0.min',
        'bootstrap': '/bootstrap/js/bootstrap.min',
        'fastclick': '/plugins/fastclick/fastclick.min',
        'slimScroll': '/plugins/slimScroll/jquery.slimscroll.min',
        'icheck': '/plugins/iCheck/icheck.min',
        'validator': '/plugins/bootstrapvalidator/js/bootstrapValidator',
        'treetable': '/plugins/jquery.treetable',
        'xtree': '/plugins/xtree/dhtmlxtree',

        // service
        'userService': 'service/UserService',
        'permissionsService': 'service/PermissionsService'
    },
    shim: {
        'jquery-tmpl': ['jquery'],
        'bootstrap': ['jquery'],
        'slimScroll': ['jquery'],
        'icheck': ['jquery'],
        'validator': ['jquery', 'bootstrap'],
        'treetable': ['jquery']
    }
});