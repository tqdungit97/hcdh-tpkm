import { useEffect } from "react";
import { useToast } from "@chakra-ui/react";
import { useApplicationStore } from "../../store/useApplicationStore";

export function AppGeolocation() {
  const toast = useToast();
  const { setGeolocation } = useApplicationStore();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(setGeolocation, function (error) {
      let errorMessage = "";
      switch (error.code) {
        case error.PERMISSION_DENIED:
          errorMessage = "User denied the request for Geolocation.";
          break;
        case error.POSITION_UNAVAILABLE:
          errorMessage = "Location information is unavailable.";
          break;
        case error.TIMEOUT:
          errorMessage = "The request to get user location timed out.";
          break;
        default:
          errorMessage = "An unknown error occurred.";
          break;
      }
      toast({
        id: "google-map",
        status: "error",
        title: errorMessage,
      });
    });
  }, [toast, setGeolocation]);
  
  return null;
}
