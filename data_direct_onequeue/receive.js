/**
 * ---------------BINDING-----------------------------
 * 1. je créé un lien entre queue_name et exechange_name, avec la lef 'data'
 * channel.bindQueue(queue_name, exchange_name, 'data');
 */

var amqp = require('amqplib/callback_api');

var args = process.argv.slice(2);

if (args.length == 0) {
  console.log("Usage: receive.js [temperature] [position] [webapp]");
  process.exit(1);
}

amqp.connect('amqp://localhost', function(error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function(error1, channel) {
    if (error1) {
      throw error1;
    }
    var exchange = 'direct_data';

    channel.assertExchange(exchange, 'direct', {
      durable: false
    });

    ///def de la queue qui concerne les données de capteurs
    channel.assertQueue('', {
      exclusive: true
      }, function(error2, q) {
        if (error2) {
          throw error2;
        }
      console.log(' [*] Waiting for logs. To exit press CTRL+C');

      //1
      args.forEach(function(data) {
        channel.bindQueue(q.queue, exchange, data);
      });

      channel.consume(q.queue, function(msg) {
        console.log(" [x] %s: '%s'", msg.fields.routingKey, msg.content.toString());
      }, {
        noAck: true
      });
    });

  });
  
});