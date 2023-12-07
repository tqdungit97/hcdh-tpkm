import { useEffect } from "react";
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
  useToast,
} from "@chakra-ui/react";
import { useBooking } from "../../hooks";
import { useSocketIO } from "../../hooks/useSocketIO";
import { BookingStatus } from "../../types/booking";

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
      title: "Đang tìm tài xế",
      description: "Hệ thống đang tìm tài xế cho bạn.",
    },
  ],
  [
    BookingStatus.DRIVER_FOUND,
    {
      index: 2,
      title: "Đã tìm thấy xế",
      description: "Đã tìm thấy tài xế, đang đợi xác nhận.",
    },
  ],
  [
    BookingStatus.DRIVER_CONFIRMED,
    {
      index: 3,
      title: "Tài xế đã xác nhận",
      description: "Tài xế đã nhận và đang trên đường đến.",
    },
  ],
  [
    BookingStatus.DRIVER_COME,
    {
      index: 4,
      title: "Tài xế đã đến",
      description: "Tài xế đã đến điểm đón bạn.",
    },
  ],
  [
    BookingStatus.ONBOARDING,
    {
      index: 5,
      title: "Khởi hành",
      description: "Bắt đầu chuyến đi",
    },
  ],
  [
    BookingStatus.ARRIVED,
    {
      index: 6,
      title: "Đã đến nơi",
      description: "Đã đến nơi",
    },
  ],
  [
    BookingStatus.PAID,
    {
      index: 7,
      title: "Hoàn thành",
      description: "Đã thanh toán",
    },
  ],
]);

export function BookingPopup() {
  const { bookingData, setBooking, updateBooking, updateBookingStatus } =
    useBooking();
  const socket = useSocketIO();
  const toast = useToast();

  const hasBooking = !!bookingData;
  useEffect(() => {
    if (hasBooking) {
      socket.open();
      socket.on(`${bookingData?.id}`, (event) => {
        const data = JSON.parse(event) as { status: BookingStatus };
        if (data.status === BookingStatus.PAID) {
          toast({
            isClosable: true,
            duration: 2000,
            status: "success",
            title: "Đã hoàn thành chuyến đi",
          });
        }
        if (
          [
            BookingStatus.CANCELLED,
            BookingStatus.USER_CANCELLED,
            BookingStatus.PAID,
          ].includes(data.status)
        ) {
          setBooking(undefined);
        } else {
          updateBooking({
            status: data.status,
          });
        }
      });
    } else {
      socket.disconnect();
    }
    return () => {
      socket.disconnect();
      socket.close();
    };
  }, [socket, hasBooking, bookingData?.id, toast, setBooking, updateBooking]);

  const currentBookingStep =
    BOOKING_STEPS.get(bookingData?.status as BookingStatus)?.index ?? -1;

  return (
    <Modal
      isCentered
      isOpen={!!bookingData}
      onClose={() => {}}
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
              updateBookingStatus({
                bookingId: bookingData?.id ?? -1,
                actionType: BookingStatus.USER_CANCELLED,
                assignedDriverId: bookingData?.driver?.id,
              });
            }}
            disabled={currentBookingStep >= 2}
          >
            Hủy
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
