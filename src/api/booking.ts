import { AxiosInstance } from ".";
import {
  Booking,
  BaseBookingDetail,
  DriverInfo,
  BookingStatus,
} from "../types/booking";

export type PostBookingPayload = {
  customerId: string | number;
  startTime: Date;
  bookingDetail: BaseBookingDetail & { startTime: Date };
};

export type PostBookingResponse = {
  booking: Booking;
  driver: DriverInfo;
  minDistance: number;
  pricing: number;
  status: BookingStatus;
};

export const postBooking = (payload: PostBookingPayload) =>
  AxiosInstance.post<PostBookingResponse>("/api/bookings", payload);

export type GetUserBookingsParams = {
  customerId: string;
};

export const getUserBookings = (params: GetUserBookingsParams) => {
  const queryParams = new URLSearchParams(params);
  return AxiosInstance.get<Booking[]>(
    `/api/bookings?${queryParams.toString()}`
  );
};

export const putUpdateBookingStatus = (payload: {
  bookingId: number;
  actionType: BookingStatus;
  assignedDriverId?: number;
}) => AxiosInstance.put("/api/bookings/booking-action", payload);