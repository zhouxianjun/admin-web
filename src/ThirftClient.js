/**
 * Created with JetBrains Idea.
 * User: Gary
 * Date: 16-7-9
 * Time: 上午12:11
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
const ThriftClient = require('node-thrift-client');
const client = ThriftClient.zookeeper.createClient('127.0.0.1:2181');
let self = null;
module.exports = function(callback) {
    if (self) return;
    client.connect();
    client.on('connected', function() {
        let providerFactory = new ThriftClient.provider.ZookeeperThriftServerProviderFactory(
            client,
            new ThriftClient.invoker.factory.PoolInvokerFactory(
                ThriftClient.thrift.TFramedTransport,
                ThriftClient.thrift.TCompactProtocol,
                100, 1000 * 60 * 5
            ),
            'demo'
        );
        providerFactory.on('init', () => {
            let thriftClient = new ThriftClient(providerFactory, new ThriftClient.loadBalance.RoundRobinLoadBalance());
            thriftClient.on('fileSystemInit', callback);
            thriftClient.useFileSystem('./src/service/');
        });
    });
    client.on('error', function(err) {
        console.error(err.stack);
    });
};