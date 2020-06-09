Le récepteur possède deux queues : une définie avec le topic 'captor.*", une seconde avec le topic "webapp.*".
Le but est de stocker dans la 1ere les données venant de capteurs (une température, une position), et 
dans la seconde les données venant d'une application web (information "nextstep").

Pour "simuler" ce fonctionnement, on a la possibilité d'employer trois arguments lorsque l'on execute
l'émetteur : "temperature" et "position", qui doivent correspondre à des données de capteurs, et 
"nextstep", qui doit correspondre à une donnée provenant d'une application web. Le format des données
est généré automatiquement à titre d'exemple.

EXEMPLE :
>> node receive.js 
---> >>[WEBAPP] Waiting for logs. To exit press CTRL+C
       [CAPTOR] Waiting for logs. To exit press CTRL+C
>> node emit.js temperature 
---> La queue "captor" va recevoir une donnée de la forme >>[CAPTOR] captor.temperature: '22.468'
>> node emit.js nextstep
---> La queue "webapp" va recevoir une donnée de la forme >>[WEBAPP] webapp.nextstep: 'nextstep'
>> node emit.js position 
---> La queue "captor" va recevoir une donnée de la forme >>[CAPTOR] captor.position: 'posX=4.074 posY=5.099'

