import { AxiosInstance } from ".";

export type PostLoginPayload = {
  phoneNumber: string;
  password: string;
};

export type PostLoginResponse = {
  userId: number;
  accessToken: string;
  accessTokenExpiryIn: number;
  refreshToken: string;
  refreshTokenExpiryIn: number;
  role: RegisterRole;
  fullName: string;
  customerId?: number;
  driverId?: number;
  staffId?: number;
};

export const postLogin = (payload: PostLoginPayload) => {
  return AxiosInstance.post<PostLoginResponse>("/api/auth/login", payload);
};

export enum RegisterRole {
  CUSTOMER = "CUSTOMER",
  DRIVER = "DRIVER",
  STAFF = "STAFF",
}
export type PostRegisterPayload = {
  username: string;
  password: string;
  name?: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  address: string;
  dob?: string;
  role: RegisterRole;
};
export const postRegister = (payload: PostRegisterPayload) => {
  return AxiosInstance.post<PostRegisterPayload>(
    "/api/users/register",
    payload
  );
};
