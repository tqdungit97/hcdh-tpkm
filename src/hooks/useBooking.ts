import { AxiosError, HttpStatusCode } from "axios";
import { useToast } from "@chakra-ui/react";
import { useMutation } from "react-query";
import { postBooking, putUpdateBookingStatus } from "../api/booking";
import { useApplicationStore } from "../store/useApplicationStore";
import { BookingStatus } from "../types/booking";

export function useBooking() {
  const toast = useToast();
  const { bookingData, setBooking, updateBooking, clearBooking } =
    useApplicationStore();

  const createBookingMutation = useMutation(postBooking, {
    onSuccess: (data) => {
      setBooking(data?.data?.booking);
    },
    onError: (error: AxiosError) => {
      let errorMessage = error.message;
      if (error.response?.status === HttpStatusCode.NotFound) {
        errorMessage = "Không tìm thấy tài xế";
      }
      toast({
        id: "booking",
        status: "error",
        title: errorMessage,
      });
    },
  });

  const updateBookingMutation = useMutation(putUpdateBookingStatus, {
    onSuccess: (_, variables) => {
      if (
        [BookingStatus.CANCELLED, BookingStatus.USER_CANCELLED].includes(
          variables.actionType
        )
      ) {
        clearBooking();
      } else {
        updateBooking({ status: variables.actionType });
      }
    },
    onError: () => {
      toast({
        id: "cancel-booking",
        status: "error",
        title: "Không thể hủy chuyến xe",
      });
    },
  });

  return {
    error: createBookingMutation.error ?? updateBookingMutation.error,
    isLoading:
      createBookingMutation.isLoading ?? updateBookingMutation.isLoading,
    bookingData: bookingData,
    setBooking: setBooking,
    updateBooking: updateBooking,
    createBooking: createBookingMutation.mutate,
    updateBookingStatus: updateBookingMutation.mutate,
  };
}
