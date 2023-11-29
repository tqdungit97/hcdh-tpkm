import { AxiosInstance } from ".";

export type PostLoginPayload = {
  email: string;
  password: string;
};

export type PostLoginResponse = {
  userId: number;
  accessToken: string;
  accessTokenExpiryIn: number;
  refreshToken: string;
  refreshTokenExpiryIn: number;
};
export const postLogin = (payload: PostLoginPayload) => {
  return AxiosInstance.post<PostLoginResponse>("/api/auth/v1/login", payload);
};

export type PostRegisterPayload = {
  username: string;
  password: string;
  name?: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  address: string;
  dob?: string;
};
export const postRegister = (payload: PostRegisterPayload) => {
  return AxiosInstance.post<PostRegisterPayload>(
    "/api/user/v1/register",
    payload
  );
};
