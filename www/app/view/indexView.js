/**
 * Created with JetBrains Idea.
 * User: Gary
 * Date: 2016/6/30
 * Time: 13:58
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
require(['jquery', 'ko', 'permissionsService', 'userService', 'util', 'layer', 'app', 'bootstrap', 'validator'], function($, ko, PermissionsService, UserService, util, layer) {
    var viewModel = {
        tabs: ko.observableArray([]),
        name: ko.observable(''),
        menus: ko.observableArray(),
        user: {
            name: ko.observable(),
            real_name: ko.observable(),
            company: ko.observable(),
            phone: ko.observable(),
            province_text: ko.observable(),
            city_text: ko.observable(),
            email: ko.observable(),
            password: ko.observable(),
            role_name: ko.observable()
        },
        getMenuById: function(menus, id) {
            for (var i = 0; i < menus.length; i++) {
                if (menus[i].id == id) {
                    return menus[i];
                } else {
                    if (menus[i].sub && menus[i].sub.length > 0) {
                        var menu = this.getMenuById(menus[i].sub, id);
                        if (menu != null) return menu;
                    }
                }
            }
            return null;
        },
        getMenuRootByPid: function(pid) {
            var parent = this.getMenuById(this.menus(), pid);
            if (parent && parent.pid && parent.pid != 0) {
                return this.getMenuRootByPid(parent.pid);
            }
            return parent;
        },
        menuClick: function(data) {
            var parentRoot = viewModel.getMenuRootByPid(data.pid) || data;
            var exist = false;
            $.each(viewModel.tabs(), function (index, tab) {
                if (tab.href == parentRoot.panel) {
                    tab.src(data.path);
                    exist = true;
                    return false;
                }
            });

            if (!exist) {
                viewModel.tabs.push({
                    name: parentRoot.name,
                    href: parentRoot.panel,
                    src: ko.observable(data.path),
                    icon: parentRoot.icon
                });
            }
            $('a[href="#' + parentRoot.panel + '"]').tab('show');
        },
        closeTab: function (menu, event) {
            console.log(arguments);
            var active = $(event.currentTarget).parents('li:eq(0)').hasClass('active');
            if (active) {
                var index = viewModel.tabs.indexOf(menu);
                if (index - 1 >= 0) {
                    $('a[href="#' + viewModel.tabs()[index - 1].ahref() + '"]').tab('show');
                    //self.positionMainMenu(self.iframes()[index - 1]);
                } else {
                    $('a[href="#home"]').tab('show');
                }
            }
            viewModel.tabs.remove(menu);
        },
        openUserForm: function () {
            var lwin = layer.open({
                type: 1,
                title: '个人信息修改',
                area: ['500px', '400px'], //宽高
                content: $('#layer_user_info').html(),
                btn: ['确定', '取消'],
                yes: function () {
                    var form = $('#userFrom');
                    form.data('bootstrapValidator').validate();
                    if (form.data('bootstrapValidator').isValid()) {
                        util.send(UserService.update(ko.toJSON(viewModel.user))).then(function () {
                            viewModel.loadInfo();
                            layer.close(lwin);
                        });
                    }
                }
            });
            util.initValidForm($('#userFrom'), {
                user_password: {
                    validators: {
                        identical: {
                            field: 'user_confirm_password'
                        },
                        regexp: {
                            regexp: /^[a-zA-Z]\w{5,17}$/
                        }
                    }
                },
                user_confirm_password: {
                    validators: {
                        identical: {
                            field: 'user_password'
                        },
                        regexp: {
                            regexp: /^[a-zA-Z]\w{5,17}$/
                        }
                    }
                },
                user_name: {
                    validators: {
                        notEmpty: {
                            message: '不能为空'
                        }
                    }
                },
                user_phone: {
                    validators: {
                        regexp: {
                            regexp: /(^(\d{3,4}-)?\d{7,8})$|(13[0-9]{9})/,
                            message: '请输入正确的电话与手机号码'
                        }
                    }
                },
                user_real_name: {
                    validators: {
                        regexp: {
                            regexp: /[\u4E00-\u9FA5]{2,5}(?:·[\u4E00-\u9FA5]{2,5})*/,
                            message: '请输入正确姓名'
                        }
                    }
                },
                user_email: {
                    validators: {
                        email: {
                            message: '请输入正确到邮箱地址'
                        }
                    }
                }
            });
            ko.applyBindings(viewModel, $('#userFrom')[0]);
            $('#userFrom').slimScroll({
                height: '100%', //可滚动区域高度
                disableFadeOut: true
            });
        },
        initMenus: function() {
            var deferred = PermissionsService.menus();
            util.send(deferred, function(response) {
                viewModel.menus(response.data.menus);
                ko.applyBindings(viewModel);
            });
            viewModel.loadInfo();
        },
        loadInfo: function () {
            util.send(UserService.info()).then(function (response) {
                util.setViewModelData(viewModel.user, response.data.user);
                viewModel.user.province_text(util.getProvinceNameById(response.data.user.province_id));
                viewModel.user.city_text(util.getCityNameById(response.data.user.city_id));
                if (!viewModel.user.real_name())
                    $('#real_name_text').text('none');
            });
        },
        logout: function () {
            window.location.href = '/user/logout';
        }
    };

    viewModel.initMenus();
});
