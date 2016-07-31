/**
 * Created with JetBrains Idea.
 * User: Gary
 * Date: 2016/6/30
 * Time: 12:47
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
const path = require('path');
const watch = require('watch');
const thrift = require('thrift');
const querystring = require('querystring');
const enumerables = ['hasOwnProperty', 'valueOf', 'isPrototypeOf', 'propertyIsEnumerable',
    'toLocaleString', 'toString', 'constructor'];
module.exports = class Utils {
    static watch(dir, onChange, onDelete){
        watch.watchTree(dir, (f, curr, prev) => {
            if(!(typeof f == "object" && prev === null && curr === null) && curr != null && (curr.isFile() || curr.nlink === 0)){
                let resolve = path.resolve(f);
                if(!curr.name)curr.name = path.basename(resolve);
                if(curr.nlink === 0){
                    if(typeof onDelete === 'function'){
                        Reflect.apply(onDelete, onDelete, [curr, resolve, prev]);
                    }
                    return;
                }
                if(typeof onChange === 'function'){
                    Reflect.apply(onChange, onChange, [curr, resolve, prev]);
                }
            }
        });
    }
    static fileChange(root, fileStat, callback) {
        let base = path.join(root, fileStat.name);
        if(fileStat.name.endsWith('.js')) {
            let pwd = path.relative(__dirname, base);
            if (!pwd.startsWith('.') && !pwd.startsWith('/')) {
                pwd = './' + pwd;
            }
            var indexOf = base.indexOf(':');
            if (!base.startsWith('/') && indexOf != -1) {
                base = base.substring(0, indexOf).toUpperCase() + base.substring(indexOf);
            }
            if (require.cache[base]) {
                Reflect.deleteProperty(require.cache, base);
                console.log(`reload file: ${fileStat.name}:${base}`);
            }
            let service = require(pwd);
            if(typeof callback === 'function'){
                Reflect.apply(callback, callback, [pwd, service, base]);
            }
        }
    }
    static merge(source) {
        var i = 1,
            ln = arguments.length,
            mergeFn = Utils.merge,
            cloneFn = Utils.clone,
            object, key, value, sourceKey;

        for (; i < ln; i++) {
            object = arguments[i];

            for (key in object) {
                value = object[key];
                if (value && value.constructor === Object) {
                    sourceKey = source[key];
                    if (sourceKey && sourceKey.constructor === Object) {
                        mergeFn(sourceKey, value);
                    }
                    else {
                        source[key] = cloneFn(value);
                    }
                }
                else {
                    source[key] = value;
                }
            }
        }

        return source;
    }
    static clone(item) {
        if (item === null || item === undefined) {
            return item;
        }

        // DOM nodes
        if (item.nodeType && item.cloneNode) {
            return item.cloneNode(true);
        }

        // Strings
        var type = toString.call(item);

        // Dates
        if (type === '[object Date]') {
            return new Date(item.getTime());
        }

        var i, j, k, clone, key;

        // Arrays
        if (type === '[object Array]') {
            i = item.length;

            clone = [];

            while (i--) {
                clone[i] = Utils.clone(item[i]);
            }
        }
        // Objects
        else if (type === '[object Object]' && item.constructor === Object) {
            clone = {};

            for (key in item) {
                clone[key] = Utils.clone(item[key]);
            }

            if (enumerables) {
                for (j = enumerables.length; j--;) {
                    k = enumerables[j];
                    clone[k] = item[k];
                }
            }
        }

        return clone || item;
    }

    static writeResult(ctx, result) {
        if (ctx.path.startsWith('/user/login')) {
            ctx.redirect(`/pages/login.html?error=${querystring.escape(result.json.msg)}`);
            return;
        }
        switch (ctx.accepts('html', 'json')) {
            case 'html':
                if (result.code == 99) {
                    ctx.redirect('/');
                    return;
                }
                ctx.type = 'html';
                ctx.body = `<p>${JSON.stringify(result.json)}</p>`;
                break;
            case 'json':
                ctx.body = result.json;
                break;
            default:
                ctx.type = 'text';
                ctx.body = JSON.stringify(result.json);
        }
    }

    static makeTree(array, pid, prop_parent, prop_id, prop_child, renderer){
        let result = [] , temp;
        for(let item of array){
            Reflect.ownKeys(item).forEach(key => {
                if (item[key] instanceof thrift.Int64)
                    item[key] = item[key].toNumber();
            });
            if(item[prop_parent] == pid){
                result.push(item);
                temp = Utils.makeTree(array, item[prop_id], prop_parent, prop_id, prop_child);
                if(temp.length > 0){
                    item[prop_child] = temp;
                }
            }
            if (typeof renderer == 'function') {
                renderer(item);
            }
        }
        return result;
    }
    static makeList(array) {
        for(let item of array){
            Reflect.ownKeys(item).forEach(key => {
                if (item[key] instanceof thrift.Int64)
                    item[key] = item[key].toNumber();
            });
        }
        return array;
    }
    static * login(ctx, param) {
        if (!param || !param.username) {
            ctx.throw(400);
            return false;
        }
        let userService = require('../service/UserService').instance();
        let interfaceService = require('../service/InterfaceService').instance();
        let user = yield userService.login(param.username, param.password);
        if (user && user.id.toNumber() > 0) {
            user.id = user.id.toNumber();
            ctx.session.user = user;
            ctx.session.interfaces = yield interfaceService.interfacesByUser(ctx.session.user.id);
            return true;
        }
        return false;
    }

    static * boxLogin(ctx, param) {
        if (!param || !param.username) {
            ctx.throw(400);
            return false;
        }
        let apiService = require('../service/ApiService').instance();
        let interfaceService = require('../service/InterfaceService').instance();
        let res = yield apiService.boxLogin(param.username, param.password, param.box_id);
        if (res && res.toNumber() > 0) {
            ctx.session.user = {
                id: res.toNumber(),
                box_id: param.box_id
            };
            ctx.session.interfaces = yield interfaceService.interfacesByUser(ctx.session.user.id);
            return true;
        }
        return false;
    }
};