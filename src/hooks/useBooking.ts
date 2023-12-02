import { AxiosError, HttpStatusCode } from "axios";
import { useToast } from "@chakra-ui/react";
import { useMutation } from "react-query";
import { postBooking } from "../api/booking";

export function useBooking() {
  const toast = useToast();
  const { isLoading, data, error, mutate } = useMutation(postBooking, {
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
    data: data?.data,
    error,
    mutate,
    isLoading,
  };
}
