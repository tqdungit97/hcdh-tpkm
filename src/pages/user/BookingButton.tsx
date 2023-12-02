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
import { VehicleType } from "../../types/booking";

type BookingButtonProps = {
  directionResult?: google.maps.DirectionsResult;
};

const steps = [
  { title: "Đã đặt", description: "Đã đặt xe" },
  { title: "Đang tìm xe", description: "Đang tìm xe" },
  { title: "Tài xế đã đến", description: "Tài xế đã đến" },
  { title: "Khởi hành", description: "Khởi hành" },
  { title: "Đến nơi", description: "Đã đến nơi" },
  { title: "Hoàn thành", description: "Đã thanh toán" },
];

export function BookingButton({ directionResult }: BookingButtonProps) {
  const auth = useAuthenticated();
  const { onOpen, onClose } = useDisclosure();
  const { isLoading ,data, mutate } = useBooking();

  const onCarBooking = useCallback(() => {
    const now = new Date();
    const { start_address, end_address, start_location, end_location } =
      directionResult?.routes[0].legs[0] || {};
    mutate({
      customerId: auth?.customerId || "",
      startTime: now,
      bookingDetail: {
        startTime: now,
        vehicleType: VehicleType.FOUR_SEAT,
        pickUplatitude: start_location?.lat() ?? 0,
        pickUplongitude: start_location?.lng() ?? 0,
        pickUpPoint: start_address ?? "",
        dropOfflatitude: end_location?.lat() ?? 0,
        dropOfflongitude: end_location?.lng() ?? 0,
        dropOffPoint: end_address ?? "",
      },
    });
  }, [auth?.customerId, directionResult?.routes, mutate]);

  useEffect(() => {
    if (data) {
      onOpen();
    } else {
      onClose();
    }
  }, [data, onOpen, onClose]);

  return (
    <>
      <Button
        w="full"
        isLoading={isLoading}
        isDisabled={!directionResult}
        colorScheme="whatsapp"
        onClick={onCarBooking}
      >
        Đặt xe
      </Button>
      <Modal
        isCentered
        isOpen={!!data}
        onClose={onClose}
        closeOnEsc={false}
        closeOnOverlayClick={false}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent mb="0">
          <ModalHeader>Đang đặt xe</ModalHeader>
          <ModalBody>
            <Stepper index={0} orientation="vertical" height="400px" gap={0}>
              {steps.map((step, index) => (
                <Step key={index}>
                  <StepIndicator>
                    <StepStatus
                      complete={<StepIcon />}
                      incomplete={<StepNumber />}
                      active={<StepNumber />}
                    />
                  </StepIndicator>

                  <Box flexShrink="0">
                    <StepTitle>{step.title}</StepTitle>
                    <StepDescription>{step.description}</StepDescription>
                  </Box>
                  <StepSeparator />
                </Step>
              ))}
            </Stepper>
          </ModalBody>
          <ModalFooter>
            <Button width="full" onClick={onClose}>
              Hủy
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
