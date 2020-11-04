Réseau social d'entreprise GROUPOMANIA. Projet 7 parcours openclassrooms.

Node-js / ReactJS / SQL

Installation front-end :
Accéder au dossier "mon-app" ;
Lancer la commande "npm install".

Installation back-end : 
Accéder au dossier "backend" ;
Lancer la commande "npm install" ;
Installer db-migrate en global : "npm install -g db-migrate" ;
De même pour nodemon : "npm install -g nodemon".

Se connecter et obtenir la base de données : 
Créer une base de données sql dédiée (vous pouvez la nommer groupomania pour gagner quelques secondes).
Connecter sa base de données en remplissant le fichier '.env' (nom de la base de données, utilisateur, mot de passe) situé dans le dossier backend.
Accéder au dossier _Database situé dans le backend : cd _Database.
Lancer la commande : db-migrate up -c 3

Lancer l'application :
Côté front-end : commande "npm start".
Côté backend : commande "nodemon server".
