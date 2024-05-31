import { Box, Skeleton } from "@chakra-ui/react";
import { useScript } from "usehooks-ts";
import { environment } from "../../environment";
import { useEffect, useRef } from "react";
import { useGeolocation } from "../../hooks";
import { store } from "./store";

export type Directions = {
  from?: Microsoft.Maps.ISuggestionResult;
  to?: Microsoft.Maps.ISuggestionResult;
};

export function BingMap() {
  const geoLocation = useGeolocation();
  const mapRef = useRef<HTMLDivElement>({} as HTMLDivElement);
  const scriptLoaded = useScript(
    `http://www.bing.com/api/maps/mapcontrol?key=${environment.bingMapApiKey}`
  ) === 'ready';

  useEffect(() => {
    if (scriptLoaded && geoLocation?.coords && mapRef.current) {
      setTimeout(() => {
        const center = new Microsoft.Maps.Location(
          geoLocation?.coords.latitude,
          geoLocation?.coords.longitude
        );
        const map = new Microsoft.Maps.Map(mapRef.current, {
          credentials: environment.bingMapApiKey,
          zoom: 15,
          center: center,
          mapTypeId: Microsoft.Maps.MapTypeId.road,
          showZoomButtons: false,
          showScalebar: false,
          showDashboard: false,
          showLogo: false,
          showTrafficButton: false,
          showTermsLink: false,
        });
        const pin = new Microsoft.Maps.Pushpin(center);
        map.entities.push(pin);
        store.dispatch(map)
      }, 2000);
    }
  }, [scriptLoaded, geoLocation]);

  return (
    <Box
      ref={mapRef}
      w="full"
      h="full"
      sx={{ ".CopyrightControl": { display: "none" } }}
    >
      <Skeleton w="full" h="full" />
    </Box>
  );
}
