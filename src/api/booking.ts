import { AxiosInstance } from ".";
import {
  BaseBookingDetail,
  BookingDetail,
  BookingStatus,
  DriverInfo,
} from "../types/booking";

export type PostBookingPayload = {
  customerId: string | number;
  startTime: Date;
  bookingDetail: BaseBookingDetail & { startTime: Date };
};

export type PostBookingResponse = {
  booking: {
    bookingDetail: BookingDetail;
    code: string;
    id: number;
    startTime: Date;
    status: BookingStatus;
    thoi_gian_cap_nhat: Date;
    thoi_gian_tao: Date;
  };
  driver: DriverInfo;
  minDistance: number;
  pricing: number;
  status: BookingStatus;
};

export const postBooking = (payload: PostBookingPayload) =>
  AxiosInstance.post<PostBookingResponse>("/api/booking/v1", payload);
