import { create, StoreApi } from "zustand";
import { persist } from "zustand/middleware";
import { AuthSlice, createAuthSlice } from "./slices/auth.slice";
import {
  GeolocationSclice,
  createGeolocationSlice,
} from "./slices/geolocation.slice";
import { BookingSlice, creatBookingSlice } from "./slices/booking.slice";

export type ApplicationStore = AuthSlice & GeolocationSclice & BookingSlice;

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
      ...creatBookingSlice(
        set as StoreApi<BookingSlice>["setState"],
        get as StoreApi<BookingSlice>["getState"],
        api as StoreApi<BookingSlice>
      ),
    }),
    { name: "aloxe-store" }
  )
);
