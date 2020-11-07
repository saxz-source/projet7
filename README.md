Réseau social d'entreprise GROUPOMANIA. Projet 7 parcours openclassrooms.

Node-js / ReactJS / SQL


INSTALLATION FRONT END :

Accéder au dossier "mon-app" ;

Lancer la commande "npm install".


INSTALLATION BACK END : 

Accéder au dossier "backend" ;

Lancer la commande "npm install" ;

Installer db-migrate en global : "npm install -g db-migrate" ;

De même pour nodemon : "npm install -g nodemon".


SE CONNECTER ET OBTENIR LA BASE DE DONNEES : 

Créer une base de données sql dédiée (vous pouvez la nommer groupomania pour gagner quelques secondes).

Connecter sa base de données en remplissant le fichier '.env' (nom de la base de données, utilisateur, mot de passe) situé dans le dossier backend.

Pour effectuer la migration de la base de données, et donc charger ses tables, veuillez reporter ces mêmes informations de connexion dans le fichier "database.json" situé dans le dossier backend/_Database.

Accéder au dossier _Database situé dans le backend : cd _Database.

Lancer la commande : db-migrate up -c 3


LANCER L'APPLICATION :

Côté front-end : commande "npm start".

Côté backend : commande "nodemon server".
