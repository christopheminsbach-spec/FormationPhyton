export type AppConfig = {
  apiBaseUrl: string
  useMocks: boolean
}

const readApiBaseUrl = (): string => {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

  if (apiBaseUrl.length === 0) {
    throw new Error(
      'La variable VITE_API_BASE_URL est obligatoire dans le fichier .env.',
    )
  }

  return apiBaseUrl.replace(/\/$/, '')
}

export const appConfig: AppConfig = {
  apiBaseUrl: readApiBaseUrl(),
  useMocks: import.meta.env.VITE_USE_MOCKS === 'true',
}
