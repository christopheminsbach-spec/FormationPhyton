export type TravelType =
  | "city"
  | "nature"
  | "beach"
  | "adventure";

export type Trip = {
  id: number;
  title: string;
  destination: string;
  country: string;
  description: string;
  price: number;
  duration: number;
  travel_type: TravelType;
  image_url: string;
  is_available: boolean;
};

export type TripInput = Omit<Trip, "id" | "image_url"> & {
  image: string;
};

export type AvailabilityFilter = "all" | "available" | "unavailable";

export type SortOption =
  | "featured"
  | "price_asc"
  | "price_desc"
  | "duration_asc";

export type TripFilters = {
  search: string;
  country: string;
  travelType: TravelType | "all";
  availability: AvailabilityFilter;
  maxPrice: string;
  sort: SortOption;
};
