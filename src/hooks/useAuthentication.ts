import { useMutation } from "react-query";
import { useToast } from "@chakra-ui/react";
import { postLogin, postRegister } from "../api/auth";
import { useApplicationStore } from "../store/useApplicationStore";

export function useAuthentication() {
  const toast = useToast();
  const { setAuth, clearAuth } = useApplicationStore();

  const {
    mutate: login,
    isError: loginError,
    isLoading: loginLoading,
  } = useMutation(postLogin, {
    onError: () => {
      toast({
        id: "login",
        title: "Đăng nhập không thành công",
        status: "error",
      });
    },
    onSuccess: ({ data }) => {
      setAuth(data);
    }
  });
  const {
    mutate: register,
    isError: registerError,
    isLoading: registerLoading,
  } = useMutation(postRegister, {
    onError: () => {
      toast({
        id: "register",
        title: "Đăng kí không thành công",
        status: "error",
      });
    },
    onSuccess: (_, { phoneNumber, password }) => {
      login({ phoneNumber, password })
    },
  });

  return {
    login,
    register,
    logout: clearAuth,
    isLoading: loginLoading || registerLoading,
    isError: loginError || registerError
  };
}
