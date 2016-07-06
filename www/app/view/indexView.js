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
require(['jquery', 'ko', 'permissionsService', 'util', 'jquery-tmpl', 'app', 'bootstrap'], function($, ko, PermissionsService, util) {
    var viewModel = {
        tabs: ko.observableArray([]),
        name: ko.observable(''),
        menus: ko.observableArray([]),
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
                    tab.src = '';
                    tab.src = data.path;
                    exist = true;
                    return false;
                }
            });

            if (!exist) {
                viewModel.tabs.push({
                    name: parentRoot.name,
                    href: parentRoot.panel,
                    src: data.path,
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
        initMenus: function() {
            var deferred = PermissionsService.menus();
            util.send(deferred, function(response) {
                viewModel.menus(response.data.menus);
                viewModel.name(response.data.user.name);
                ko.applyBindings(viewModel);
            });
        },
        logout: function () {
            window.location.href = '/user/logout';
        }
    };

    viewModel.initMenus();
});
