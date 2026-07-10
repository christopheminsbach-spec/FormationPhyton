import type { Trip } from "./types";

export const mockTrips: Trip[] = [
  {
    id: 1,
    title: "Week-end à Rome",
    destination: "Rome",
    country: "Italie",
    description:
      "Découvrez Rome le temps d'un week-end entre histoire, gastronomie et dolce vita.",
    price: 349.99,
    duration_days: 3,
    travel_type: "city-trip",
    image_url:
      "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1200&q=80",
    is_available: true,
  },
  {
    id: 2,
    title: "Plages de Crète",
    destination: "Crète",
    country: "Grèce",
    description:
      "Un séjour détente au soleil, entre plages turquoise et villages méditerranéens.",
    price: 799.99,
    duration_days: 7,
    travel_type: "beach",
    image_url:
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80",
    is_available: true,
  },
  {
    id: 3,
    title: "Road trip en Islande",
    destination: "Reykjavik",
    country: "Islande",
    description:
      "Une aventure entre volcans, cascades, glaciers et paysages lunaires.",
    price: 1299.99,
    duration_days: 10,
    travel_type: "adventure",
    image_url:
      "https://images.unsplash.com/photo-1504829857797-ddff29c27927?auto=format&fit=crop&w=1200&q=80",
    is_available: false,
  },
  {
    id: 4,
    title: "Séjour romantique à Venise",
    destination: "Venise",
    country: "Italie",
    description:
      "Un séjour en couple dans l'une des villes les plus romantiques d'Europe.",
    price: 599.99,
    duration_days: 4,
    travel_type: "romantic",
    image_url:
      "https://images.unsplash.com/photo-1514890547357-a9ee288728e0?auto=format&fit=crop&w=1200&q=80",
    is_available: true,
  },
];
