import { Booking, BookingStatus } from "../types/booking";

export const isInCompletedBooking = (booking: Booking) => {
  if (!booking) return false;

  return (
    booking.status !== BookingStatus.CANCELLED &&
    booking.status !== BookingStatus.DRIVER_NOT_FOUND &&
    booking.status !== BookingStatus.PAID
  );
};
