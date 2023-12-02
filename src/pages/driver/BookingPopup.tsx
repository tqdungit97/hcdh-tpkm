import {
  Avatar,
  Badge,
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

type BookingPoppupProps = {
  isOpen?: boolean;
  onAccept: () => void;
  onCancel: () => void;
};
export function BookingPoppup({
  isOpen,
  onAccept,
  onCancel,
}: BookingPoppupProps) {
  return (
    <Modal
      isOpen={isOpen ?? false}
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
            <Box textAlign="left" w="full" lineHeight="0.8">
              <Text fontSize="small" fontWeight="bold">
                Trần Quốc Dũng
              </Text>
              <Badge
                fontSize="xx-small"
                p="2px 4px"
                borderRadius="8px"
                colorScheme="green"
              >
                Khuyến mãi
              </Badge>
            </Box>
            <Box textAlign="right" flexShrink="0">
              <Text fontSize="small" fontWeight="bold">
                $25.00
              </Text>
              <Text fontSize="x-small" color="grey">
                2.2km
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
              <Text>164 Huỳnh Tấn Phát, Q7</Text>
            </Box>
            <Box w="full" px="8px">
              <Text color="gray" fontSize="smaller" fontWeight="bold">
                ĐIỂM ĐẾN
              </Text>
              <Text>227 Nguyễn Văn Cừ, Q1</Text>
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
