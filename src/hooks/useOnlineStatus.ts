import { useDisclosure, useToast } from "@chakra-ui/react";
import { useMutation } from "react-query";
import { AxiosError } from "axios";
import { useGeolocation, useProfile } from ".";
import { useCallback, useEffect } from "react";
import { toggleDriverOnlineStatus } from "../api/driver";

export function useOnlineStatus() {
  const toast = useToast();
  const { user } = useProfile();
  const geoLocation = useGeolocation();
  const { isOpen, onOpen, onToggle } = useDisclosure({
    defaultIsOpen: user?.driver?.driverLoginSession?.status === "ONLINE",
  });
  const { isLoading, mutate } = useMutation(toggleDriverOnlineStatus, {
    onSuccess: onToggle,
    onError: (error: AxiosError<{ message: string }>) => {
      toast({
        id: "login",
        title: error.response?.data.message,
        status: "error",
      });
    },
  });

  const toggleOnlineStatus = useCallback(() => {
    mutate({
      lat: geoLocation?.coords?.latitude ?? 0,
      long: geoLocation?.coords?.longitude ?? 0,
      type: isOpen ? "OFFLINE" : "ONLINE",
    });
  }, [isOpen, geoLocation, mutate]);

  useEffect(() => {
    if (user?.driver?.driverLoginSession?.status === "ONLINE") {
      onOpen();
    }
  }, [user, onOpen]);

  return {
    isLoading,
    isOnline: isOpen,
    toggleOnlineStatus,
  };
}
