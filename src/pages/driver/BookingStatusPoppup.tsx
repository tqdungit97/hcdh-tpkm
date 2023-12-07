import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Step,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
} from "@chakra-ui/react";
import { useState } from "react";
import { BookingStatus } from "../../types/booking";

type BookingStep = {
  status: BookingStatus;
  title: string;
};
const STEPS: BookingStep[] = [
  { status: BookingStatus.DRIVER_COME, title: "Đã đến điểm đón" },
  { status: BookingStatus.ONBOARDING, title: "Bắt đầu" },
  { status: BookingStatus.ARRIVED, title: "Đã đến nơi" },
  { status: BookingStatus.PAID, title: "Hoàn thành" },
];

type BookingStatusPoppupProps = {
  updateBookingStatus: (status: BookingStatus) => void;
};
export function BookingStatusPoppup({
  updateBookingStatus,
}: BookingStatusPoppupProps) {
  const [bookingStep, setBookingStep] = useState<number>(-1);

  return (
    <Modal
      isOpen
      isCentered
      closeOnEsc={false}
      closeOnOverlayClick={false}
      onClose={() => {}}
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent mb="0">
        <ModalHeader>Trạng thái chuyến xe</ModalHeader>
        <ModalBody>
          <Stepper
            gap={0}
            mb="16px"
            height="250px"
            orientation="vertical"
            colorScheme="whatsapp"
            index={bookingStep}
          >
            {STEPS.map(({ status, title }, index) => (
              <Step
                aria-disabled
                key={status}
                onClick={() => {
                  setBookingStep(index);
                  updateBookingStatus(STEPS[index].status);
                }}
              >
                <StepIndicator>
                  <StepStatus
                    complete={<StepIcon />}
                    incomplete={<StepNumber />}
                    active={<StepNumber />}
                  />
                </StepIndicator>
                <StepTitle>{title}</StepTitle>
                <StepSeparator />
              </Step>
            ))}
          </Stepper>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
