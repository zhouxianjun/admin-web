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
        'dhtmlx': '/plugins/dhtmlx/dhtmlx',
        'moment-locales': '/plugins/moment/moment-with-locales',
        'moment': '/plugins/moment/moment',
        'layer': '/plugins/layer/layer',
        'underscore': '/plugins/underscore/underscore',
        'jquery-datatables': '/plugins/datatables/jquery.dataTables',
        'datatables': '/plugins/datatables/dataTables.bootstrap',
        'datatables-tabletools': '/plugins/datatables/extensions/TableTools/js/dataTables.tableTools.min',
        'merge': '/plugins/merge',
        'fileinput': '/plugins/fileinput/js/fileinput.min',
        'fileupload': '/plugins/ajaxfileupload',
        'bootstrap-upload': '/plugins/bootstrap-fileupload.min',
        'select2': '/plugins/select2/select2.min',

        // service
        'userService': 'service/UserService',
        'permissionsService': 'service/PermissionsService',
        'boxService': 'service/BoxService',
        'appService': 'service/AppService',
        'appActiveService': 'service/AppActiveService',
        'modelMgrService': 'service/ModelMgrService',
        'resourcesService': 'service/ResourcesService',
        'appRequireService': 'service/AppRequireService',
        'appWhiteService': 'service/AppWhiteService',
        'appPackageService': 'service/AppPackageService',
        'requirePackageService': 'service/RequirePackageService',
        'packageService': 'service/PackageService',
        'rootConfigService': 'service/RootConfigService',
        'pushService': 'service/PushService'
    },
    shim: {
        'jquery-tmpl': ['jquery'],
        'bootstrap': ['jquery'],
        'slimScroll': ['jquery'],
        'icheck': ['jquery'],
        'validator': ['jquery', 'bootstrap'],
        'treetable': ['jquery'],
        'moment-locales': ['moment'],
        'layer': ['jquery'],
        'jquery-datatables': ['jquery'],
        'datatables': ['jquery-datatables', 'bootstrap'],
        'datatables-tabletools': ['datatables'],
        'fileinput': ['jquery'],
        'fileupload': ['jquery'],
        'bootstrap-upload': ['bootstrap'],
        'select2': ['jquery', 'bootstrap']
    }
});