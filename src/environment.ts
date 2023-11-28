export const environment = {
  production: import.meta.env.NODE_ENV === 'production',
  apiUrl: import.meta.env.VITE_APP_API_URL || "",
};

console.log(environment)