import { AxiosInstance } from ".";
import {
  Booking,
  BookingStatus,
  BaseBookingDetail,
} from "../types/booking";

export type PostBookingPayload = {
  customerId: string | number;
  startTime: Date;
  orderDetail: BaseBookingDetail & { startTime: Date };
};

export const postBooking = (payload: PostBookingPayload) =>
  AxiosInstance.post<Booking>("/api/orders", payload);

export type GetUserBookingsParams = {
  customerId: string;
};

export const getUserBookings = (params: GetUserBookingsParams) => {
  const queryParams = new URLSearchParams(params);
  return AxiosInstance.get<Booking[]>(
    `/api/orders?${queryParams.toString()}`
  );
};

export const putUpdateBookingStatus = (payload: {
  orderId: number;
  actionType: BookingStatus;
  assignedDriverId?: number;
}) => AxiosInstance.put("/api/orders/order-action", payload);