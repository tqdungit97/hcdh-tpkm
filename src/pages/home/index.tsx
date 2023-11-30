import { useCallback, useEffect, useState } from "react";
import { Box, VStack } from "@chakra-ui/react";
import { useLoadScript } from "@react-google-maps/api";
import { useGeolocation } from "../../hooks";
import { AutoCompleteAddress, GoogleMap, Directions, BookingButton } from "../../components";
import { getPlaceFromCoordinates } from "../../api/googleMap";
import { environment } from "../../environment";

export function Home() {
  const [directions, setPlaces] = useState<Directions>({
    from: undefined,
    to: undefined,
  });
  const [directionResult, setDirectionResult] = useState<google.maps.DirectionsResult>();
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
      <Box w="full" h="60vh">
        <GoogleMap directions={directions} onDirectionResultChanged={setDirectionResult}/>
      </Box>
      <Box w="full" h="40%" p="16px">
        <AutoCompleteAddress
          defaultPlace={directions.from}
          mb="8px"
          onChange={(from) => setPlaces((prev) => ({ ...prev, from }))}
        />
        <AutoCompleteAddress
          mb="8px"
          onChange={(to) => setPlaces((prev) => ({ ...prev, to }))}
        />
        <BookingButton directionResult={directionResult} />
      </Box>
    </VStack>
  );
}

export default Home;
