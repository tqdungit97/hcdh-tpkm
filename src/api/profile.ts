import { AxiosInstance } from ".";

type GetUserProfileResponse = {
  id: number;
  email: string;
  fullName: string;
  name: string;
};
export const getUserProfile = () => {
  return AxiosInstance.get<GetUserProfileResponse>("/api/user/v1/me");
};
