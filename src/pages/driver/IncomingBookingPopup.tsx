import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Booking } from "../../types/booking";
import { Customer } from "../../types/user";

type BookingPoppupProps = {
  bookingData?: {
    booking: Booking;
    customer: Customer;
  };
  onAccept: () => void;
  onCancel: () => void;
};
export function IncomingBookingPopup({
  bookingData,
  onAccept,
  onCancel,
}: BookingPoppupProps) {
  return (
    <Modal
      isOpen={!!bookingData}
      isCentered
      closeOnEsc={false}
      closeOnOverlayClick={false}
      onClose={onCancel}
      motionPreset="slideInBottom"
    >
      <ModalContent mb="0" fontSize="small">
        <ModalHeader p="8px">
          <Flex justifyContent="space-between">
            <Avatar size="sm" mr="8px" borderRadius="8px" flexShrink="0" />
            <Box textAlign="left" w="full">
              <Text fontSize="small" fontWeight="bold">
                {bookingData?.customer?.fullName}
              </Text>
              <Text fontSize="x-small">
                {bookingData?.customer?.phoneNumber}
              </Text>
            </Box>
            <Box textAlign="right" flexShrink="0">
              <Text fontSize="small" fontWeight="bold">
                {bookingData?.booking?.amount ?? 0} VNĐ
              </Text>
              <Text fontSize="x-small" color="grey">
                {bookingData?.booking?.minDistance}km
              </Text>
            </Box>
          </Flex>
        </ModalHeader>
        <ModalBody p="0">
          <VStack divider={<Divider />}>
            <Box w="full" px="8px">
              <Text color="gray" fontSize="smaller" fontWeight="bold">
                ĐIỂM ĐÓN
              </Text>
              <Text>{bookingData?.booking?.bookingDetail?.pickUpPoint}</Text>
            </Box>
            <Box w="full" px="8px">
              <Text color="gray" fontSize="smaller" fontWeight="bold">
                ĐIỂM ĐẾN
              </Text>
              <Text>{bookingData?.booking?.bookingDetail?.dropOffPoint}</Text>
            </Box>
          </VStack>
          <Divider />
        </ModalBody>
        <ModalFooter>
          <Button
            rounded="40px"
            variant="ghost"
            mr="16px"
            color="gray"
            onClick={onCancel}
          >
            Từ chối
          </Button>
          <Button rounded="40px" colorScheme="whatsapp" onClick={onAccept}>
            Chấp nhận
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
