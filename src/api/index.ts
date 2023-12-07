import Axios, { AxiosError, AxiosRequestHeaders, HttpStatusCode } from "axios";
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
      "ngrok-skip-browser-warning": 69420,
    } as unknown as AxiosRequestHeaders,
  };
});
AxiosInstance.interceptors.response.use(
  (response) => response.data,
  (error: AxiosError) => {
    const { clearAuth, clearBooking } = useApplicationStore.getState();
    if (error.response?.status === HttpStatusCode.Unauthorized) {
      clearAuth();
      clearBooking();
    }
    return Promise.reject(error);
  }
);
