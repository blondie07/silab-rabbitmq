Le récepteur possède deux queues : une définie avec la clef 'captor", une seconde avec la clef "webapp".
Le but est de stocker dans la 1ere les données venant de capteurs (une température, une position), et 
dans la seconde les données venant d'une application web (information "nextstep").

Pour "simuler" ce fonctionnement, on a la possibilité d'employer trois arguments lorsque l'on execute
l'émetteur : "temperature" et "position", qui doivent correspondre à des données de capteurs, et 
"webapp", qui doit correspondre à une donnée provenant d'une application web. Le format des données
est généré automatiquement à titre d'exemple.

EXEMPLE :
>> node receive.js 
>> node emit.js temperature 
---> La queue "captor" va recevoir une donnée
>> node emit.js webapp 
---> La queue "webapp" va recevoir une donnée
>> node emit.js position 
---> La queue "captor" va recevoir une donnée

