import { StateCreator } from "zustand";
import { PostBookingResponse } from "../../api/booking";

export type BookingSlice = {
  bookingData?: PostBookingResponse;
  setBooking: (booking: PostBookingResponse) => void;
  clearBooking: () => void;
};

export const creatBookingSlice: StateCreator<BookingSlice> = (set) => ({
  bookingData: undefined,
  setBooking: (bookingData: PostBookingResponse) => set(() => ({ bookingData })),
  clearBooking: () => set(() => ({ bookingData: undefined })),
});
