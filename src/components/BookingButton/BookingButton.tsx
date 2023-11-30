import { useCallback } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useToggle } from "../../hooks";

type BookingButtonProps = {
  directionResult?: google.maps.DirectionsResult;
};

export function BookingButton({ directionResult }: BookingButtonProps) {
  const { isOpen, toggle } = useToggle();
  const onCarBooking = useCallback(() => {
    console.log(directionResult);
    toggle();
  }, [directionResult, toggle]);

  return (
    <>
      <Button
        w="full"
        isDisabled={!directionResult}
        colorScheme="whatsapp"
        onClick={onCarBooking}
      >
        Đặt xe
      </Button>
      <Modal isOpen={isOpen} onClose={toggle} isCentered closeOnEsc={false}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Đang đặt xe</ModalHeader>
          <ModalBody>

          </ModalBody>
          <ModalFooter>
            <Button width="full">Hủy</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
