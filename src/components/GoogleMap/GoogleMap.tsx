import { useCallback, useEffect, useMemo, useState } from "react";
import { Box, Skeleton } from "@chakra-ui/react";
import {
  DirectionsRenderer,
  DirectionsService,
  GoogleMap as Map,
  MarkerF,
} from "@react-google-maps/api";
import { useGeolocation } from "../../hooks";
import { environment } from "../../environment";

export type Directions = {
  from?: google.maps.places.PlaceResult;
  to?: google.maps.places.PlaceResult;
};

type GoogleMapProps = {
  directions: Directions;
  onDirectionResultChanged: (result?: google.maps.DirectionsResult) => void;
};

export function GoogleMap({ directions, onDirectionResultChanged }: GoogleMapProps) {
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
          onDirectionResultChanged(result);
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
      onDirectionResultChanged(undefined);
    }
  }, [directionRequest, onDirectionResultChanged]);

  return (
    <Box w="full" height="full">
      {geoLocation?.coords ? (
        <Map
          options={{
            mapId: environment.googleMapApiMapId,
          }}
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
                lat: directions.from.geometry?.location?.lat() ?? NaN,
                lng: directions.from.geometry?.location?.lng() ?? NaN,
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
        <Skeleton w="full" h="full" />
      )}
    </Box>
  );
}

export default GoogleMap;
