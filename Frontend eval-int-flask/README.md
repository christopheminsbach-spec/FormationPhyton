# Front Disney

Front réalisé dans le cadre de l’évaluation intermédiaire du module Python/Flask pour les CDIIA de la MNS, promotion 2025-2026.

## Installation

```bash
npm install
npm run dev
```

## Configuration des données

Copier `.env.example` vers `.env` avant de lancer l’application. Le fichier `.env` permet de choisir si l’application utilise les données de démonstration incluses dans le projet ou le contexte réel.

### Utiliser les mocks

Les mocks sont activés par défaut. Ils permettent de tester l’interface sans configuration supplémentaire :

```env
VITE_USE_MOCK=true
VITE_API_URL=http://127.0.0.1:5000
```

Les données sont alors fournies par le fichier `src/mock.ts`. Les créations, modifications et suppressions sont temporaires et sont réinitialisées au rechargement de l’application.

### Utiliser le contexte réel

Pour ne plus utiliser les mocks, modifier `.env` comme suit :

```env
VITE_USE_MOCK=false
VITE_API_URL=http://127.0.0.1:5000
```

La valeur de `VITE_API_URL` doit correspondre à l’adresse configurée pour le contexte réel. Après toute modification du fichier `.env`, redémarrer le serveur de développement.
