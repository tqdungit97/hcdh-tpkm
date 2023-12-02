import { useCallback, useEffect, useMemo, useState } from "react";
import { Box, Skeleton } from "@chakra-ui/react";
import {
  DirectionsRenderer,
  DirectionsService,
  GoogleMap as Map,
  GoogleMapProps as BaseGoogleMapProps,
  MarkerF,
} from "@react-google-maps/api";
import { useGeolocation } from "../../hooks";
import { environment } from "../../environment";

export type Places = {
  from?: google.maps.places.PlaceResult;
  to?: google.maps.places.PlaceResult;
};

type GoogleMapProps = {
  places?: Places;
  onDirectionResultChanged?: (result?: google.maps.DirectionsResult) => void;
} & Partial<BaseGoogleMapProps>;

export function GoogleMap({ places, onDirectionResultChanged, ...rest }: GoogleMapProps) {
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
          onDirectionResultChanged?.(result);
        } else {
          console.log("response: ", result);
        }
      }
    },
    [onDirectionResultChanged]
  );

  const directionRequest = useMemo((): google.maps.DirectionsRequest | null => {
    if (!places?.from || !places?.to) {
      return null;
    }
    return {
      origin: { placeId: places.to?.place_id },
      destination: { placeId: places.from?.place_id },
      travelMode: google.maps.TravelMode.DRIVING,
    };
  }, [places]);

  useEffect(() => {
    if (!directionRequest) {
      setDirectionResult(undefined);
      onDirectionResultChanged?.(undefined);
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
          {...rest}
        >
          {!directionResult && (
            <MarkerF
              position={{
                lat: geoLocation.coords.latitude,
                lng: geoLocation.coords.longitude,
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
