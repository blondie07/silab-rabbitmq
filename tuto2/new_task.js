var amqp = require('amqplib/callback_api');

/**
 * 1. Connection au serveur RabbitMQ
 * 2. Creation d'une Channel : là où la plupart des tâches de l'API se réalisent
 * 3. Déclarer une queue où envoyer les messages
 * 4. Publier un message dans la queue
 * 5. Fermer la connection et sortir du process
 * ------------------------------------------------------------------------
 * ------------------------PERSISTENCE-------------------------------------
 * 6. La queue ne sera pas perdue si le serveur RabbitMQ crashe
 * 7. Le message ne sera pas perdue si le serveur RabbitMQ crashe
 */

 //1
amqp.connect('amqp://localhost', function(error0, connection) {
    if (error0) {
        throw error0;
    }
    //2
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }
        var queue = 'task_queue';
        var msg = process.argv.slice(2).join(' ') || "Hello World!";
        //3
        channel.assertQueue(queue, {
            //6
            durable: true
        });
        //4
        channel.sendToQueue(queue, Buffer.from(msg), {
            //7
            persistent: true
        });
        console.log(" [x] Sent '%s'", msg);
    });
    //5
    setTimeout(function() {
        connection.close();
        process.exit(0);
    }, 500);
});