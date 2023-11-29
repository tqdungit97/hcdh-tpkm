import { create, StoreApi } from "zustand";
import { persist } from "zustand/middleware";
import { AuthSlice, createAuthSlice } from "./slices/auth.slice";
import { GeolocationSclice, createGeolocationSlice } from "./slices/geolocation.slice";

export type ApplicationStore = AuthSlice & GeolocationSclice;

export const useApplicationStore = create<ApplicationStore>()(
  persist(
    (set, get, api): ApplicationStore => ({
      ...createAuthSlice(
        set as StoreApi<AuthSlice>["setState"],
        get as StoreApi<AuthSlice>["getState"],
        api as StoreApi<AuthSlice>
      ),
      ...createGeolocationSlice(
        set as StoreApi<GeolocationSclice>["setState"],
        get as StoreApi<GeolocationSclice>["getState"],
        api as StoreApi<GeolocationSclice>
      ),
    }),
    { name: "aloxe-store" }
  )
);
