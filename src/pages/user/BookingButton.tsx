import { useCallback } from "react";
import { Button, useDisclosure } from "@chakra-ui/react";
import { useAuthenticated, useBooking } from "../../hooks";
import { VehicleType } from "../../types/booking";
import { Directions } from "../../components/BingMap";

type BookingButtonProps = {
  vehicleType: VehicleType;
  directions?: Directions;
};

export function BookingButton({ directions, vehicleType }: BookingButtonProps) {
  const auth = useAuthenticated();
  const { onOpen } = useDisclosure();
  const { isLoading, bookingData, createBooking } = useBooking();

  const onCarBooking = useCallback(() => {
    const now = new Date();
    createBooking({
      customerId: auth?.customerId || "",
      startTime: now,
      bookingDetail: {
        startTime: now,
        vehicleType: vehicleType,
        pickUpLatitude: directions?.from?.location?.latitude ?? 0,
        pickUpLongitude: directions?.from?.location?.longitude ?? 0,
        pickUpPoint: directions?.from?.address?.formattedAddress ?? "",
        dropOffLatitude: directions?.to?.location?.latitude ?? 0,
        dropOffLongitude: directions?.to?.location?.longitude ?? 0,
        dropOffPoint: directions?.to?.address?.formattedAddress ?? "",
      },
    });
  }, [auth?.customerId, directions, vehicleType, createBooking]);

  return (
    <Button
      w="full"
      isLoading={isLoading}
      isDisabled={!directions?.from || !directions.to}
      colorScheme="whatsapp"
      onClick={bookingData ? onOpen : onCarBooking}
    >
      {bookingData ? "Xem chuyến đi" : "Đặt xe"}
    </Button>
  );
}
