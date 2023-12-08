import {
  Avatar,
  Box,
  Flex,
  Icon,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { MdAccessTime, MdReceipt, MdSpeed } from "react-icons/md";
import { useProfile } from "../../hooks/useProfile";
import { Header } from "./Header";
import { IncomingBookingPopup } from "./IncomingBookingPopup";
import { BingMap } from "../../components/BingMap";
import { useEffect, useState } from "react";
import { useSocketIO } from "../../hooks/useSocketIO";
import { useOnlineStatus } from "../../hooks/useOnlineStatus";
import { Booking, BookingStatus } from "../../types/booking";
import { Customer } from "../../types/user";
import { useBooking } from "../../hooks";
import { BookingStatusPoppup } from "./BookingStatusPoppup";

export function Driver() {
  const [bookingData, setBookingData] = useState<{
    booking: Booking;
    customer: Customer;
  }>();
  const toast = useToast();
  const socket = useSocketIO();
  const { user } = useProfile();
  const { isOnline } = useOnlineStatus();
  const { updateBookingStatus } = useBooking();

  const updateBooking = (actionType: BookingStatus) => () => {
    updateBookingStatus(
      {
        bookingId: bookingData?.booking?.id ?? -1,
        actionType: actionType,
        assignedDriverId: bookingData?.booking?.driver?.id,
      },
      {
        onSuccess: () => {
          if (actionType === BookingStatus.PAID) {
            toast({
              status: "success",
              title: "Đã hoàn thành chuyến đi",
            });
            setBookingData(undefined);
          } else {
            setBookingData((previous) => {
              if (previous) {
                previous = {
                  ...previous,
                  booking: {
                    ...previous.booking,
                    status: actionType,
                  },
                };
              }
              return previous;
            });
          }
        },
      }
    );
  };

  useEffect(() => {
    if (isOnline) {
      socket.open();
      socket.on(`${user?.driver?.id}`, (event) => {
        const data = JSON.parse(event) as {
          booking: Booking;
          customer: Customer;
        };
        if (data.booking.status === BookingStatus.DRIVER_FOUND) {
          setBookingData(data);
        }
        if (
          [
            BookingStatus.USER_CANCELLED,
            BookingStatus.CANCELLED,
            BookingStatus.PAID,
          ].includes(data.booking.status)
        ) {
          setBookingData(undefined);
        }
      });
    } else {
      socket.disconnect();
    }
    return () => {
      socket.disconnect();
      socket.close();
    };
  }, [isOnline, socket, user?.driver?.id]);

  return (
    <VStack spacing="0">
      {bookingData &&
        bookingData?.booking.status === BookingStatus.DRIVER_FOUND && (
          <IncomingBookingPopup
            bookingData={bookingData}
            onAccept={updateBooking(BookingStatus.CONFIRMED)}
            onCancel={updateBooking(BookingStatus.CANCELLED)}
          />
        )}
      {bookingData &&
        bookingData?.booking.status !== BookingStatus.DRIVER_FOUND && (
          <BookingStatusPoppup
            updateBookingStatus={(status) => updateBooking(status)()}
          />
        )}
      <Header />
      <Box w="full" h="calc(100vh - 40px)">
        <BingMap />
      </Box>
      <Box
        position="absolute"
        bottom="0"
        w="full"
        p="8px"
        bg="white"
        borderTopRadius="8px"
        textAlign="left"
      >
        <Flex alignItems="center" mb="8px">
          <Avatar name={user?.name} size="sm" mr="8px" />
          <Box>
            <Text fontWeight="bold" fontSize="small">
              {user?.fullName}
            </Text>
            <Text fontSize="smaller">{user?.email}</Text>
          </Box>
        </Flex>
        <Flex
          flexWrap="wrap"
          justifyContent="space-between"
          p="8px"
          borderRadius="4px"
          bgColor="green.400"
          color="white"
          fontSize="small"
          textTransform="uppercase"
        >
          <Box textAlign="center">
            <Icon as={MdAccessTime} boxSize={6} />
            <Text fontWeight="bold">10.2</Text>
            <Text fontSize="smaller">Số giờ chạy</Text>
          </Box>
          <Box textAlign="center">
            <Icon as={MdSpeed} boxSize={6} />
            <Text fontWeight="bold">30 KM</Text>
            <Text fontSize="smaller">Quãng đường</Text>
          </Box>
          <Box textAlign="center">
            <Icon as={MdReceipt} boxSize={6} />
            <Text fontWeight="bold">10.2</Text>
            <Text fontSize="smaller">Tổng đơn</Text>
          </Box>
        </Flex>
      </Box>
    </VStack>
  );
}
