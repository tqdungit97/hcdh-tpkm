import { useCallback, useEffect } from "react";
import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useDisclosure,
} from "@chakra-ui/react";
import { useAuthenticated, useBooking } from "../../hooks";
import { BookingStatus, VehicleType } from "../../types/booking";
import { Directions } from "../../components/BingMap";
import { postBookingResponse } from "./dummy";

type BookingButtonProps = {
  directions?: Directions;
};

type BookingStep = {
  index: number;
  title: string;
  description: string;
};

const BOOKING_STEPS = new Map<BookingStatus, BookingStep>([
  [
    BookingStatus.BOOKED,
    {
      index: 0,
      title: "Đã đặt",
      description: "Đã đặt xe thành.",
    },
  ],
  [
    BookingStatus.WAITING_FOR_DRIVER,
    {
      index: 1,
      title: "Tìm tài xế",
      description: "Hệ thống đang tìm tài xế cho bạn.",
    },
  ],
  [
    BookingStatus.DRIVER_FOUND,
    {
      index: 2,
      title: "Đã có tài xế",
      description: "Tài xế đang trên đường đến.",
    },
  ],
  [
    BookingStatus.DRIVER_COME,
    {
      index: 3,
      title: "Tài xế đã đến",
      description: "Tài xế đã đến điểm đón bạn.",
    },
  ],
  [
    BookingStatus.ONBOARDING,
    {
      index: 4,
      title: "Khởi hành",
      description: "Bắt đầu chuyến đi",
    },
  ],
  [
    BookingStatus.ARRIVED,
    {
      index: 5,
      title: "Đã đến nơi",
      description: "Đã đến nơi",
    },
  ],
  [
    BookingStatus.PAID,
    {
      index: 6,
      title: "Hoàn thành",
      description: "Đã thanh toán",
    },
  ],
]);

export function BookingButton({ directions }: BookingButtonProps) {
  const auth = useAuthenticated();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isLoading, bookingData, startBooking, cancelBooking } = useBooking();

  const onCarBooking = useCallback(() => {
    const now = new Date();
    startBooking({
      customerId: auth?.customerId || "",
      startTime: now,
      bookingDetail: {
        startTime: now,
        vehicleType: VehicleType.FOUR_SEAT,
        pickUplatitude: directions?.from?.location?.latitude ?? 0,
        pickUplongitude: directions?.from?.location?.longitude ?? 0,
        pickUpPoint: directions?.from?.address?.formattedAddress ?? "",
        dropOfflatitude: directions?.to?.location?.latitude ?? 0,
        dropOfflongitude: directions?.to?.location?.longitude ?? 0,
        dropOffPoint: directions?.to?.address?.formattedAddress ?? "",
      },
    });
  }, [auth?.customerId, directions, startBooking]);

  useEffect(() => {
    if (bookingData) {
      onOpen();
    } else {
      onClose();
    }
  }, [bookingData, onOpen, onClose]);

  const currentBookingStep =
    BOOKING_STEPS.get(postBookingResponse.booking.status)?.index ?? -1;

  return (
    <>
      <Button
        w="full"
        isLoading={isLoading}
        isDisabled={!directions?.from || !directions.to}
        colorScheme="whatsapp"
        onClick={bookingData ? onOpen : onCarBooking}
      >
        {bookingData ? "Xem chuyến đi" : "Đặt xe"}
      </Button>
      <Modal
        isCentered
        isOpen={isOpen}
        onClose={onClose}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent mb="0">
          <ModalHeader>Đang đặt xe</ModalHeader>
          <ModalBody>
            <Stepper
              colorScheme="whatsapp"
              index={currentBookingStep}
              orientation="vertical"
              height="450px"
              gap={0}
            >
              {[...BOOKING_STEPS.entries()].map(([key, step]) => (
                <Step key={key}>
                  <StepIndicator>
                    <StepStatus
                      complete={<StepIcon />}
                      incomplete={<StepNumber />}
                      active={<StepNumber />}
                    />
                  </StepIndicator>

                  <Box>
                    <StepTitle>{step.title}</StepTitle>
                    <StepDescription>{step.description}</StepDescription>
                  </Box>
                  <StepSeparator />
                </Step>
              ))}
            </Stepper>
          </ModalBody>
          <ModalFooter>
            <Button
              width="full"
              onClick={() => {
                onClose();
                cancelBooking();
              }}
              disabled={currentBookingStep >= 2}
            >
              Hủy
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
