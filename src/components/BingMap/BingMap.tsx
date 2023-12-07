import { Box } from "@chakra-ui/react";
import { useScript } from "usehooks-ts";
import { environment } from "../../environment";
import { useContext, useEffect, useRef } from "react";
import { useGeolocation } from "../../hooks";
import { BingMapContext } from "./BingMapContext";

export type Directions = {
  from?: Microsoft.Maps.ISuggestionResult;
  to?: Microsoft.Maps.ISuggestionResult;
};

export function BingMap() {
  const { setMap } = useContext(BingMapContext);
  const geoLocation = useGeolocation();
  const mapRef = useRef<HTMLDivElement>({} as HTMLDivElement);
  const status = useScript(
    `http://www.bing.com/api/maps/mapcontrol?key=${environment.bingMapApiKey}`
  );

  useEffect(() => {
    if (status === "ready" && geoLocation?.coords && mapRef.current) {
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
        setMap(map);
      }, 100);
    }
  }, [status, geoLocation, setMap]);

  return <Box ref={mapRef} w="full" h="full" sx={{ '.CopyrightControl': { display: 'none' } }}/>;
}
