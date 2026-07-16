import type { AvailabilityFilter, SortOption, TravelType } from './types'

export const travelTypes: TravelType[] = [
  "city",
  "nature",
  "beach",
  "adventure",
];

export const travelTypeLabels = {
  city: "City trip",
  nature: "Nature",
  beach: "Plage",
  adventure: "Aventure",
};

export const availabilityLabels: Record<AvailabilityFilter, string> = {
  all: 'Toutes',
  available: 'Disponibles',
  unavailable: 'Indisponibles',
}

export const sortLabels: Record<SortOption, string> = {
  featured: 'Mise en avant',
  price_asc: 'Prix croissant',
  price_desc: 'Prix décroissant',
  duration_asc: 'Durée croissante',
}
