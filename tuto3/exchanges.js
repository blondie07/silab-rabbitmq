
/**
 * RAPPEL
 * Producer = user application that sends messages
 * Queue = a buffer that stores messages
 * Consumer = user application that receives messages
 * 
 * 1. Créer un échange de type "fanout" (envoi à toutes les queues) appelé "logs".
 * 2. Publie le message à la channel nommé précédemment.
 * ---------TEMPORARY QUEUES--------------------------
 * 3. Déclare une queue dont le nom est choisi aléatoirement par le serveur pour
 * la première connexion.
 * ---------BINDING-----------------------------------
 * Binding : relation entre l'exchanger et la queue, pour lui dire d'envoyer les 
 * messages vers notre queue.
 * 4. logs exchange va envoyer des messages à notre queue.
 */


 //3
 channel.assertQueue('', {
    exclusive: true
  });

//1
ch.assertExchange('logs', 'fanout', {durable: false})
//2
channel.publish('logs', '', Buffer.from('Hello World!'));
//4
channel.bindQueue(queue_name, 'logs', '');