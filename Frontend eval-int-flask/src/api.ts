import { mockVehicles } from './mock'
import type { ParadeVehicle, VehicleInput } from './types'

// Variables d'environnement
const useMock = import.meta.env.VITE_USE_MOCK === 'true'
const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000'

// Trie les véhicules par position
const sortVehicles = (vehicles: ParadeVehicle[]): ParadeVehicle[] =>
  [...vehicles].sort((first, second) => first.position - second.position)

// Vérifie la réponse HTTP
const parseResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const body = await response.text()
    throw new Error(
      `La requête a échoué (${response.status}) : ${body || response.statusText}`
    )
  }

  if (response.status === 204) {
    return undefined as T
  }

  return response.json() as Promise<T>
}

// Fonction générique d'appel API
const request = async <T>(path: string, init?: RequestInit): Promise<T> => {
  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...init?.headers,
    },
  })

  return parseResponse<T>(response)
}

// Données mock
const getMockVehicles = (): ParadeVehicle[] =>
  sortVehicles(mockVehicles)

// ===========================
// GET
// ===========================
export const getVehicles = async (): Promise<ParadeVehicle[]> => {
  if (useMock) {
    return getMockVehicles()
  }

  return sortVehicles(
    await request<ParadeVehicle[]>('/parade-vehicles')
  )
}

// ===========================
// POST
// ===========================
export const createVehicle = async (
  input: VehicleInput
): Promise<ParadeVehicle> => {

  if (useMock) {
    const nextId =
      Math.max(0, ...mockVehicles.map(vehicle => vehicle.id)) + 1

    const vehicle: ParadeVehicle = {
      ...input,
      id: nextId,
    }

    mockVehicles.push(vehicle)

    return vehicle
  }

  return request<ParadeVehicle>('/parade-vehicles', {
    method: 'POST',
    body: JSON.stringify(input),
  })
}

// ===========================
// PUT
// ===========================
export const updateVehicle = async (
  id: number,
  input: VehicleInput
): Promise<ParadeVehicle> => {

  if (useMock) {
    const index = mockVehicles.findIndex(vehicle => vehicle.id === id)

    if (index === -1) {
      throw new Error('Véhicule introuvable')
    }

    const vehicle: ParadeVehicle = {
      ...input,
      id,
    }

    mockVehicles[index] = vehicle

    return vehicle
  }

  return request<ParadeVehicle>(`/parade-vehicles/${id}`, {
    method: 'PUT',
    body: JSON.stringify(input),
  })
}

// ===========================
// DELETE
// ===========================
export const deleteVehicle = async (id: number): Promise<void> => {

  if (useMock) {
    const index = mockVehicles.findIndex(vehicle => vehicle.id === id)

    if (index === -1) {
      throw new Error('Véhicule introuvable')
    }

    mockVehicles.splice(index, 1)

    return
  }

  await request<void>(`/parade-vehicles/${id}`, {
    method: 'DELETE',
  })
}

// ===========================
// Mode mock ?
// ===========================
export const isMockMode = (): boolean => useMock