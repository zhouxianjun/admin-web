/**
 * Created by cz on 2016/7/21.
 */
const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://127.0.0.1:1883', {
    clientId: 'nodejs-mqtt',
    clean: false
});

client.on('connect', function () {
    client.subscribe('presence');
    client.publish('presence', 'Hello mqtt1', {
        retain: true,
        qos: 1
    });
});
client.on('message', function (topic, message) {
    // message is Buffer
    console.log(message.toString());
    //client.end();
});
