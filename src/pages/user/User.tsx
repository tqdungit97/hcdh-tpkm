import { useCallback, useEffect, useState } from "react";
import { Box, Radio, RadioGroup, VStack } from "@chakra-ui/react";
import { AppHeader } from "../../components";
import {
  BingMap,
  AutoCompleteAddress,
  BingMapProvider,
  Directions,
  BingMapDirections,
} from "../../components/BingMap";
import { BookingPopup } from "./BookingPopup";
import { BookingButton } from "./BookingButton";
import { useAuthenticated, useBooking } from "../../hooks";
import { getUserBookings } from "../../api/booking";
import { isInCompletedBooking } from "../../helpers/booking";
import { VehicleType } from "../../types/booking";

export function User() {
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
      const isBookingInCompleted = isInCompletedBooking(bookingList[0]);
      setBooking(isBookingInCompleted ? bookingList[0] : undefined);
    } catch (error) {
      console.log(error);
    }
  }, [auth?.customerId, setBooking]);

  useEffect(() => {
    getUserInCompletedBooking();
  }, [getUserInCompletedBooking]);

  return (
    <BingMapProvider>
      <VStack spacing="0">
        <AppHeader />
        <Box w="full" h="calc(60vh - 40px)">
          <BingMap />
          {directions && <BingMapDirections directions={directions} />}
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
          <RadioGroup
            marginY="16px"
            textAlign="left"
            value={vehicleType}
            onChange={(type) => setVehicleType(type as VehicleType)}
          >
            <Radio value={VehicleType.FOUR_SEAT} mr="8px">
              Xe 4 chỗ
            </Radio>
            <Radio value={VehicleType.FIVE_SEAT} mr="8px">
              Xe 5 chỗ
            </Radio>
            <Radio value={VehicleType.SEVEN_SEAT} mr="8px">
              Xe 7 chỗ
            </Radio>
          </RadioGroup>
          <BookingButton vehicleType={vehicleType} directions={directions} />
        </Box>
      </VStack>
      <BookingPopup />
    </BingMapProvider>
  );
}

export default User;
