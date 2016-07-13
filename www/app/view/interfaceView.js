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
require(['jquery', 'util', 'layer', 'permissionsService', 'ko', 'datatables', 'validator', 'slimScroll'],
    function ($, util, layer, PermissionsService, ko) {
    var viewModel = {
        interface: {
            name: ko.observable(),
            auth: ko.observable(''),
            status: ko.observable(1),
            description: ko.observable('')
        },
        statusOptions: ko.observableArray([{
            name: '启用',
            id: 1
        }, {
            name: '禁用',
            id: 0
        }]),
        openForm: function () {
            var addLayer = layer.open({
                type: 1,
                title: '新增接口',
                area: ['500px', '400px'], //宽高
                content: $('#layer_add_interfacen').html(),
                btn: ['确定', '取消'],
                yes: function () {
                    var form = $('#addInterfaceForm');
                    form.data('bootstrapValidator').validate();
                    if (form.data('bootstrapValidator').isValid()) {
                        var deferred = PermissionsService.addInterface(ko.toJSON(viewModel.interface));
                        util.send(deferred, function (response) {

                            form.data('bootstrapValidator').resetForm(true);
                            layer.close(addLayer);
                        });
                    }
                }
            });
            util.initValidForm($('#addInterfaceForm'), {
                interface_name: {
                    validators: {
                        notEmpty: {
                            message: '不能为空'
                        }
                    }
                },
                interface_status: {
                    validators: {
                        notEmpty: {
                            message: '不能为空'
                        }
                    }
                },
                interface_auth: {
                    validators: {
                        notEmpty: {
                            message: '不能为空'
                        }
                    }
                }
            });
            ko.applyBindings(viewModel, $('#addInterfaceForm')[0]);
            $('#addInterfaceForm').slimScroll({
                height: '100%', //可滚动区域高度
                disableFadeOut: true
            });
        }
    };
    $(function () {
        layer.load(2);
        layer.closeAll('loading');
        $("#example1").DataTable();
        ko.applyBindings(viewModel);
        util.adjustIframeHeight();
    });
});