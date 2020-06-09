RABBITMQ TUTORIALS
~~~~~~~~~~~~~~~~~~~~~~~~~~~~
npm install amqplib
~~~~~~~~~~~~~~~~~~~~~~~~~~~~
tous les tuto : https://www.rabbitmq.com/getstarted.html
~~~~~~~~~~~~~~~~~~~~~~~~~~~~
1/3 : INTRODUCTION
rep : tuto-rabbit/tuto1
maj : 11 mars 2020
https://www.rabbitmq.com/tutorials/tutorial-one-javascript.html
~~~~~~~~~~~~~~~~~~~~~~~~~~~~
2/3 : WORK QUEUES
rep : tuto-rabbit/tuto2
maj : 12 mars 2020
https://www.rabbitmq.com/tutorials/tutorial-two-javascript.html
~~~~~~~~~~~~~~~~~~~~~~~~~~~~
3/3 : PUBLISH/SUBSRIBE
rep : tuto-rabbit/tuto3
maj : 08 juin 2020
https://www.rabbitmq.com/tutorials/tutorial-three-javascript.html
---------------------------------------------------------------------
--commande installation de l'image Docker 
docker run --rm -d -p 15671:15671/tcp -p 15672:15672/tcp -p 25672:25672/tcp -p 4369:4369/tcp -p 5671:5671/tcp -p 5672:5672/tcp rabbitmq:3-management
8ffebd3537ef42f164b076d9632b7ec9dec324b116c97bf8b937447356818014

--accès serveur RabbitMQ
http://localhost:15672/
login guest
---------------------------------------------------------------------
--setup environnement NodeJs
npm init
npm install amqplib
---------------------------------------------------------------------
--dans le package.json
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start" : "node app.js"
  },
---------------------------------------------------------------------