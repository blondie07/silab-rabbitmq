var amqp = require('amqplib/callback_api');

/**
 * 1. Connection au serveur RabbitMQ
 * 2. Creation d'une Channel : là où la plupart des tâches de l'API se réalisent
 * 3. Déclarer une queue où envoyer les messages
 * 4. Publier un message dans la queue
 * 5. Fermer la connection et sortir du process
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

        var queue = 'hello';
        var msg = 'Hello world';
        //3
        channel.assertQueue(queue, {
            durable: false
        });
        //4
        channel.sendToQueue(queue, Buffer.from(msg));
        console.log(" [x] Sent %s", msg);
    });
    //5
    setTimeout(function() {
        connection.close();
        process.exit(0);
    }, 500);
});