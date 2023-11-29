import { Box, Skeleton } from "@chakra-ui/react";
import {
  DirectionsRenderer,
  DirectionsService,
  GoogleMap as Map,
  MarkerF,
} from "@react-google-maps/api";
import { useGeolocation } from "../../hooks";
import { useCallback, useEffect, useMemo, useState } from "react";

export type Directions = {
  from?: google.maps.places.PlaceResult;
  to?: google.maps.places.PlaceResult;
};

type GoogleMapProps = {
  directions: Directions;
};

export function GoogleMap({ directions }: GoogleMapProps) {
  const geoLocation = useGeolocation();
  const [directionResult, setDirectionResult] =
    useState<google.maps.DirectionsResult>();

  const onDirectionServiceCallback = useCallback(
    (
      result: google.maps.DirectionsResult | null,
      status: google.maps.DirectionsStatus
    ) => {
      if (result !== null) {
        if (status === "OK") {
          setDirectionResult(result);
        } else {
          console.log("response: ", result);
        }
      }
    },
    []
  );

  const directionRequest = useMemo((): google.maps.DirectionsRequest | null => {
    if (!directions.from || !directions.to) {
      return null;
    }
    return {
      origin: { placeId: directions.to?.place_id },
      destination: { placeId: directions.from?.place_id },
      travelMode: google.maps.TravelMode.DRIVING,
    };
  }, [directions]);

  useEffect(() => {
    if (!directionRequest) {
      setDirectionResult(undefined);
    }
  }, [directionRequest]);

  return (
    <Box w="100%" height="100%">
      {geoLocation?.coords ? (
        <Map
          zoom={15}
          center={{
            lat: geoLocation?.coords.latitude,
            lng: geoLocation?.coords.longitude,
          }}
          mapContainerStyle={{
            width: "100%",
            height: "100%",
          }}
        >
          {!directionResult && directions.from && (
            <MarkerF
              position={{
                lat: directions.from.geometry?.location?.lat() ?? 0,
                lng: directions.from.geometry?.location?.lng() ?? 0,
              }}
            />
          )}
          {directionRequest && (
            <DirectionsService
              options={directionRequest}
              callback={onDirectionServiceCallback}
            />
          )}
          {directionResult && (
            <DirectionsRenderer directions={directionResult} />
          )}
        </Map>
      ) : (
        <Skeleton w="100%" h="100%" />
      )}
    </Box>
  );
}

export default GoogleMap;
