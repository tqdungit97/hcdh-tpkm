import React, { useMemo, useState } from "react";
import { BingMapContext } from "./BingMapContext";

export function BingMapProvider({
  children,
}: {
  children: React.ReactElement | React.ReactElement[];
}) {
  const [map, setMap] = useState<Microsoft.Maps.Map>();

  const contextValue = useMemo(() => ({ map, setMap }), [map, setMap]);

  return (
    <BingMapContext.Provider value={contextValue}>
      {children}
    </BingMapContext.Provider>
  );
}
