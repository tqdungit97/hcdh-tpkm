import { useCallback, useEffect, useState } from "react";
import { Box, VStack } from "@chakra-ui/react";
import { AppHeader } from "../../components";
import {
  BingMap,
  AutoCompleteAddress,
  Directions,
  BingMapDirections,
} from "../../components/BingMap";
import { BookingPopup } from "./BookingPopup";
import { BookingButton } from "./BookingButton";
import { useAuthenticated, useBooking } from "../../hooks";
import { getUserBookings } from "../../api/booking";
import { isInCompletedBooking } from "../../helpers/booking";
import { VehicleType } from "../../types/booking";
import { SocketIOManager } from "../../SocketIOManager";
import { SelectCarType } from "./SelectCarType";

export function User() {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const socket = new SocketIOManager();
  const auth = useAuthenticated();
  const { bookingData, setBooking } = useBooking();
  const [directions, setDirections] = useState<Directions>();
  const [vehicleType, setVehicleType] = useState<VehicleType>(
    VehicleType.FOUR_SEAT
  );

  const getUserInCompletedBooking = useCallback(async () => {
    try {
      const { data: bookingList } = await getUserBookings({
        customerId: `${auth?.customerId}`,
      });
      const incompleteBooking = bookingList.find(isInCompletedBooking);
      setBooking(incompleteBooking);
    } catch (error) {
      console.log(error);
    }
  }, [auth?.customerId, setBooking]);

  useEffect(() => {
    getUserInCompletedBooking();
  }, [getUserInCompletedBooking]);

  useEffect(() => {
    socket.open();
    return () => {
      socket.disconnect();
      socket.close();
    };
  }, [socket]);

  return (
    // <BingMapProvider>
    <VStack spacing="0">
      <AppHeader />
      <Box w="full" h="calc(60vh - 40px)">
        <BingMap />
        {<BingMapDirections directions={directions} />}
      </Box>
      <Box w="full" h="40%" p="16px">
        <AutoCompleteAddress
          disabled={!!bookingData}
          id="autoSuggestFrom"
          mb="8px"
          onChange={(from) => setDirections((prev) => ({ ...prev, from }))}
        />
        <AutoCompleteAddress
          disabled={!!bookingData}
          id="autoSuggestTo"
          mb="8px"
          onChange={(to) => setDirections((prev) => ({ ...prev, to }))}
        />
        <SelectCarType
          vehicleType={vehicleType}
          setVehicleType={setVehicleType}
        />
        <BookingButton vehicleType={vehicleType} directions={directions} />
      </Box>
      <BookingPopup />
    </VStack>
    // </BingMapProvider>
  );
}

export default User;
