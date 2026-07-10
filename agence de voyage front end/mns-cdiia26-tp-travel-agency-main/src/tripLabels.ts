import type { AvailabilityFilter, SortOption, TravelType } from './types'

export const travelTypes: TravelType[] = [
  'city-trip',
  'beach',
  'adventure',
  'cultural',
  'romantic',
  'family',
]

export const travelTypeLabels: Record<TravelType, string> = {
  'city-trip': 'City trip',
  beach: 'Plage',
  adventure: 'Aventure',
  cultural: 'Culture',
  romantic: 'Romantique',
  family: 'Famille',
}

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
