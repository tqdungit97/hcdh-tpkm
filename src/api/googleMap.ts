import { Places } from "../components";

export const getRoute = (directions: Places) => {
  if (!directions.from || !directions.to) {
    return;
  }
  const directionService = new google.maps.DirectionsService();
  return directionService.route({
    origin: { placeId: directions.from.place_id },
    destination: { placeId: directions.to.place_id },
    travelMode: google.maps.TravelMode.DRIVING,
  });
}

export const getPlaceFromCoordinates = (
  location: GeolocationPosition
) => {
  const geoService = new google.maps.Geocoder();
  return geoService.geocode({
    location: { lat: location.coords.latitude, lng: location.coords.longitude },
  });
};
