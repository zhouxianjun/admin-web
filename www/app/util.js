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
    window.eXcell_ltro = function (cell) { // the eXcell name is defined here
        if (cell) {            // the default pattern, just copy it
            this.cell = cell;
            this.grid = this.cell.parentNode.grid;
        }
        this.edit = function () {
        }; //read-only cell doesn't have edit method
        // the cell is read-only, so it's always in the disabled state
        this.isDisabled = function () {
            return true;
        };
        this.setValue = function (val) {
            // actual data processing may be placed here, for now we just set value as it is
            this.setCValue(window.eXcell_ltro.moment(val).format('YYYY-MM-DD HH:mm:ss'));
        }
    };
    window.eXcell_ltro.prototype = new eXcell;// nests all other methods from the base class
    window.eXcell_ltro.moment = moment;

    //---------------------扩展验证------------------------------
    dhtmlxValidation.isNumber0 = function (a) {
        return _.isNumber(a) && parseInt(a) > -1;
    };
    dhtmlxValidation.isBoolean = function (a) {
        return _.isBoolean(a);
    };

    return {
        ajaxResponse: function(response, callback, errorFn) {
            if (response.code == 99) {
                window.location.href = '/';
                return;
            }
            if (response.code != 1 && typeof response.code != 'undefined') {
                layer.msg(response.msg || '操作失败', {icon: 2});
                if (typeof errorFn === 'function') {
                    errorFn(response);
                    return;
                }
            }
            if (typeof callback === 'function') {
                callback(response);
            }
        },
        send: function (deferred, callback, errorFn) {
            var loading = layer.load(2);
            $.when(deferred).done(function (response) {
                layer.close(loading);
                this.ajaxResponse(response, callback, errorFn);
            }.bind(this)).fail(function (error) {
                layer.close(loading);
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
        initStatusCombo: function (combo) {
            combo.enableFilteringMode(false);
            combo.addOption([
                {value: true, text: '启用', css: 'color:green;'},
                {value: false, text: '禁用', css: 'color:gray;'}
            ]);
        },
        initProvinceCombo: function (combo) {
            combo.enableFilteringMode(false);
            var options = [];
            for (var i = 0; i < _p_data.length; i++) {
                options.push({
                    value: _p_data[i].id,
                    text: _p_data[i].pname
                });
            }
            combo.addOption(options);
        },
        initCityCombo: function (combo) {
            combo.enableFilteringMode(false);
            var options = [];
            for (var i = 0; i < _c_data.length; i++) {
                options.push({
                    value: _c_data[i].id,
                    text: _c_data[i].cname
                });
            }
            combo.addOption(options);
        },
        initValidForm: function (form, fields, handle) {
            return form.bootstrapValidator({
                message: '请填写有效的值',
                live: 'enabled',
                trigger: 'blur',
                feedbackIcons: {
                    //valid: 'glyphicon glyphicon-ok',
                    invalid: 'glyphicon glyphicon-remove',
                    validating: 'glyphicon glyphicon-refresh'
                },
                fields: fields,
                submitHandler: handle
            });
        },
        getUrlParam(name) {
            //构造一个含有目标参数的正则表达式对象  
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            //匹配目标参数  
            var r = window.location.search.substr(1).match(reg);
            //返回参数值  
            if (r != null) return unescape(r[2]);
            return null;
        },
        loadCityList: function (province) {
            var result = [];
            for (var i = 0; i < _c_data.length; i++) {
                if (_c_data[i].proviceid == province) {
                    result.push(_c_data[i]);
                }
            }
            return result;
        },
        loadProvinceList: function () {
            return _p_data;
        },
        getCityNameById: function (id) {
            for (var i = 0; i < _c_data.length; i++) {
                if (_c_data[i].id == id) return _c_data[i].cname;
            }
            return null;
        },
        getProvinceNameById: function (id) {
            for (var i = 0; i < _p_data.length; i++) {
                if (_p_data[i].id == id) return _p_data[i].pname;
            }
            return null;
        },
        setViewModelData: function (viewModel, data) {
            if (!data) return;
            for (var key in data) {
                if (typeof viewModel[key] == 'function') {
                    viewModel[key](data[key]);
                }
            }
        },
        clearViewModel: function (viewModel) {
            for (var key in viewModel) {
                if (typeof viewModel[key] == 'function') {
                    viewModel[key](null);
                }
            }
        },
        getSortParam: function (data, columns) {
            var param = {};
            if (data.order && data.order.length && data.order[0]) {
                param.sortName = columns[data.order[0].column];
                param.sortDir = data.order[0].dir;
            }
            return param;
        },
        buildAjax: function (url, data, type) {
            return $.ajax({
                url: url,
                type: type || 'POST',
                dataType: 'json',
                data: data,
                contentType : 'application/json'
            });
        },
        doWhenImgError: function (data, event) {
            var oldSrc = event.target.src;
            var self = event.target;
            self.src = '';
            $(event.target).unbind('error');
            /*setTimeout(function () {
                me.reloadImg(self, oldSrc)
            }, 30000);*/
        },
        dataTableSettings: {
            language: {
                "sProcessing":   "处理中...",
                "sLengthMenu":   "每页 _MENU_ 项",
                "sZeroRecords":  "没有匹配结果",
                "sInfo":         "当前显示第 _START_ 至 _END_ 项，共 _TOTAL_ 项。",
                "sInfoEmpty":    "当前显示第 0 至 0 项，共 0 项",
                "sInfoFiltered": "(由 _MAX_ 项结果过滤)",
                "sInfoPostFix":  "",
                "sSearch":       false,
                "sUrl":          "",
                "sEmptyTable":     "表中数据为空",
                "sLoadingRecords": "载入中...",
                "sInfoThousands":  ",",
                "oPaginate": {
                    "sFirst":    "首页",
                    "sPrevious": "上页",
                    "sNext":     "下页",
                    "sLast":     "末页",
                    "sJump":     "跳转"
                },
                "oAria": {
                    "sSortAscending":  ": 以升序排列此列",
                    "sSortDescending": ": 以降序排列此列"
                }
            },
            autoWidth: false,   //禁用自动调整列宽
            stripeClasses: ["odd", "even"],//为奇偶行加上样式，兼容不支持CSS伪类的场合
            order: [],          //取消默认排序查询,否则复选框一列会出现小箭头
            processing: false,  //隐藏加载提示,自行处理
            serverSide: true,   //启用服务器端分页
            searching: false,    //禁用原生搜索
            lengthChange: false,
            pagingType: 'full_numbers'
        }
    };
});
var _p_data = [
    {
        "id":1,
        "pname":"北京市"
    },
    {
        "id":2,
        "pname":"天津市"
    },
    {
        "id":3,
        "pname":"河北省"
    },
    {
        "id":4,
        "pname":"山西省"
    },
    {
        "id":5,
        "pname":"内蒙古自治区"
    },
    {
        "id":6,
        "pname":"辽宁省"
    },
    {
        "id":7,
        "pname":"吉林省"
    },
    {
        "id":8,
        "pname":"黑龙江省"
    },
    {
        "id":9,
        "pname":"上海市"
    },
    {
        "id":10,
        "pname":"江苏省"
    },
    {
        "id":11,
        "pname":"浙江省"
    },
    {
        "id":12,
        "pname":"安徽省"
    },
    {
        "id":13,
        "pname":"福建省"
    },
    {
        "id":14,
        "pname":"江西省"
    },
    {
        "id":15,
        "pname":"山东省"
    },
    {
        "id":16,
        "pname":"河南省"
    },
    {
        "id":17,
        "pname":"湖北省"
    },
    {
        "id":18,
        "pname":"湖南省"
    },
    {
        "id":19,
        "pname":"广东省"
    },
    {
        "id":20,
        "pname":"广西壮族自治区"
    },
    {
        "id":21,
        "pname":"海南省"
    },
    {
        "id":22,
        "pname":"重庆市"
    },
    {
        "id":23,
        "pname":"四川省"
    },
    {
        "id":24,
        "pname":"贵州省"
    },
    {
        "id":25,
        "pname":"云南省"
    },
    {
        "id":26,
        "pname":"西藏自治区"
    },
    {
        "id":27,
        "pname":"陕西省"
    },
    {
        "id":28,
        "pname":"甘肃省"
    },
    {
        "id":29,
        "pname":"青海省"
    },
    {
        "id":30,
        "pname":"宁夏回族自治区"
    },
    {
        "id":31,
        "pname":"新疆维吾尔自治区"
    },
    {
        "id":32,
        "pname":"香港特别行政区"
    },
    {
        "id":33,
        "pname":"澳门特别行政区"
    },
    {
        "id":34,
        "pname":"台湾省"
    }
];
var _c_data = [
    {
        "id": 1,
        "cname": "北京市",
        "zicode": "100000",
        "proviceid": 1
    },
    {
        "id": 2,
        "cname": "天津市",
        "zicode": "100000",
        "proviceid": 2
    },
    {
        "id": 3,
        "cname": "石家庄市",
        "zicode": "050000",
        "proviceid": 3
    },
    {
        "id": 4,
        "cname": "唐山市",
        "zicode": "063000",
        "proviceid": 3
    },
    {
        "id": 5,
        "cname": "秦皇岛市",
        "zicode": "066000",
        "proviceid": 3
    },
    {
        "id": 6,
        "cname": "邯郸市",
        "zicode": "056000",
        "proviceid": 3
    },
    {
        "id": 7,
        "cname": "邢台市",
        "zicode": "054000",
        "proviceid": 3
    },
    {
        "id": 8,
        "cname": "保定市",
        "zicode": "071000",
        "proviceid": 3
    },
    {
        "id": 9,
        "cname": "张家口市",
        "zicode": "075000",
        "proviceid": 3
    },
    {
        "id": 10,
        "cname": "承德市",
        "zicode": "067000",
        "proviceid": 3
    },
    {
        "id": 11,
        "cname": "沧州市",
        "zicode": "061000",
        "proviceid": 3
    },
    {
        "id": 12,
        "cname": "廊坊市",
        "zicode": "065000",
        "proviceid": 3
    },
    {
        "id": 13,
        "cname": "衡水市",
        "zicode": "053000",
        "proviceid": 3
    },
    {
        "id": 14,
        "cname": "太原市",
        "zicode": "030000",
        "proviceid": 4
    },
    {
        "id": 15,
        "cname": "大同市",
        "zicode": "037000",
        "proviceid": 4
    },
    {
        "id": 16,
        "cname": "阳泉市",
        "zicode": "045000",
        "proviceid": 4
    },
    {
        "id": 17,
        "cname": "长治市",
        "zicode": "046000",
        "proviceid": 4
    },
    {
        "id": 18,
        "cname": "晋城市",
        "zicode": "048000",
        "proviceid": 4
    },
    {
        "id": 19,
        "cname": "朔州市",
        "zicode": "036000",
        "proviceid": 4
    },
    {
        "id": 20,
        "cname": "晋中市",
        "zicode": "030600",
        "proviceid": 4
    },
    {
        "id": 21,
        "cname": "运城市",
        "zicode": "044000",
        "proviceid": 4
    },
    {
        "id": 22,
        "cname": "忻州市",
        "zicode": "034000",
        "proviceid": 4
    },
    {
        "id": 23,
        "cname": "临汾市",
        "zicode": "041000",
        "proviceid": 4
    },
    {
        "id": 24,
        "cname": "吕梁市",
        "zicode": "030500",
        "proviceid": 4
    },
    {
        "id": 25,
        "cname": "呼和浩特市",
        "zicode": "010000",
        "proviceid": 5
    },
    {
        "id": 26,
        "cname": "包头市",
        "zicode": "014000",
        "proviceid": 5
    },
    {
        "id": 27,
        "cname": "乌海市",
        "zicode": "016000",
        "proviceid": 5
    },
    {
        "id": 28,
        "cname": "赤峰市",
        "zicode": "024000",
        "proviceid": 5
    },
    {
        "id": 29,
        "cname": "通辽市",
        "zicode": "028000",
        "proviceid": 5
    },
    {
        "id": 30,
        "cname": "鄂尔多斯市",
        "zicode": "010300",
        "proviceid": 5
    },
    {
        "id": 31,
        "cname": "呼伦贝尔市",
        "zicode": "021000",
        "proviceid": 5
    },
    {
        "id": 32,
        "cname": "巴彦淖尔市",
        "zicode": "014400",
        "proviceid": 5
    },
    {
        "id": 33,
        "cname": "乌兰察布市",
        "zicode": "011800",
        "proviceid": 5
    },
    {
        "id": 34,
        "cname": "兴安盟",
        "zicode": "137500",
        "proviceid": 5
    },
    {
        "id": 35,
        "cname": "锡林郭勒盟",
        "zicode": "011100",
        "proviceid": 5
    },
    {
        "id": 36,
        "cname": "阿拉善盟",
        "zicode": "016000",
        "proviceid": 5
    },
    {
        "id": 37,
        "cname": "沈阳市",
        "zicode": "110000",
        "proviceid": 6
    },
    {
        "id": 38,
        "cname": "大连市",
        "zicode": "116000",
        "proviceid": 6
    },
    {
        "id": 39,
        "cname": "鞍山市",
        "zicode": "114000",
        "proviceid": 6
    },
    {
        "id": 40,
        "cname": "抚顺市",
        "zicode": "113000",
        "proviceid": 6
    },
    {
        "id": 41,
        "cname": "本溪市",
        "zicode": "117000",
        "proviceid": 6
    },
    {
        "id": 42,
        "cname": "丹东市",
        "zicode": "118000",
        "proviceid": 6
    },
    {
        "id": 43,
        "cname": "锦州市",
        "zicode": "121000",
        "proviceid": 6
    },
    {
        "id": 44,
        "cname": "营口市",
        "zicode": "115000",
        "proviceid": 6
    },
    {
        "id": 45,
        "cname": "阜新市",
        "zicode": "123000",
        "proviceid": 6
    },
    {
        "id": 46,
        "cname": "辽阳市",
        "zicode": "111000",
        "proviceid": 6
    },
    {
        "id": 47,
        "cname": "盘锦市",
        "zicode": "124000",
        "proviceid": 6
    },
    {
        "id": 48,
        "cname": "铁岭市",
        "zicode": "112000",
        "proviceid": 6
    },
    {
        "id": 49,
        "cname": "朝阳市",
        "zicode": "122000",
        "proviceid": 6
    },
    {
        "id": 50,
        "cname": "葫芦岛市",
        "zicode": "125000",
        "proviceid": 6
    },
    {
        "id": 51,
        "cname": "长春市",
        "zicode": "130000",
        "proviceid": 7
    },
    {
        "id": 52,
        "cname": "吉林市",
        "zicode": "132000",
        "proviceid": 7
    },
    {
        "id": 53,
        "cname": "四平市",
        "zicode": "136000",
        "proviceid": 7
    },
    {
        "id": 54,
        "cname": "辽源市",
        "zicode": "136200",
        "proviceid": 7
    },
    {
        "id": 55,
        "cname": "通化市",
        "zicode": "134000",
        "proviceid": 7
    },
    {
        "id": 56,
        "cname": "白山市",
        "zicode": "134300",
        "proviceid": 7
    },
    {
        "id": 57,
        "cname": "松原市",
        "zicode": "131100",
        "proviceid": 7
    },
    {
        "id": 58,
        "cname": "白城市",
        "zicode": "137000",
        "proviceid": 7
    },
    {
        "id": 59,
        "cname": "延边朝鲜族自治州",
        "zicode": "133000",
        "proviceid": 7
    },
    {
        "id": 60,
        "cname": "哈尔滨市",
        "zicode": "150000",
        "proviceid": 8
    },
    {
        "id": 61,
        "cname": "齐齐哈尔市",
        "zicode": "161000",
        "proviceid": 8
    },
    {
        "id": 62,
        "cname": "鸡西市",
        "zicode": "158100",
        "proviceid": 8
    },
    {
        "id": 63,
        "cname": "鹤岗市",
        "zicode": "154100",
        "proviceid": 8
    },
    {
        "id": 64,
        "cname": "双鸭山市",
        "zicode": "155100",
        "proviceid": 8
    },
    {
        "id": 65,
        "cname": "大庆市",
        "zicode": "163000",
        "proviceid": 8
    },
    {
        "id": 66,
        "cname": "伊春市",
        "zicode": "152300",
        "proviceid": 8
    },
    {
        "id": 67,
        "cname": "佳木斯市",
        "zicode": "154000",
        "proviceid": 8
    },
    {
        "id": 68,
        "cname": "七台河市",
        "zicode": "154600",
        "proviceid": 8
    },
    {
        "id": 69,
        "cname": "牡丹江市",
        "zicode": "157000",
        "proviceid": 8
    },
    {
        "id": 70,
        "cname": "黑河市",
        "zicode": "164300",
        "proviceid": 8
    },
    {
        "id": 71,
        "cname": "绥化市",
        "zicode": "152000",
        "proviceid": 8
    },
    {
        "id": 72,
        "cname": "大兴安岭地区",
        "zicode": "165000",
        "proviceid": 8
    },
    {
        "id": 73,
        "cname": "上海市",
        "zicode": "200000",
        "proviceid": 9
    },
    {
        "id": 74,
        "cname": "南京市",
        "zicode": "210000",
        "proviceid": 10
    },
    {
        "id": 75,
        "cname": "无锡市",
        "zicode": "214000",
        "proviceid": 10
    },
    {
        "id": 76,
        "cname": "徐州市",
        "zicode": "221000",
        "proviceid": 10
    },
    {
        "id": 77,
        "cname": "常州市",
        "zicode": "213000",
        "proviceid": 10
    },
    {
        "id": 78,
        "cname": "苏州市",
        "zicode": "215000",
        "proviceid": 10
    },
    {
        "id": 79,
        "cname": "南通市",
        "zicode": "226000",
        "proviceid": 10
    },
    {
        "id": 80,
        "cname": "连云港市",
        "zicode": "222000",
        "proviceid": 10
    },
    {
        "id": 81,
        "cname": "淮安市",
        "zicode": "223200",
        "proviceid": 10
    },
    {
        "id": 82,
        "cname": "盐城市",
        "zicode": "224000",
        "proviceid": 10
    },
    {
        "id": 83,
        "cname": "扬州市",
        "zicode": "225000",
        "proviceid": 10
    },
    {
        "id": 84,
        "cname": "镇江市",
        "zicode": "212000",
        "proviceid": 10
    },
    {
        "id": 85,
        "cname": "泰州市",
        "zicode": "225300",
        "proviceid": 10
    },
    {
        "id": 86,
        "cname": "宿迁市",
        "zicode": "223800",
        "proviceid": 10
    },
    {
        "id": 87,
        "cname": "杭州市",
        "zicode": "310000",
        "proviceid": 11
    },
    {
        "id": 88,
        "cname": "宁波市",
        "zicode": "315000",
        "proviceid": 11
    },
    {
        "id": 89,
        "cname": "温州市",
        "zicode": "325000",
        "proviceid": 11
    },
    {
        "id": 90,
        "cname": "嘉兴市",
        "zicode": "314000",
        "proviceid": 11
    },
    {
        "id": 91,
        "cname": "湖州市",
        "zicode": "313000",
        "proviceid": 11
    },
    {
        "id": 92,
        "cname": "绍兴市",
        "zicode": "312000",
        "proviceid": 11
    },
    {
        "id": 93,
        "cname": "金华市",
        "zicode": "321000",
        "proviceid": 11
    },
    {
        "id": 94,
        "cname": "衢州市",
        "zicode": "324000",
        "proviceid": 11
    },
    {
        "id": 95,
        "cname": "舟山市",
        "zicode": "316000",
        "proviceid": 11
    },
    {
        "id": 96,
        "cname": "台州市",
        "zicode": "318000",
        "proviceid": 11
    },
    {
        "id": 97,
        "cname": "丽水市",
        "zicode": "323000",
        "proviceid": 11
    },
    {
        "id": 98,
        "cname": "合肥市",
        "zicode": "230000",
        "proviceid": 12
    },
    {
        "id": 99,
        "cname": "芜湖市",
        "zicode": "241000",
        "proviceid": 12
    },
    {
        "id": 100,
        "cname": "蚌埠市",
        "zicode": "233000",
        "proviceid": 12
    },
    {
        "id": 101,
        "cname": "淮南市",
        "zicode": "232000",
        "proviceid": 12
    },
    {
        "id": 102,
        "cname": "马鞍山市",
        "zicode": "243000",
        "proviceid": 12
    },
    {
        "id": 103,
        "cname": "淮北市",
        "zicode": "235000",
        "proviceid": 12
    },
    {
        "id": 104,
        "cname": "铜陵市",
        "zicode": "244000",
        "proviceid": 12
    },
    {
        "id": 105,
        "cname": "安庆市",
        "zicode": "246000",
        "proviceid": 12
    },
    {
        "id": 106,
        "cname": "黄山市",
        "zicode": "242700",
        "proviceid": 12
    },
    {
        "id": 107,
        "cname": "滁州市",
        "zicode": "239000",
        "proviceid": 12
    },
    {
        "id": 108,
        "cname": "阜阳市",
        "zicode": "236100",
        "proviceid": 12
    },
    {
        "id": 109,
        "cname": "宿州市",
        "zicode": "234100",
        "proviceid": 12
    },
    {
        "id": 110,
        "cname": "巢湖市",
        "zicode": "238000",
        "proviceid": 12
    },
    {
        "id": 111,
        "cname": "六安市",
        "zicode": "237000",
        "proviceid": 12
    },
    {
        "id": 112,
        "cname": "亳州市",
        "zicode": "236800",
        "proviceid": 12
    },
    {
        "id": 113,
        "cname": "池州市",
        "zicode": "247100",
        "proviceid": 12
    },
    {
        "id": 114,
        "cname": "宣城市",
        "zicode": "366000",
        "proviceid": 12
    },
    {
        "id": 115,
        "cname": "福州市",
        "zicode": "350000",
        "proviceid": 13
    },
    {
        "id": 116,
        "cname": "厦门市",
        "zicode": "361000",
        "proviceid": 13
    },
    {
        "id": 117,
        "cname": "莆田市",
        "zicode": "351100",
        "proviceid": 13
    },
    {
        "id": 118,
        "cname": "三明市",
        "zicode": "365000",
        "proviceid": 13
    },
    {
        "id": 119,
        "cname": "泉州市",
        "zicode": "362000",
        "proviceid": 13
    },
    {
        "id": 120,
        "cname": "漳州市",
        "zicode": "363000",
        "proviceid": 13
    },
    {
        "id": 121,
        "cname": "南平市",
        "zicode": "353000",
        "proviceid": 13
    },
    {
        "id": 122,
        "cname": "龙岩市",
        "zicode": "364000",
        "proviceid": 13
    },
    {
        "id": 123,
        "cname": "宁德市",
        "zicode": "352100",
        "proviceid": 13
    },
    {
        "id": 124,
        "cname": "南昌市",
        "zicode": "330000",
        "proviceid": 14
    },
    {
        "id": 125,
        "cname": "景德镇市",
        "zicode": "333000",
        "proviceid": 14
    },
    {
        "id": 126,
        "cname": "萍乡市",
        "zicode": "337000",
        "proviceid": 14
    },
    {
        "id": 127,
        "cname": "九江市",
        "zicode": "332000",
        "proviceid": 14
    },
    {
        "id": 128,
        "cname": "新余市",
        "zicode": "338000",
        "proviceid": 14
    },
    {
        "id": 129,
        "cname": "鹰潭市",
        "zicode": "335000",
        "proviceid": 14
    },
    {
        "id": 130,
        "cname": "赣州市",
        "zicode": "341000",
        "proviceid": 14
    },
    {
        "id": 131,
        "cname": "吉安市",
        "zicode": "343000",
        "proviceid": 14
    },
    {
        "id": 132,
        "cname": "宜春市",
        "zicode": "336000",
        "proviceid": 14
    },
    {
        "id": 133,
        "cname": "抚州市",
        "zicode": "332900",
        "proviceid": 14
    },
    {
        "id": 134,
        "cname": "上饶市",
        "zicode": "334000",
        "proviceid": 14
    },
    {
        "id": 135,
        "cname": "济南市",
        "zicode": "250000",
        "proviceid": 15
    },
    {
        "id": 136,
        "cname": "青岛市",
        "zicode": "266000",
        "proviceid": 15
    },
    {
        "id": 137,
        "cname": "淄博市",
        "zicode": "255000",
        "proviceid": 15
    },
    {
        "id": 138,
        "cname": "枣庄市",
        "zicode": "277100",
        "proviceid": 15
    },
    {
        "id": 139,
        "cname": "东营市",
        "zicode": "257000",
        "proviceid": 15
    },
    {
        "id": 140,
        "cname": "烟台市",
        "zicode": "264000",
        "proviceid": 15
    },
    {
        "id": 141,
        "cname": "潍坊市",
        "zicode": "261000",
        "proviceid": 15
    },
    {
        "id": 142,
        "cname": "济宁市",
        "zicode": "272100",
        "proviceid": 15
    },
    {
        "id": 143,
        "cname": "泰安市",
        "zicode": "271000",
        "proviceid": 15
    },
    {
        "id": 144,
        "cname": "威海市",
        "zicode": "265700",
        "proviceid": 15
    },
    {
        "id": 145,
        "cname": "日照市",
        "zicode": "276800",
        "proviceid": 15
    },
    {
        "id": 146,
        "cname": "莱芜市",
        "zicode": "271100",
        "proviceid": 15
    },
    {
        "id": 147,
        "cname": "临沂市",
        "zicode": "276000",
        "proviceid": 15
    },
    {
        "id": 148,
        "cname": "德州市",
        "zicode": "253000",
        "proviceid": 15
    },
    {
        "id": 149,
        "cname": "聊城市",
        "zicode": "252000",
        "proviceid": 15
    },
    {
        "id": 150,
        "cname": "滨州市",
        "zicode": "256600",
        "proviceid": 15
    },
    {
        "id": 151,
        "cname": "荷泽市",
        "zicode": "255000",
        "proviceid": 15
    },
    {
        "id": 152,
        "cname": "郑州市",
        "zicode": "450000",
        "proviceid": 16
    },
    {
        "id": 153,
        "cname": "开封市",
        "zicode": "475000",
        "proviceid": 16
    },
    {
        "id": 154,
        "cname": "洛阳市",
        "zicode": "471000",
        "proviceid": 16
    },
    {
        "id": 155,
        "cname": "平顶山市",
        "zicode": "467000",
        "proviceid": 16
    },
    {
        "id": 156,
        "cname": "安阳市",
        "zicode": "454900",
        "proviceid": 16
    },
    {
        "id": 157,
        "cname": "鹤壁市",
        "zicode": "456600",
        "proviceid": 16
    },
    {
        "id": 158,
        "cname": "新乡市",
        "zicode": "453000",
        "proviceid": 16
    },
    {
        "id": 159,
        "cname": "焦作市",
        "zicode": "454100",
        "proviceid": 16
    },
    {
        "id": 160,
        "cname": "濮阳市",
        "zicode": "457000",
        "proviceid": 16
    },
    {
        "id": 161,
        "cname": "许昌市",
        "zicode": "461000",
        "proviceid": 16
    },
    {
        "id": 162,
        "cname": "漯河市",
        "zicode": "462000",
        "proviceid": 16
    },
    {
        "id": 163,
        "cname": "三门峡市",
        "zicode": "472000",
        "proviceid": 16
    },
    {
        "id": 164,
        "cname": "南阳市",
        "zicode": "473000",
        "proviceid": 16
    },
    {
        "id": 165,
        "cname": "商丘市",
        "zicode": "476000",
        "proviceid": 16
    },
    {
        "id": 166,
        "cname": "信阳市",
        "zicode": "464000",
        "proviceid": 16
    },
    {
        "id": 167,
        "cname": "周口市",
        "zicode": "466000",
        "proviceid": 16
    },
    {
        "id": 168,
        "cname": "驻马店市",
        "zicode": "463000",
        "proviceid": 16
    },
    {
        "id": 169,
        "cname": "武汉市",
        "zicode": "430000",
        "proviceid": 17
    },
    {
        "id": 170,
        "cname": "黄石市",
        "zicode": "435000",
        "proviceid": 17
    },
    {
        "id": 171,
        "cname": "十堰市",
        "zicode": "442000",
        "proviceid": 17
    },
    {
        "id": 172,
        "cname": "宜昌市",
        "zicode": "443000",
        "proviceid": 17
    },
    {
        "id": 173,
        "cname": "襄樊市",
        "zicode": "441000",
        "proviceid": 17
    },
    {
        "id": 174,
        "cname": "鄂州市",
        "zicode": "436000",
        "proviceid": 17
    },
    {
        "id": 175,
        "cname": "荆门市",
        "zicode": "448000",
        "proviceid": 17
    },
    {
        "id": 176,
        "cname": "孝感市",
        "zicode": "432100",
        "proviceid": 17
    },
    {
        "id": 177,
        "cname": "荆州市",
        "zicode": "434000",
        "proviceid": 17
    },
    {
        "id": 178,
        "cname": "黄冈市",
        "zicode": "438000",
        "proviceid": 17
    },
    {
        "id": 179,
        "cname": "咸宁市",
        "zicode": "437000",
        "proviceid": 17
    },
    {
        "id": 180,
        "cname": "随州市",
        "zicode": "441300",
        "proviceid": 17
    },
    {
        "id": 181,
        "cname": "恩施土家族苗族自治州",
        "zicode": "445000",
        "proviceid": 17
    },
    {
        "id": 182,
        "cname": "神农架",
        "zicode": "442400",
        "proviceid": 17
    },
    {
        "id": 183,
        "cname": "长沙市",
        "zicode": "410000",
        "proviceid": 18
    },
    {
        "id": 184,
        "cname": "株洲市",
        "zicode": "412000",
        "proviceid": 18
    },
    {
        "id": 185,
        "cname": "湘潭市",
        "zicode": "411100",
        "proviceid": 18
    },
    {
        "id": 186,
        "cname": "衡阳市",
        "zicode": "421000",
        "proviceid": 18
    },
    {
        "id": 187,
        "cname": "邵阳市",
        "zicode": "422000",
        "proviceid": 18
    },
    {
        "id": 188,
        "cname": "岳阳市",
        "zicode": "414000",
        "proviceid": 18
    },
    {
        "id": 189,
        "cname": "常德市",
        "zicode": "415000",
        "proviceid": 18
    },
    {
        "id": 190,
        "cname": "张家界市",
        "zicode": "427000",
        "proviceid": 18
    },
    {
        "id": 191,
        "cname": "益阳市",
        "zicode": "413000",
        "proviceid": 18
    },
    {
        "id": 192,
        "cname": "郴州市",
        "zicode": "423000",
        "proviceid": 18
    },
    {
        "id": 193,
        "cname": "永州市",
        "zicode": "425000",
        "proviceid": 18
    },
    {
        "id": 194,
        "cname": "怀化市",
        "zicode": "418000",
        "proviceid": 18
    },
    {
        "id": 195,
        "cname": "娄底市",
        "zicode": "417000",
        "proviceid": 18
    },
    {
        "id": 196,
        "cname": "湘西土家族苗族自治州",
        "zicode": "416000",
        "proviceid": 18
    },
    {
        "id": 197,
        "cname": "广州市",
        "zicode": "510000",
        "proviceid": 19
    },
    {
        "id": 198,
        "cname": "韶关市",
        "zicode": "521000",
        "proviceid": 19
    },
    {
        "id": 199,
        "cname": "深圳市",
        "zicode": "518000",
        "proviceid": 19
    },
    {
        "id": 200,
        "cname": "珠海市",
        "zicode": "519000",
        "proviceid": 19
    },
    {
        "id": 201,
        "cname": "汕头市",
        "zicode": "515000",
        "proviceid": 19
    },
    {
        "id": 202,
        "cname": "佛山市",
        "zicode": "528000",
        "proviceid": 19
    },
    {
        "id": 203,
        "cname": "江门市",
        "zicode": "529000",
        "proviceid": 19
    },
    {
        "id": 204,
        "cname": "湛江市",
        "zicode": "524000",
        "proviceid": 19
    },
    {
        "id": 205,
        "cname": "茂名市",
        "zicode": "525000",
        "proviceid": 19
    },
    {
        "id": 206,
        "cname": "肇庆市",
        "zicode": "526000",
        "proviceid": 19
    },
    {
        "id": 207,
        "cname": "惠州市",
        "zicode": "516000",
        "proviceid": 19
    },
    {
        "id": 208,
        "cname": "梅州市",
        "zicode": "514000",
        "proviceid": 19
    },
    {
        "id": 209,
        "cname": "汕尾市",
        "zicode": "516600",
        "proviceid": 19
    },
    {
        "id": 210,
        "cname": "河源市",
        "zicode": "517000",
        "proviceid": 19
    },
    {
        "id": 211,
        "cname": "阳江市",
        "zicode": "529500",
        "proviceid": 19
    },
    {
        "id": 212,
        "cname": "清远市",
        "zicode": "511500",
        "proviceid": 19
    },
    {
        "id": 213,
        "cname": "东莞市",
        "zicode": "511700",
        "proviceid": 19
    },
    {
        "id": 214,
        "cname": "中山市",
        "zicode": "528400",
        "proviceid": 19
    },
    {
        "id": 215,
        "cname": "潮州市",
        "zicode": "515600",
        "proviceid": 19
    },
    {
        "id": 216,
        "cname": "揭阳市",
        "zicode": "522000",
        "proviceid": 19
    },
    {
        "id": 217,
        "cname": "云浮市",
        "zicode": "527300",
        "proviceid": 19
    },
    {
        "id": 218,
        "cname": "南宁市",
        "zicode": "530000",
        "proviceid": 20
    },
    {
        "id": 219,
        "cname": "柳州市",
        "zicode": "545000",
        "proviceid": 20
    },
    {
        "id": 220,
        "cname": "桂林市",
        "zicode": "541000",
        "proviceid": 20
    },
    {
        "id": 221,
        "cname": "梧州市",
        "zicode": "543000",
        "proviceid": 20
    },
    {
        "id": 222,
        "cname": "北海市",
        "zicode": "536000",
        "proviceid": 20
    },
    {
        "id": 223,
        "cname": "防城港市",
        "zicode": "538000",
        "proviceid": 20
    },
    {
        "id": 224,
        "cname": "钦州市",
        "zicode": "535000",
        "proviceid": 20
    },
    {
        "id": 225,
        "cname": "贵港市",
        "zicode": "537100",
        "proviceid": 20
    },
    {
        "id": 226,
        "cname": "玉林市",
        "zicode": "537000",
        "proviceid": 20
    },
    {
        "id": 227,
        "cname": "百色市",
        "zicode": "533000",
        "proviceid": 20
    },
    {
        "id": 228,
        "cname": "贺州市",
        "zicode": "542800",
        "proviceid": 20
    },
    {
        "id": 229,
        "cname": "河池市",
        "zicode": "547000",
        "proviceid": 20
    },
    {
        "id": 230,
        "cname": "来宾市",
        "zicode": "546100",
        "proviceid": 20
    },
    {
        "id": 231,
        "cname": "崇左市",
        "zicode": "532200",
        "proviceid": 20
    },
    {
        "id": 232,
        "cname": "海口市",
        "zicode": "570000",
        "proviceid": 21
    },
    {
        "id": 233,
        "cname": "三亚市",
        "zicode": "572000",
        "proviceid": 21
    },
    {
        "id": 234,
        "cname": "重庆市",
        "zicode": "400000",
        "proviceid": 22
    },
    {
        "id": 235,
        "cname": "成都市",
        "zicode": "610000",
        "proviceid": 23
    },
    {
        "id": 236,
        "cname": "自贡市",
        "zicode": "643000",
        "proviceid": 23
    },
    {
        "id": 237,
        "cname": "攀枝花市",
        "zicode": "617000",
        "proviceid": 23
    },
    {
        "id": 238,
        "cname": "泸州市",
        "zicode": "646100",
        "proviceid": 23
    },
    {
        "id": 239,
        "cname": "德阳市",
        "zicode": "618000",
        "proviceid": 23
    },
    {
        "id": 240,
        "cname": "绵阳市",
        "zicode": "621000",
        "proviceid": 23
    },
    {
        "id": 241,
        "cname": "广元市",
        "zicode": "628000",
        "proviceid": 23
    },
    {
        "id": 242,
        "cname": "遂宁市",
        "zicode": "629000",
        "proviceid": 23
    },
    {
        "id": 243,
        "cname": "内江市",
        "zicode": "641000",
        "proviceid": 23
    },
    {
        "id": 244,
        "cname": "乐山市",
        "zicode": "614000",
        "proviceid": 23
    },
    {
        "id": 245,
        "cname": "南充市",
        "zicode": "637000",
        "proviceid": 23
    },
    {
        "id": 246,
        "cname": "眉山市",
        "zicode": "612100",
        "proviceid": 23
    },
    {
        "id": 247,
        "cname": "宜宾市",
        "zicode": "644000",
        "proviceid": 23
    },
    {
        "id": 248,
        "cname": "广安市",
        "zicode": "638000",
        "proviceid": 23
    },
    {
        "id": 249,
        "cname": "达州市",
        "zicode": "635000",
        "proviceid": 23
    },
    {
        "id": 250,
        "cname": "雅安市",
        "zicode": "625000",
        "proviceid": 23
    },
    {
        "id": 251,
        "cname": "巴中市",
        "zicode": "635500",
        "proviceid": 23
    },
    {
        "id": 252,
        "cname": "资阳市",
        "zicode": "641300",
        "proviceid": 23
    },
    {
        "id": 253,
        "cname": "阿坝藏族羌族自治州",
        "zicode": "624600",
        "proviceid": 23
    },
    {
        "id": 254,
        "cname": "甘孜藏族自治州",
        "zicode": "626000",
        "proviceid": 23
    },
    {
        "id": 255,
        "cname": "凉山彝族自治州",
        "zicode": "615000",
        "proviceid": 23
    },
    {
        "id": 256,
        "cname": "贵阳市",
        "zicode": "55000",
        "proviceid": 24
    },
    {
        "id": 257,
        "cname": "六盘水市",
        "zicode": "553000",
        "proviceid": 24
    },
    {
        "id": 258,
        "cname": "遵义市",
        "zicode": "563000",
        "proviceid": 24
    },
    {
        "id": 259,
        "cname": "安顺市",
        "zicode": "561000",
        "proviceid": 24
    },
    {
        "id": 260,
        "cname": "铜仁地区",
        "zicode": "554300",
        "proviceid": 24
    },
    {
        "id": 261,
        "cname": "黔西南布依族苗族自治州",
        "zicode": "551500",
        "proviceid": 24
    },
    {
        "id": 262,
        "cname": "毕节地区",
        "zicode": "551700",
        "proviceid": 24
    },
    {
        "id": 263,
        "cname": "黔东南苗族侗族自治州",
        "zicode": "551500",
        "proviceid": 24
    },
    {
        "id": 264,
        "cname": "黔南布依族苗族自治州",
        "zicode": "550100",
        "proviceid": 24
    },
    {
        "id": 265,
        "cname": "昆明市",
        "zicode": "650000",
        "proviceid": 25
    },
    {
        "id": 266,
        "cname": "曲靖市",
        "zicode": "655000",
        "proviceid": 25
    },
    {
        "id": 267,
        "cname": "玉溪市",
        "zicode": "653100",
        "proviceid": 25
    },
    {
        "id": 268,
        "cname": "保山市",
        "zicode": "678000",
        "proviceid": 25
    },
    {
        "id": 269,
        "cname": "昭通市",
        "zicode": "657000",
        "proviceid": 25
    },
    {
        "id": 270,
        "cname": "丽江市",
        "zicode": "674100",
        "proviceid": 25
    },
    {
        "id": 271,
        "cname": "思茅市",
        "zicode": "665000",
        "proviceid": 25
    },
    {
        "id": 272,
        "cname": "临沧市",
        "zicode": "677000",
        "proviceid": 25
    },
    {
        "id": 273,
        "cname": "楚雄彝族自治州",
        "zicode": "675000",
        "proviceid": 25
    },
    {
        "id": 274,
        "cname": "红河哈尼族彝族自治州",
        "zicode": "654400",
        "proviceid": 25
    },
    {
        "id": 275,
        "cname": "文山壮族苗族自治州",
        "zicode": "663000",
        "proviceid": 25
    },
    {
        "id": 276,
        "cname": "西双版纳傣族自治州",
        "zicode": "666200",
        "proviceid": 25
    },
    {
        "id": 277,
        "cname": "大理白族自治州",
        "zicode": "671000",
        "proviceid": 25
    },
    {
        "id": 278,
        "cname": "德宏傣族景颇族自治州",
        "zicode": "678400",
        "proviceid": 25
    },
    {
        "id": 279,
        "cname": "怒江傈僳族自治州",
        "zicode": "671400",
        "proviceid": 25
    },
    {
        "id": 280,
        "cname": "迪庆藏族自治州",
        "zicode": "674400",
        "proviceid": 25
    },
    {
        "id": 281,
        "cname": "拉萨市",
        "zicode": "850000",
        "proviceid": 26
    },
    {
        "id": 282,
        "cname": "昌都地区",
        "zicode": "854000",
        "proviceid": 26
    },
    {
        "id": 283,
        "cname": "山南地区",
        "zicode": "856000",
        "proviceid": 26
    },
    {
        "id": 284,
        "cname": "日喀则地区",
        "zicode": "857000",
        "proviceid": 26
    },
    {
        "id": 285,
        "cname": "那曲地区",
        "zicode": "852000",
        "proviceid": 26
    },
    {
        "id": 286,
        "cname": "阿里地区",
        "zicode": "859100",
        "proviceid": 26
    },
    {
        "id": 287,
        "cname": "林芝地区",
        "zicode": "860100",
        "proviceid": 26
    },
    {
        "id": 288,
        "cname": "西安市",
        "zicode": "710000",
        "proviceid": 27
    },
    {
        "id": 289,
        "cname": "铜川市",
        "zicode": "727000",
        "proviceid": 27
    },
    {
        "id": 290,
        "cname": "宝鸡市",
        "zicode": "721000",
        "proviceid": 27
    },
    {
        "id": 291,
        "cname": "咸阳市",
        "zicode": "712000",
        "proviceid": 27
    },
    {
        "id": 292,
        "cname": "渭南市",
        "zicode": "714000",
        "proviceid": 27
    },
    {
        "id": 293,
        "cname": "延安市",
        "zicode": "716000",
        "proviceid": 27
    },
    {
        "id": 294,
        "cname": "汉中市",
        "zicode": "723000",
        "proviceid": 27
    },
    {
        "id": 295,
        "cname": "榆林市",
        "zicode": "719000",
        "proviceid": 27
    },
    {
        "id": 296,
        "cname": "安康市",
        "zicode": "725000",
        "proviceid": 27
    },
    {
        "id": 297,
        "cname": "商洛市",
        "zicode": "711500",
        "proviceid": 27
    },
    {
        "id": 298,
        "cname": "兰州市",
        "zicode": "730000",
        "proviceid": 28
    },
    {
        "id": 299,
        "cname": "嘉峪关市",
        "zicode": "735100",
        "proviceid": 28
    },
    {
        "id": 300,
        "cname": "金昌市",
        "zicode": "737100",
        "proviceid": 28
    },
    {
        "id": 301,
        "cname": "白银市",
        "zicode": "730900",
        "proviceid": 28
    },
    {
        "id": 302,
        "cname": "天水市",
        "zicode": "741000",
        "proviceid": 28
    },
    {
        "id": 303,
        "cname": "武威市",
        "zicode": "733000",
        "proviceid": 28
    },
    {
        "id": 304,
        "cname": "张掖市",
        "zicode": "734000",
        "proviceid": 28
    },
    {
        "id": 305,
        "cname": "平凉市",
        "zicode": "744000",
        "proviceid": 28
    },
    {
        "id": 306,
        "cname": "酒泉市",
        "zicode": "735000",
        "proviceid": 28
    },
    {
        "id": 307,
        "cname": "庆阳市",
        "zicode": "744500",
        "proviceid": 28
    },
    {
        "id": 308,
        "cname": "定西市",
        "zicode": "743000",
        "proviceid": 28
    },
    {
        "id": 309,
        "cname": "陇南市",
        "zicode": "742100",
        "proviceid": 28
    },
    {
        "id": 310,
        "cname": "临夏回族自治州",
        "zicode": "731100",
        "proviceid": 28
    },
    {
        "id": 311,
        "cname": "甘南藏族自治州",
        "zicode": "747000",
        "proviceid": 28
    },
    {
        "id": 312,
        "cname": "西宁市",
        "zicode": "810000",
        "proviceid": 29
    },
    {
        "id": 313,
        "cname": "海东地区",
        "zicode": "810600",
        "proviceid": 29
    },
    {
        "id": 314,
        "cname": "海北藏族自治州",
        "zicode": "810300",
        "proviceid": 29
    },
    {
        "id": 315,
        "cname": "黄南藏族自治州",
        "zicode": "811300",
        "proviceid": 29
    },
    {
        "id": 316,
        "cname": "海南藏族自治州",
        "zicode": "813000",
        "proviceid": 29
    },
    {
        "id": 317,
        "cname": "果洛藏族自治州",
        "zicode": "814000",
        "proviceid": 29
    },
    {
        "id": 318,
        "cname": "玉树藏族自治州",
        "zicode": "815000",
        "proviceid": 29
    },
    {
        "id": 319,
        "cname": "海西蒙古族藏族自治州",
        "zicode": "817000",
        "proviceid": 29
    },
    {
        "id": 320,
        "cname": "银川市",
        "zicode": "750000",
        "proviceid": 30
    },
    {
        "id": 321,
        "cname": "石嘴山市",
        "zicode": "753000",
        "proviceid": 30
    },
    {
        "id": 322,
        "cname": "吴忠市",
        "zicode": "751100",
        "proviceid": 30
    },
    {
        "id": 323,
        "cname": "固原市",
        "zicode": "756000",
        "proviceid": 30
    },
    {
        "id": 324,
        "cname": "中卫市",
        "zicode": "751700",
        "proviceid": 30
    },
    {
        "id": 325,
        "cname": "乌鲁木齐市",
        "zicode": "830000",
        "proviceid": 31
    },
    {
        "id": 326,
        "cname": "克拉玛依市",
        "zicode": "834000",
        "proviceid": 31
    },
    {
        "id": 327,
        "cname": "吐鲁番地区",
        "zicode": "838000",
        "proviceid": 31
    },
    {
        "id": 328,
        "cname": "哈密地区",
        "zicode": "839000",
        "proviceid": 31
    },
    {
        "id": 329,
        "cname": "昌吉回族自治州",
        "zicode": "831100",
        "proviceid": 31
    },
    {
        "id": 330,
        "cname": "博尔塔拉蒙古自治州",
        "zicode": "833400",
        "proviceid": 31
    },
    {
        "id": 331,
        "cname": "巴音郭楞蒙古自治州",
        "zicode": "841000",
        "proviceid": 31
    },
    {
        "id": 332,
        "cname": "阿克苏地区",
        "zicode": "843000",
        "proviceid": 31
    },
    {
        "id": 333,
        "cname": "克孜勒苏柯尔克孜自治州",
        "zicode": "835600",
        "proviceid": 31
    },
    {
        "id": 334,
        "cname": "喀什地区",
        "zicode": "844000",
        "proviceid": 31
    },
    {
        "id": 335,
        "cname": "和田地区",
        "zicode": "848000",
        "proviceid": 31
    },
    {
        "id": 336,
        "cname": "伊犁哈萨克自治州",
        "zicode": "833200",
        "proviceid": 31
    },
    {
        "id": 337,
        "cname": "塔城地区",
        "zicode": "834700",
        "proviceid": 31
    },
    {
        "id": 338,
        "cname": "阿勒泰地区",
        "zicode": "836500",
        "proviceid": 31
    },
    {
        "id": 339,
        "cname": "石河子市",
        "zicode": "832000",
        "proviceid": 31
    },
    {
        "id": 340,
        "cname": "阿拉尔市",
        "zicode": "843300",
        "proviceid": 31
    },
    {
        "id": 341,
        "cname": "图木舒克市",
        "zicode": "843900",
        "proviceid": 31
    },
    {
        "id": 342,
        "cname": "五家渠市",
        "zicode": "831300",
        "proviceid": 31
    },
    {
        "id": 343,
        "cname": "香港特别行政区",
        "zicode": "000000",
        "proviceid": 32
    },
    {
        "id": 344,
        "cname": "澳门特别行政区",
        "zicode": "000000",
        "proviceid": 33
    },
    {
        "id": 345,
        "cname": "台湾省",
        "zicode": "000000",
        "proviceid": 34
    }
];