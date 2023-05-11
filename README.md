# Notes App

Ce projet est une application de prise de notes simple construite avec React.

## Fonctionnalités

L'application permet à l'utilisateur de :

- Affichage des notes existantes
- Recherche de notes par titre
- Création d'une nouvelle note
- Modification d'une note existante
- Suppression d'une note existante

## Installation

1. Clonez le dépôt : `git clone https://github.com/MrIanis/ReactESGIv1.git`
2. Installez les dépendances : `npm install`
3. Démarrez l'application : `npm start`

## Démarrage

Dans un dossier API, créer un fichier `db.json` avec par exemple ce contenu :

```
{
  "notes": [
    {
      "id": 1,
      "title": "Initiation à React",
      "content": "Lorem ipsum…"
    },
    {
      "id": 2,
      "title": "Utilisation de json-server",
      "content": "Bla bla"
    }
  ],
  "profile": {
    "name": "Ianis"
  }
}
```

Démarrage du `json-server` :

```
npx json-server --watch api/db.json --port 4000
```

## Contributeurs

- Ianis Pouru
