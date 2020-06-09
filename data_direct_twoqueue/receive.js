var amqp = require('amqplib/callback_api');

var args = process.argv.slice(2);

/*
if (args.length == 0) {
  console.log("Usage: receive.js [temperature] [position] [webapp]");
  process.exit(1);
}*/

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
      console.log(' [WEBAPP] Waiting for logs. To exit press CTRL+C');

      channel.bindQueue(q.queue, exchange, 'webapp');

      channel.consume(q.queue, function(msg) {
        console.log(" [WA] %s: '%s'", msg.fields.routingKey, msg.content.toString());
      }, {
        noAck: true
      });
    });

    //queue captors
    channel.assertQueue('', {
      exclusive: true
      }, function(error2, q) {
        if (error2) {
          throw error2;
        }
      console.log(' [CAPTOR] Waiting for logs. To exit press CTRL+C');

      //1
    channel.bindQueue(q.queue, exchange, 'captor');

      channel.consume(q.queue, function(msg) {
        console.log(" [C] %s: '%s'", msg.fields.routingKey, msg.content.toString());
      }, {
        noAck: true
      });
    });

  });
  
});