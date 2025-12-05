import axios, { type AxiosInstance } from 'axios'
import { useAuth } from '@clerk/clerk-react'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

// Buat function untuk get client dengan auth
export const useApiClient = () => {
  const { getToken } = useAuth()

  const client: AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  })

  // Request interceptor
  client.interceptors.request.use(async (config) => {
    try {
      const token = await getToken()
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    } catch (error) {
      console.error('Error getting auth token:', error)
    }
    return config
  })

  // Response interceptor
  client.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        window.location.href = '/sign-in'
      }
      return Promise.reject(error)
    }
  )

  return client
}

// Simple axios instance tanpa auth (untuk public endpoints)
export const publicApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})