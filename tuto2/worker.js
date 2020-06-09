var amqp = require('amqplib/callback_api');

/**
 * 1. Connection au serveur RabbitMQ
 * 2. Creation d'une Channel : là où la plupart des tâches de l'API se réalisent
 * 3. Déclarer une queue où envoyer les messages
 * 4. Publier un message dans la queue
 * 5. Fermer la connection et sortir du process
 * ------------------------------------------------------------------------
 * --------------------------------ACK-------------------------------------
 * 6. Positionner l'acknowledgement manuel sur le message
 * 7. Activer l'acknowledgement manuel (désactiver l'automatique) 
 *  |--> Si le worker meurt avant d'avoir accomplit sa tâche, elle est complétée
 *       par un autre worker !
 * ------------------------------------------------------------------------
 * ------------------------PERSISTENCE-------------------------------------
 * 8. La queue ne sera pas perdue si le serveur RabbitMQ crashe
 * ------------------------------------------------------------------------
 * --------------------------DISPATCH -------------------------------------
 * 9. Contraint RabbitMQ à n'envoyer que n message à un worker à la fois (ici n=1)
 * --> si le worker n'a pas finit le process de son message, RabbitMQ ne lui en envoie
 *     pas d'autre.
 */

 //1
amqp.connect('amqp://localhost', function(error, connection) {
    //2
    connection.createChannel(function(error, channel) {
        //3
        var queue = 'task_queue';
        //4
        channel.assertQueue(queue, {
            //8
            durable: true
        });
        //9
        channel.prefetch(1);

        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
        //5
        channel.consume(queue, function(msg) {
            var secs = msg.content.toString().split('.').length - 1;
            console.log(" [x] Received %s", msg.content.toString());
            setTimeout(function() {
                console.log(" [x] Done");
                //6
                channel.ack(msg);
            }, secs * 1000);
          }, {
            //7
            noAck: false
        });
    });
});