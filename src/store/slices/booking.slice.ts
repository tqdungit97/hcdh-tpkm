import { StateCreator } from "zustand";
import { Booking } from "../../types/booking";

export type BookingSlice = {
  bookingData?: Booking;
  setBooking: (booking?: Booking) => void;
  updateBooking: (value: Partial<Booking>) => void;
  clearBooking: () => void;
};

export const creatBookingSlice: StateCreator<BookingSlice> = (
  set,
  _get,
  api
) => ({
  bookingData: undefined,
  setBooking: (bookingData?: Booking) => set(() => ({ bookingData })),
  updateBooking: (value: Partial<Booking>) =>
    api.setState((previous) => ({
      ...previous,
      bookingData: { ...previous.bookingData, ...value } as Booking,
    })),
  clearBooking: () => set(() => ({ bookingData: undefined })),
});
