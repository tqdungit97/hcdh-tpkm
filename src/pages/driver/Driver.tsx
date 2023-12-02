import { Avatar, Box, Flex, Text, VStack } from "@chakra-ui/react";
import { useLoadScript } from "@react-google-maps/api";
import { useProfile } from "../../hooks/useProfile";
import { Header } from "./Header";
import { GoogleMap } from "../../components";
import { environment } from "../../environment";

export function Driver() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: environment.googleMapApiKey,
    libraries: ["places"],
  });
  const { user } = useProfile();

  return (
    <VStack spacing="0">
      <Header />
      <Box w="full" h="calc(100vh - 40px)">
        {isLoaded && <GoogleMap zoom={18} />}
      </Box>
      <Box
        position="absolute"
        bottom="0"
        w="full"
        p="16px"
        bg="white"
        borderTopRadius="8px"
        textAlign="left"
      >
        <Flex alignItems="center">
          <Avatar name={user?.name} size="sm" mr="8px" />
          <Box>
            <Text fontWeight="bold" fontSize="small">
              {user?.name}
            </Text>
            <Text fontSize="smaller">{user?.email}</Text>
          </Box>
        </Flex>
      </Box>
    </VStack>
  );
}
