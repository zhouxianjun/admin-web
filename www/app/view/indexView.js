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
requirejs(['jquery', 'ko', 'jquery-tmpl', 'app', 'bootstrap'], function($, ko) {
    var viewModel = {
        tabs: ko.observableArray([]),
        name: '111111111',
        //menus: ko.observableArray([]),
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
        menuClick: function(view, event) {
            var id = $(event.currentTarget).attr('id');
            var data = view.getMenuById(view.menus(), id);
            var parentRoot = view.getMenuRootByPid(data.pid);
            var exist = false;
            console.log(data, parentRoot);
            $.each(view.tabs(), function (index, tab) {
                if (tab.href == parentRoot.panel) {
                    tab.src = '';
                    tab.src = data.path;
                    exist = true;
                    return false;
                }
            });

            if (!exist) {
                view.tabs.push({
                    name: parentRoot.name,
                    href: parentRoot.panel,
                    src: data.path,
                    icon: parentRoot.icon
                });
            }
            $('a[href="#' + parentRoot.panel + '"]').tab('show');
        },
        closeTab: function (menu) {
            console.log(arguments);
            var self = this;
            var active = $(event.currentTarget).parents('li:eq(0)').hasClass('active');
            if (active) {
                var index = self.tabs.indexOf(menu);
                if (index - 1 >= 0) {
                    $('a[href="#' + self.tabs()[index - 1].ahref() + '"]').tab('show');
                    //self.positionMainMenu(self.iframes()[index - 1]);
                } else {
                    $('a[href="#home"]').tab('show');
                }
            }
            self.tabs.remove(menu);
        },
        menus: ko.observableArray([{
            id: 1000,
            pid: 0,
            name: 'test',
            icon: 'fa-dashboard',
            panel: 'test',
            sub: [{
                id: 1001,
                pid: 1000,
                name: 'test11',
                panel: 'test',
                path: '/index.html',
                icon: '',
                sub: []
            }, {
                id: 1002,
                pid: 1000,
                name: 'test22',
                panel: 'test',
                path: '#',
                icon: '',
                sub: []
            }]
        }])
    };
    /*viewModel.menus = ko.observableArray([{
        id: 1000,
        pid: 0,
        name: '权限管理',
        icon: 'fa-dashboard',
        panel: 'permissions_panel',
        sub: [{
            id: 1001,
            pid: 1000,
            name: '菜单配置',
            panel: 'permissions_panel',
            path: '#',
            icon: '',
            sub: []
        }, {
            id: 1002,
            pid: 1000,
            name: '角色配置',
            panel: 'permissions_panel',
            path: '#',
            icon: '',
            sub: []
        }, {
            id: 1003,
            pid: 1000,
            name: '用户配置',
            panel: 'permissions_panel',
            path: '#',
            icon: '',
            sub: []
        }]
    }, {
        id: 1100,
        pid: 0,
        name: '设备管理',
        icon: 'fa-dashboard',
        panel: 'device_panel',
        sub: []
    }, {
        id: 1200,
        pid: 0,
        name: '数据统计',
        icon: 'fa-dashboard',
        panel: 'statistics_panel',
        sub: [{
            id: 1201,
            pid: 0,
            name: '产线数据列表',
            icon: 'fa-dashboard',
            panel: 'statistics_panel',
            sub: []
        }, {
            d: 1202,
            pid: 0,
            name: '终端数据列表',
            icon: 'fa-dashboard',
            panel: 'statistics_panel',
            sub: []
        }, {
            d: 1203,
            pid: 0,
            name: '应用数据列表',
            icon: 'fa-dashboard',
            panel: 'statistics_panel',
            sub: []
        }]
    }, {
        id: 1300,
        pid: 0,
        name: '装机管理',
        icon: 'fa-dashboard',
        panel: 'apps_panel',
        sub: []
    }, {
        id: 1400,
        pid: 0,
        name: '数据推送',
        icon: 'fa-dashboard',
        panel: 'data_send_panel',
        sub: []
    }]);*/
    ko.applyBindings(viewModel);
    //viewModel.initMenus();
});
