import { useContext, useEffect, useRef } from "react";
import { Box } from "@chakra-ui/react";
import { BingMapContext, Directions } from ".";

type DirectionsProps = {
  directions: Directions;
};
export function BingMapDirections({ directions }: DirectionsProps) {
  const { map } = useContext(BingMapContext);
  const ref = useRef<HTMLDivElement>({} as HTMLDivElement);

  useEffect(() => {
    if (map && directions.from && directions.to) {
      console.log(directions);
      map.entities.clear();
      Microsoft.Maps.loadModule("Microsoft.Maps.Directions", function () {
        //Create an instance of the directions manager.
        const directionsManager = new Microsoft.Maps.Directions.DirectionsManager(
          map
        );
        //Create waypoints to route between.
        const seattleWaypoint = new Microsoft.Maps.Directions.Waypoint({
          address: directions.from?.title,
          location: directions.from?.location
        });
        directionsManager.addWaypoint(seattleWaypoint);

        const workWaypoint = new Microsoft.Maps.Directions.Waypoint({
          address: directions.to?.title,
          location: directions.to?.location
        });
        directionsManager.addWaypoint(workWaypoint);
        //Calculate directions.
        directionsManager.calculateDirections();
      });
    }
  }, [map, directions]);
  return <Box ref={ref}/>;
}

export default BingMapDirections