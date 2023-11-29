import { StateCreator } from "zustand";

export type GeolocationSclice = {
  geoLocation?: GeolocationPosition;
  setGeolocation: (geoLocation: GeolocationPosition) => void;
};

export const createGeolocationSlice: StateCreator<GeolocationSclice> = (set) => ({
  geoLocation: undefined,
  setGeolocation: (geoLocation: GeolocationPosition) => set({ geoLocation }),
});
