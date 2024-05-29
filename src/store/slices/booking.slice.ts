import merge from 'lodash/merge';
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
      bookingData: merge<Booking | undefined, Partial<Booking>>(previous.bookingData, value),
    })),
  clearBooking: () => set(() => ({ bookingData: undefined })),
});
