import { DriverInfo } from "./booking";

export type User = {
  id: number;
  email: string;
  fullName: string;
  name: string;
  driver?: DriverInfo;
};

export type Customer = {
  fullName: string;
  phoneNumber: string;
  avatar?: string;
};
