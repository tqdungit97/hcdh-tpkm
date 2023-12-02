export const environment = {
  production: import.meta.env.NODE_ENV === "production",
  apiUrl: import.meta.env.VITE_APP_API_URL || "",
  googleMapApiKey: import.meta.env.VITE_APP_GOOGLE_MAP_API_KEY || "",
  googleMapApiMapId: import.meta.env.VITE_APP_GOOGLE_MAP_API_MAP_ID || "",
  bingMapApiKey: import.meta.env.VITE_BING_MAPS_KEY || "",
};
