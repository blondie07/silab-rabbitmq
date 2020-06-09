var amqp = require('amqplib/callback_api');

/**
 * 1. Ouverture d'une connexion
 * 2. Ouverture d'une Channel
 * 3. Déclaration d'une queue (Note that we declare the queue here, as well. 
 * Because we might start the consumer before the publisher, we want to make sure 
 * the queue exists before we try to consume messages from it.)
 * 4. La queue matche avec celle du send.js
 * 5. Callback exécutée quand RabbitMQ push les message vers notre consumer.
 */

 //1
amqp.connect('amqp://localhost', function(errConnect, connection) {
    if (errConnect) {
        throw errConnect;
    }
    //2
    connection.createChannel(function(errChannel, channel) {
        if (errChannel) {
            throw errChannel;
        }
        //3
        var queue = 'hello';
        //4
        channel.assertQueue(queue, {
            durable: false
        });

        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
        //5
        channel.consume(queue, function(msg) {
            console.log(" [x] Received %s", msg.content.toString());
        }, {
            noAck: true
        });
    });
});