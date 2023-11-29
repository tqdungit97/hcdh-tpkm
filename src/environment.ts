export const environment = {
  production: import.meta.env.NODE_ENV === 'production',
  apiUrl: import.meta.env.VITE_APP_API_URL || "",
  googleMapApiKey: import.meta.env.VITE_APP_GOOGLE_MAP_API_KEY || ""
};