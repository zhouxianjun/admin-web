/**
 * Created with JetBrains Idea.
 * User: Gary
 * Date: 16-7-24
 * Time: 下午10:35
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
const amqp = require('amqp');
let exchange;
const connection = amqp.createConnection({
    host: '120.24.6.132',
    login: 'alone',
    password: 'woaini',
    vhost: '/hlyt'
});

// add this for better debuging
connection.on('error', function(e) {
    console.log("Error from amqp: ", e);
});

// Wait for connection to become established.
let i = 0, max = 10;
connection.on('ready', function () {
    // Use the default 'amq.topic' exchange
    let exchange = connection.exchange('my-ex', {
        type: 'topic',
        durable: true
        //autoDelete: false
    }, exchange => {
        setInterval(() => {
            exchange.publish('box', new Buffer(`hello ==> ${++i}`), {
                contentEncoding: 'utf-8',
                deliveryMode: 1
            });
            console.log(`send: ${i}`);
        }, 3000);
        console.log(`Exchange ${exchange.name} is open`);
    });
});
