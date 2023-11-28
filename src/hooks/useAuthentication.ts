import { useMutation } from "react-query";
import { useToast } from "@chakra-ui/react";
import { postLogin, postRegister } from "../api/auth";
import { useApplicationStore } from "../store/useApplicationStore";

export function useAuthentication() {
  const toast = useToast();
  const { setAccessToken, setRefreshToken } = useApplicationStore();

  const {
    mutate: login,
    isLoading: loginLoading,
    isError: loginError,
  } = useMutation(postLogin, {
    onError: () => {
      toast({
        id: "login",
        title: "Đăng nhập không thành công",
        status: "error",
      });
    },
    onSuccess: (data) => {
      setAccessToken(data.data.data.accessToken);
      setRefreshToken(data.data.data.refreshToken);
    }
  });
  const {
    mutate: register,
    isLoading: registerLoading,
    isError: registerError,
  } = useMutation(postRegister, {
    onError: () => {
      toast({
        id: "register",
        title: "Đăng kí không thành công",
        status: "error",
      });
    },
    onSuccess: (_, { email, password }) => {
      login({ email, password })
    },
  });

  return {
    login,
    register,
    isLoading: loginLoading || registerLoading,
    isError: loginError || registerError
  };
}
