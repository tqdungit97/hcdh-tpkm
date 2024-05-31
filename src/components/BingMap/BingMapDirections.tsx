import { useEffect, useRef, useState } from "react";
import { Box } from "@chakra-ui/react";
import { Directions } from ".";
import store from "./store";

type DirectionsProps = {
  directions: Directions;
};
export function BingMapDirections({ directions }: DirectionsProps) {
  const [map, setMap] = useState<Microsoft.Maps.Map>();
  const ref = useRef<HTMLDivElement>({} as HTMLDivElement);
  const directionsManager =
    useRef<Microsoft.Maps.Directions.DirectionsManager>();

  useEffect(() => {
    store.subscribe(setMap);
  }, []);

  useEffect(() => {
    if (map && directions.from && directions.to) {
      map.entities.clear();
      Microsoft.Maps.loadModule("Microsoft.Maps.Directions", function () {
        if (!directionsManager.current) {
          directionsManager.current =
            //Create an instance of the directions manager.
            new Microsoft.Maps.Directions.DirectionsManager(map);
        }
        directionsManager.current.clearAll();
        //Create waypoints to route between.
        const seattleWaypoint = new Microsoft.Maps.Directions.Waypoint({
          address: directions.from?.title,
          location: directions.from?.location,
        });
        directionsManager.current.addWaypoint(seattleWaypoint);

        const workWaypoint = new Microsoft.Maps.Directions.Waypoint({
          address: directions.to?.title,
          location: directions.to?.location,
        });
        directionsManager.current.addWaypoint(workWaypoint);
        //Calculate directions.
        directionsManager.current.calculateDirections();
      });
    }
  }, [map, directions]);
  return <Box ref={ref} />;
}

export default BingMapDirections;
