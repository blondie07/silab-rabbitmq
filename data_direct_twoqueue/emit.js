var amqp = require('amqplib/callback_api');

var msgPos = 'posX=4.074 posY=5.099';
var msgTemp = '22.468';
var msgWeb = 'nextstep';

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
    var data = (args.length > 0) ? args[0] : 'undefined';

    var src = sourceDefinition(data);
    var msg = dataDefinition(data);

    channel.assertExchange(exchange, 'direct', {
      durable: false
    });

    channel.publish(exchange, src, Buffer.from(msg));
    console.log(" [x] Sent %s: '%s'", src, msg);
  });

  setTimeout(function() { 
    connection.close(); 
    process.exit(0) 
  }, 500);
});

function dataDefinition(data){
    var msg;
    switch (data) {
        case 'temperature':
            msg = msgTemp;
            break;
        case 'position':
            msg = msgPos;
            break;
        case 'webapp':
            msg = msgWeb;
            break;
        default:
            msg = "message type undefined";
            break;
    }
    return msg;
};

function sourceDefinition(data){
  var src;
  switch (data) {
    case 'temperature':
    case 'position':
      src = 'captor';
      break;
    case 'webapp':
      src = 'webapp';
      break;
    default:
      src = undefined;
      break;
  }
  return src;
}