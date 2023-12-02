import { useQuery } from "react-query";
import { AxiosError, HttpStatusCode } from "axios";
import { getUserProfile } from "../api/profile";
import { useAuthentication } from ".";

export function useProfile() {
  const { logout } = useAuthentication();
  const { isLoading, isError, data } = useQuery({
    queryKey: "user",
    queryFn: getUserProfile,
    onError: (error: AxiosError) => {
      if (error.response?.status === HttpStatusCode.NotFound) {
        logout();
      }
    },
  });

  return {
    isError,
    isLoading,
    user: data?.data,
  };
}
