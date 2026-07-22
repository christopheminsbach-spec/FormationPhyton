export type VehicleStatus = 'preparing' | 'ready' | 'maintenance'

export type ParadeVehicle = {
  id: number
  name: string
  universe: string
  main_character: string
  position: number
  status: VehicleStatus
  has_night_lighting: boolean
  image_url: string | null
  notes: string | null
}

export type VehicleInput = Omit<ParadeVehicle, 'id'>

export type VehicleFormValues = {
  name: string
  universe: string
  main_character: string
  position: string
  status: VehicleStatus
  has_night_lighting: boolean
  image_url: string
  notes: string
}

export const statusLabels: Record<VehicleStatus, string> = {
  preparing: 'En préparation',
  ready: 'Prêt pour la parade',
  maintenance: 'En maintenance',
}
