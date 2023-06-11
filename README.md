# React - Backlog JV
Cette application permet de gérer son backlog de jeux vidéo : ajouter ou supprimer des jeux dans sa liste de jeux "à faire". L'application exploite l'API IGDB (Twitch) pour les données des différents jeux.

## Pré-installation
- Cloner le dépôt Git

```
git clone https://github.com/gmoliner/React-Backlog-JV.git
cd React-Backlog-JV
```

- Installer les dépendances

```
npm install
```

Pour lancer l'application en local, quelques paramétrages doivent être réalisés : 
1. Configuration de l'accès à l'api IGDB
2. Configuration du proxy

## 1 - Configuration de l'accès à l'API IGDB
Pour pouvoir requêter sur l'API IGDB, il est nécessaire de disposer de l'autorisation nécessaire, vous devez générer les clés d'accès via un compte Twitch.
Suivre le tuto suivant : https://api-docs.igdb.com/#getting-started

## 2 - Configuration du proxy
Pour éviter les problèmes CORS, nous utilisons un proxy avec le module `cors-anywhere` sur un serveur NodeJS. Pour lancer le serveur, exécuter les commandes suivantes, depuis la racine du projet : 
```
cd src/proxy
node proxy.ts
```

## Configurer les variables d'environnement React
L'application utilise deux variables d'environnement correspondant aux autorisations IGDB.
Une fois que le tutoriel de la partie 1 est terminée, modifier le fichier `src/.env.local` pour modifier les variables `REACT_APP_IGDB_CLIENT_ID`
et `REACT_APP_IGDB_AUTHORIZATION`.

```
# IGDB ACCESS
REACT_APP_PROXY_URL="http://localhost:8080"
REACT_APP_IGDB_URL="https://api.igdb.com/v4"
REACT_APP_IGDB_CLIENT_ID=<your_react_app_igdb_client_id />
REACT_APP_IGDB_AUTHORIZATION=<your_react_app_igdb_authorization />
```

## Démarrer l'application React
`npm start`



