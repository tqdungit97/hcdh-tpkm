import { createContext } from "react";

type BingMapContextType = {
  map?: Microsoft.Maps.Map;
  setMap: (map: Microsoft.Maps.Map) => void;
};

export const BingMapContext = createContext<BingMapContextType>({
  map: undefined,
  setMap: console.log,
});
