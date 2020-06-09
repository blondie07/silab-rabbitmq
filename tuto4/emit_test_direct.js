var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function(error1, channel) {
    if (error1) {
      throw error1;
    }
    var exchange = 'direct_data';
    
    var args = process.argv.slice(2);
    var msg = args.slice(1).join(' ') || 'Hello World!';
    var data = (args.length > 0) ? args[0] : 'position';

    channel.assertExchange(exchange, 'direct', {
      durable: false
    });
    channel.publish(exchange, data, Buffer.from(msg));
    console.log(" [x] Sent %s: '%s'", data, msg);
  });

  setTimeout(function() { 
    connection.close(); 
    process.exit(0) 
  }, 500);
});