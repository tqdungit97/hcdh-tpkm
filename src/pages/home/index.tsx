import { useState } from "react";
import { Box, Button, VStack } from "@chakra-ui/react";
import { useLoadScript } from "@react-google-maps/api";
import { AutoCompleteAddress, GoogleMap, Directions } from "../../components";
import { environment } from "../../environment";

export function Home() {
  const [directions, setPlaces] = useState<Directions>({
    from: undefined,
    to: undefined,
  });
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: environment.googleMapApiKey,
    libraries: ["places"],
  });

  if (!isLoaded) {
    return "Loading Google Map";
  }

  return (
    <VStack spacing="0">
      <Box w="100%" h="60vh">
        <GoogleMap directions={directions} />
      </Box>
      <Box w="100%" h="40%" p="16px">
        <AutoCompleteAddress
          useCurrentPosition
          mb="8px"
          onChange={(from) => setPlaces((prev) => ({ ...prev, from }))}
        />
        <AutoCompleteAddress
          mb="8px"
          onChange={(to) => setPlaces((prev) => ({ ...prev, to }))}
        />
        <Button
          w="100%"
          isDisabled={!directions.from || !directions.to}
          colorScheme="whatsapp"
        >
          Đặt xe
        </Button>
      </Box>
    </VStack>
  );
}

export default Home;
