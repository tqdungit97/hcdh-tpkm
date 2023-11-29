import { useApplicationStore } from "../store/useApplicationStore";

export function useGeolocation() {
  const { geoLocation } = useApplicationStore();

  return geoLocation;
}
