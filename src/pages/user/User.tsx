import { useCallback, useEffect, useState } from "react";
import { Box, VStack } from "@chakra-ui/react";
import { useLoadScript } from "@react-google-maps/api";
import { useGeolocation } from "../../hooks";
import {
  AutoCompleteAddress,
  GoogleMap,
  Places,
  AppHeader,
} from "../../components";
import { BookingButton } from "./BookingButton";
import { getPlaceFromCoordinates } from "../../api/googleMap";
import { environment } from "../../environment";

export function User() {
  const [places, setPlaces] = useState<Places>({
    from: undefined,
    to: undefined,
  });
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: environment.googleMapApiKey,
    libraries: ["places"],
  });
  const geoLocation = useGeolocation();

  const onInitialPlace = useCallback(
    async (geoLocation: GeolocationPosition) => {
      try {
        const place = await getPlaceFromCoordinates(geoLocation).then(
          (resp) => resp.results[0]
        );
        setPlaces({ from: place });
      } catch (error) {
        console.log(error);
      }
    },
    []
  );

  useEffect(() => {
    if (isLoaded && geoLocation?.coords) {
      onInitialPlace(geoLocation);
    }
  }, [isLoaded, geoLocation, onInitialPlace]);

  if (!isLoaded) {
    return "Loading Google Map";
  }

  return (
    <VStack spacing="0">
      <AppHeader />
      <Box w="full" h="calc(60vh - 40px)">
        <GoogleMap places={places} onDirectionResultChanged={console.log} />
      </Box>
      <Box w="full" h="40%" p="16px">
        <AutoCompleteAddress
          defaultPlace={places.from}
          mb="8px"
          onChange={(from) => setPlaces((prev) => ({ ...prev, from }))}
        />
        <AutoCompleteAddress
          mb="8px"
          onChange={(to) => setPlaces((prev) => ({ ...prev, to }))}
        />
        <BookingButton places={places} />
      </Box>
    </VStack>
  );
}

export default User;
