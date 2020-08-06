#!/usr/bin/env node

var amqp = require('amqplib/callback_api');

amqp.connect('localhost:6000', function (error, connection) {
    connection.createChannel(function (error, channel) {
        var queue = 'task_queue';
        //assertQueue pushes the message to the queue
        channel.assertQueue(queue, {
            durable: true//in case the queue and rabbitMQ stops
        });
        channel.prefetch(1);
        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
        channel.consume(queue, function (msg) {
            var secs = msg.content.toString().split('.').length - 1;

            console.log(" [x] Received %s", msg.content.toString());
            setTimeout(function () {
                console.log(" [x] Done");
                channel.ack(msg);
            }, secs * 1000);
        }, {
            noAck: false
        });
    });
});