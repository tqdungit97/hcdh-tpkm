import { AxiosError, HttpStatusCode } from "axios";
import { useToast } from "@chakra-ui/react";
import { useMutation } from "react-query";
import { postBooking } from "../api/booking";
import { useApplicationStore } from "../store/useApplicationStore";

export function useBooking() {
  const toast = useToast();
  const { bookingData, setBooking, clearBooking } = useApplicationStore();
  const { isLoading, data, error, mutate } = useMutation(postBooking, {
    onSuccess: (data) => {
      setBooking(data.data);
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

  return {
    error,
    isLoading,
    bookingData: bookingData ?? data?.data,
    startBooking: mutate,
    cancelBooking: clearBooking,
  };
}
