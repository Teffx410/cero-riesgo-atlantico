import { RobleApiClient } from 'roble-client'

export const roble = new RobleApiClient({
  baseUrl: import.meta.env.VITE_ROBLE_URL,
  contractId: import.meta.env.VITE_ROBLE_CONTRACT,
})
