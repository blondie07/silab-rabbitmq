var amqp = require('amqplib/callback_api');

var msgPos = 'posX=4.074 posY=5.099';
var msgTemp = '22.468';
var msgWeb = 'nextstep';

var args = process.argv.slice(2);

if (args.length == 0) {
  console.log("Usage: rpc_client.js [data type : position or temperature]");
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
    channel.assertQueue('', {
      exclusive: true
    }, function(error2, q) {
      if (error2) {
        throw error2;
      }
      var correlationId = generateUuid();
      var dataType = args[0].toString();

      console.log(' [x] Requesting data validation for dataType ' + dataType);

      channel.consume(q.queue, function(msg) {
        if (msg.properties.correlationId == correlationId) {
          console.log(' [.] Got %s', msg.content.toString());
          setTimeout(function() { 
            connection.close(); 
            process.exit(0) 
          }, 500);
        }
      }, {
        noAck: true
      });

      channel.sendToQueue('rpc_queue',
        Buffer.from(dataType.toString()),{ 
          correlationId: correlationId, 
          replyTo: q.queue });
    });
  });
});

function generateUuid() {
  return Math.random().toString() +
         Math.random().toString() +
         Math.random().toString();
}

function generateDataContent(dataType){
  var dataContent;
    switch (dataType) {
      case 'temperature':
          dataContent = msgTemp;
          break;
      case 'position':
        dataContent = msgPos;
        break;
      case 'webapp':
        dataContent = msgWeb;
        break;
      default:
        dataContent = "message type undefined";
        break;
    }
  return dataContent;
}