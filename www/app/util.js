/**
 * Created with JetBrains Idea.
 * User: Gary
 * Date: 16-7-6
 * Time: 下午10:24
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
define(['jquery', 'layer', 'moment', 'underscore', 'dhtmlx'], function ($, layer, moment, _) {
    //----------------------扩展列类型---------------------------
    window.eXcell_ltro = function(cell){ // the eXcell name is defined here
        if (cell){            // the default pattern, just copy it
            this.cell = cell;
            this.grid = this.cell.parentNode.grid;
        }
        this.edit = function(){}; //read-only cell doesn't have edit method
        // the cell is read-only, so it's always in the disabled state
        this.isDisabled = function(){ return true; }
        this.setValue=function(val){
            // actual data processing may be placed here, for now we just set value as it is
            this.setCValue(window.eXcell_ltro.moment(val).format('YYYY-MM-DD HH:mm:ss'));
        }
    };
    window.eXcell_ltro.prototype = new eXcell;// nests all other methods from the base class
    window.eXcell_ltro.moment = moment;

    //---------------------扩展验证------------------------------
    dhtmlxValidation.isNumber0 = function(a) {
        return _.isNumber(a) && parseInt(a) > -1;
    };
    dhtmlxValidation.isBoolean=function(a) {
        return _.isBoolean(a);
    };

    return {
        send: function (deferred, callback, errorFn) {
            $.when(deferred).done(function (response) {
                if (response.code == 99) {
                    window.location.href = '/';
                    return;
                }
                if (response.code != 1) {
                    layer.msg(response.msg || '操作失败', {icon: 2});
                    if (typeof errorFn === 'function') {
                        errorFn(response);
                        return;
                    }
                }
                if (typeof callback === 'function') {
                    callback(response);
                }
            }).fail(function (error) {
                layer.msg('操作失败', {icon: 2});
                if (typeof errorFn === 'function') {
                    errorFn(error);
                }
            });
        },
        adjustIframeHeight: function (hasParent) {
            var p = parent;
            if (hasParent) {
                p = parent.parent;
            }
            if (p != null && typeof p != 'undefined') {
                if ($('body').height() < 400 && !hasParent) {
                    var height = p.window.innerHeight - 166 < 400 ? 400 : parent.window.innerHeight - 166;
                    p.$('div.active iframe').height(height);
                } else {
                    p.$('div.active iframe').height($('body').height());
                }
            }
        },
        initStatusCombo: function(combo) {
            combo.enableFilteringMode(false);
            combo.addOption([
                {value: true, text: '启用', css: 'color:green;'},
                {value: false, text: '禁用', css: 'color:gray;'}
            ]);
        },
        initValidForm: function (form, fields, handle) {
            return form.bootstrapValidator({
                message: '请填写有效的值',
                live: 'enabled',
                trigger: 'blur',
                feedbackIcons: {
                    valid: 'glyphicon glyphicon-ok',
                    invalid: 'glyphicon glyphicon-remove',
                    validating: 'glyphicon glyphicon-refresh'
                },
                fields: fields,
                submitHandler: handle
            });
        },
        loadCityList: function() {

        },
        loadProvinceList: function () {
            
        }
    };
});