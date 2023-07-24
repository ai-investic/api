# AI Investic - GraphQL API

Ce projet est une API GraphQL développée avec ApolloJS, ExpressJS et NodeJS
sous Docker, et est conçue pour renvoyer les données présent dans notre MongoDB
en suivant des schémas prédéfini. L'API est utilisé par le client web pour afficher
les données sur une carte interractive.

## Configuration requise
- Build-essential - Pour utiliser les commandes Make
- Docker (version 24) - Pour lancer les conteneurs et avoir docker compose

## Installation

1. Clonez ce dépôt de code source :
   ```bash
   git clone git@github.com:ai-investic/api.git
   ```

2. Accédez au répertoire du projet :
   ```bash
   cd api
   ```

## Lancement du serveur de développement

1. Lancez le serveur de développement local à l'aide de la commande suivante :
   ```bash
   make sr up logs
   ```

   Cela démarrera le serveur de développement et vous donnera une URL locale
   à laquelle vous pouvez accéder pour visualiser l'API.

2. Ouvrez votre navigateur et accédez à l'URL suivante :
   ```
   http://localhost:5789
   ```

   Vous devriez maintenant voir l'API en action, et vous allez pouvoir faire vos requêtes.

---

Nous espérons que ce guide vous a aidé à démarrer avec le projet de l'API
interactif pour faire vos requêtes GraphQL. Si vous avez des questions supplémentaires,
n'hésitez pas à les poser.