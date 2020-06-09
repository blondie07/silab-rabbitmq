Le récepteur possède une seule queue. Pour qu'un message y soit stocké,
il suffit que les arguments de l'émetteur soient compris dans la liste
d'arguments du récepteur (définition des clefs directe).

EXEMPLE :
>> node receive.js temperature position webapp
>> node emit.js temperature "24.09 degre"
---> temperature est une clef définie en argument du récepteur
    donc la donnée "24.09 degre" est bien reçue

>> node receive.js position
>> node emit.js temperature "24.09 degre"
---> le récepteur ne reçoit que les données avec la clef "position"
    donc la donnée "24.09 degre" n'est pas reçue
