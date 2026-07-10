# TP — Travel Agency API

## Contexte

Une petite agence de voyage souhaite moderniser son site web.

Le frontend React est déjà fourni. Il permet d'afficher des offres de voyage sous forme de cartes : destination, pays, prix, durée, image, description, disponibilité, etc.

Votre mission est de développer le **backend** de l'application sous forme d'une **API REST**.

L'API devra permettre au frontend de :

- récupérer la liste des voyages ;
- afficher le détail d'un voyage ;
- ajouter une nouvelle offre ;
- modifier une offre existante ;
- supprimer une offre.

Aucune authentification n'est demandée dans ce TP.

## Objectif du TP

Créer une API REST permettant de gérer les offres de voyage d'une agence.

La ressource principale sera :

```txt
trips
```

## Structure d'un voyage

Chaque voyage doit contenir les informations suivantes :

```json
{
  "id": 1,
  "title": "Week-end à Rome",
  "destination": "Rome",
  "country": "Italie",
  "description": "Découvrez Rome le temps d'un week-end entre histoire, gastronomie et dolce vita.",
  "price": 349.99,
  "duration_days": 3,
  "travel_type": "city-trip",
  "image_url": "https://example.com/rome.jpg",
  "is_available": true
}
```

## Champs attendus

| Champ           |    Type | Obligatoire | Description                         |
| --------------- | ------: | ----------: | ----------------------------------- |
| `id`            |  entier |         oui | Identifiant unique du voyage        |
| `title`         |   texte |         oui | Nom commercial du voyage            |
| `destination`   |   texte |         oui | Ville ou lieu principal             |
| `country`       |   texte |         oui | Pays de destination                 |
| `description`   |   texte |         oui | Description courte du séjour        |
| `price`         |  nombre |         oui | Prix du voyage                      |
| `duration_days` |  entier |         oui | Durée en jours                      |
| `travel_type`   |   texte |         oui | Type de séjour                      |
| `image_url`     |   texte |         non | URL d'une image                     |
| `is_available`  | booléen |         oui | Indique si le voyage est disponible |

## Types de voyage autorisés

Le champ `travel_type` doit contenir une des valeurs suivantes :

```txt
city-trip
beach
adventure
cultural
romantic
family
```

Exemples :

- `city-trip` : week-end à Rome, Barcelone, Lisbonne ;
- `beach` : séjour plage en Grèce ou aux Canaries ;
- `adventure` : randonnée, safari, road trip ;
- `cultural` : musée, patrimoine, histoire ;
- `romantic` : séjour en couple ;
- `family` : voyage adapté aux familles.

## Endpoints à développer

L'API doit exposer les routes suivantes.

### 1. Récupérer tous les voyages

```http
GET /trips
```

Réponse attendue :

```json
[
  {
    "id": 1,
    "title": "Week-end à Rome",
    "destination": "Rome",
    "country": "Italie",
    "description": "Découvrez Rome le temps d'un week-end entre histoire, gastronomie et dolce vita.",
    "price": 349.99,
    "duration_days": 3,
    "travel_type": "city-trip",
    "image_url": "https://example.com/rome.jpg",
    "is_available": true
  }
]
```

### 2. Récupérer un voyage par son identifiant

```http
GET /trips/1
```

Si le voyage existe, l'API retourne le voyage demandé.

Si le voyage n'existe pas, l'API retourne une erreur :

```json
{
  "error": "Voyage introuvable"
}
```

Code HTTP attendu :

```txt
404 Not Found
```

### 3. Créer un nouveau voyage

```http
POST /trips
```

Body attendu :

```json
{
  "title": "Séjour à Lisbonne",
  "destination": "Lisbonne",
  "country": "Portugal",
  "description": "Un séjour lumineux entre tramways, belvédères et pasteis de nata.",
  "price": 429.99,
  "duration_days": 4,
  "travel_type": "city-trip",
  "image_url": "https://example.com/lisbonne.jpg",
  "is_available": true
}
```

Réponse attendue :

```json
{
  "id": 2,
  "title": "Séjour à Lisbonne",
  "destination": "Lisbonne",
  "country": "Portugal",
  "description": "Un séjour lumineux entre tramways, belvédères et pasteis de nata.",
  "price": 429.99,
  "duration_days": 4,
  "travel_type": "city-trip",
  "image_url": "https://example.com/lisbonne.jpg",
  "is_available": true
}
```

Code HTTP attendu :

```txt
201 Created
```

### 4. Modifier un voyage existant

```http
PUT /trips/1
```

Body possible :

```json
{
  "title": "Week-end premium à Rome",
  "destination": "Rome",
  "country": "Italie",
  "description": "Un week-end amélioré avec visite guidée du Colisée et dîner inclus.",
  "price": 499.99,
  "duration_days": 3,
  "travel_type": "cultural",
  "image_url": "https://example.com/rome.jpg",
  "is_available": true
}
```

Si le voyage existe, l'API retourne le voyage modifié.

Si le voyage n'existe pas, l'API retourne :

```json
{
  "error": "Voyage introuvable"
}
```

Code HTTP attendu :

```txt
404 Not Found
```

### 5. Supprimer un voyage

```http
DELETE /trips/1
```

Réponse attendue :

```json
{
  "message": "Voyage supprimé avec succès"
}
```

Si le voyage n'existe pas :

```json
{
  "error": "Voyage introuvable"
}
```

Code HTTP attendu :

```txt
404 Not Found
```

## Filtres bonus

Une fois le CRUD terminé, vous pouvez ajouter des filtres sur la liste des voyages.

### Filtrer par pays

```http
GET /trips?country=Italie
```

### Filtrer par type de voyage

```http
GET /trips?travel_type=beach
```

### Filtrer uniquement les voyages disponibles

```http
GET /trips?is_available=true
```

### Filtrer par prix maximum

```http
GET /trips?max_price=500
```

Ces filtres ne sont pas obligatoires pour valider le TP, mais ils permettent d'améliorer l'expérience côté frontend.

## Règles de validation

Lors de la création ou de la modification d'un voyage, l'API doit vérifier les règles suivantes :

- `title` ne doit pas être vide ;
- `destination` ne doit pas être vide ;
- `country` ne doit pas être vide ;
- `description` ne doit pas être vide ;
- `price` doit être supérieur à `0` ;
- `duration_days` doit être supérieur à `0` ;
- `travel_type` doit faire partie des valeurs autorisées ;
- `is_available` doit être un booléen.

Exemple d'erreur :

```json
{
  "error": "Le prix doit être supérieur à 0"
}
```

Code HTTP attendu :

```txt
400 Bad Request
```

## Jeu de données de départ

Vous pouvez initialiser votre API avec les voyages suivants :

```json
[
  {
    "id": 1,
    "title": "Week-end à Rome",
    "destination": "Rome",
    "country": "Italie",
    "description": "Découvrez Rome le temps d'un week-end entre histoire, gastronomie et dolce vita.",
    "price": 349.99,
    "duration_days": 3,
    "travel_type": "city-trip",
    "image_url": "https://example.com/rome.jpg",
    "is_available": true
  },
  {
    "id": 2,
    "title": "Plages de Crète",
    "destination": "Crète",
    "country": "Grèce",
    "description": "Un séjour détente au soleil, entre plages turquoise et villages méditerranéens.",
    "price": 799.99,
    "duration_days": 7,
    "travel_type": "beach",
    "image_url": "https://example.com/crete.jpg",
    "is_available": true
  },
  {
    "id": 3,
    "title": "Road trip en Islande",
    "destination": "Reykjavik",
    "country": "Islande",
    "description": "Une aventure entre volcans, cascades, glaciers et paysages lunaires.",
    "price": 1299.99,
    "duration_days": 10,
    "travel_type": "adventure",
    "image_url": "https://example.com/islande.jpg",
    "is_available": false
  },
  {
    "id": 4,
    "title": "Séjour romantique à Venise",
    "destination": "Venise",
    "country": "Italie",
    "description": "Un séjour en couple dans l'une des villes les plus romantiques d'Europe.",
    "price": 599.99,
    "duration_days": 4,
    "travel_type": "romantic",
    "image_url": "https://example.com/venise.jpg",
    "is_available": true
  }
]
```

## Travail attendu

Vous devez développer une API fonctionnelle permettant au frontend React de communiquer avec votre backend.

Votre API doit :

- retourner des réponses au format JSON ;
- utiliser les bons verbes HTTP ;
- utiliser les bons codes HTTP ;
- gérer les cas d'erreur ;
- permettre la création, la lecture, la modification et la suppression de voyages ;
- être testable avec Postman, Insomnia ou directement depuis le frontend fourni.

## Critères de réussite

Le TP est réussi si :

- `GET /trips` retourne bien la liste des voyages ;
- `GET /trips/:id` retourne le bon voyage ;
- `POST /trips` ajoute un nouveau voyage ;
- `PUT /trips/:id` modifie un voyage existant ;
- `DELETE /trips/:id` supprime un voyage ;
- les erreurs simples sont correctement gérées ;
- le frontend React peut afficher les données retournées par l'API.

## Bonus possibles

Pour aller plus loin, vous pouvez ajouter :

- un filtre par pays ;
- un filtre par type de voyage ;
- un filtre par disponibilité ;
- un filtre par prix maximum ;
- une recherche par mot-clé dans le titre ou la destination ;
- un tri par prix croissant ou décroissant ;
- un tri par durée ;
- une documentation rapide des endpoints dans un fichier `README.md`.

Exemples :

```http
GET /trips?search=rome
GET /trips?sort=price_asc
GET /trips?sort=price_desc
GET /trips?sort=duration_asc
```
