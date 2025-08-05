export const getBaseUrl = () => {
  if (typeof window !== 'undefined') return '' // browser should use relative URL

  // Handle Vercel deployments
  //   if (process.env.VERCEL_URL) {
  //     return `https://${process.env.VERCEL_URL}`
  //   }

  // Handle local development
  return `http://localhost:${process.env.PORT ?? 3000}`
}

export const buildApiUrl = (path: string) => {
  const baseUrl = getBaseUrl()
  const apiPath = path.startsWith('/') ? path : `/${path}`
  return `${baseUrl}/api${apiPath}`
}
