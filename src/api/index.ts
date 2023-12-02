import Axios, { AxiosRequestHeaders } from "axios";
import { environment } from "../environment";
import { useApplicationStore } from "../store/useApplicationStore";

export const AxiosInstance = Axios.create({
  baseURL: environment.apiUrl,
});

AxiosInstance.interceptors.request.use((config) => {
  const store = useApplicationStore.getState();
  if (config.url?.startsWith("/api/auth")) {
    return config;
  }
  return {
    ...config,
    headers: {
      ...config.headers,
      "x-access-token": store.auth?.accessToken,
      "ngrok-skip-browser-warning": 69420
    } as unknown as AxiosRequestHeaders,
  };
});
AxiosInstance.interceptors.response.use((response) => response.data);
