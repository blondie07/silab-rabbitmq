var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function(error1, channel) {
    if (error1) {
      throw error1;
    }
    var exchange = 'topic_data';

    channel.assertExchange(exchange, 'topic', {
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

      channel.bindQueue(q.queue, exchange, 'webapp.*');

      channel.consume(q.queue, function(msg) {
        console.log(" [WEBAPP] %s: '%s'", msg.fields.routingKey, msg.content.toString());
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
    channel.bindQueue(q.queue, exchange, 'captor.*');

      channel.consume(q.queue, function(msg) {
        console.log(" [CAPTOR] %s: '%s'", msg.fields.routingKey, msg.content.toString());
      }, {
        noAck: true
      });
    });

  });
  
});