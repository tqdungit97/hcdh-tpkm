import { AxiosInstance } from ".";
import { User } from "../types/user";

export const getUserProfile = () => {
  return AxiosInstance.get<User>("/api/users/me");
};

