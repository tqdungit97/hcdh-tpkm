import {
  Avatar,
  Box,
  Flex,
  Icon,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { MdAccessTime, MdReceipt, MdSpeed } from "react-icons/md";
import { useLoadScript } from "@react-google-maps/api";
import { useProfile } from "../../hooks/useProfile";
import { Header } from "./Header";
import { GoogleMap } from "../../components";
import { environment } from "../../environment";
import { BookingPoppup } from "./BookingPopup";

export function Driver() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: environment.googleMapApiKey,
    libraries: ["places"],
  });
  const { user } = useProfile();
  const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true });

  return (
    <VStack spacing="0">
      <BookingPoppup isOpen={isOpen} onAccept={onClose} onCancel={onClose} />
      <Header />
      <Box w="full" h="calc(100vh - 40px)">
        {isLoaded && <GoogleMap zoom={18} />}
      </Box>
      <Box
        position="absolute"
        bottom="0"
        w="full"
        p="8px"
        bg="white"
        borderTopRadius="8px"
        textAlign="left"
      >
        <Flex alignItems="center" mb="8px">
          <Avatar name={user?.name} size="sm" mr="8px" />
          <Box>
            <Text fontWeight="bold" fontSize="small">
              {user?.fullName}
            </Text>
            <Text fontSize="smaller">{user?.email}</Text>
          </Box>
        </Flex>
        <Flex
          flexWrap="wrap"
          justifyContent="space-between"
          p="8px"
          borderRadius="4px"
          bgColor="green.400"
          color="white"
          fontSize="small"
          textTransform="uppercase"
        >
          <Box textAlign="center">
            <Icon as={MdAccessTime} boxSize={6} />
            <Text fontWeight="bold">10.2</Text>
            <Text fontSize="smaller">Số giờ chạy</Text>
          </Box>
          <Box textAlign="center">
            <Icon as={MdSpeed} boxSize={6} />
            <Text fontWeight="bold">30 KM</Text>
            <Text fontSize="smaller">Quãng đường</Text>
          </Box>
          <Box textAlign="center">
            <Icon as={MdReceipt} boxSize={6} />
            <Text fontWeight="bold">10.2</Text>
            <Text fontSize="smaller">Tổng đơn</Text>
          </Box>
        </Flex>
      </Box>
    </VStack>
  );
}
