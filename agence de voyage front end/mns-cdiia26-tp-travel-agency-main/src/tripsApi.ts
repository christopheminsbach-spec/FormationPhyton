import { appConfig } from "./config";
import type { Trip, TripInput } from "./types";

const parseJsonResponse = async <ResponseBody>(
  response: Response,
  requestDescription: string,
): Promise<ResponseBody> => {
  const responseBody = await response.text();
  const parsedBody: unknown =
    responseBody.length > 0 ? JSON.parse(responseBody) : null;

  if (!response.ok) {
    throw new Error(
      `${requestDescription} a échoué avec le statut ${response.status}. Réponse : ${responseBody}`,
    );
  }

  return parsedBody as ResponseBody;
};

const requestJson = async <ResponseBody>(
  path: string,
  init: RequestInit,
  requestDescription: string,
): Promise<ResponseBody> => {
  const response = await fetch(`${appConfig.apiBaseUrl}${path}`, init);

  return parseJsonResponse<ResponseBody>(response, requestDescription);
};

export const fetchTrips = async (): Promise<Trip[]> =>
  requestJson<Trip[]>("/trips", { method: "GET" }, "Le chargement des voyages");

export const fetchTrip = async (id: number): Promise<Trip> =>
  requestJson<Trip>(
    `/trips/${id}`,
    { method: "GET" },
    `Le chargement du voyage ${id}`,
  );

export const createTrip = async (tripInput: TripInput): Promise<Trip> =>
  requestJson<Trip>(
    "/trips",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tripInput),
    },
    `La création du voyage ${tripInput.title}`,
  );

export const updateTrip = async (
  id: number,
  tripInput: TripInput,
): Promise<Trip> =>
  requestJson<Trip>(
    `/trips/${id}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tripInput),
    },
    `La modification du voyage ${id}`,
  );

export const deleteTrip = async (id: number): Promise<void> => {
  await requestJson<unknown>(
    `/trips/${id}`,
    { method: "DELETE" },
    `La suppression du voyage ${id}`,
  );
};
