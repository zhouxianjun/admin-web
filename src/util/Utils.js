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
};