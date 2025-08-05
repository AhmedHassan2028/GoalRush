import axios from 'axios'
import { buildApiUrl } from '@/lib/utils/url'

type RequestOptions = {
  headers?: Record<string, string>
  cache?: RequestCache
  next?: {
    revalidate?: number
    tags?: string[]
  }
  token?: string // Add token option
}

export const apiClient = {
  GET: async <T>(path: string, options?: RequestOptions): Promise<T> => {
    const url = buildApiUrl(path)
    const headers = {
      ...options?.headers,
      ...(options?.token && { Authorization: `Bearer ${options.token}` }),
    }

    const response = await axios.get(url, {
      headers,
      ...options,
    })

    return response.data
  },

  POST: async <T>(
    path: string,
    body: unknown,
    options?: RequestOptions
  ): Promise<T> => {
    const url = buildApiUrl(path)
    const headers = {
      'Content-Type': 'application/json',
      ...options?.headers,
      ...(options?.token && { Authorization: `Bearer ${options.token}` }),
    }

    const response = await axios.post(url, body, {
      headers,
      ...options,
    })

    return response.data
  },
  // Add other methods as needed
  PUT: async <T>(
    path: string,
    body: unknown,
    options?: RequestOptions
  ): Promise<T> => {
    const url = buildApiUrl(path)
    const headers = {
      'Content-Type': 'application/json',
      ...options?.headers,
      ...(options?.token && { Authorization: `Bearer ${options.token}` }),
    }

    const response = await axios.put(url, body, {
      headers,
      ...options,
    })

    return response.data
  },
  PATCH: async <T>(
    path: string,
    body: unknown,
    options?: RequestOptions
  ): Promise<T> => {
    const url = buildApiUrl(path)
    const headers = {
      'Content-Type': 'application/json',
      ...options?.headers,
      ...(options?.token && { Authorization: `Bearer ${options.token}` }),
    }

    const response = await axios.patch(url, body, {
      headers,
      ...options,
    })

    return response.data
  },
  DELETE: async <T>(path: string, options?: RequestOptions): Promise<T> => {
    const url = buildApiUrl(path)
    const headers = {
      ...options?.headers,
      ...(options?.token && { Authorization: `Bearer ${options.token}` }),
    }

    const response = await axios.delete(url, {
      headers,
      ...options,
    })

    return response.data
  },
}
