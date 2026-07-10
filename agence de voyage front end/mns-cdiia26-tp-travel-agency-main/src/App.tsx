import { useEffect, useMemo, useState } from "react";
import { appConfig } from "./config";
import { mockTrips } from "./mockTrips";
import {
  availabilityLabels,
  sortLabels,
  travelTypeLabels,
  travelTypes,
} from "./tripLabels";
import {
  createTrip,
  deleteTrip,
  fetchTrip,
  fetchTrips,
  updateTrip,
} from "./tripsApi";
import type {
  AvailabilityFilter,
  SortOption,
  TravelType,
  Trip,
  TripFilters,
  TripInput,
} from "./types";

type TripFormState = {
  title: string;
  destination: string;
  country: string;
  description: string;
  price: string;
  durationDays: string;
  travelType: TravelType;
  imageUrl: string;
  isAvailable: boolean;
};

type RequestStatus = "idle" | "loading" | "saving";

const heroImageUrl =
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=80";

const currencyFormatter = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
});

const emptyFilters: TripFilters = {
  search: "",
  country: "all",
  travelType: "all",
  availability: "all",
  maxPrice: "",
  sort: "featured",
};

const createEmptyForm = (): TripFormState => ({
  title: "",
  destination: "",
  country: "",
  description: "",
  price: "",
  durationDays: "",
  travelType: "city-trip",
  imageUrl: "",
  isAvailable: true,
});

const tripToFormState = (trip: Trip): TripFormState => ({
  title: trip.title,
  destination: trip.destination,
  country: trip.country,
  description: trip.description,
  price: String(trip.price),
  durationDays: String(trip.duration_days),
  travelType: trip.travel_type,
  imageUrl: trip.image_url,
  isAvailable: trip.is_available,
});

const trimFormState = (formState: TripFormState): TripFormState => ({
  title: formState.title.trim(),
  destination: formState.destination.trim(),
  country: formState.country.trim(),
  description: formState.description.trim(),
  price: formState.price.trim(),
  durationDays: formState.durationDays.trim(),
  travelType: formState.travelType,
  imageUrl: formState.imageUrl.trim(),
  isAvailable: formState.isAvailable,
});

const createTripInput = (formState: TripFormState): TripInput => {
  const trimmedFormState = trimFormState(formState);
  const price = Number(trimmedFormState.price);
  const durationDays = Number(trimmedFormState.durationDays);

  if (trimmedFormState.title.length === 0) {
    throw new Error("Le titre du voyage est obligatoire.");
  }

  if (trimmedFormState.destination.length === 0) {
    throw new Error("La destination est obligatoire.");
  }

  if (trimmedFormState.country.length === 0) {
    throw new Error("Le pays est obligatoire.");
  }

  if (trimmedFormState.description.length === 0) {
    throw new Error("La description est obligatoire.");
  }

  if (!Number.isFinite(price) || price <= 0) {
    throw new Error("Le prix doit être un nombre supérieur à 0.");
  }

  if (!Number.isInteger(durationDays) || durationDays <= 0) {
    throw new Error("La durée doit être un entier supérieur à 0.");
  }

  return {
    title: trimmedFormState.title,
    destination: trimmedFormState.destination,
    country: trimmedFormState.country,
    description: trimmedFormState.description,
    price,
    duration_days: durationDays,
    travel_type: trimmedFormState.travelType,
    image_url: trimmedFormState.imageUrl,
    is_available: trimmedFormState.isAvailable,
  };
};

const normalizeText = (value: string): string =>
  value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();

const getNextTripId = (trips: Trip[]): number => {
  const highestId = trips.reduce(
    (currentHighestId, trip) => Math.max(currentHighestId, trip.id),
    0,
  );

  return highestId + 1;
};

const getErrorMessage = (error: unknown): string =>
  error instanceof Error ? error.message : String(error);

const filterTrips = (trips: Trip[], filters: TripFilters): Trip[] => {
  const normalizedSearch = normalizeText(filters.search.trim());
  const maxPrice =
    filters.maxPrice.trim().length > 0 ? Number(filters.maxPrice) : null;

  return trips.filter((trip) => {
    const searchableText = normalizeText(
      `${trip.title} ${trip.destination} ${trip.country} ${trip.description}`,
    );
    const matchesSearch =
      normalizedSearch.length === 0 ||
      searchableText.includes(normalizedSearch);
    const matchesCountry =
      filters.country === "all" || trip.country === filters.country;
    const matchesTravelType =
      filters.travelType === "all" || trip.travel_type === filters.travelType;
    const matchesAvailability =
      filters.availability === "all" ||
      (filters.availability === "available" && trip.is_available) ||
      (filters.availability === "unavailable" && !trip.is_available);
    const matchesMaxPrice =
      maxPrice === null || (!Number.isNaN(maxPrice) && trip.price <= maxPrice);

    return (
      matchesSearch &&
      matchesCountry &&
      matchesTravelType &&
      matchesAvailability &&
      matchesMaxPrice
    );
  });
};

const sortTrips = (trips: Trip[], sortOption: SortOption): Trip[] => {
  const sortableTrips = [...trips];

  if (sortOption === "price_asc") {
    return sortableTrips.sort(
      (firstTrip, secondTrip) => firstTrip.price - secondTrip.price,
    );
  }

  if (sortOption === "price_desc") {
    return sortableTrips.sort(
      (firstTrip, secondTrip) => secondTrip.price - firstTrip.price,
    );
  }

  if (sortOption === "duration_asc") {
    return sortableTrips.sort(
      (firstTrip, secondTrip) =>
        firstTrip.duration_days - secondTrip.duration_days,
    );
  }

  return sortableTrips;
};

const getCountries = (trips: Trip[]): string[] =>
  [...new Set(trips.map((trip) => trip.country))].sort(
    (firstCountry, secondCountry) =>
      firstCountry.localeCompare(secondCountry, "fr"),
  );

const getStats = (
  trips: Trip[],
): { availableCount: number; averagePrice: number } => {
  const availableCount = trips.filter((trip) => trip.is_available).length;
  const totalPrice = trips.reduce(
    (currentTotal, trip) => currentTotal + trip.price,
    0,
  );
  const averagePrice = trips.length > 0 ? totalPrice / trips.length : 0;

  return { availableCount, averagePrice };
};

const StatusPill = ({ trip }: { trip: Trip }): React.JSX.Element => (
  <span
    className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
      trip.is_available
        ? "bg-emerald-100 text-emerald-800"
        : "bg-rose-100 text-rose-800"
    }`}>
    {trip.is_available ? "Disponible" : "Indisponible"}
  </span>
);

const App = (): React.JSX.Element => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [selectedTripId, setSelectedTripId] = useState<number | null>(null);
  const [editingTripId, setEditingTripId] = useState<number | null>(null);
  const [formState, setFormState] = useState<TripFormState>(createEmptyForm);
  const [filters, setFilters] = useState<TripFilters>(emptyFilters);
  const [status, setStatus] = useState<RequestStatus>("loading");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [formMessage, setFormMessage] = useState<string | null>(null);

  useEffect(() => {
    const loadTrips = async (): Promise<void> => {
      setStatus("loading");
      setErrorMessage(null);

      try {
        const loadedTrips = appConfig.useMocks ? mockTrips : await fetchTrips();
        setTrips(loadedTrips);
        setSelectedTripId(loadedTrips[0]?.id ?? null);
      } catch (error) {
        setErrorMessage(getErrorMessage(error));
      } finally {
        setStatus("idle");
      }
    };

    loadTrips().catch((error: unknown) => {
      setErrorMessage(getErrorMessage(error));
      setStatus("idle");
    });
  }, []);

  const countries = useMemo(() => getCountries(trips), [trips]);
  const stats = useMemo(() => getStats(trips), [trips]);
  const visibleTrips = useMemo(
    () => sortTrips(filterTrips(trips, filters), filters.sort),
    [filters, trips],
  );
  const selectedTrip = trips.find((trip) => trip.id === selectedTripId) ?? null;
  const isEditing = editingTripId !== null;

  const selectTrip = async (tripId: number): Promise<void> => {
    setSelectedTripId(tripId);
    setFormMessage(null);

    if (appConfig.useMocks) {
      return;
    }

    try {
      const trip = await fetchTrip(tripId);
      setTrips((currentTrips) =>
        currentTrips.map((currentTrip) =>
          currentTrip.id === trip.id ? trip : currentTrip,
        ),
      );
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    }
  };

  const startCreation = (): void => {
    setEditingTripId(null);
    setFormState(createEmptyForm());
    setFormMessage(null);
  };

  const startEdition = (trip: Trip): void => {
    setEditingTripId(trip.id);
    setFormState(tripToFormState(trip));
    setFormMessage(null);
  };

  const submitForm = async (
    event: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();
    setStatus("saving");
    setFormMessage(null);

    try {
      const tripInput = createTripInput(formState);
      const savedTrip =
        editingTripId === null
          ? await saveCreatedTrip(tripInput)
          : await saveUpdatedTrip(editingTripId, tripInput);

      setSelectedTripId(savedTrip.id);
      setEditingTripId(savedTrip.id);
      setFormState(tripToFormState(savedTrip));
      setFormMessage(
        editingTripId === null
          ? "Le voyage a été ajouté avec succès."
          : "Le voyage a été mis à jour avec succès.",
      );
    } catch (error) {
      setFormMessage(getErrorMessage(error));
    } finally {
      setStatus("idle");
    }
  };

  const saveCreatedTrip = async (tripInput: TripInput): Promise<Trip> => {
    if (!appConfig.useMocks) {
      const createdTrip = await createTrip(tripInput);
      setTrips((currentTrips) => [...currentTrips, createdTrip]);

      return createdTrip;
    }

    const createdTrip: Trip = {
      id: getNextTripId(trips),
      ...tripInput,
    };
    setTrips((currentTrips) => [...currentTrips, createdTrip]);

    return createdTrip;
  };

  const saveUpdatedTrip = async (
    id: number,
    tripInput: TripInput,
  ): Promise<Trip> => {
    if (!appConfig.useMocks) {
      const updatedTrip = await updateTrip(id, tripInput);
      setTrips((currentTrips) =>
        currentTrips.map((trip) =>
          trip.id === updatedTrip.id ? updatedTrip : trip,
        ),
      );

      return updatedTrip;
    }

    const updatedTrip: Trip = {
      id,
      ...tripInput,
    };
    setTrips((currentTrips) =>
      currentTrips.map((trip) =>
        trip.id === updatedTrip.id ? updatedTrip : trip,
      ),
    );

    return updatedTrip;
  };

  const removeSelectedTrip = async (): Promise<void> => {
    if (selectedTrip === null) {
      setFormMessage("Sélectionnez un voyage avant de le supprimer.");
      return;
    }

    setStatus("saving");
    setFormMessage(null);

    try {
      if (!appConfig.useMocks) {
        await deleteTrip(selectedTrip.id);
      }

      setTrips((currentTrips) =>
        currentTrips.filter((trip) => trip.id !== selectedTrip.id),
      );
      setSelectedTripId(null);
      setEditingTripId(null);
      setFormState(createEmptyForm());
      setFormMessage("Le voyage a été supprimé avec succès.");
    } catch (error) {
      setFormMessage(getErrorMessage(error));
    } finally {
      setStatus("idle");
    }
  };

  return (
    <main className="min-h-screen bg-stone-50 text-stone-950">
      <section
        className="relative isolate overflow-hidden bg-stone-950 text-white"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(28, 25, 23, 0.92), rgba(28, 25, 23, 0.58)), url(${heroImageUrl})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}>
        <div className="mx-auto flex min-h-105 w-full max-w-7xl flex-col justify-between px-5 py-6 sm:px-8 lg:px-10">
          <header className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-amber-200">
                Horizon Voyages
              </p>
              <p className="mt-1 text-sm text-stone-200">
                Frontend pédagogique connecté à une API REST.
              </p>
            </div>
            <span className="rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur">
              Mode {appConfig.useMocks ? "mock" : "API"} ·{" "}
              {appConfig.apiBaseUrl}
            </span>
          </header>

          <div className="max-w-3xl pb-6 pt-20">
            <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              Des offres de voyage prêtes à être alimentées par votre backend.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-stone-100 sm:text-lg">
              Explorez le catalogue, filtrez les séjours et utilisez le panneau
              de gestion pour tester les routes CRUD demandées dans le TP.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-stone-200 bg-white">
        <div className="mx-auto grid w-full max-w-7xl gap-4 px-5 py-5 sm:grid-cols-3 sm:px-8 lg:px-10">
          <div>
            <p className="text-3xl font-bold">{trips.length}</p>
            <p className="text-sm text-stone-600">voyages au catalogue</p>
          </div>
          <div>
            <p className="text-3xl font-bold">{stats.availableCount}</p>
            <p className="text-sm text-stone-600">offres disponibles</p>
          </div>
          <div>
            <p className="text-3xl font-bold">
              {currencyFormatter.format(stats.averagePrice)}
            </p>
            <p className="text-sm text-stone-600">prix moyen</p>
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-8 px-5 py-8 sm:px-8 lg:grid-cols-[minmax(0,1fr)_390px] lg:px-10">
        <div className="space-y-6">
          <div className="rounded-lg border border-stone-200 bg-white p-4 shadow-sm">
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
              <label className="xl:col-span-2">
                <span className="text-sm font-medium text-stone-700">
                  Recherche
                </span>
                <input
                  className="mt-1 w-full rounded-md border border-stone-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                  type="search"
                  value={filters.search}
                  onChange={(event) =>
                    setFilters((currentFilters) => ({
                      ...currentFilters,
                      search: event.target.value,
                    }))
                  }
                  placeholder="Rome, plage, Italie..."
                />
              </label>

              <label>
                <span className="text-sm font-medium text-stone-700">Pays</span>
                <select
                  className="mt-1 w-full rounded-md border border-stone-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                  value={filters.country}
                  onChange={(event) =>
                    setFilters((currentFilters) => ({
                      ...currentFilters,
                      country: event.target.value,
                    }))
                  }>
                  <option value="all">Tous les pays</option>
                  {countries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                <span className="text-sm font-medium text-stone-700">Type</span>
                <select
                  className="mt-1 w-full rounded-md border border-stone-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                  value={filters.travelType}
                  onChange={(event) =>
                    setFilters((currentFilters) => ({
                      ...currentFilters,
                      travelType: event.target.value as TravelType | "all",
                    }))
                  }>
                  <option value="all">Tous les types</option>
                  {travelTypes.map((travelType) => (
                    <option key={travelType} value={travelType}>
                      {travelTypeLabels[travelType]}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                <span className="text-sm font-medium text-stone-700">Tri</span>
                <select
                  className="mt-1 w-full rounded-md border border-stone-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                  value={filters.sort}
                  onChange={(event) =>
                    setFilters((currentFilters) => ({
                      ...currentFilters,
                      sort: event.target.value as SortOption,
                    }))
                  }>
                  {Object.entries(sortLabels).map(([sortOption, label]) => (
                    <option key={sortOption} value={sortOption}>
                      {label}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <label>
                <span className="text-sm font-medium text-stone-700">
                  Disponibilité
                </span>
                <select
                  className="mt-1 w-full rounded-md border border-stone-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                  value={filters.availability}
                  onChange={(event) =>
                    setFilters((currentFilters) => ({
                      ...currentFilters,
                      availability: event.target.value as AvailabilityFilter,
                    }))
                  }>
                  {Object.entries(availabilityLabels).map(
                    ([availability, label]) => (
                      <option key={availability} value={availability}>
                        {label}
                      </option>
                    ),
                  )}
                </select>
              </label>

              <label>
                <span className="text-sm font-medium text-stone-700">
                  Prix maximum
                </span>
                <input
                  className="mt-1 w-full rounded-md border border-stone-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                  type="number"
                  min="1"
                  value={filters.maxPrice}
                  onChange={(event) =>
                    setFilters((currentFilters) => ({
                      ...currentFilters,
                      maxPrice: event.target.value,
                    }))
                  }
                  placeholder="Ex. 800"
                />
              </label>
            </div>
          </div>

          {errorMessage !== null && (
            <div className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">
              {errorMessage}
            </div>
          )}

          {status === "loading" && (
            <div className="rounded-lg border border-stone-200 bg-white p-6 text-stone-600">
              Chargement des voyages...
            </div>
          )}

          {status !== "loading" && visibleTrips.length === 0 && (
            <div className="rounded-lg border border-stone-200 bg-white p-6 text-stone-600">
              Aucun voyage ne correspond aux filtres sélectionnés.
            </div>
          )}

          <div className="grid gap-5 md:grid-cols-2">
            {visibleTrips.map((trip) => (
              <article
                key={trip.id}
                className="overflow-hidden rounded-lg border border-stone-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                <button
                  className="block w-full text-left"
                  type="button"
                  onClick={() => {
                    selectTrip(trip.id).catch((error: unknown) => {
                      setErrorMessage(getErrorMessage(error));
                    });
                  }}>
                  {trip.image_url.length > 0 ? (
                    <img
                      className="h-52 w-full object-cover"
                      src={trip.image_url}
                      alt={`Vue de ${trip.destination}`}
                    />
                  ) : (
                    <div className="flex h-52 items-center justify-center bg-teal-900 px-4 text-center text-lg font-semibold text-white">
                      {trip.destination}
                    </div>
                  )}
                  <div className="space-y-4 p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-teal-700">
                          {trip.country}
                        </p>
                        <h2 className="mt-1 text-xl font-bold text-stone-950">
                          {trip.title}
                        </h2>
                      </div>
                      <StatusPill trip={trip} />
                    </div>

                    <p className="line-clamp-3 min-h-18 text-sm leading-6 text-stone-600">
                      {trip.description}
                    </p>

                    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-stone-100 pt-4">
                      <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-900">
                        {travelTypeLabels[trip.travel_type]}
                      </span>
                      <div className="text-right">
                        <p className="text-lg font-bold text-stone-950">
                          {currencyFormatter.format(trip.price)}
                        </p>
                        <p className="text-xs text-stone-500">
                          {trip.duration_days} jours
                        </p>
                      </div>
                    </div>
                  </div>
                </button>
              </article>
            ))}
          </div>
        </div>

        <aside className="space-y-6 lg:sticky lg:top-6 lg:self-start">
          <section className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-teal-700">
                  Détail
                </p>
                <h2 className="mt-1 text-2xl font-bold">
                  {selectedTrip?.title ?? "Aucun voyage sélectionné"}
                </h2>
              </div>
              {selectedTrip !== null && <StatusPill trip={selectedTrip} />}
            </div>

            {selectedTrip !== null ? (
              <div className="mt-5 space-y-4">
                <p className="text-sm leading-6 text-stone-600">
                  {selectedTrip.description}
                </p>
                <dl className="grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-md bg-stone-100 p-3">
                    <dt className="text-stone-500">Destination</dt>
                    <dd className="font-semibold text-stone-950">
                      {selectedTrip.destination}, {selectedTrip.country}
                    </dd>
                  </div>
                  <div className="rounded-md bg-stone-100 p-3">
                    <dt className="text-stone-500">Durée</dt>
                    <dd className="font-semibold text-stone-950">
                      {selectedTrip.duration_days} jours
                    </dd>
                  </div>
                  <div className="rounded-md bg-stone-100 p-3">
                    <dt className="text-stone-500">Type</dt>
                    <dd className="font-semibold text-stone-950">
                      {travelTypeLabels[selectedTrip.travel_type]}
                    </dd>
                  </div>
                  <div className="rounded-md bg-stone-100 p-3">
                    <dt className="text-stone-500">Prix</dt>
                    <dd className="font-semibold text-stone-950">
                      {currencyFormatter.format(selectedTrip.price)}
                    </dd>
                  </div>
                </dl>
                <div className="flex gap-3">
                  <button
                    className="flex-1 rounded-md bg-teal-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-200"
                    type="button"
                    onClick={() => startEdition(selectedTrip)}>
                    Modifier
                  </button>
                  <button
                    className="flex-1 rounded-md border border-rose-200 bg-white px-4 py-2 text-sm font-semibold text-rose-700 transition hover:bg-rose-50 focus:outline-none focus:ring-2 focus:ring-rose-100"
                    type="button"
                    onClick={() => {
                      removeSelectedTrip().catch((error: unknown) => {
                        setFormMessage(getErrorMessage(error));
                      });
                    }}
                    disabled={status === "saving"}>
                    Supprimer
                  </button>
                </div>
              </div>
            ) : (
              <p className="mt-5 text-sm leading-6 text-stone-600">
                Choisissez une carte du catalogue pour afficher le détail du
                voyage.
              </p>
            )}
          </section>

          <section className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-teal-700">
                  Gestion
                </p>
                <h2 className="mt-1 text-2xl font-bold">
                  {isEditing ? "Modifier une offre" : "Créer une offre"}
                </h2>
              </div>
              <button
                className="rounded-md border border-stone-300 px-3 py-2 text-sm font-semibold text-stone-700 transition hover:bg-stone-100 focus:outline-none focus:ring-2 focus:ring-stone-200"
                type="button"
                onClick={startCreation}>
                Nouveau
              </button>
            </div>

            <form
              className="mt-5 space-y-4"
              onSubmit={(event) => {
                submitForm(event).catch((error: unknown) => {
                  setFormMessage(getErrorMessage(error));
                });
              }}>
              <label className="block">
                <span className="text-sm font-medium text-stone-700">
                  Titre
                </span>
                <input
                  className="mt-1 w-full rounded-md border border-stone-300 px-3 py-2 text-sm outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                  value={formState.title}
                  onChange={(event) =>
                    setFormState((currentFormState) => ({
                      ...currentFormState,
                      title: event.target.value,
                    }))
                  }
                  placeholder="Séjour à Lisbonne"
                />
              </label>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-medium text-stone-700">
                    Destination
                  </span>
                  <input
                    className="mt-1 w-full rounded-md border border-stone-300 px-3 py-2 text-sm outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                    value={formState.destination}
                    onChange={(event) =>
                      setFormState((currentFormState) => ({
                        ...currentFormState,
                        destination: event.target.value,
                      }))
                    }
                    placeholder="Lisbonne"
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-medium text-stone-700">
                    Pays
                  </span>
                  <input
                    className="mt-1 w-full rounded-md border border-stone-300 px-3 py-2 text-sm outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                    value={formState.country}
                    onChange={(event) =>
                      setFormState((currentFormState) => ({
                        ...currentFormState,
                        country: event.target.value,
                      }))
                    }
                    placeholder="Portugal"
                  />
                </label>
              </div>

              <label className="block">
                <span className="text-sm font-medium text-stone-700">
                  Description
                </span>
                <textarea
                  className="mt-1 min-h-28 w-full resize-y rounded-md border border-stone-300 px-3 py-2 text-sm outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                  value={formState.description}
                  onChange={(event) =>
                    setFormState((currentFormState) => ({
                      ...currentFormState,
                      description: event.target.value,
                    }))
                  }
                  placeholder="Un séjour lumineux entre tramways et belvédères."
                />
              </label>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-medium text-stone-700">
                    Prix
                  </span>
                  <input
                    className="mt-1 w-full rounded-md border border-stone-300 px-3 py-2 text-sm outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                    type="number"
                    min="1"
                    step="0.01"
                    value={formState.price}
                    onChange={(event) =>
                      setFormState((currentFormState) => ({
                        ...currentFormState,
                        price: event.target.value,
                      }))
                    }
                    placeholder="429.99"
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-medium text-stone-700">
                    Durée
                  </span>
                  <input
                    className="mt-1 w-full rounded-md border border-stone-300 px-3 py-2 text-sm outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                    type="number"
                    min="1"
                    step="1"
                    value={formState.durationDays}
                    onChange={(event) =>
                      setFormState((currentFormState) => ({
                        ...currentFormState,
                        durationDays: event.target.value,
                      }))
                    }
                    placeholder="4"
                  />
                </label>
              </div>

              <label className="block">
                <span className="text-sm font-medium text-stone-700">
                  Type de voyage
                </span>
                <select
                  className="mt-1 w-full rounded-md border border-stone-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                  value={formState.travelType}
                  onChange={(event) =>
                    setFormState((currentFormState) => ({
                      ...currentFormState,
                      travelType: event.target.value as TravelType,
                    }))
                  }>
                  {travelTypes.map((travelType) => (
                    <option key={travelType} value={travelType}>
                      {travelTypeLabels[travelType]}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="text-sm font-medium text-stone-700">
                  URL de l’image
                </span>
                <input
                  className="mt-1 w-full rounded-md border border-stone-300 px-3 py-2 text-sm outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                  value={formState.imageUrl}
                  onChange={(event) =>
                    setFormState((currentFormState) => ({
                      ...currentFormState,
                      imageUrl: event.target.value,
                    }))
                  }
                  placeholder="https://example.com/lisbonne.jpg"
                />
              </label>

              <label className="flex items-center gap-3 rounded-md bg-stone-100 px-3 py-3 text-sm font-medium text-stone-800">
                <input
                  className="h-4 w-4 rounded border-stone-300 text-teal-700 focus:ring-teal-600"
                  type="checkbox"
                  checked={formState.isAvailable}
                  onChange={(event) =>
                    setFormState((currentFormState) => ({
                      ...currentFormState,
                      isAvailable: event.target.checked,
                    }))
                  }
                />
                Disponible à la vente
              </label>

              {formMessage !== null && (
                <p className="rounded-md bg-stone-100 px-3 py-2 text-sm text-stone-700">
                  {formMessage}
                </p>
              )}

              <button
                className="w-full rounded-md bg-amber-500 px-4 py-3 text-sm font-bold text-stone-950 transition hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-200 disabled:cursor-not-allowed disabled:bg-stone-300 disabled:text-stone-600"
                type="submit"
                disabled={status === "saving"}>
                {status === "saving"
                  ? "Enregistrement..."
                  : isEditing
                    ? "Enregistrer les modifications"
                    : "Ajouter le voyage"}
              </button>
            </form>
          </section>
        </aside>
      </section>
    </main>
  );
};

export default App;
